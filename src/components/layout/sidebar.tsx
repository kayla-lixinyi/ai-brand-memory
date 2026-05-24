'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { LayoutDashboard, Images, Upload, CheckSquare, Settings, PanelLeftClose, PanelLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', label: '管理看板', icon: LayoutDashboard },
  { href: '/assets', label: '素材库', icon: Images },
  { href: '/upload', label: '上传', icon: Upload },
  { href: '/approval', label: '审批流', icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { toggleSettings } = useUIStore();

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          'flex flex-col bg-background border-r border-border/40 transition-all duration-300 h-full',
          sidebarCollapsed ? 'w-12' : 'w-52'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-3 h-14', sidebarCollapsed && 'justify-center px-0')}>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-coral shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight">AI Brand Memory</span>
              <span className="text-[10px] text-muted-foreground font-medium">DAM Platform</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-1.5 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  sidebarCollapsed && 'justify-center px-0'
                )}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
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

        {/* Bottom actions */}
        <div className="px-1.5 pb-3 space-y-0.5">
          {/* Settings gear */}
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={toggleSettings}
                    className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
                  />
                }
              >
                <Settings className="w-[18px] h-[18px]" />
              </TooltipTrigger>
              <TooltipContent side="right">设置</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={toggleSettings}
              className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
            >
              <Settings className="w-[18px] h-[18px] shrink-0" />
              <span>设置</span>
            </button>
          )}

          {/* Collapse toggle */}
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
                  />
                }
              >
                <PanelLeft className="w-[18px] h-[18px]" />
              </TooltipTrigger>
              <TooltipContent side="right">展开侧边栏</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
            >
              <PanelLeftClose className="w-[18px] h-[18px] shrink-0" />
              <span>收起</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
