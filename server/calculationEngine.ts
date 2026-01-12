/**
 * BlueAlly Financial Calculation Engine
 * 
 * Uses HyperFormula for deterministic, spreadsheet-grade calculations.
 * All assumptions are conservative and based on industry benchmarks.
 */

import HyperFormula from 'hyperformula';

// Initialize HyperFormula with configuration
const hfInstance = HyperFormula.buildEmpty({
  licenseKey: 'gpl-v3',
  precisionRounding: 10,
});

// Create a sheet for calculations
const sheetName = hfInstance.addSheet('Calculations');
const sheetId = hfInstance.getSheetId(sheetName)!;

/**
 * Industry benchmark data (conservative estimates)
 * Sources: Gartner, McKinsey, Deloitte industry reports
 */
export const INDUSTRY_BENCHMARKS = {
  // SG&A as percentage of revenue by industry (conservative mid-range)
  sgaByIndustry: {
    'Technology': { avg: 0.35, efficient: 0.25, inefficient: 0.45 },
    'Financial Services': { avg: 0.40, efficient: 0.30, inefficient: 0.50 },
    'Healthcare': { avg: 0.30, efficient: 0.22, inefficient: 0.38 },
    'Manufacturing': { avg: 0.20, efficient: 0.15, inefficient: 0.28 },
    'Retail': { avg: 0.25, efficient: 0.18, inefficient: 0.32 },
    'Professional Services': { avg: 0.45, efficient: 0.35, inefficient: 0.55 },
    'Energy': { avg: 0.15, efficient: 0.10, inefficient: 0.22 },
    'Telecommunications': { avg: 0.28, efficient: 0.20, inefficient: 0.35 },
    'Default': { avg: 0.30, efficient: 0.22, inefficient: 0.38 },
  },
  
  // AI automation potential by process type (conservative estimates)
  automationPotential: {
    'Invoice Processing': { laborReduction: 0.65, errorReduction: 0.80, timeReduction: 0.70 },
    'Customer Support': { laborReduction: 0.40, errorReduction: 0.50, timeReduction: 0.55 },
    'Contract Review': { laborReduction: 0.50, errorReduction: 0.60, timeReduction: 0.65 },
    'Compliance Audit': { laborReduction: 0.35, errorReduction: 0.70, timeReduction: 0.45 },
    'HR Onboarding': { laborReduction: 0.45, errorReduction: 0.55, timeReduction: 0.50 },
    'Sales Forecasting': { laborReduction: 0.30, errorReduction: 0.40, timeReduction: 0.35 },
    'Data Entry': { laborReduction: 0.75, errorReduction: 0.85, timeReduction: 0.80 },
    'Report Generation': { laborReduction: 0.60, errorReduction: 0.65, timeReduction: 0.70 },
    'Email Management': { laborReduction: 0.35, errorReduction: 0.45, timeReduction: 0.40 },
    'Document Classification': { laborReduction: 0.70, errorReduction: 0.75, timeReduction: 0.75 },
  },
  
  // Implementation timeline assumptions (months)
  implementationTimeline: {
    pilot: 2,
    phaseOne: 4,
    fullRollout: 8,
    optimization: 12,
  },
  
  // Cost assumptions (conservative)
  costAssumptions: {
    avgHourlyLaborCost: 75, // Fully loaded cost
    aiTokenCostPer1000: 0.002, // Conservative token pricing
    implementationCostMultiplier: 0.15, // 15% of first-year savings
    maintenanceCostAnnual: 0.10, // 10% of implementation cost
    trainingCostPerEmployee: 500,
  },
  
  // Risk adjustment factors
  riskFactors: {
    adoptionRate: 0.75, // 75% adoption rate assumption
    technicalSuccess: 0.85, // 85% technical success rate
    changeManagement: 0.80, // 80% change management success
  },
};

/**
 * Company size classifications based on employee count
 */
