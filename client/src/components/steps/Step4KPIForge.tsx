/*
 * CHAPTER 4: The Algebra
 * 
 * Galloway: "Let me show you the math that your CFO will love"
 * Gladwell: The compounding effect - small changes, massive outcomes
 */

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Flame,
  Target,
  ArrowDown,
  Calculator
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

  // Calculate annual savings
  const annualSavings = useMemo(() => {
    const monthlySavings = volume * savingsPerUnit;
    const annual = monthlySavings * 12;
    const errorImpact = (errorRate / 100) * volume * 50 * 12;
    const laborImpact = (laborRate / 45) * annual * 0.1;
    return Math.round((annual + errorImpact + laborImpact) / 1000000 * 10) / 10;
  }, [volume, errorRate, laborRate, savingsPerUnit]);

  // Token cost comparison data
  const openAICosts = [1240, 4800, 12400, 28000, 47000];
  const blueAllyCost = 380;

  return (
    <div className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0 spotlight" />

      <div className="container relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Chapter 4
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-6 text-foreground">
            The <span className="text-gradient-cyan">Algebra</span>
          </h2>
          
          {/* Gladwell Hook */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground italic">
              "Malcolm Gladwell wrote about the 10,000 hour rule. Here's the enterprise version: 
              5,000 transactions a month, 12 months a year, compounding savings. 
              Let me show you what that looks like."
            </p>
          </div>
        </motion.div>

        {/* The Formula - Galloway Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-12 border border-primary/30"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">The Formula</h3>
          </div>

          <div className="bg-muted/20 rounded-xl p-6 mb-6 font-[family-name:var(--font-mono)] text-center">
            <p className="text-sm text-muted-foreground mb-2">Annual Impact =</p>
            <p className="text-lg sm:text-xl text-foreground">
              (<span className="text-destructive">${beforeCost.toFixed(2)}</span> - <span className="text-primary">${afterCost.toFixed(2)}</span>) 
              × <span className="text-foreground">{volume.toLocaleString()}</span> 
              × <span className="text-foreground">12</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">+ error reduction + labor arbitrage</p>
          </div>

          <p className="text-sm text-muted-foreground italic text-center">
            "This isn't a projection. It's arithmetic. The only variable is whether you do it or your competitor does."
          </p>
        </motion.div>

        {/* Main Savings Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 mb-12 text-center border border-primary/30 glow-cyan"
        >
          <p className="text-sm text-muted-foreground mb-2">Annual Projected Savings</p>
          <motion.div
            key={annualSavings}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary font-[family-name:var(--font-mono)]"
          >
            ${annualSavings}M
          </motion.div>
          <p className="text-muted-foreground mt-4">
            Based on {volume.toLocaleString()} transactions/month at ${laborRate}/hr
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            "Drag the sliders. Watch the number change. This is your money."
          </p>
        </motion.div>

        {/* Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Volume Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-medium">Monthly Volume</span>
              </div>
              <span className="text-xl font-bold text-primary font-[family-name:var(--font-mono)]">
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
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <span className="font-medium">Current Error Rate</span>
              </div>
              <span className="text-xl font-bold text-destructive font-[family-name:var(--font-mono)]">
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
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-medium">Loaded Labor Rate</span>
              </div>
              <span className="text-xl font-bold text-primary font-[family-name:var(--font-mono)]">
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

        {/* Savings Trajectory Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4 text-foreground">
            Savings Trajectory: 1.0 vs 2.0
          </h3>
          
          <p className="text-sm text-muted-foreground mb-6 italic">
            "GenAI 1.0 plateaus at 15% savings because it can't scale. 
            2.0 accelerates because agents learn and compound."
          </p>

          {/* Chart */}
          <div className="relative h-64 bg-muted/10 rounded-lg p-4">
            <div className="absolute left-0 top-4 bottom-8 w-16 flex flex-col justify-between text-xs text-muted-foreground pr-2 text-right">
              <span>${annualSavings}M</span>
              <span>${(annualSavings * 0.5).toFixed(1)}M</span>
              <span>$0</span>
            </div>
            
            <div className="ml-16 mr-4 h-full pb-8 pt-4 relative overflow-visible">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-border/30" />
                <div className="border-b border-border/30" />
                <div className="border-b border-border/30" />
              </div>
              
              <svg 
                className="absolute inset-0 overflow-visible" 
                style={{ width: '100%', height: '100%' }}
                viewBox="0 0 1000 200" 
                preserveAspectRatio="none"
              >
                {/* 1.0 Line - Gray, plateaus */}
                <path
                  d="M 0 180 Q 150 140, 300 100 Q 450 80, 600 80 L 1000 80"
                  fill="none"
                  stroke="oklch(0.5 0.02 260)"
                  strokeWidth="3"
                  strokeDasharray="10,10"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* 2.0 Line - Cyan, accelerates */}
                <path
                  d="M 0 180 Q 200 130, 400 80 Q 600 40, 800 20 L 1000 10"
                  fill="none"
                  stroke="oklch(0.75 0.18 195)"
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>Month 0</span>
                <span>Month 6</span>
                <span>Month 12</span>
              </div>

              <div className="absolute top-0 right-0 flex flex-col gap-2 text-xs bg-card/80 p-2 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5" style={{ borderTop: "2px dashed oklch(0.5 0.02 260)" }} />
                  <span className="text-muted-foreground">1.0: Plateaus at 15%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-primary" />
                  <span className="text-primary">2.0: Accelerates to 97%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Token Cost Comparison - Galloway Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          {/* OpenAI at Scale */}
          <div className="glass-card rounded-xl p-6 border-destructive/20">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-destructive" />
              <span className="font-medium">OpenAI at Scale</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 italic">
              "The cost death spiral nobody warns you about"
            </p>
            <div className="space-y-2">
              {["Month 1", "Month 3", "Month 6", "Month 9", "Month 12"].map((month, i) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{month}</span>
                  <span className="text-destructive font-[family-name:var(--font-mono)]">
                    ${openAICosts[i].toLocaleString()}/mo
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm text-destructive">
                <TrendingUp className="w-4 h-4" />
                <span>3,700% cost increase at scale</span>
              </div>
            </div>
          </div>

          {/* BlueAlly On-Prem */}
          <div className="glass-card rounded-xl p-6 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">BlueAlly On-Prem</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 italic">
              "Fixed cost. Your infrastructure. Your data."
            </p>
            <div className="space-y-2">
              {["Month 1", "Month 3", "Month 6", "Month 9", "Month 12"].map((month) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{month}</span>
                  <span className="text-primary font-[family-name:var(--font-mono)]">
                    ${blueAllyCost}/mo
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm text-primary">
                <TrendingDown className="w-4 h-4" />
                <span>Fully depreciated by Month 18</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industry Benchmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2">
            Where Do You Stand?
          </h3>
          <p className="text-sm text-muted-foreground mb-4 italic">
            "Hours per 100 invoices. Industry benchmark."
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Top Quartile</p>
              <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-mono)]">35 hrs</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-sm text-muted-foreground mb-1">You (Probably)</p>
              <p className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]">120 hrs</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">BlueAlly Clients</p>
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">22 hrs</p>
            </div>
          </div>
        </motion.div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            You've seen the math. Now let's prioritize which use cases to attack first 
            based on impact and implementation speed.
          </p>
          
          <motion.button
            onClick={onNext}
            className="group flex items-center gap-2 mx-auto text-primary hover:text-primary/80 transition-colors"
            whileHover={{ y: 2 }}
          >
            <span className="text-sm font-medium">Chapter 5: The Oracle</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
