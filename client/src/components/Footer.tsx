/*
 * Footer Component - Financial Surgeon's Theater
 */

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-[family-name:var(--font-display)]">B</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">BlueAlly</h3>
                <p className="text-xs text-muted-foreground">Enterprise AI Operating System</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              GenAI 1.0 is a prototype. GenAI 2.0 is a P&L weapon. 
              Transform your enterprise with the only AI strategy that guarantees board-ready ROI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ROI Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Workshop Agenda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Board Deck Template</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Book a Workshop</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Talk to an Architect</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partner Program</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 BlueAlly. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <Zap className="w-4 h-4" />
            <span>Powered by GenAI 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
