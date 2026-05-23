'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between h-14 px-6 border-b border-border/60 bg-background/80 backdrop-blur-sm shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Brand Asset Portal</span>
        </div>
        <span className="text-xs text-muted-foreground">External Access</span>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
