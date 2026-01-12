/*
 * CHAPTER 3: The Autopsy
 * 
 * Galloway: Side-by-side cost comparison that makes you wince
 * Gladwell: The story of one transaction - from chaos to clarity
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Shield,
  ArrowDown,
  User,
  Bot
} from "lucide-react";
import type { FrictionPoint, WorkflowData } from "@/pages/Home";

interface Step3Props {
  frictionPoint: FrictionPoint | null;
  onUpdate: (data: WorkflowData) => void;
  onNext: () => void;
}

export default function Step3WorkflowAutopsy({ frictionPoint, onUpdate, onNext }: Step3Props) {
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [manualCost, setManualCost] = useState(0);
  const [aiCost, setAiCost] = useState(0);

  const processName = frictionPoint?.name || "Procurement";
  
  const manualSteps = [
    { name: "Data Entry", time: "12 min", laborCost: 4.80, errorRate: 8, reworkCost: 42, delay: 48, opportunityCost: 120 },
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

  // Auto-animate timeline on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimelinePosition(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/workflow-comparison.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Chapter 3
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-6 text-foreground">
            The <span className="text-gradient-cyan">Autopsy</span>
          </h2>
          
          {/* Gladwell Hook */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground italic">
              "Let me tell you the story of a single {processName.toLowerCase()} transaction. 
              On the left, how you do it today. On the right, how your competitor does it. 
              Same transaction. Different century."
            </p>
          </div>
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
                  <User className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)]">Manual Process</h3>
                  <p className="text-xs text-muted-foreground">"The way we've always done it"</p>
                </div>
              </div>
              <div className="text-right">
                <motion.p 
                  className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]"
                  key={Math.floor(manualCost)}
                >
                  ${manualCost.toFixed(2)}
                </motion.p>
                <p className="text-xs text-muted-foreground">Cost accumulated</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {manualSteps.map((step, index) => {
                const stepProgress = (timelinePosition / 100) * manualSteps.length;
                const isActive = index < stepProgress;

                return (
                  <motion.div
                    key={step.name}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`
                      p-4 rounded-lg transition-all duration-500
                      ${isActive ? 'bg-destructive/10 border border-destructive/30' : 'bg-muted/20 border border-transparent'}
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
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-destructive/30">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total per transaction:</span>
                <span className="text-xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                  ${totalManualCost.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 italic">
                "Plus 48 hours of your customer waiting."
              </p>
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
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)]">GenAI 2.0</h3>
                  <p className="text-xs text-muted-foreground">"Multi-agent autonomous workflow"</p>
                </div>
              </div>
              <div className="text-right">
                <motion.p 
                  className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]"
                  key={Math.floor(aiCost * 100)}
                >
                  ${aiCost.toFixed(2)}
                </motion.p>
                <p className="text-xs text-muted-foreground">Cost accumulated</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {aiSteps.map((step, index) => {
                const stepProgress = (timelinePosition / 100) * aiSteps.length;
                const isActive = index < stepProgress;

                return (
                  <motion.div
                    key={step.name}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`
                      p-4 rounded-lg transition-all duration-500
                      ${isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted/20 border border-transparent'}
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
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-primary/30">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total per transaction:</span>
                <span className="text-xl font-bold text-primary font-[family-name:var(--font-mono)]">
                  ${totalAiCost.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 italic">
                "Plus 2 hours to approval. Not 48."
              </p>
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
            <span className="text-sm text-muted-foreground">Scrub the timeline</span>
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

        {/* The Verdict - Galloway Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8 text-center border border-primary/30"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">The Math</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-destructive/10 rounded-xl">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Manual</p>
              <p className="text-3xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                ${totalManualCost.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-muted/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">→</span>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">GenAI 2.0</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)]">
                ${totalAiCost.toFixed(2)}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/20 rounded-full px-8 py-4 border border-primary/30"
          >
            <p className="text-4xl font-bold text-primary font-[family-name:var(--font-mono)]">
              {savingsPercent}% cost reduction
            </p>
          </motion.div>

          <p className="text-muted-foreground mt-4 italic max-w-lg mx-auto">
            "That's not optimization. That's a different business model. 
            Your competitor figured this out 18 months ago."
          </p>
        </motion.div>

        {/* Why 1.0 Fails and 2.0 Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="glass-card rounded-xl p-6 border-destructive/20 opacity-80">
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
              <li className="flex items-center gap-2">
                <span className="text-destructive">✗</span>
                Single point of failure
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-xl p-6 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">GenAI 2.0: Hallucination Insurance</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Real-time confidence: 98.7%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Source attribution with links</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Automated audit trail</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Multi-agent consensus</span>
              </li>
            </ul>
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
            You've seen what happens to one transaction. 
            Now let's calculate what happens when you do this 5,000 times a month.
          </p>
          
          <motion.button
            onClick={onNext}
            className="group flex items-center gap-2 mx-auto text-primary hover:text-primary/80 transition-colors"
            whileHover={{ y: 2 }}
          >
            <span className="text-sm font-medium">Chapter 4: The Algebra</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
