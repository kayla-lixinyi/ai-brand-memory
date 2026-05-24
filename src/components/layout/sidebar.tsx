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
          'flex flex-col bg-gradient-sidebar transition-all duration-300 relative h-full',
          sidebarCollapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-4 h-16', sidebarCollapsed && 'justify-center px-0')}>
          <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">AI Brand Memory</span>
              <span className="text-[10px] text-white/40 font-medium">DAM Platform</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2.5 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/15 text-white shadow-sm shadow-black/10 backdrop-blur-sm'
                    : 'text-white/60 hover:bg-white/8 hover:text-white/90',
                  sidebarCollapsed && 'justify-center px-0'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive && 'drop-shadow-sm')} />
                {!sidebarCollapsed && <span>{item.label}</span>}
                {isActive && !sidebarCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-coral" />
                )}
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
          className="absolute -right-3.5 top-20 z-10 h-7 w-7 rounded-full border-2 border-border bg-background shadow-md hover:shadow-lg hover:scale-110 transition-all"
        >
          {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </Button>
      </aside>
    </TooltipProvider>
  );
}
