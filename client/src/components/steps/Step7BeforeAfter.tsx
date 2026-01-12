/*
 * Step 7: Summary & Next Steps
 * 
 * Clear before/after comparison with a single, prominent call-to-action.
 * User-friendly explanations throughout.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CompanyData, WorkflowData } from "@/pages/Home";

interface Step7Props {
  companyData: CompanyData | null;
  workflowData: WorkflowData | null;
}

export default function Step7BeforeAfter({ companyData, workflowData }: Step7Props) {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const companyName = companyData?.companyName || "Your Company";
  const annualSavings = companyData?.aiOpportunity?.conservativeTarget || 18700000;
  const fiveYearROI = companyData?.fiveYearProjection?.totalROI || annualSavings * 4.2;

  const handleEmailSubmit = () => {
    if (email) {
      setEmailSubmitted(true);
      // In production, this would call an API to send the deck
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 bg-primary/10 px-3 py-1 rounded-full">
            <span>Step 8 of 8</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your AI Transformation Summary
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's what we've discovered about {companyName}'s AI opportunity, 
            and how to capture it.
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          {/* Key Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(annualSavings)}</p>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  Conservative estimate <HelpCircle className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>This estimate uses conservative assumptions (30% risk adjustment) based on your company's profile and industry benchmarks.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">5-Year ROI</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(fiveYearROI)}</p>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  Cumulative value <HelpCircle className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Total value captured over 5 years, accounting for gradual implementation (Year 1: 40%, Year 2: 70%, Year 3+: 100%).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
              <p className="text-3xl font-bold text-foreground">{companyData?.fiveYearProjection?.paybackMonths || 8} months</p>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  Time to value <HelpCircle className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Time until AI implementation costs are recovered through operational savings.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
              What Changes With AI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-5 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Current State
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">Manual processes taking 10-15 minutes each</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">5-8% error rates requiring rework</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">Limited visibility into compliance risks</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/30">
                <p className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  With BlueAlly AI
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-foreground">AI-assisted processing in under 30 seconds</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-foreground">Error rates below 1% with auto-correction</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-foreground">Real-time compliance monitoring and alerts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Section */}
        <motion.div
          id="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/10 border-2 border-primary rounded-2xl p-8 mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Ready to Capture This Opportunity?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Schedule a 30-minute strategy call with our AI experts. We'll review your specific 
            use cases and create a custom implementation roadmap.
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Strategy Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            No commitment required • 30-minute call • Custom recommendations
          </p>
        </motion.div>

        {/* Secondary: Download Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Get Your Full Report</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed analysis with implementation roadmap and ROI breakdown.
                </p>
              </div>
            </div>
            
            {!emailSubmitted ? (
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-[200px]"
                />
                <Button 
                  onClick={handleEmailSubmit}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Send Report
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Report sent to {email}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by enterprise teams at
          </p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {/* Placeholder for client logos */}
            <div className="h-8 w-24 bg-muted rounded" />
            <div className="h-8 w-20 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
            <div className="h-8 w-24 bg-muted rounded hidden md:block" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
