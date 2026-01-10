/*
 * Step 4: The KPI Forge
 * 
 * Live financial model with three sliders.
 * Single number output that ticks up as user adjusts.
 */

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Flame,
  Target
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
  const [email, setEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const beforeCost = workflowData?.beforeCost || 166.80;
  const afterCost = workflowData?.afterCost || 5.02;
  const savingsPerUnit = beforeCost - afterCost;

  // Calculate 5-year savings
  const fiveYearSavings = useMemo(() => {
    const monthlySavings = volume * savingsPerUnit;
    const annualSavings = monthlySavings * 12;
    const fiveYear = annualSavings * 5;
    // Add error rate impact
    const errorImpact = (errorRate / 100) * volume * 50 * 12 * 5; // $50 per error
    // Add labor rate impact
    const laborImpact = (laborRate / 45) * fiveYear * 0.1;
    return Math.round((fiveYear + errorImpact + laborImpact) / 1000000 * 10) / 10;
  }, [volume, errorRate, laborRate, savingsPerUnit]);

  // Show email capture when savings hit $10M
  useEffect(() => {
    if (fiveYearSavings >= 10 && !showEmailCapture) {
      setShowEmailCapture(true);
    }
  }, [fiveYearSavings, showEmailCapture]);

  // Token cost comparison data
  const openAICosts = [1240, 4800, 12400, 28000, 47000];
  const blueAllyCost = 380;

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 spotlight" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 4: Financial Modeling
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-foreground">
            The <span className="text-gradient-cyan">KPI Forge</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Adjust the sliders. Watch your 5-year savings materialize in real-time.
          </p>
        </motion.div>

        {/* Main Savings Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 mb-12 text-center border border-primary/30 glow-cyan"
        >
          <p className="text-sm text-muted-foreground mb-2">5-Year Projected Savings</p>
          <motion.div
            key={fiveYearSavings}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gradient-cyan font-[family-name:var(--font-display)] ticker"
          >
            ${fiveYearSavings}M
          </motion.div>
          <p className="text-muted-foreground mt-4">
            Based on {volume.toLocaleString()} transactions/month at ${laborRate}/hr
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
                <span className="font-medium">Volume/Month</span>
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

        {/* GenAI 2.0 Advantage - Dual Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-6">
            Savings Trajectory: 1.0 vs 2.0
          </h3>
          
          {/* Simple Chart Visualization */}
          <div className="relative h-48 bg-muted/20 rounded-lg p-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
              <span>${fiveYearSavings}M</span>
              <span>${(fiveYearSavings * 0.5).toFixed(1)}M</span>
              <span>$0</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-12 h-full relative">
              {/* 1.0 Line - Gray, plateaus */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path
                  d={`M 0 ${100} Q 30 60, 50 50 T 100 50`}
                  fill="none"
                  stroke="oklch(0.5 0.02 260)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="ecg-line"
                  style={{ transform: "scaleY(-1) translateY(-100%)" }}
                />
              </svg>
              
              {/* 2.0 Line - Cyan, accelerates */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path
                  d={`M 0 ${100} Q 20 70, 40 40 T 100 10`}
                  fill="none"
                  stroke="oklch(0.75 0.18 195)"
                  strokeWidth="3"
                  className="ecg-line"
                  style={{ transform: "scaleY(-1) translateY(-100%)" }}
                />
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>Month 0</span>
                <span>Month 6</span>
                <span>Month 12</span>
              </div>

              {/* Legend */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-muted-foreground" style={{ borderStyle: "dashed" }} />
                  <span className="text-muted-foreground">1.0: Plateaus at Month 9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-primary" />
                  <span className="text-primary">2.0: Accelerates at Month 6</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Token Cost Comparison */}
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
              <span className="font-medium">OpenAI at Scale (Cost Death Spiral)</span>
            </div>
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
              <span className="font-medium text-primary">BlueAlly On-Prem (Fixed Cost)</span>
            </div>
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
                <span>HPE hardware fully depreciated by Month 18</span>
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
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">
            Industry Benchmark: Hours per 100 Invoices
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Top Quartile</p>
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">35 hrs</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-sm text-muted-foreground mb-1">You're At</p>
              <p className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]">120 hrs</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Workshop Graduates</p>
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">22 hrs</p>
            </div>
          </div>
        </motion.div>

        {/* Email Capture */}
        {showEmailCapture && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6 mb-12 border border-primary/30"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold font-[family-name:var(--font-display)]">
                  Save these numbers
                </h3>
                <p className="text-sm text-muted-foreground">
                  We'll send you the 47-page board deck with your exact ROI model.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/30"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Save
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg group"
          >
            See the 5-year P&L waterfall for your top 3
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
