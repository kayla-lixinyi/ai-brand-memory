'use client';

import React, { useState } from 'react';
import { useFilterStore } from '@/store/filter-store';
import {
  AssetType, AssetStatus, Channel, AssetCategory,
  TYPE_LABELS, STATUS_CONFIG, CHANNEL_CONFIG, CATEGORY_LABELS, SIZE_PRESETS,
} from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { X, RotateCcw, ChevronDown, Search } from 'lucide-react';

const allTypes: AssetType[] = ['image', 'video', 'document', 'psd', 'ai'];
const allStatuses: AssetStatus[] = ['draft', 'in_review', 'approved', 'expired', 'rejected', 'archived'];
const allChannels: Channel[] = ['shopee', 'tiktok', 'google', 'instagram', 'lazada', 'official_site'];
const allCategories: AssetCategory[] = ['lipstick', 'foundation', 'eyeshadow', 'poster', 'video', 'brand_doc', 'blush', 'mascara', 'skincare'];

export function FilterPanel({ onClose }: { onClose?: () => void }) {
  const { filters, toggleFilterItem, setFilter, resetFilters } = useFilterStore();

  const activeCount =
    filters.types.length +
    filters.statuses.length +
    filters.channels.length +
    filters.categories.length +
    (filters.sku ? 1 : 0) +
    (filters.sizePreset ? 1 : 0);

  return (
    <div className="w-56 shrink-0 border-r border-border/40 bg-background flex flex-col max-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-border/40 shrink-0">
        <span className="text-xs font-semibold text-foreground tracking-tight">
          筛选
          {activeCount > 0 && (
            <span className="ml-1.5 text-[10px] text-primary font-bold">{activeCount}</span>
          )}
        </span>
        <div className="flex items-center gap-0.5">
          {activeCount > 0 && (
            <button
              onClick={resetFilters}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="重置"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-y-auto py-1">
        {/* Type */}
        <FilterSection title="类型" count={filters.types.length}>
          {allTypes.map((t) => (
            <FilterCheckItem
              key={t}
              label={TYPE_LABELS[t]}
              active={filters.types.includes(t)}
              onClick={() => toggleFilterItem('types', t)}
            />
          ))}
        </FilterSection>

        {/* Status */}
        <FilterSection title="状态" count={filters.statuses.length}>
          {allStatuses.map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <FilterCheckItem
                key={s}
                label={cfg.label}
                active={filters.statuses.includes(s)}
                onClick={() => toggleFilterItem('statuses', s)}
                dot={cfg.color}
              />
            );
          })}
        </FilterSection>

        {/* Channel */}
        <FilterSection title="渠道" count={filters.channels.length}>
          {allChannels.map((ch) => (
            <FilterCheckItem
              key={ch}
              label={CHANNEL_CONFIG[ch].label}
              active={filters.channels.includes(ch)}
              onClick={() => toggleFilterItem('channels', ch)}
            />
          ))}
        </FilterSection>

        {/* Category */}
        <FilterSection title="品类" count={filters.categories.length}>
          {allCategories.map((c) => (
            <FilterCheckItem
              key={c}
              label={CATEGORY_LABELS[c]}
              active={filters.categories.includes(c)}
              onClick={() => toggleFilterItem('categories', c)}
            />
          ))}
        </FilterSection>

        {/* Size Preset */}
        <FilterSection title="尺寸" count={filters.sizePreset ? 1 : 0}>
          {SIZE_PRESETS.map((sp) => (
            <FilterCheckItem
              key={sp.label}
              label={sp.label}
              active={filters.sizePreset === sp.label}
              onClick={() => setFilter('sizePreset', filters.sizePreset === sp.label ? undefined : sp.label)}
            />
          ))}
        </FilterSection>

        {/* SKU */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <input
              placeholder="SKU..."
              className="w-full h-7 pl-7 pr-2 text-xs bg-muted/50 border-0 rounded-md outline-none focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60 transition-all"
              value={filters.sku || ''}
              onChange={(e) => setFilter('sku', e.target.value || undefined)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  count,
  children,
  defaultOpen = true,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/20 last:border-0">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium">
          {title}
          {count > 0 && <span className="ml-1 text-primary font-semibold">{count}</span>}
        </span>
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && <div className="pb-1.5">{children}</div>}
    </div>
  );
}

const DOT_COLORS: Record<string, string> = {
  slate: 'bg-slate-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
  violet: 'bg-violet-400',
};

function FilterCheckItem({
  label,
  active,
  onClick,
  dot,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dot?: string;
}) {
  return (
    <button
      className={cn(
        'flex items-center gap-2 w-full px-3 py-1 text-xs transition-colors',
        active
          ? 'text-foreground bg-primary/5'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      )}
      onClick={onClick}
    >
      {/* Checkbox indicator */}
      <span
        className={cn(
          'flex items-center justify-center w-3.5 h-3.5 rounded border transition-all shrink-0',
          active
            ? 'bg-primary border-primary'
            : 'border-border/80 bg-background'
        )}
      >
        {active && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {/* Optional status dot */}
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', DOT_COLORS[dot] || 'bg-muted-foreground')} />}
      <span className="truncate">{label}</span>
    </button>
  );
}
