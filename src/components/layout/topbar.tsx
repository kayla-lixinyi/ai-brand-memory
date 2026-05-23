'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/auth-store';
import { useFilterStore } from '@/store/filter-store';
import { brands, users } from '@/data/mock';
import { ROLE_LABELS } from '@/types';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const { currentUser, switchUser } = useAuthStore();
  const { activeBrandId, setActiveBrandId } = useFilterStore();

  const activeBrand = brands.find((b) => b.id === activeBrandId);

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border/60 bg-background/80 backdrop-blur-sm shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]">
      {/* Brand Switcher */}
      <div className="flex items-center gap-3">
        <Select value={activeBrandId} onValueChange={(v) => v && setActiveBrandId(v)}>
          <SelectTrigger className="w-48 h-9">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span>{activeBrand?.logo}</span>
                <span className="font-medium">{activeBrand?.name}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                <span className="flex items-center gap-2">
                  <span>{b.logo}</span>
                  <span>{b.name}</span>
                  <span className="text-xs text-muted-foreground">({b.nameEn})</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="flex items-center gap-2 h-9 px-2" />}>
              <Avatar className="h-7 w-7">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{currentUser.name}</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {ROLE_LABELS[currentUser.role]}
              </Badge>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>切换用户 (Demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {users.map((u) => (
              <DropdownMenuItem
                key={u.id}
                onClick={() => switchUser(u.id)}
                className="flex items-center gap-2"
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <span>{u.name}</span>
                <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">
                  {ROLE_LABELS[u.role]}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