export function classifyCompanySize(employees: number): 'small' | 'medium' | 'large' | 'enterprise' {
  if (employees < 100) return 'small';
  if (employees < 1000) return 'medium';
  if (employees < 10000) return 'large';
  return 'enterprise';
}

/**
 * Calculate annual labor cost for a process
 */
export function calculateAnnualLaborCost(
  hoursPerWeek: number,
  employeesInvolved: number,
  hourlyRate: number = INDUSTRY_BENCHMARKS.costAssumptions.avgHourlyLaborCost
): number {
  // Use HyperFormula for deterministic calculation
  hfInstance.setCellContents({ sheet: sheetId, row: 0, col: 0 }, [
    [hoursPerWeek, employeesInvolved, hourlyRate, 52], // 52 weeks per year
    ['=A1*B1*C1*D1'], // Annual cost formula
  ]);
  
  const result = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 0 });
  return typeof result === 'number' ? Math.round(result) : 0;
}

/**
 * Calculate potential savings from AI automation
 */
export function calculateAutomationSavings(
  processType: string,
  annualLaborCost: number,
  applyRiskFactors: boolean = true
): {
  laborSavings: number;
  errorReductionValue: number;
  timeValue: number;
  totalSavings: number;
  conservativeEstimate: number;
} {
  const potential = INDUSTRY_BENCHMARKS.automationPotential[processType as keyof typeof INDUSTRY_BENCHMARKS.automationPotential] 
    || { laborReduction: 0.30, errorReduction: 0.40, timeReduction: 0.35 };
  
  const riskMultiplier = applyRiskFactors 
    ? INDUSTRY_BENCHMARKS.riskFactors.adoptionRate * 
      INDUSTRY_BENCHMARKS.riskFactors.technicalSuccess * 
      INDUSTRY_BENCHMARKS.riskFactors.changeManagement
    : 1;
  
  // Set up HyperFormula calculations
  hfInstance.setCellContents({ sheet: sheetId, row: 0, col: 0 }, [
    [annualLaborCost, potential.laborReduction, potential.errorReduction, potential.timeReduction, riskMultiplier],
    ['=A1*B1*E1', '=A1*C1*0.1*E1', '=A1*D1*0.05*E1'], // Labor, Error value (10% of labor), Time value (5% of labor)
    ['=A2+B2+C2'], // Total
    ['=A3*0.7'], // Conservative estimate (70% of total) - references A3 which is the total
  ]);
  
  const laborSavings = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 0 }) as number;
  const errorReductionValue = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 1 }) as number;
  const timeValue = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 2 }) as number;
  const totalSavings = hfInstance.getCellValue({ sheet: sheetId, row: 2, col: 0 }) as number;
  const conservativeEstimate = hfInstance.getCellValue({ sheet: sheetId, row: 3, col: 0 }) as number;
  
  return {
    laborSavings: Math.round(laborSavings),
    errorReductionValue: Math.round(errorReductionValue),
    timeValue: Math.round(timeValue),
    totalSavings: Math.round(totalSavings),
    conservativeEstimate: Math.round(conservativeEstimate),
  };
}

/**
 * Calculate 5-year ROI projection
 */
