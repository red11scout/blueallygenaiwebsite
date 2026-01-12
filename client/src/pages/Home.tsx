/**
 * BlueAlly AI Portal - World-Class Rebuild
 * 
 * Design Philosophy: Precision Engineering
 * - Clean, confident, premium aesthetic
 * - Smooth micro-interactions
 * - Progressive disclosure
 * - Single clear CTA
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle2,
  Play,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
  BarChart3,
  DollarSign,
  Users,
  Building2
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "",
  duration = 2
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ROI Calculator Component
function ROICalculator() {
  const [employees, setEmployees] = useState(500);
  const [processes, setProcesses] = useState(3);
  
  const annualSavings = Math.round(employees * processes * 8500);
  const monthlyWaste = Math.round(annualSavings / 12);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Calculate Your ROI</h3>
      </div>
      
      <div className="space-y-8">
        {/* Employees Slider */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">Employees</label>
            <span className="text-sm font-semibold text-foreground">{employees.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
        
        {/* Processes Slider */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">AI-Ready Processes</label>
            <span className="text-sm font-semibold text-foreground">{processes}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={processes}
            onChange={(e) => setProcesses(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
        
        {/* Results */}
        <div className="pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Waste</p>
              <p className="text-2xl font-bold text-destructive">
                ${monthlyWaste.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
              <p className="text-2xl font-bold gradient-success">
                ${annualSavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  metric, 
  metricLabel,
  delay = 0 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card rounded-2xl p-6 md:p-8 border border-border card-hover"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 
                      group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
      
      <div className="pt-5 border-t border-border">
        <p className="text-3xl font-bold gradient-text">{metric}</p>
        <p className="text-xs text-muted-foreground mt-1">{metricLabel}</p>
      </div>
    </motion.div>
  );
}

// Comparison Row Component
function ComparisonRow({ 
  label, 
  before, 
  after, 
  delay = 0 
}: { 
  label: string;
  before: string;
  after: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="grid grid-cols-3 gap-4 py-4 border-b border-border last:border-0"
    >
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-sm text-muted-foreground text-center">{before}</div>
      <div className="text-sm font-semibold text-primary text-center">{after}</div>
    </motion.div>
  );
}

// Stats Component
function StatItem({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <img 
              src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'} 
              alt="BlueAlly" 
              className="h-8 md:h-10"
            />
            <span className="text-sm font-medium text-muted-foreground">AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <a 
              href="#calculator" 
              className="hidden md:inline-flex btn-premium text-sm"
            >
              Calculate ROI
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-20 animated-gradient"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/hero-abstract-v2.png" 
            alt="" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none opacity-30 dark:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        </div>
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise AI That Actually Works</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              67% of AI projects fail.
              <br />
              <span className="gradient-text">Yours won't.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              We've deployed 200+ enterprise AI systems with a 89% success rate. 
              Calculate your ROI in 60 seconds.
            </motion.p>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#calculator" 
                className="btn-premium inline-flex items-center gap-2 text-base"
              >
                Calculate My ROI
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <a 
                href="#how-it-works" 
                className="inline-flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Play className="w-4 h-4" />
                See How It Works
              </a>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem value={200} suffix="+" label="Deployments" />
            <StatItem value={89} suffix="%" label="Success Rate" />
            <StatItem value={18} prefix="$" suffix="M" label="Avg. Annual Savings" />
            <StatItem value={6} label="Week Implementation" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary mb-4"
            >
              THE PROBLEM
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              Your enterprise is bleeding money on failed AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Most companies are stuck with GenAI 1.0 — chatbots that hallucinate, 
              integrations that break, and pilots that never scale.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={DollarSign}
              title="Cost Overruns"
              description="Cloud API costs spiral 3,700% at scale. Your CFO will notice."
              metric="$47K"
              metricLabel="Monthly API costs at scale"
              delay={0}
            />
            <FeatureCard
              icon={Clock}
              title="Time Wasted"
              description="Average enterprise spends 11 months on pilots that never ship."
              metric="11mo"
              metricLabel="Average time to failed pilot"
              delay={0.1}
            />
            <FeatureCard
              icon={Shield}
              title="Security Risks"
              description="Sending proprietary data to OpenAI? Your legal team should know."
              metric="$50M"
              metricLabel="Average data breach cost"
              delay={0.2}
            />
            <FeatureCard
              icon={Users}
              title="Talent Drain"
              description="Your best engineers are debugging prompts instead of building."
              metric="8 FTEs"
              metricLabel="Required for DIY approach"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl glow">
                <img 
                  src="/images/dashboard-preview.png" 
                  alt="BlueAlly Dashboard" 
                  className="w-full"
                />
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">98.7%</p>
                    <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right: Content */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-medium text-primary mb-4"
              >
                THE SOLUTION
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                GenAI 2.0: Multi-agent systems that actually work
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                We deploy autonomous AI agent networks on your infrastructure. 
                Air-gapped. Fine-tuned on your data. 500 requests per second.
              </motion.p>
              
              <div className="space-y-4">
                {[
                  "Multi-agent orchestration with consensus verification",
                  "On-premise deployment — your data never leaves",
                  "98.7% accuracy with hallucination insurance",
                  "6-week implementation, not 11 months"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary mb-4"
            >
              THE DIFFERENCE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              GenAI 1.0 vs 2.0
            </motion.h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 border-b border-border">
                <div className="text-sm font-semibold text-foreground">Metric</div>
                <div className="text-sm font-semibold text-muted-foreground text-center">1.0 (DIY)</div>
                <div className="text-sm font-semibold text-primary text-center">2.0 (BlueAlly)</div>
              </div>
              
              {/* Rows */}
              <div className="p-4">
                <ComparisonRow label="Time to Production" before="11 months" after="6 weeks" delay={0} />
                <ComparisonRow label="Team Required" before="8 FTEs" after="2 FTEs" delay={0.1} />
                <ComparisonRow label="Success Rate" before="33%" after="89%" delay={0.2} />
                <ComparisonRow label="Year 1 ROI" before="-240%" after="+340%" delay={0.3} />
                <ComparisonRow label="Data Security" before="Cloud (exposed)" after="On-prem (air-gapped)" delay={0.4} />
                <ComparisonRow label="Accuracy" before="~70%" after="98.7%" delay={0.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-medium text-primary mb-4"
              >
                ROI CALCULATOR
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                See what you're leaving on the table
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Drag the sliders. Watch the numbers change. 
                This isn't a projection — it's arithmetic based on 200+ deployments.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fortune 500 Case Study</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Global manufacturer deployed BlueAlly for invoice processing
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold gradient-success">$23.4M</span>
                      <span className="text-sm text-muted-foreground">annual savings</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right: Calculator */}
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/images/ai-network-visual.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              Ready to stop bleeding money?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10"
            >
              Book a 30-minute strategy call. We'll show you exactly where 
              AI can save you millions — no pitch deck, just math.
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work@company.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground 
                         placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.span>
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Book Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </motion.form>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mt-4"
            >
              No spam. No sales pitch. Just a conversation about your AI strategy.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img 
                src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'} 
                alt="BlueAlly" 
                className="h-8"
              />
              <span className="text-sm text-muted-foreground">AI</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BlueAlly. Enterprise AI that actually works.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
