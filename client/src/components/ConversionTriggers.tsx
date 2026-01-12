/*
 * Conversion Triggers Component
 * 
 * Time-based and scroll-based urgency triggers.
 * Scarcity, social proof, and exit-intent modals.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  X,
  Clock,
  Users,
  Zap,
  AlertTriangle,
  FileText
} from "lucide-react";
import type { CompanyData } from "@/pages/Home";

interface ConversionTriggersProps {
  timeOnSite: number;
  scrollProgress: number;
  companyData: CompanyData | null;
  email: string;
  onEmailChange: (email: string) => void;
}

export default function ConversionTriggers({
  timeOnSite,
  scrollProgress,
  companyData,
  email,
  onEmailChange
}: ConversionTriggersProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [dismissedModal, setDismissedModal] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(2);
  const [competitiveWindow, setCompetitiveWindow] = useState(43);

  // 5:30 min trigger - Footer banner
  useEffect(() => {
    if (timeOnSite >= 330 && !dismissedBanner) {
      setShowBanner(true);
    }
  }, [timeOnSite, dismissedBanner]);

  // 6:00 min trigger - Modal
  useEffect(() => {
    if (timeOnSite >= 360 && !dismissedModal && !showModal) {
      setShowModal(true);
    }
  }, [timeOnSite, dismissedModal, showModal]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && timeOnSite >= 390 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [timeOnSite, showExitIntent]);

  // Competitive window countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCompetitiveWindow(prev => Math.max(0, prev - 0.0001));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Footer Banner - 5:30 trigger */}
      <AnimatePresence>
        {showBanner && !dismissedBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-lg border-t border-primary/50"
          >
            <div className="container py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-primary-foreground text-sm sm:text-base">
                    <span className="font-semibold">Sarah from {companyData?.competitor || "TechCorp"}</span> just booked. 
                    <span className="font-bold"> {slotsRemaining} slots left this month.</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Book Now
                  </Button>
                  <button 
                    onClick={() => setDismissedBanner(true)}
                    className="text-primary-foreground/70 hover:text-primary-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - 6:00 trigger */}
      <AnimatePresence>
        {showModal && !dismissedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setDismissedModal(true)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-8 max-w-md w-full border border-primary/30"
            >
              <button 
                onClick={() => setDismissedModal(true)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">
                  Download the 47-Page Board Deck
                </h3>
                <p className="text-muted-foreground">
                  Your exact use case, ROI model, and implementation roadmap.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  className="bg-muted/30"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 glow-cyan">
                  Get the Deck
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. Only data.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-8 max-w-lg w-full border border-destructive/30"
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
                  <Clock className="w-6 h-6 text-destructive animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2">
                  Your Competitive Window: <span className="text-destructive">{Math.floor(competitiveWindow)} days</span>
                </h3>
                <p className="text-muted-foreground">
                  Workshop graduates deploy in <span className="text-primary font-semibold">42 days</span>.
                </p>
              </div>

              <div className="bg-destructive/10 rounded-xl p-4 mb-6 border border-destructive/30">
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <Users className="w-4 h-4" />
                  <span>
                    <span className="font-semibold">{companyData?.competitor || "Your competitor"}</span> announced AI initiative 23 days ago.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span>Their stock: <span className="text-green-400">+8%</span></span>
                  <span className="mx-2">|</span>
                  <span>Your stock: <span className="text-destructive">-2%</span></span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 glow-cyan py-6 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Secure Your Workshop Slot
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scarcity Widget - Fixed on side */}
      {scrollProgress > 0.3 && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
        >
          <div className="glass-card rounded-xl p-4 border border-primary/30 w-48">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Workshop Slots</span>
            </div>
            
            {/* Thermometer */}
            <div className="relative h-24 w-8 mx-auto bg-muted/30 rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-destructive to-destructive/50"
                initial={{ height: "100%" }}
                animate={{ height: `${(slotsRemaining / 5) * 100}%` }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{slotsRemaining}</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              slots left for <span className="text-primary">Q1 2026</span>
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