export function calculate5YearROI(
  annualSavings: number,
  implementationCost: number,
  maintenanceCostAnnual: number
): {
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
  totalROI: number;
  paybackMonths: number;
  npv: number;
} {
  const discountRate = 0.10; // 10% discount rate for NPV
  
  // Year 1: 50% savings (ramp-up), full implementation cost
  // Year 2-5: Full savings, maintenance cost only
  hfInstance.setCellContents({ sheet: sheetId, row: 0, col: 0 }, [
    [annualSavings, implementationCost, maintenanceCostAnnual, discountRate],
    ['=A1*0.5-B1-C1', '=A1-C1', '=A1*1.03-C1', '=A1*1.06-C1', '=A1*1.09-C1'], // Years 1-5 (3% annual growth)
    ['=A2+B2+C2+D2+E2'], // Total 5-year
    ['=A2/(1+D1)^1+B2/(1+D1)^2+C2/(1+D1)^3+D2/(1+D1)^4+E2/(1+D1)^5'], // NPV
  ]);
  
  const year1 = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 0 }) as number;
  const year2 = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 1 }) as number;
  const year3 = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 2 }) as number;
  const year4 = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 3 }) as number;
  const year5 = hfInstance.getCellValue({ sheet: sheetId, row: 1, col: 4 }) as number;
  const totalROI = hfInstance.getCellValue({ sheet: sheetId, row: 2, col: 0 }) as number;
  const npv = hfInstance.getCellValue({ sheet: sheetId, row: 3, col: 0 }) as number;
  
  // Calculate payback period in months
  const monthlyNetBenefit = (annualSavings * 0.5 - maintenanceCostAnnual) / 12;
  const paybackMonths = monthlyNetBenefit > 0 ? Math.ceil(implementationCost / monthlyNetBenefit) : 999;
  
  return {
    year1: Math.round(year1),
    year2: Math.round(year2),
    year3: Math.round(year3),
    year4: Math.round(year4),
    year5: Math.round(year5),
    totalROI: Math.round(totalROI),
    paybackMonths: Math.min(paybackMonths, 60),
    npv: Math.round(npv),
  };
}

/**
 * Calculate company-wide AI opportunity
 */
export function calculateCompanyOpportunity(
  revenue: number,
  employees: number,
  industry: string,
  sgaPercent?: number
): {
  currentSGA: number;
  industryBenchmark: number;
  sgaGap: number;
  totalOpportunity: number;
  conservativeTarget: number;
  processBreakdown: Array<{ process: string; opportunity: number; confidence: string }>;
} {
  const industryData = INDUSTRY_BENCHMARKS.sgaByIndustry[industry as keyof typeof INDUSTRY_BENCHMARKS.sgaByIndustry] 
    || INDUSTRY_BENCHMARKS.sgaByIndustry.Default;
  
  const actualSGA = sgaPercent || industryData.avg;
  const currentSGACost = revenue * actualSGA;
  const efficientSGACost = revenue * industryData.efficient;
  const sgaGap = currentSGACost - efficientSGACost;
  
  // Conservative target: 30% of the gap can be addressed by AI
  const conservativeTarget = sgaGap * 0.30;
  
  // Break down by process (based on typical SG&A allocation)
  const processBreakdown = [
    { process: 'Invoice Processing', allocation: 0.12, confidence: 'High' },
    { process: 'Customer Support', allocation: 0.18, confidence: 'High' },
    { process: 'Contract Review', allocation: 0.08, confidence: 'Medium' },
    { process: 'Compliance Audit', allocation: 0.10, confidence: 'Medium' },
    { process: 'HR Onboarding', allocation: 0.07, confidence: 'High' },
    { process: 'Report Generation', allocation: 0.15, confidence: 'High' },
    { process: 'Data Entry', allocation: 0.10, confidence: 'High' },
    { process: 'Email Management', allocation: 0.08, confidence: 'Medium' },
    { process: 'Document Classification', allocation: 0.12, confidence: 'High' },
  ].map(p => ({
    process: p.process,
    opportunity: Math.round(conservativeTarget * p.allocation),
    confidence: p.confidence,
  }));
  
  return {
    currentSGA: Math.round(currentSGACost),
    industryBenchmark: Math.round(efficientSGACost),
    sgaGap: Math.round(sgaGap),
    totalOpportunity: Math.round(sgaGap),
    conservativeTarget: Math.round(conservativeTarget),
    processBreakdown,
  };
}

/**
 * Format currency with thousands separator
 */
export function formatCurrency(amount: number, showCents: boolean = false): string {
  if (Math.abs(amount) >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return showCents 
    ? `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${amount.toLocaleString('en-US')}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export default {
  INDUSTRY_BENCHMARKS,
  classifyCompanySize,
  calculateAnnualLaborCost,
  calculateAutomationSavings,
  calculate5YearROI,
  calculateCompanyOpportunity,
  formatCurrency,
  formatPercent,
};
