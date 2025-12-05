import { GoogleGenAI } from "@google/genai";
import { CompanyReport } from "../types";

export const fetchCompanyData = async (companyName: string): Promise<CompanyReport> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your Vercel Environment Variables (API_KEY).");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Act as a senior market research analyst.
    Analyze the company: "${companyName}".
    
    You MUST use Google Search to find the latest available data (Current Year/Latest Quarter).
    
    STRICT INSTRUCTION: 
    1. Output ONLY valid, raw JSON. 
    2. Do NOT use markdown code blocks (no \`\`\`json).
    3. Do NOT include citation markers (like [1], [2]) inside the JSON strings.
    4. Ensure all arrays and objects are correctly comma-separated.
    5. Double-check that there is a comma after every string in a list, especially in the "growthStrategy" and "projections" arrays.
    
    The JSON must match this structure exactly:
    {
      "banner": {
        "companyName": "string",
        "ticker": "string",
        "exchange": "string",
        "industry": "string",
        "established": "string",
        "hq": "string",
        "employees": "string",
        "revenue": "string (e.g. $12.5B +5% YoY)",
        "cagr5Year": "string"
      },
      "overview": {
        "summary": "string",
        "keyFinancials": {
          "revenue": "string",
          "pat": "string",
          "patMargin": "string",
          "orderBook": "string (optional)"
        },
        "cxFootprint": "string",
        "geoSplit": [{ "region": "string", "percentage": number }]
      },
      "businessModel": {
        "segments": ["string"],
        "customers": ["string"],
        "revenueStreams": ["string"],
        "valueProposition": ["string"],
        "channels": ["string"],
        "keyActivities": ["string"],
        "ma": ["string"],
        "segmentTable": [{ "segment": "string", "revenueShare": "string", "products": "string" }]
      },
      "growthStrategy": [{ "title": "string", "points": ["string"] }],
      "financials": {
        "history": [{ "year": "string", "revenue": number, "netIncome": number, "ebitdaMargin": number }],
        "segmentGrowth": [{ "segment": "string", "currentRevenue": number, "prevRevenue": number, "growth": number }],
        "analysis": {
          "revenueGrowthFactors": "string",
          "trend5Year": "string",
          "cagrAnalysis": "string",
          "segmentYoYAnalysis": "string",
          "netIncomeEbitdaAnalysis": "string",
          "geoBifurcation": "string (optional)"
        },
        "projections": ["string"],
        "creditRatings": "string (optional)"
      },
      "sources": ["string"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // 1. Extract JSON from text (handling potential markdown wrapping)
    let jsonText = response.text || "{}";
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "");
    
    // Find the outer braces to ignore any preamble/postscript text
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
        console.error("Raw response:", response.text);
        throw new Error("Invalid JSON structure received from Gemini.");
    }
    
    jsonText = jsonText.substring(firstBrace, lastBrace + 1);

    // --- ROBUST JSON SANITIZATION ---
    // 1. Remove trailing commas before closing braces/brackets
    jsonText = jsonText.replace(/,\s*([\]}])/g, '$1');
    
    // 2. Fix missing commas between strings in arrays (e.g., "A"\n"B" -> "A","B")
    // This looks for a double quote, optional whitespace/newlines, then another double quote
    // We only apply this if it looks like a list item separation
    jsonText = jsonText.replace(/("\s*[\r\n]+\s*")/g, '", "');

    let data: CompanyReport;
    try {
      data = JSON.parse(jsonText) as CompanyReport;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Failed JSON Text:", jsonText);
      throw new Error("Failed to parse company data. The AI response was not valid JSON.");
    }

    // 2. Extract Grounding Metadata (Web Sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return chunk.web.title ? `${chunk.web.title}` : chunk.web.uri;
        }
        return null;
      })
      .filter((s: any) => s) as string[];

    // 3. Merge sources
    if (data.sources) {
      // De-duplicate
      data.sources = Array.from(new Set([...data.sources, ...webSources]));
    } else {
      data.sources = webSources;
    }

    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};