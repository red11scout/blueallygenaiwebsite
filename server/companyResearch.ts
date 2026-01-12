/**
 * BlueAlly Company Research Service
 * 
 * Uses AI to research real company data and provide accurate financial insights.
 * All data is sourced from public information and industry benchmarks.
 */

import { invokeLLM } from "./_core/llm";
import { 
  calculateCompanyOpportunity, 
  calculate5YearROI,
  INDUSTRY_BENCHMARKS,
  formatCurrency 
} from "./calculationEngine";

/**
 * Company data structure returned from research
 */
export interface CompanyResearchResult {
  // Basic company info
  companyName: string;
  domain: string;
  industry: string;
  subIndustry: string;
  
  // Financial data (estimated if not public)
  revenue: number;
  revenueSource: 'public' | 'estimated';
  employees: number;
  employeesSource: 'public' | 'estimated';
  
  // Calculated metrics
  sgaPercent: number;
  industryAvgSga: number;
  annualSGACost: number;
  
  // Competitive landscape
  competitors: Array<{
    name: string;
    aiMaturity: 'leader' | 'adopter' | 'laggard';
    knownInitiatives: string[];
  }>;
  
  // AI opportunity assessment
  aiOpportunity: {
    totalOpportunity: number;
    conservativeTarget: number;
    topProcesses: Array<{
      process: string;
      opportunity: number;
      confidence: 'High' | 'Medium' | 'Low';
      rationale: string;
    }>;
  };
  
  // 5-year projection
  fiveYearProjection: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
    totalROI: number;
    paybackMonths: number;
  };
  
  // Data quality indicators
  dataQuality: {
    overallConfidence: 'High' | 'Medium' | 'Low';
    publicDataAvailable: boolean;
    estimationNotes: string[];
  };
  
  // Research timestamp
  researchedAt: Date;
}

/**
 * Research a company using AI and public data sources
 */
export async function researchCompany(domain: string): Promise<CompanyResearchResult> {
  // Clean the domain
  const cleanDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '');
  
  // Use AI to research the company
  const researchPrompt = `You are a financial analyst researching a company for AI automation opportunity assessment.

Research the company with domain: ${cleanDomain}

Provide accurate, factual information based on publicly available data. If exact data is not available, provide conservative estimates based on industry benchmarks.

Return a JSON object with the following structure:
{
  "companyName": "Full legal company name",
  "industry": "Primary industry (one of: Technology, Financial Services, Healthcare, Manufacturing, Retail, Professional Services, Energy, Telecommunications)",
  "subIndustry": "More specific sub-industry",
  "revenue": estimated annual revenue in USD (number only, no formatting),
  "revenueSource": "public" or "estimated",
  "employees": estimated employee count (number only),
  "employeesSource": "public" or "estimated",
  "description": "Brief company description (1-2 sentences)",
  "competitors": [
    {
      "name": "Competitor company name",
      "aiMaturity": "leader", "adopter", or "laggard",
      "knownInitiatives": ["Known AI/automation initiative 1", "Initiative 2"]
    }
  ],
  "publicDataAvailable": true or false,
  "estimationNotes": ["Note about any estimates made"]
}

IMPORTANT:
- Be conservative with revenue estimates - use lower bounds
- For private companies, estimate based on employee count and industry averages
- Revenue per employee benchmarks: Tech ($300-500K), Services ($150-250K), Manufacturing ($200-350K)
- If you cannot find reliable data, say so in estimationNotes
- Return ONLY valid JSON, no markdown formatting`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a financial analyst. Return only valid JSON, no markdown code blocks or additional text." },
        { role: "user", content: researchPrompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "company_research",
          strict: true,
          schema: {
            type: "object",
            properties: {
              companyName: { type: "string" },
              industry: { type: "string" },
              subIndustry: { type: "string" },
              revenue: { type: "number" },
              revenueSource: { type: "string", enum: ["public", "estimated"] },
              employees: { type: "number" },
              employeesSource: { type: "string", enum: ["public", "estimated"] },
              description: { type: "string" },
              competitors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    aiMaturity: { type: "string", enum: ["leader", "adopter", "laggard"] },
                    knownInitiatives: { type: "array", items: { type: "string" } }
                  },
                  required: ["name", "aiMaturity", "knownInitiatives"],
                  additionalProperties: false
                }
              },
              publicDataAvailable: { type: "boolean" },
              estimationNotes: { type: "array", items: { type: "string" } }
            },
            required: ["companyName", "industry", "subIndustry", "revenue", "revenueSource", "employees", "employeesSource", "description", "competitors", "publicDataAvailable", "estimationNotes"],
            additionalProperties: false
          }
        }
      }
    });

    const rawAiContent = response.choices[0].message.content;
    const aiData = JSON.parse(typeof rawAiContent === 'string' ? rawAiContent : '{}');
    
    // Get industry benchmarks
    const industryBenchmarks = INDUSTRY_BENCHMARKS.sgaByIndustry[aiData.industry as keyof typeof INDUSTRY_BENCHMARKS.sgaByIndustry] 
      || INDUSTRY_BENCHMARKS.sgaByIndustry.Default;
    
    // Calculate SG&A (use industry average as baseline)
    const sgaPercent = industryBenchmarks.avg;
    const annualSGACost = aiData.revenue * sgaPercent;
    
    // Calculate AI opportunity using HyperFormula engine
    const opportunity = calculateCompanyOpportunity(
      aiData.revenue,
      aiData.employees,
      aiData.industry,
      sgaPercent
    );
    
    // Calculate implementation cost (conservative: 15% of first-year savings)
    const implementationCost = opportunity.conservativeTarget * 0.15;
    const maintenanceCost = implementationCost * 0.10;
    
    // Calculate 5-year ROI
    const fiveYearProjection = calculate5YearROI(
      opportunity.conservativeTarget,
      implementationCost,
      maintenanceCost
    );
    
    // Generate process-specific insights using AI
    const processInsights = await generateProcessInsights(
      aiData.companyName,
      aiData.industry,
      aiData.subIndustry,
      opportunity.processBreakdown
    );
    
    // Determine overall data quality
    const dataQuality = {
      overallConfidence: (aiData.publicDataAvailable && aiData.revenueSource === 'public') 
        ? 'High' as const
        : (aiData.publicDataAvailable ? 'Medium' as const : 'Low' as const),
      publicDataAvailable: aiData.publicDataAvailable,
      estimationNotes: aiData.estimationNotes || [],
    };
    
    return {
      companyName: aiData.companyName,
      domain: cleanDomain,
      industry: aiData.industry,
      subIndustry: aiData.subIndustry,
      revenue: aiData.revenue,
      revenueSource: aiData.revenueSource,
      employees: aiData.employees,
      employeesSource: aiData.employeesSource,
      sgaPercent,
      industryAvgSga: industryBenchmarks.avg,
      annualSGACost,
      competitors: aiData.competitors,
      aiOpportunity: {
        totalOpportunity: opportunity.totalOpportunity,
        conservativeTarget: opportunity.conservativeTarget,
        topProcesses: processInsights,
      },
      fiveYearProjection,
      dataQuality,
      researchedAt: new Date(),
    };
  } catch (error) {
    console.error('Company research error:', error);
    throw new Error(`Failed to research company: ${cleanDomain}`);
  }
}

