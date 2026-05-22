'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">Brand Asset Portal</span>
        </div>
        <span className="text-xs text-muted-foreground">External Access</span>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
