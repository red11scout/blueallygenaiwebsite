import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { researchCompany, quickCompanyLookup } from "./companyResearch";
import { 
  calculateAutomationSavings, 
  calculateAnnualLaborCost,
  calculate5YearROI,
  calculateCompanyOpportunity,
  INDUSTRY_BENCHMARKS,
  formatCurrency,
  formatPercent
} from "./calculationEngine";

export const appRouter = router({
  // System routes
  system: systemRouter,
  
  // Auth routes
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Company Research API
  company: router({
    // Quick lookup for domain validation
    quickLookup: publicProcedure
      .input(z.object({ domain: z.string().min(1) }))
      .query(async ({ input }) => {
        return await quickCompanyLookup(input.domain);
      }),
    
    // Full company research
    research: publicProcedure
      .input(z.object({ domain: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const result = await researchCompany(input.domain);
        return result;
      }),
  }),

  // Calculation Engine API
  calculator: router({
    // Calculate automation savings for a specific process
    processSavings: publicProcedure
      .input(z.object({
        processType: z.string(),
        hoursPerWeek: z.number().min(0),
        employeesInvolved: z.number().min(1),
        hourlyRate: z.number().min(0).optional(),
      }))
      .query(({ input }) => {
        const annualLaborCost = calculateAnnualLaborCost(
          input.hoursPerWeek,
          input.employeesInvolved,
          input.hourlyRate
        );
        
        const savings = calculateAutomationSavings(input.processType, annualLaborCost);
        
        return {
          annualLaborCost,
          ...savings,
          formatted: {
            annualLaborCost: formatCurrency(annualLaborCost),
            laborSavings: formatCurrency(savings.laborSavings),
            totalSavings: formatCurrency(savings.totalSavings),
            conservativeEstimate: formatCurrency(savings.conservativeEstimate),
          }
        };
      }),
    
    // Calculate 5-year ROI projection
    fiveYearROI: publicProcedure
      .input(z.object({
        annualSavings: z.number().min(0),
        implementationCost: z.number().min(0).optional(),
      }))
      .query(({ input }) => {
        // Default implementation cost is 15% of annual savings
        const implCost = input.implementationCost || (input.annualSavings * 0.15);
        const maintenanceCost = implCost * 0.10;
        
        const projection = calculate5YearROI(input.annualSavings, implCost, maintenanceCost);
        
        return {
          ...projection,
          implementationCost: Math.round(implCost),
          maintenanceCostAnnual: Math.round(maintenanceCost),
          formatted: {
            year1: formatCurrency(projection.year1),
            year2: formatCurrency(projection.year2),
            year3: formatCurrency(projection.year3),
            year4: formatCurrency(projection.year4),
            year5: formatCurrency(projection.year5),
            totalROI: formatCurrency(projection.totalROI),
            implementationCost: formatCurrency(implCost),
          }
        };
      }),
    
    // Calculate company-wide opportunity
    companyOpportunity: publicProcedure
      .input(z.object({
        revenue: z.number().min(0),
        employees: z.number().min(1),
        industry: z.string(),
        sgaPercent: z.number().min(0).max(1).optional(),
      }))
      .query(({ input }) => {
        const opportunity = calculateCompanyOpportunity(
          input.revenue,
          input.employees,
          input.industry,
          input.sgaPercent
        );
        
        return {
          ...opportunity,
          formatted: {
            currentSGA: formatCurrency(opportunity.currentSGA),
            industryBenchmark: formatCurrency(opportunity.industryBenchmark),
            sgaGap: formatCurrency(opportunity.sgaGap),
            totalOpportunity: formatCurrency(opportunity.totalOpportunity),
            conservativeTarget: formatCurrency(opportunity.conservativeTarget),
          }
        };
      }),
    
    // Get industry benchmarks
    benchmarks: publicProcedure
      .input(z.object({ industry: z.string().optional() }))
      .query(({ input }) => {
        if (input.industry) {
          const benchmarks = INDUSTRY_BENCHMARKS.sgaByIndustry[
            input.industry as keyof typeof INDUSTRY_BENCHMARKS.sgaByIndustry
          ] || INDUSTRY_BENCHMARKS.sgaByIndustry.Default;
          
          return {
            industry: input.industry,
            sgaBenchmarks: {
              average: formatPercent(benchmarks.avg),
              efficient: formatPercent(benchmarks.efficient),
              inefficient: formatPercent(benchmarks.inefficient),
            },
            automationPotential: INDUSTRY_BENCHMARKS.automationPotential,
          };
        }
        
        return {
          industries: Object.keys(INDUSTRY_BENCHMARKS.sgaByIndustry),
          automationPotential: INDUSTRY_BENCHMARKS.automationPotential,
          costAssumptions: INDUSTRY_BENCHMARKS.costAssumptions,
          riskFactors: INDUSTRY_BENCHMARKS.riskFactors,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
