'use client';

import React from 'react';
import { useFilterStore } from '@/store/filter-store';
import {
  AssetType, AssetStatus, Channel, AssetCategory,
  TYPE_LABELS, STATUS_CONFIG, CHANNEL_CONFIG, CATEGORY_LABELS, SIZE_PRESETS,
} from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { X, RotateCcw } from 'lucide-react';

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
    <div className="w-64 shrink-0 border-r border-border bg-background p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">筛选</h3>
        <div className="flex items-center gap-1">
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={resetFilters}>
              <RotateCcw className="w-3 h-3" /> 重置
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {activeCount > 0 && (
        <p className="text-xs text-muted-foreground">{activeCount} 个筛选条件</p>
      )}

      <Separator />

      {/* Type */}
      <FilterSection title="素材类型">
        <div className="flex flex-wrap gap-1.5">
          {allTypes.map((t) => (
            <Badge
              key={t}
              variant={filters.types.includes(t) ? 'default' : 'outline'}
              className={cn('cursor-pointer text-[11px] px-2 py-0.5 transition-colors', filters.types.includes(t) && 'bg-primary')}
              onClick={() => toggleFilterItem('types', t)}
            >
              {TYPE_LABELS[t]}
            </Badge>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Status */}
      <FilterSection title="状态">
        <div className="flex flex-wrap gap-1.5">
          {allStatuses.map((s) => {
            const cfg = STATUS_CONFIG[s];
            const active = filters.statuses.includes(s);
            return (
              <Badge
                key={s}
                variant="secondary"
                className={cn(
                  'cursor-pointer text-[11px] px-2 py-0.5 transition-colors border',
                  active ? `${cfg.bgClass} ${cfg.textClass} border-current` : 'border-transparent hover:border-border'
                )}
                onClick={() => toggleFilterItem('statuses', s)}
              >
                {cfg.label}
              </Badge>
            );
          })}
        </div>
      </FilterSection>

      <Separator />

      {/* Channel */}
      <FilterSection title="渠道">
        <div className="flex flex-wrap gap-1.5">
          {allChannels.map((ch) => (
            <Badge
              key={ch}
              variant={filters.channels.includes(ch) ? 'default' : 'outline'}
              className={cn('cursor-pointer text-[11px] px-2 py-0.5 transition-colors', filters.channels.includes(ch) && 'bg-primary')}
              onClick={() => toggleFilterItem('channels', ch)}
            >
              {CHANNEL_CONFIG[ch].label}
            </Badge>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Category */}
      <FilterSection title="品类">
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((c) => (
            <Badge
              key={c}
              variant={filters.categories.includes(c) ? 'default' : 'outline'}
              className={cn('cursor-pointer text-[11px] px-2 py-0.5 transition-colors', filters.categories.includes(c) && 'bg-primary')}
              onClick={() => toggleFilterItem('categories', c)}
            >
              {CATEGORY_LABELS[c]}
            </Badge>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Size Preset */}
      <FilterSection title="尺寸预设">
        <div className="space-y-1">
          {SIZE_PRESETS.map((sp) => (
            <button
              key={sp.label}
              className={cn(
                'w-full text-left text-xs px-2 py-1.5 rounded-md transition-colors',
                filters.sizePreset === sp.label
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-muted-foreground'
              )}
              onClick={() => setFilter('sizePreset', filters.sizePreset === sp.label ? undefined : sp.label)}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* SKU */}
      <FilterSection title="SKU">
        <Input
          placeholder="搜索 SKU..."
          className="h-8 text-xs"
          value={filters.sku || ''}
          onChange={(e) => setFilter('sku', e.target.value || undefined)}
        />
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{title}</Label>
      {children}
    </div>
  );
}
