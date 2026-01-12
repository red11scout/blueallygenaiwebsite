import { describe, expect, it } from "vitest";
import {
  INDUSTRY_BENCHMARKS,
  calculateCompanyOpportunity,
  calculate5YearROI,
  calculateAutomationSavings,
  formatCurrency,
  formatPercent,
  classifyCompanySize
} from "./calculationEngine";

describe("Industry Benchmarks", () => {
  it("has benchmarks for major industries", () => {
    expect(INDUSTRY_BENCHMARKS.sgaByIndustry['Technology']).toBeDefined();
    expect(INDUSTRY_BENCHMARKS.sgaByIndustry['Healthcare']).toBeDefined();
    expect(INDUSTRY_BENCHMARKS.sgaByIndustry['Manufacturing']).toBeDefined();
    expect(INDUSTRY_BENCHMARKS.sgaByIndustry['Financial Services']).toBeDefined();
  });

  it("has different benchmarks for different industries", () => {
    const tech = INDUSTRY_BENCHMARKS.sgaByIndustry['Technology'].avg;
    const healthcare = INDUSTRY_BENCHMARKS.sgaByIndustry['Healthcare'].avg;
    const manufacturing = INDUSTRY_BENCHMARKS.sgaByIndustry['Manufacturing'].avg;

    // Different industries should have different benchmarks
    expect(new Set([tech, healthcare, manufacturing]).size).toBeGreaterThan(1);
  });

  it("has automation potential data for common processes", () => {
    expect(INDUSTRY_BENCHMARKS.automationPotential['Invoice Processing']).toBeDefined();
    expect(INDUSTRY_BENCHMARKS.automationPotential['Customer Support']).toBeDefined();
    expect(INDUSTRY_BENCHMARKS.automationPotential['Data Entry']).toBeDefined();
  });
});

describe("classifyCompanySize", () => {
  it("classifies small companies correctly", () => {
    expect(classifyCompanySize(50)).toBe('small');
    expect(classifyCompanySize(99)).toBe('small');
  });

  it("classifies medium companies correctly", () => {
    expect(classifyCompanySize(100)).toBe('medium');
    expect(classifyCompanySize(500)).toBe('medium');
  });

  it("classifies large companies correctly", () => {
    expect(classifyCompanySize(1000)).toBe('large');
    expect(classifyCompanySize(5000)).toBe('large');
  });

  it("classifies enterprise companies correctly", () => {
    expect(classifyCompanySize(10000)).toBe('enterprise');
    expect(classifyCompanySize(50000)).toBe('enterprise');
  });
});

describe("calculateAutomationSavings", () => {
  it("calculates savings for known process types", () => {
    const result = calculateAutomationSavings(
      'Invoice Processing',
      100000, // $100K annual labor cost
      true    // apply risk factors
    );

    expect(result.laborSavings).toBeGreaterThan(0);
    expect(result.totalSavings).toBeGreaterThan(0);
    expect(result.conservativeEstimate).toBeGreaterThan(0);
  });

  it("returns conservative estimates for unknown process types", () => {
    const result = calculateAutomationSavings(
      'Unknown Process',
      100000,
      true
    );

    // Should still return valid results with default values
    expect(result.laborSavings).toBeGreaterThan(0);
    expect(result.conservativeEstimate).toBeGreaterThan(0);
  });

  it("applies risk factors when specified", () => {
    const withRisk = calculateAutomationSavings('Invoice Processing', 100000, true);
    const withoutRisk = calculateAutomationSavings('Invoice Processing', 100000, false);

    // Without risk factors should have higher savings
    expect(withoutRisk.totalSavings).toBeGreaterThan(withRisk.totalSavings);
  });
});

describe("calculate5YearROI", () => {
  it("calculates 5-year projection with proper ramp-up", () => {
    const result = calculate5YearROI(
      10000000, // $10M annual savings
      2000000,  // $2M implementation cost
      500000    // $500K annual maintenance
    );

    expect(result.year1).toBeLessThan(result.year2); // Ramp-up
    expect(result.year2).toBeLessThan(result.year3); // Continued growth
    expect(result.totalROI).toBeGreaterThan(0);
    expect(result.paybackMonths).toBeGreaterThan(0);
    expect(result.paybackMonths).toBeLessThanOrEqual(60); // Should pay back within 5 years
  });

  it("accounts for implementation cost in year 1", () => {
    const result = calculate5YearROI(
      5000000,  // $5M annual savings
      3000000,  // $3M implementation cost
      300000    // $300K annual maintenance
    );

    // Year 1 should be lower due to implementation costs and ramp-up
    expect(result.year1).toBeLessThan(result.year5);
  });

  it("produces identical results for identical inputs (deterministic)", () => {
    const result1 = calculate5YearROI(10000000, 2000000, 500000);
    const result2 = calculate5YearROI(10000000, 2000000, 500000);

    expect(result1.year1).toBe(result2.year1);
    expect(result1.year2).toBe(result2.year2);
    expect(result1.totalROI).toBe(result2.totalROI);
    expect(result1.paybackMonths).toBe(result2.paybackMonths);
  });
});

describe("calculateCompanyOpportunity", () => {
  it("calculates opportunity for a mid-size company", () => {
    const result = calculateCompanyOpportunity(
      500000000, // $500M revenue
      2000,      // 2000 employees
      'Technology'
    );

    expect(result.totalOpportunity).toBeGreaterThan(0);
    expect(result.conservativeTarget).toBeGreaterThan(0);
    expect(result.conservativeTarget).toBeLessThan(result.totalOpportunity);
    expect(result.processBreakdown.length).toBeGreaterThan(0);
  });

  it("returns different opportunities for different industries", () => {
    const techResult = calculateCompanyOpportunity(100000000, 500, 'Technology');
    const mfgResult = calculateCompanyOpportunity(100000000, 500, 'Manufacturing');

    // Different industries should have different opportunities
    expect(techResult.totalOpportunity).not.toBe(mfgResult.totalOpportunity);
  });

  it("scales opportunity with company size", () => {
    const smallResult = calculateCompanyOpportunity(50000000, 200, 'Technology');
    const largeResult = calculateCompanyOpportunity(500000000, 2000, 'Technology');

    expect(largeResult.totalOpportunity).toBeGreaterThan(smallResult.totalOpportunity);
  });
});

describe("formatCurrency", () => {
  it("formats millions correctly", () => {
    expect(formatCurrency(5000000)).toBe('$5.0M');
    expect(formatCurrency(12500000)).toBe('$12.5M');
  });

  it("formats thousands correctly", () => {
    expect(formatCurrency(500000)).toBe('$500K');
    expect(formatCurrency(75000)).toBe('$75K');
  });

  it("formats small amounts correctly", () => {
    expect(formatCurrency(5000)).toBe('$5K');
    expect(formatCurrency(500)).toBe('$500');
  });
});

describe("formatPercent", () => {
  it("formats percentages correctly", () => {
    expect(formatPercent(0.25)).toBe('25.0%');
    expect(formatPercent(0.125, 1)).toBe('12.5%');
    expect(formatPercent(0.333, 2)).toBe('33.30%');
  });
});
