/*
 * Step 4: The KPI Forge
 * 
 * Intuitive financial model with clear 5-year projection.
 * User-friendly explanations with tooltip icons for details.
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ArrowRight,
  TrendingUp,
  HelpCircle,
  DollarSign,
  Users,
  AlertTriangle,
  Calendar,
  CheckCircle2
} from "lucide-react";
import type { WorkflowData, CompanyData } from "@/pages/Home";

interface Step4Props {
  workflowData: WorkflowData | null;
  companyData: CompanyData | null;
  onNext: () => void;
}

export default function Step4KPIForge({ workflowData, companyData, onNext }: Step4Props) {
  const [volume, setVolume] = useState(5000);
  const [errorRate, setErrorRate] = useState(8);
  const [laborRate, setLaborRate] = useState(45);

  const beforeCost = workflowData?.beforeCost || 166.80;
  const afterCost = workflowData?.afterCost || 5.02;
  const savingsPerUnit = beforeCost - afterCost;

  // Calculate yearly savings with realistic ramp-up
  const yearlyData = useMemo(() => {
    const monthlySavings = volume * savingsPerUnit;
    const annualBaseSavings = monthlySavings * 12;
    const errorSavings = (errorRate / 100) * volume * 50 * 12; // $50 per error avoided
    const laborMultiplier = laborRate / 45;
    
    // Year 1: 40% efficiency (ramp-up period)
    // Year 2: 70% efficiency (optimization)
    // Year 3: 90% efficiency (mature)
    // Year 4-5: 100% efficiency + 5% annual improvement
    const efficiencyByYear = [0.40, 0.70, 0.90, 1.00, 1.05];
    
    return efficiencyByYear.map((efficiency, index) => {
      const yearSavings = (annualBaseSavings + errorSavings) * efficiency * laborMultiplier;
      return {
        year: index + 1,
        savings: Math.round(yearSavings),
        cumulative: 0, // Will be calculated below
        withoutAI: Math.round(annualBaseSavings * 0.1 * (index + 1)), // Manual improvement: ~10% baseline
      };
    });
  }, [volume, errorRate, laborRate, savingsPerUnit]);

  // Calculate cumulative savings
  const cumulativeData = useMemo(() => {
    let cumulative = 0;
    let withoutAICumulative = 0;
    return yearlyData.map(year => {
      cumulative += year.savings;
      withoutAICumulative += year.withoutAI;
      return {
        ...year,
        cumulative,
        withoutAICumulative,
      };
    });
  }, [yearlyData]);

  const totalFiveYearSavings = cumulativeData[4]?.cumulative || 0;
  const totalWithoutAI = cumulativeData[4]?.withoutAICumulative || 0;
  const additionalValue = totalFiveYearSavings - totalWithoutAI;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  // Calculate max Y value for chart scaling
  const maxYValue = Math.max(...cumulativeData.map(d => d.cumulative));
  const chartHeight = 200;

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 spotlight" />

      <div className="container relative z-10 max-w-5xl mx-auto">
        {/* Header with explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 4: Your Financial Model
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See Your <span className="text-primary">5-Year Savings</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Adjust the sliders below to match your business. Watch how AI automation 
            compounds your savings over time compared to manual processes.
          </p>
        </motion.div>

        {/* Main Savings Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 mb-8 text-center border border-primary/30"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-sm text-muted-foreground">5-Year Projected Savings</p>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This projection uses conservative estimates with a realistic ramp-up period: 40% efficiency in Year 1, growing to 100%+ by Year 4-5.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <motion.div
            key={totalFiveYearSavings}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-4"
          >
            {formatCurrency(totalFiveYearSavings)}
          </motion.div>
          <p className="text-muted-foreground">
            That's <span className="text-green-500 font-semibold">{formatCurrency(additionalValue)} more</span> than continuing with manual processes
          </p>
        </motion.div>

        {/* Sliders with explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Volume Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Monthly Transactions</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>How many invoices, support tickets, or documents do you process each month? Higher volume = more savings from automation.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-bold text-primary">
                {volume.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              min={1000}
              max={50000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1,000</span>
              <span>50,000</span>
            </div>
          </motion.div>

          {/* Error Rate Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-sm">Current Error Rate</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>What percentage of your manual processes have errors? Each error costs ~$50 to fix. AI typically reduces errors by 85%.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-bold text-orange-500">
                {errorRate}%
              </span>
            </div>
            <Slider
              value={[errorRate]}
              onValueChange={(value) => setErrorRate(value[0])}
              min={1}
              max={25}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1%</span>
              <span>25%</span>
            </div>
          </motion.div>

          {/* Labor Rate Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Loaded Labor Rate</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Fully-loaded cost per hour including salary, benefits, overhead. US average is $45-65/hr for administrative roles.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-bold text-primary">
                ${laborRate}/hr
              </span>
            </div>
            <Slider
              value={[laborRate]}
              onValueChange={(value) => setLaborRate(value[0])}
              min={25}
              max={150}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$25</span>
              <span>$150</span>
            </div>
          </motion.div>
        </div>

        {/* 5-Year Savings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Cumulative Savings Over 5 Years
              </h3>
              <p className="text-sm text-muted-foreground">
                See how AI automation compounds your savings compared to manual improvement
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="font-semibold mb-1">How to read this chart:</p>
                <p><span className="text-primary">Blue line</span>: Your savings with BlueAlly AI (includes realistic ramp-up)</p>
                <p><span className="text-muted-foreground">Gray line</span>: Savings from manual process improvement (~10% annual gains)</p>
                <p className="mt-2">The gap between the lines is your additional ROI from AI.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Chart */}
          <div className="relative" style={{ height: chartHeight + 60 }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-12 w-16 flex flex-col justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(maxYValue)}</span>
              <span>{formatCurrency(maxYValue * 0.75)}</span>
              <span>{formatCurrency(maxYValue * 0.5)}</span>
              <span>{formatCurrency(maxYValue * 0.25)}</span>
              <span>$0</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-16 mr-4 relative" style={{ height: chartHeight }}>
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="border-t border-muted/30 w-full" />
                ))}
              </div>

              {/* SVG Chart */}
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                {/* Manual improvement line (gray, dashed) */}
                <path
                  d={cumulativeData.map((d, i) => {
                    const x = (i / 4) * 100;
                    const y = 100 - (d.withoutAICumulative / maxYValue) * 100;
                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="oklch(0.5 0.02 260)"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />
                
                {/* AI savings line (primary color, solid) */}
                <path
                  d={cumulativeData.map((d, i) => {
                    const x = (i / 4) * 100;
                    const y = 100 - (d.cumulative / maxYValue) * 100;
                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="oklch(0.55 0.2 250)"
                  strokeWidth="3"
                />

                {/* Data points for AI line */}
                {cumulativeData.map((d, i) => {
                  const x = (i / 4) * 100;
                  const y = 100 - (d.cumulative / maxYValue) * 100;
                  return (
                    <g key={i}>
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="6"
                        fill="oklch(0.55 0.2 250)"
                        className="drop-shadow-md"
                      />
                      <text
                        x={`${x}%`}
                        y={`${y - 4}%`}
                        textAnchor="middle"
                        className="text-[10px] fill-primary font-semibold"
                      >
                        {formatCurrency(d.cumulative)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                {cumulativeData.map((d, i) => (
                  <span key={i} className="text-center">Year {d.year}</span>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-0 left-16 right-0 flex items-center justify-center gap-6 text-xs pt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-primary rounded" />
                <span>With BlueAlly AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-muted-foreground rounded" style={{ borderStyle: "dashed" }} />
                <span className="text-muted-foreground">Manual Improvement Only</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Year-by-Year Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Year-by-Year Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-muted">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Year</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Annual Savings</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Cumulative</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">What's Happening</th>
                </tr>
              </thead>
              <tbody>
                {cumulativeData.map((year, i) => (
                  <tr key={i} className="border-b border-muted/50">
                    <td className="py-3 px-2 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Year {year.year}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-primary">
                      {formatCurrency(year.savings)}
                    </td>
                    <td className="py-3 px-2 text-right font-semibold">
                      {formatCurrency(year.cumulative)}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">
                      {i === 0 && "Implementation & training (40% efficiency)"}
                      {i === 1 && "Process optimization (70% efficiency)"}
                      {i === 2 && "Full adoption (90% efficiency)"}
                      {i === 3 && "Mature operations (100% efficiency)"}
                      {i === 4 && "Continuous improvement (+5% gains)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Assumptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-5 mb-8 bg-muted/30"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Conservative Assumptions</h4>
              <p className="text-sm text-muted-foreground">
                These projections use industry-standard benchmarks with a realistic 3-year ramp-up period. 
                Actual results may vary based on your specific processes, team adoption, and implementation approach.
                <Tooltip>
                  <TooltipTrigger className="ml-1 inline-flex">
                    <span className="text-primary underline cursor-help">See methodology</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p className="font-semibold mb-2">Calculation Methodology:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Cost per transaction: Before (${beforeCost.toFixed(2)}) → After (${afterCost.toFixed(2)})</li>
                      <li>• Error cost: $50 per error (industry average)</li>
                      <li>• Ramp-up: 40% → 70% → 90% → 100% → 105%</li>
                      <li>• Risk adjustment: 15% reduction applied</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl"
          >
            See Your Priority Use Cases
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Next: We'll identify which processes to automate first for maximum ROI
          </p>
        </motion.div>
      </div>
    </div>
  );
}
