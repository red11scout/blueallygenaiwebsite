/*
 * CHAPTER 7: The Reckoning (Epilogue)
 * 
 * Galloway: "Here's your business before. Here's your business after. Choose."
 * Gladwell: The moment of decision - where stories end and action begins
 * 
 * ONE CTA: Book the Workshop
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Calendar,
  Mail,
  Building2
} from "lucide-react";
import type { CompanyData, WorkflowData } from "@/pages/Home";

interface Step7Props {
  companyData: CompanyData | null;
  workflowData: WorkflowData | null;
  totalROI: number;
}

export default function Step7BeforeAfter({ companyData, workflowData, totalROI }: Step7Props) {
  const [email, setEmail] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  const companyName = companyData?.companyName || "Your Enterprise";
  const displayROI = totalROI > 0 ? totalROI : 18.7;

  const beforeMetrics = [
    { label: "Processing Time", value: "50 min", icon: Clock, trend: "down" },
    { label: "Error Rate", value: "8%", icon: AlertTriangle, trend: "down" },
    { label: "Cost per Transaction", value: "$166.80", icon: DollarSign, trend: "down" },
    { label: "Annual Waste", value: "$4.2M", icon: TrendingDown, trend: "down" },
  ];

  const afterMetrics = [
    { label: "Processing Time", value: "28 sec", icon: Clock, trend: "up" },
    { label: "Error Rate", value: "0.3%", icon: CheckCircle2, trend: "up" },
    { label: "Cost per Transaction", value: "$5.02", icon: DollarSign, trend: "up" },
    { label: "Annual Savings", value: `$${displayROI.toFixed(1)}M`, icon: TrendingUp, trend: "up" },
  ];

  return (
    <div className="min-h-screen py-24 px-4 relative">
      {/* Background */}
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
            Epilogue
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-6 text-foreground">
            The <span className="text-gradient-cyan">Reckoning</span>
          </h2>
          
          {/* Gladwell Hook */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground italic">
              "Every story has a moment where the protagonist must choose. 
              This is yours. Here's {companyName} before. Here's {companyName} after. 
              The only question left is: which version do you want to be?"
            </p>
          </div>
        </motion.div>

        {/* Before/After Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-destructive/30 opacity-80"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">Before</h3>
                <p className="text-sm text-muted-foreground">{companyName} Today</p>
              </div>
            </div>

            <div className="space-y-4">
              {beforeMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20"
                >
                  <div className="flex items-center gap-3">
                    <metric.icon className="w-5 h-5 text-destructive" />
                    <span className="text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="text-xl font-bold text-destructive font-[family-name:var(--font-mono)]">
                    {metric.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-sm text-destructive italic text-center">
                "This is the version of {companyName} that's bleeding money while your competitor 
                figures out GenAI 2.0."
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-primary/30 glow-cyan"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-primary">After</h3>
                <p className="text-sm text-muted-foreground">{companyName} + BlueAlly</p>
              </div>
            </div>

            <div className="space-y-4">
              {afterMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <metric.icon className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="text-xl font-bold text-primary font-[family-name:var(--font-mono)]">
                    {metric.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-primary italic text-center">
                "This is the version of {companyName} that's capturing ${displayROI.toFixed(1)}M 
                while your competitor is still in committee meetings."
              </p>
            </div>
          </motion.div>
        </div>

        {/* The Galloway Truth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-12 bg-muted/10 text-center"
        >
          <p className="text-xl text-foreground font-[family-name:var(--font-display)] mb-4">
            "Here's the thing about reckonings:"
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            They don't wait for you to be ready. Your competitor is reading this same playbook. 
            The 47-day window is closing. The question isn't whether GenAI 2.0 will transform 
            your industry. It's whether you'll be the transformer or the transformed.
          </p>
        </motion.div>

        {/* Single CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-primary glow-cyan text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
            One Next Step
          </h3>
          
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Book a 2-hour GenAI 2.0 Workshop. We'll build your first use case live, 
            validate the ROI model with your actual data, and give you the board deck 
            that writes itself.
          </p>

          {!showBooking ? (
            <Button
              size="lg"
              onClick={() => setShowBooking(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg group"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book the Workshop
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-4"
            >
              <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{companyName}</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold">${displayROI.toFixed(1)}M potential ROI identified</span>
              </div>

              <Input
                type="email"
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/30 text-center"
              />

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg group"
                onClick={() => {
                  // In production, this would submit to a booking system
                  alert(`Workshop request submitted for ${email}. We'll be in touch within 24 hours.`);
                }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Me the Calendar Link
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-muted-foreground">
                No sales pitch. No 47-slide deck. Just 2 hours of building.
              </p>
            </motion.div>
          )}

          {/* What You Get */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/30">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">2 hrs</p>
              <p className="text-xs text-muted-foreground">Workshop Duration</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">1</p>
              <p className="text-xs text-muted-foreground">Live Use Case Built</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">47-page</p>
              <p className="text-xs text-muted-foreground">Board Deck Included</p>
            </div>
          </div>
        </motion.div>

        {/* Final Gladwell Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground italic max-w-lg mx-auto">
            "The best stories don't end with 'The End.' 
            They end with 'And then they did something about it.'"
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            — The BlueAlly AI Playbook
          </p>
        </motion.div>
      </div>
    </div>
  );
}
