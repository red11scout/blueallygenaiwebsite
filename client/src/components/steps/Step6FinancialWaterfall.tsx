/*
 * Step 6: The Financial Waterfall & On-Prem Killer App
 * 
 * Cash flow river visualization.
 * Hardware cost estimator and Build vs Buy comparison.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowRight,
  Cloud,
  Server,
  TrendingUp,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Zap
} from "lucide-react";
import type { WorkflowData, UseCase } from "@/pages/Home";

interface Step6Props {
  workflowData: WorkflowData | null;
  useCases: UseCase[];
  onNext: () => void;
}

export default function Step6FinancialWaterfall({ workflowData, useCases, onNext }: Step6Props) {
  const [isOnPrem, setIsOnPrem] = useState(true);

  const baseSavings = 18.7;
  const yearlyData = [
    { year: 0, cloud: -0.5, onPrem: -0.287 },
    { year: 1, cloud: 2.8, onPrem: 3.2 },
    { year: 2, cloud: 5.2, onPrem: 7.8 },
    { year: 3, cloud: 7.1, onPrem: 12.4 },
    { year: 4, cloud: 8.4, onPrem: 16.2 },
    { year: 5, cloud: 9.2, onPrem: 18.7 },
  ];

  const cloudCost = 1200000;
  const onPremCapex = 287000;
  const onPremOpex = 42000;

  const buildVsBuyData = [
    { metric: "Time to Pilot", build: "11 months", blueally: "6 weeks", delta: "You miss 2 earnings cycles" },
    { metric: "Team Required", build: "8 FTEs ($1.8M/yr)", blueally: "2 FTEs ($475K/yr)", delta: "$1.3M savings fund acquisitions" },
    { metric: "Fail Rate", build: "67% (McKinsey)", blueally: "11%", delta: "$3.2M avoidance" },
    { metric: "Year 1 ROI", build: "-240%", blueally: "+340%", delta: "Board presentation writes itself" },
  ];

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/financial-waterfall.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 6: Financial Projection
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-foreground">
            The <span className="text-gradient-cyan">Financial Waterfall</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch your cash flow transform from a dry riverbed to a flood of savings.
          </p>
        </motion.div>

        {/* Cloud vs On-Prem Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className={`flex items-center gap-2 ${!isOnPrem ? 'text-primary' : 'text-muted-foreground'}`}>
            <Cloud className="w-5 h-5" />
            <span>Cloud</span>
          </div>
          <Switch
            checked={isOnPrem}
            onCheckedChange={setIsOnPrem}
          />
          <div className={`flex items-center gap-2 ${isOnPrem ? 'text-primary' : 'text-muted-foreground'}`}>
            <Server className="w-5 h-5" />
            <span>On-Prem</span>
          </div>
        </motion.div>

        {/* Cash Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-6">
            5-Year Cash Flow Projection
          </h3>

          {/* Waterfall Chart */}
          <div className="relative h-64 bg-muted/10 rounded-xl p-4">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-muted-foreground text-right pr-2">
              <span>$20M</span>
              <span>$10M</span>
              <span>$0</span>
              <span>-$5M</span>
            </div>

            {/* Chart Area */}
            <div className="ml-16 h-full flex items-end justify-between gap-2 pb-8">
              {yearlyData.map((data, index) => {
                const value = isOnPrem ? data.onPrem : data.cloud;
                const maxValue = 20;
                const minValue = -5;
                const range = maxValue - minValue;
                const height = ((value - minValue) / range) * 100;
                const isNegative = value < 0;

                return (
                  <motion.div
                    key={data.year}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div 
                      className={`
                        w-full rounded-t-lg transition-all duration-500
                        ${isNegative 
                          ? 'bg-destructive/50' 
                          : isOnPrem 
                            ? 'bg-primary glow-cyan' 
                            : 'bg-muted-foreground'
                        }
                      `}
                      style={{ height: `${Math.abs(height)}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">
                      Year {data.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Zero Line */}
            <div 
              className="absolute left-16 right-4 h-px bg-border"
              style={{ bottom: `${(0 - (-5)) / 25 * 100}%` }}
            />

            {/* Dam Indicator for On-Prem */}
            {isOnPrem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-20 bottom-1/3 bg-primary/20 border border-primary/50 rounded px-2 py-1 text-xs text-primary"
              >
                Capex Dam: $287K
              </motion.div>
            )}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">5-Year Total ({isOnPrem ? 'On-Prem' : 'Cloud'})</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)]">
                ${isOnPrem ? '18.7' : '9.2'}M
              </p>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">On-Prem Advantage</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)]">
                +{isOnPrem ? '103' : '0'}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hardware Cost Estimator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-6">
            Hardware Cost Estimator (HPE/Nvidia)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground"># of Use Cases</span>
                <span className="font-semibold font-[family-name:var(--font-mono)]">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Concurrent Users</span>
                <span className="font-semibold font-[family-name:var(--font-mono)]">250</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Model Size</span>
                <span className="font-semibold font-[family-name:var(--font-mono)]">70B params</span>
              </div>
            </div>

            {/* Output */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
              <p className="text-sm text-primary mb-2">Recommended Configuration</p>
              <p className="font-semibold mb-4">HPE ProLiant DL380A Gen11 + 4x Nvidia H100</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capex (depreciated)</span>
                  <span className="font-[family-name:var(--font-mono)]">${(onPremCapex / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Opex</span>
                  <span className="font-[family-name:var(--font-mono)]">${(onPremOpex / 1000).toFixed(0)}K/year</span>
                </div>
                <div className="pt-3 border-t border-border/30 flex justify-between">
                  <span className="text-destructive">vs. OpenAI at Scale</span>
                  <span className="text-destructive font-[family-name:var(--font-mono)]">${(cloudCost / 1000).toFixed(0)}K/year</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Build vs Buy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-6">
            The "Build vs. Buy" Thermonuclear Bomb
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Metric</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Build (1.0)</th>
                  <th className="text-left py-3 px-4 text-primary font-medium">BlueAlly (2.0)</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Delta</th>
                </tr>
              </thead>
              <tbody>
                {buildVsBuyData.map((row, index) => (
                  <motion.tr
                    key={row.metric}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border/30"
                  >
                    <td className="py-4 px-4 font-medium">{row.metric}</td>
                    <td className="py-4 px-4 text-destructive">{row.build}</td>
                    <td className="py-4 px-4 text-primary font-semibold">{row.blueally}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{row.delta}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Horizon Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-12 text-center border border-primary/30 glow-cyan"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold font-[family-name:var(--font-display)]">
              The Horizon Fund
            </h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Initial Savings</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)]">$18.7M</p>
            </div>
            <ArrowRight className="w-6 h-6 text-primary hidden sm:block" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Reinvested into</p>
              <p className="text-3xl font-bold text-foreground font-[family-name:var(--font-mono)]">3 more use cases</p>
            </div>
            <ArrowRight className="w-6 h-6 text-primary hidden sm:block" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Compounding to</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)]">$47M</p>
              <p className="text-xs text-muted-foreground">by Year 3</p>
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
            size="lg"
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-8 py-6 text-lg group"
          >
            See the workflow surgery that unlocks this
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
