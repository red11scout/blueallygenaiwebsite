/**
 * BlueAlly AI Portal - Enterprise Grade
 * 
 * Design Philosophy: Sophisticated Minimalism
 * - No childish AI-generated images
 * - Pure CSS gradients and geometric patterns
 * - Enterprise-appropriate visual language
 * - Stripe/Linear/Vercel level polish
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2,
  Sun,
  Moon,
  BarChart3,
  Layers,
  Lock,
  Cpu,
  Activity,
  GitBranch,
  Database,
  Server
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

// Geometric Background Pattern - Enterprise Style
function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,82,204,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,82,204,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Gradient orbs - subtle and professional */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-20 dark:opacity-15">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}

// Animated Metric Display
function MetricDisplay({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  highlight = false 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-2 ${
        highlight ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'
      }`}>
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}

// ROI Calculator - Clean Enterprise Style
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
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">ROI Calculator</h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">Employees</label>
            <span className="text-sm font-semibold text-foreground tabular-nums">{employees.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-600
                       [&::-webkit-slider-thumb]:shadow-sm
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">AI-Ready Processes</label>
            <span className="text-sm font-semibold text-foreground tabular-nums">{processes}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={processes}
            onChange={(e) => setProcesses(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-600
                       [&::-webkit-slider-thumb]:shadow-sm
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
        
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Monthly Waste</p>
              <p className="text-2xl font-semibold text-red-600 dark:text-red-400 tabular-nums">
                ${monthlyWaste.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Annual Savings</p>
              <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                ${annualSavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Feature Card - Minimal Enterprise Style
function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  delay = 0 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center flex-shrink-0
                        group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Comparison Table - Clean Design
function ComparisonTable() {
  const comparisons = [
    { metric: "Implementation Time", before: "11+ months", after: "6 weeks" },
    { metric: "Success Rate", before: "33%", after: "89%" },
    { metric: "Year 1 ROI", before: "-240%", after: "+340%" },
    { metric: "Data Security", before: "Cloud (exposed)", after: "On-prem (air-gapped)" },
    { metric: "Accuracy", before: "~70%", after: "98.7%" },
    { metric: "Scalability", before: "API rate limits", after: "Unlimited" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="text-sm font-semibold text-foreground">Metric</div>
        <div className="text-sm font-semibold text-muted-foreground text-center">GenAI 1.0</div>
        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 text-center">BlueAlly 2.0</div>
      </div>
      
      {comparisons.map((row, index) => (
        <motion.div
          key={row.metric}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="grid grid-cols-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0
                     hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
        >
          <div className="text-sm font-medium text-foreground">{row.metric}</div>
          <div className="text-sm text-muted-foreground text-center">{row.before}</div>
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 text-center">{row.after}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Architecture Diagram - SVG Based
function ArchitectureDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800"
    >
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Requests/sec", value: "500+" },
          { label: "Latency", value: "<50ms" },
          { label: "Uptime", value: "99.99%" }
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Simple Architecture Flow */}
      <div className="flex items-center justify-between gap-2">
        {[
          { icon: Database, label: "Your Data" },
          { icon: Server, label: "On-Prem" },
          { icon: Cpu, label: "AI Agents" },
          { icon: Activity, label: "Insights" }
        ].map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{item.label}</p>
            </div>
            {index < 3 && (
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-1" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Case Study Card
function CaseStudy({ company, industry, savings, description }: {
  company: string;
  industry: string;
  savings: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{company}</p>
          <p className="text-xs text-muted-foreground">{industry}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{savings}</p>
          <p className="text-xs text-muted-foreground">Annual Savings</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
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
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Navigation - Minimal */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img 
              src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'} 
              alt="BlueAlly" 
              className="h-7"
            />
            <span className="text-xs font-medium text-muted-foreground tracking-wider">AI</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            <a 
              href="#calculator"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                         rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
        <GeometricBackground />
        
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="container relative z-10 py-20 md:py-32"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 
                             bg-blue-50 dark:bg-blue-950 rounded-full mb-6">
                Enterprise AI Platform
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight mb-6"
            >
              AI that deploys
              <br />
              <span className="text-blue-600 dark:text-blue-400">in weeks, not years</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Multi-agent AI systems deployed on your infrastructure. 
              Air-gapped. Fine-tuned on your data. 89% success rate across 200+ deployments.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white 
                           bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Calculate Your ROI
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground 
                           hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                How It Works
              </a>
            </motion.div>
          </div>
          
          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 md:mt-32"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
              <MetricDisplay value={200} suffix="+" label="Deployments" />
              <MetricDisplay value={89} suffix="%" label="Success Rate" highlight />
              <MetricDisplay value={13} prefix="$" suffix="M" label="Avg. Annual Savings" />
              <MetricDisplay value={6} label="Week Implementation" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              The Problem
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6"
            >
              67% of enterprise AI projects fail
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Most companies are stuck with GenAI 1.0—chatbots that hallucinate, 
              integrations that break, and pilots that never scale.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Layers}
              title="Cost Overruns"
              description="Cloud API costs spiral 3,700% at scale. Your CFO will notice."
              delay={0}
            />
            <FeatureCard
              icon={Activity}
              title="Time Wasted"
              description="Average enterprise spends 11 months on pilots that never ship."
              delay={0.1}
            />
            <FeatureCard
              icon={Lock}
              title="Security Risks"
              description="Sending proprietary data to OpenAI? Your legal team should know."
              delay={0.2}
            />
            <FeatureCard
              icon={GitBranch}
              title="Talent Drain"
              description="Your best engineers are debugging prompts instead of building."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 md:py-32 relative">
        <GeometricBackground />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              The Solution
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6"
            >
              Multi-agent AI that actually works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Autonomous AI agent networks deployed on your infrastructure. 
              Air-gapped. Fine-tuned. 500 requests per second.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ArchitectureDiagram />
            
            <div className="space-y-6">
              {[
                { 
                  icon: CheckCircle2, 
                  title: "Multi-agent orchestration", 
                  desc: "Consensus verification eliminates hallucinations" 
                },
                { 
                  icon: CheckCircle2, 
                  title: "On-premise deployment", 
                  desc: "Your data never leaves your infrastructure" 
                },
                { 
                  icon: CheckCircle2, 
                  title: "98.7% accuracy", 
                  desc: "With hallucination insurance guarantee" 
                },
                { 
                  icon: CheckCircle2, 
                  title: "6-week implementation", 
                  desc: "Not 11 months of failed pilots" 
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <item.icon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              The Difference
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold text-foreground mt-4"
            >
              GenAI 1.0 vs 2.0
            </motion.h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-20 md:py-32 relative">
        <GeometricBackground />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                ROI Calculator
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-6"
              >
                See what you're leaving on the table
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-lg mb-8"
              >
                Drag the sliders. Watch the numbers change. 
                This isn't a projection—it's arithmetic based on 200+ deployments.
              </motion.p>
              
              {/* Case Studies */}
              <div className="space-y-4">
                <CaseStudy
                  company="Fortune 500 Manufacturer"
                  industry="Manufacturing"
                  savings="$23.4M"
                  description="Deployed BlueAlly for invoice processing and vendor management automation."
                />
                <CaseStudy
                  company="Global Financial Services"
                  industry="Finance"
                  savings="$18.7M"
                  description="Automated compliance reporting and risk assessment workflows."
                />
              </div>
            </div>
            
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900 dark:bg-slate-950">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold text-white mb-6"
            >
              Ready to stop bleeding money on failed AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 text-lg mb-10"
            >
              Book a 30-minute strategy call. We'll show you exactly 
              where you're losing money and how to fix it.
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work@company.com"
                required
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white 
                           placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 
                           text-white font-medium rounded-lg transition-colors text-sm
                           flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    Book Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-500 text-xs mt-4"
            >
              No spam. No sales pitch. Just data.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'} 
                alt="BlueAlly" 
                className="h-5"
              />
              <span className="text-xs text-muted-foreground">© 2025 BlueAlly. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
