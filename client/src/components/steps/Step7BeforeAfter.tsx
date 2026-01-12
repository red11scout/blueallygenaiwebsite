/*
 * Step 7: The Before/After Existential Reckoning
 * 
 * Split-screen video comparison.
 * Final conversion triggers.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  AlertTriangle,
  Clock,
  DollarSign,
  CheckCircle2,
  FileText,
  Shield,
  ArrowRight,
  Play
} from "lucide-react";
import type { CompanyData, WorkflowData } from "@/pages/Home";

interface Step7Props {
  companyData: CompanyData | null;
  workflowData: WorkflowData | null;
}

export default function Step7BeforeAfter({ companyData, workflowData }: Step7Props) {
  const [email, setEmail] = useState("");
  const [isHoveringManual, setIsHoveringManual] = useState(false);
  const [isHoveringAI, setIsHoveringAI] = useState(false);

  const manualCostPerMinute = 2.45;
  const aiCostPerMinute = 0.0012;
  const costDestruction = 97;

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
            Step 7: The Transformation
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            The <span className="text-gradient-cyan">Existential Reckoning</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Before and after. The difference between survival and obsolescence.
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Before - Manual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHoveringManual(true)}
            onMouseLeave={() => setIsHoveringManual(false)}
            className="glass-card rounded-2xl overflow-hidden border-destructive/30"
          >
            {/* Video Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-destructive" />
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                Time-lapse: Human Suffering
              </p>
              
              {/* Hover Zoom Effect */}
              {isHoveringManual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground text-xs px-3 py-2 rounded-lg"
                >
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  Error popup detected
                </motion.div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold font-[family-name:var(--font-display)]">
                  Manual Process
                </h3>
              </div>

              {/* Cost Counter */}
              <div className="bg-destructive/10 rounded-xl p-4 mb-4 border border-destructive/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Bottleneck Cost Accumulator</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-destructive" />
                    <motion.span
                      key="manual-cost"
                      className="text-2xl font-bold text-destructive font-[family-name:var(--font-mono)]"
                    >
                      ${manualCostPerMinute.toFixed(2)}/min
                    </motion.span>
                  </div>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-destructive"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>

              {/* Pain Points */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-destructive">✗</span>
                  12 minutes average processing time
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-destructive">✗</span>
                  8% error rate requiring rework
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-destructive">✗</span>
                  48-hour approval delays
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-destructive">✗</span>
                  No audit trail or compliance
                </li>
              </ul>
            </div>
          </motion.div>

          {/* After - AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHoveringAI(true)}
            onMouseLeave={() => setIsHoveringAI(false)}
            className="glass-card rounded-2xl overflow-hidden border-primary/30"
          >
            {/* Video Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              {/* Neural Network Animation */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    animate={{
                      x: [Math.random() * 100, Math.random() * 100 + 200],
                      y: [Math.random() * 100, Math.random() * 100],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow-cyan">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                AI Agents: Cyan Neural Network
              </p>

              {/* Hover Info */}
              {isHoveringAI && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs px-3 py-2 rounded-lg"
                >
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Confidence: 98.7% | Source: Doc-2847
                </motion.div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold font-[family-name:var(--font-display)] text-primary">
                  GenAI 2.0 Agents
                </h3>
              </div>

              {/* Cost Counter */}
              <div className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Optimized Cost</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <motion.span
                      key="ai-cost"
                      className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]"
                    >
                      ${aiCostPerMinute.toFixed(4)}/min
                    </motion.span>
                  </div>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "3%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>18 seconds processing time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>0.3% error rate with auto-correction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>2-hour smart routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Blockchain audit trail</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Cost Destruction Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-12 text-center border border-primary/30 glow-cyan"
        >
          <p className="text-sm text-muted-foreground mb-2">Total Cost Destruction</p>
          <p className="text-6xl sm:text-7xl font-bold text-gradient-cyan font-[family-name:var(--font-display)]">
            {costDestruction}%
          </p>
          <p className="text-lg text-muted-foreground mt-4">
            ${manualCostPerMinute.toFixed(2)}/min → ${aiCostPerMinute.toFixed(4)}/min
          </p>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
              The Difference Between 1.0 and 2.0
            </h3>
            <p className="text-lg text-muted-foreground">
              Is the difference between a PowerPoint and a P&L.
            </p>
          </div>

          {/* Price Anchoring */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-muted/20 rounded-xl opacity-50">
              <p className="text-sm text-muted-foreground mb-1 line-through">Enterprise AI Strategy Firms</p>
              <p className="text-2xl font-bold text-muted-foreground line-through font-[family-name:var(--font-mono)]">$500K</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-xl border-2 border-primary glow-cyan">
              <p className="text-sm text-primary mb-1">BlueAlly Workshop</p>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-mono)] pulse-vital">$25K</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-xl opacity-50">
              <p className="text-sm text-destructive mb-1 line-through">DIY 1.0 + 67% Fail Rate</p>
              <p className="text-2xl font-bold text-destructive line-through font-[family-name:var(--font-mono)]">$1.2M</p>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-8">
            The workshop costs less than <span className="text-primary font-semibold">1 week</span> of your process waste.
          </p>

          {/* Final CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan px-10 py-7 text-xl group w-full sm:w-auto"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Lock in $18.7M ROI
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Email Capture for Board Deck */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6 border border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Download the 47-page Board Deck</h4>
                <p className="text-sm text-muted-foreground">
                  Your exact use case, ROI model, and implementation roadmap.
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="work@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/30 min-w-[200px]"
              />
              <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                Get Deck
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
