/*
 * Header Component - Financial Surgeon's Theater
 * Fixed navigation with progress indicator, theme toggle, and primary CTA
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { CompanyData } from "@/pages/Home";

interface HeaderProps {
  scrollProgress: number;
  currentStep: number;
  companyData: CompanyData | null;
}

const stepLabels = [
  "Diagnostic",
  "Financial Impact",
  "Friction Points",
  "Workflow Analysis",
  "KPI Forge",
  "BlueAlly Oracle",
  "Financial Projection",
  "Transformation"
];

export default function Header({ scrollProgress, currentStep, companyData }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const savings = companyData ? Math.round(companyData.annualBleed * 0.435) : 18.7;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Progress Bar */}
      <div className="h-1 bg-muted relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-cyan-400"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary/50 blur-sm"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={theme === 'dark' ? '/images/blueally-logo-light.png' : '/images/blueally-logo-dark.png'}
            alt="BlueAlly"
            className="h-8 w-auto"
          />
          <span className="text-sm text-muted-foreground font-medium">AI</span>
        </div>

        {/* Step Indicator - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {stepLabels.map((label, index) => (
            <div 
              key={index}
              className={`flex items-center ${index < stepLabels.length - 1 ? 'pr-1' : ''}`}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-primary glow-cyan' 
                    : 'bg-muted-foreground/30'
                }`}
              />
              {index < stepLabels.length - 1 && (
                <div 
                  className={`w-6 h-0.5 transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Label - Mobile */}
        <div className="lg:hidden text-sm text-muted-foreground">
          <span className="text-primary font-medium">{currentStep + 1}</span>
          <span className="mx-1">/</span>
          <span>8</span>
          <span className="ml-2 text-foreground">{stepLabels[currentStep]}</span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Primary CTA */}
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            <span className="hidden sm:inline">Lock in ${savings}M ROI</span>
            <span className="sm:hidden">Book Now</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
