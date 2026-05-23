'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { LayoutDashboard, Images, Upload, CheckSquare, Settings, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', label: '管理看板', icon: LayoutDashboard },
  { href: '/assets', label: '素材库', icon: Images },
  { href: '/upload', label: '上传', icon: Upload },
  { href: '/approval', label: '审批流', icon: CheckSquare },
  { href: '/settings', label: '设置', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          'flex flex-col border-r border-border bg-sidebar transition-all duration-300 relative h-full',
          sidebarCollapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border', sidebarCollapsed && 'justify-center px-0')}>
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">AI Brand Memory</span>
              <span className="text-[10px] text-sidebar-foreground/50">DAM Platform</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  sidebarCollapsed && 'justify-center px-0'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );

            if (sidebarCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger render={<span />}>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </nav>

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
        >
          {sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </aside>
    </TooltipProvider>
  );
}
