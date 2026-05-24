'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between h-14 px-6 border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-coral text-white shadow-sm shadow-primary/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight">品牌素材门户</span>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium tracking-wider">外部访问</span>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