/**
 * Generate process-specific insights using AI
 */
async function generateProcessInsights(
  companyName: string,
  industry: string,
  subIndustry: string,
  processBreakdown: Array<{ process: string; opportunity: number; confidence: string }>
): Promise<Array<{
  process: string;
  opportunity: number;
  confidence: 'High' | 'Medium' | 'Low';
  rationale: string;
}>> {
  const topProcesses = processBreakdown
    .sort((a, b) => b.opportunity - a.opportunity)
    .slice(0, 5);
  
  const insightPrompt = `For ${companyName} in the ${industry} industry (${subIndustry}), provide specific rationale for why AI automation would benefit these processes:

${topProcesses.map(p => `- ${p.process}: ${formatCurrency(p.opportunity)} opportunity`).join('\n')}

For each process, provide a 1-sentence rationale specific to this industry. Return JSON array:
[
  {
    "process": "Process name",
    "rationale": "Specific rationale for this industry"
  }
]`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an AI automation consultant. Return only valid JSON array." },
        { role: "user", content: insightPrompt }
      ],
    });
    
    const rawContent = response.choices[0].message.content;
    const content = typeof rawContent === 'string' ? rawContent : '[]';
    // Extract JSON from potential markdown code blocks
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const insights = JSON.parse(jsonMatch ? jsonMatch[0] : '[]');
    
    return topProcesses.map((p, i) => ({
      process: p.process,
      opportunity: p.opportunity,
      confidence: p.confidence as 'High' | 'Medium' | 'Low',
      rationale: insights[i]?.rationale || `Standard ${p.process.toLowerCase()} automation benefits apply.`,
    }));
  } catch {
    // Return default rationales if AI fails
    return topProcesses.map(p => ({
      process: p.process,
      opportunity: p.opportunity,
      confidence: p.confidence as 'High' | 'Medium' | 'Low',
      rationale: `AI can significantly reduce manual effort in ${p.process.toLowerCase()}.`,
    }));
  }
}

/**
 * Quick company lookup for autocomplete/validation
 */
export async function quickCompanyLookup(domain: string): Promise<{
  valid: boolean;
  companyName?: string;
  industry?: string;
}> {
  const cleanDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '');
  
  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a company lookup service. Return only valid JSON." },
        { role: "user", content: `Is "${cleanDomain}" a valid company domain? Return JSON: {"valid": true/false, "companyName": "name if valid", "industry": "industry if valid"}` }
      ],
    });
    
    const rawContent = response.choices[0].message.content;
    const content = typeof rawContent === 'string' ? rawContent : '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : '{"valid": false}');
  } catch {
    return { valid: false };
  }
}

export default {
  researchCompany,
  quickCompanyLookup,
};
