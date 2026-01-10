/*
 * Step 3: The Workflow Autopsy & Resurrection
 * 
 * Split-screen comparison: Manual suffering vs AI agents.
 * Timeline scrubbing with cost accumulation.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  FileCheck,
  Shield,
  Eye
} from "lucide-react";
import type { FrictionPoint, WorkflowData } from "@/pages/Home";

interface Step3Props {
  frictionPoint: FrictionPoint | null;
  onUpdate: (data: WorkflowData) => void;
  onNext: () => void;
}

export default function Step3WorkflowAutopsy({ frictionPoint, onUpdate, onNext }: Step3Props) {
  const [timelinePosition, setTimelinePosition] = useState(50);
  const [manualCost, setManualCost] = useState(0);
  const [aiCost, setAiCost] = useState(0);

  const processName = frictionPoint?.name || "Procurement";
  
  // Workflow step costs
  const manualSteps = [
    { name: "Manual Data Entry", time: "12 min", laborCost: 4.80, errorRate: 8, reworkCost: 42, delay: 48, opportunityCost: 120 },
    { name: "Approval Routing", time: "24 min", laborCost: 9.60, errorRate: 5, reworkCost: 28, delay: 72, opportunityCost: 180 },
    { name: "Validation Check", time: "8 min", laborCost: 3.20, errorRate: 12, reworkCost: 56, delay: 24, opportunityCost: 60 },
    { name: "System Update", time: "6 min", laborCost: 2.40, errorRate: 3, reworkCost: 14, delay: 12, opportunityCost: 30 }
  ];

  const aiSteps = [
    { name: "AI Vision + RAG", time: "18 sec", tokenCost: 0.02, errorRate: 0.3, reworkCost: 0, delay: 2, opportunityCost: 5 },
    { name: "Smart Routing", time: "3 sec", tokenCost: 0.01, errorRate: 0.1, reworkCost: 0, delay: 0.5, opportunityCost: 1 },
    { name: "Auto-Validation", time: "5 sec", tokenCost: 0.015, errorRate: 0.2, reworkCost: 0, delay: 1, opportunityCost: 2 },
    { name: "Sync & Log", time: "2 sec", tokenCost: 0.005, errorRate: 0, reworkCost: 0, delay: 0.5, opportunityCost: 0.5 }
  ];

  const totalManualCost = manualSteps.reduce((sum, step) => 
    sum + step.laborCost + step.reworkCost + step.opportunityCost, 0
  );
  
  const totalAiCost = aiSteps.reduce((sum, step) => 
    sum + step.tokenCost + step.reworkCost + step.opportunityCost, 0
  );

  const savingsPercent = Math.round((1 - totalAiCost / totalManualCost) * 100);

  // Animate costs based on timeline
  useEffect(() => {
    const progress = timelinePosition / 100;
    setManualCost(totalManualCost * progress);
    setAiCost(totalAiCost * progress);
  }, [timelinePosition, totalManualCost, totalAiCost]);

  // Update parent with workflow data
  useEffect(() => {
    onUpdate({
      beforeCost: totalManualCost,
      afterCost: totalAiCost,
      savingsPercent,
      volumePerMonth: 5000,
      errorRate: 8,
      laborRate: 45
    });
  }, [totalManualCost, totalAiCost, savingsPercent, onUpdate]);

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/workflow-comparison.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Step 3: Workflow Analysis
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            The Workflow <span className="text-gradient-cyan">Autopsy</span> & Resurrection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scrub the timeline. Watch costs accumulate on the left, savings on the right.
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Before - Manual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-destructive/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)]">Before: Manual Process</h3>
                  <p className="text-sm text-muted-foreground">{processName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                  ${manualCost.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Cost accumulated</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {manualSteps.map((step, index) => {
                const stepProgress = (timelinePosition / 100) * manualSteps.length;
                const isActive = index < stepProgress;
                const isCurrent = index === Math.floor(stepProgress);

                return (
                  <motion.div
                    key={step.name}
                    className={`
                      p-4 rounded-lg transition-all duration-300
                      ${isActive ? 'bg-destructive/10 border border-destructive/30' : 'bg-muted/20 border border-transparent'}
                      ${isCurrent ? 'ring-2 ring-destructive/50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.name}
                      </span>
                      <span className="text-sm text-muted-foreground font-[family-name:var(--font-mono)]">
                        {step.time}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-2 gap-2 text-xs"
                      >
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Labor:</span>
                          <span className="text-destructive">${step.laborCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Error rate:</span>
                          <span className="text-destructive">{step.errorRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rework:</span>
                          <span className="text-destructive">${step.reworkCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delay:</span>
                          <span className="text-destructive">{step.delay}hr</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total per transaction:</span>
                <span className="text-xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                  ${totalManualCost.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* After - AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-primary/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)]">After: GenAI 2.0</h3>
                  <p className="text-sm text-muted-foreground">Multi-Agent Workflow</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">
                  ${aiCost.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Cost accumulated</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {aiSteps.map((step, index) => {
                const stepProgress = (timelinePosition / 100) * aiSteps.length;
                const isActive = index < stepProgress;
                const isCurrent = index === Math.floor(stepProgress);

                return (
                  <motion.div
                    key={step.name}
                    className={`
                      p-4 rounded-lg transition-all duration-300
                      ${isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted/20 border border-transparent'}
                      ${isCurrent ? 'ring-2 ring-primary/50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.name}
                      </span>
                      <span className="text-sm text-primary font-[family-name:var(--font-mono)]">
                        {step.time}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-2 gap-2 text-xs"
                      >
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Token cost:</span>
                          <span className="text-primary">${step.tokenCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Error rate:</span>
                          <span className="text-primary">{step.errorRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rework:</span>
                          <span className="text-primary">${step.reworkCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delay:</span>
                          <span className="text-primary">{step.delay}hr</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total per transaction:</span>
                <span className="text-xl font-bold text-primary font-[family-name:var(--font-mono)]">
                  ${totalAiCost.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Scrubber */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Scrub Timeline</span>
            <span className="text-sm font-[family-name:var(--font-mono)] text-primary">
              {timelinePosition}% Complete
            </span>
          </div>
          <Slider
            value={[timelinePosition]}
            onValueChange={(value) => setTimelinePosition(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </motion.div>

        {/* Cost Destruction Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8 text-center border border-primary/30 glow-cyan"
        >
          <p className="text-sm text-muted-foreground mb-2">Cost Destruction</p>
          <p className="text-5xl sm:text-6xl font-bold text-gradient-cyan font-[family-name:var(--font-display)]">
            {savingsPercent}%
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            ${totalManualCost.toFixed(2)} → ${totalAiCost.toFixed(2)} per transaction
          </p>
        </motion.div>

        {/* Hallucination Insurance Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* 1.0 */}
          <div className="glass-card rounded-xl p-6 border-destructive/20 opacity-60">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="font-medium">GenAI 1.0: "Hope it's right"</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-destructive">✗</span>
                No confidence scoring
              </li>
              <li className="flex items-center gap-2">
                <span className="text-destructive">✗</span>
                No source attribution
              </li>
              <li className="flex items-center gap-2">
                <span className="text-destructive">✗</span>
                Manual audit required
              </li>
            </ul>
          </div>

          {/* 2.0 */}
          <div className="glass-card rounded-xl p-6 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">GenAI 2.0: Hallucination Insurance</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Real-time confidence score: <span className="text-primary font-mono">98.7%</span></span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" />
                <span>Source attribution with document links</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>Human-in-loop override with audit hash</span>
              </li>
            </ul>
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
            Calculate 5-year savings for this workflow
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
