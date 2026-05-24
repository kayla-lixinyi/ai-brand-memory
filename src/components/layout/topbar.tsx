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
    <header className="flex items-center justify-between h-14 px-5 border-b border-border/40 bg-gradient-warm">
      {/* Brand Switcher */}
      <div className="flex items-center gap-3">
        <Select value={activeBrandId} onValueChange={(v) => v && setActiveBrandId(v)}>
          <SelectTrigger className="w-52 h-9 rounded-2xl border-border/60 bg-background/60 backdrop-blur-sm">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span className="text-base">{activeBrand?.logo}</span>
                <span className="font-semibold">{activeBrand?.name}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                <span className="flex items-center gap-2">
                  <span className="text-base">{b.logo}</span>
                  <span className="font-medium">{b.name}</span>
                  <span className="text-xs text-muted-foreground">({b.nameEn})</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9 rounded-xl"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="flex items-center gap-2.5 h-9 px-2.5 rounded-2xl hover:bg-primary/5" />}>
              <div className="relative">
                <Avatar className="h-7 w-7 ring-2 ring-primary/20">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-gradient-coral text-white text-xs">{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-medium">{currentUser.name}</span>
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border-0">
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
                  <AvatarFallback className="text-[9px]">{u.name[0]}</AvatarFallback>
                </Avatar>
                <span>{u.name}</span>
                <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0 rounded-full">
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
