'use client';

import React, { useState, useCallback } from 'react';
import { useAssets } from '@/hooks/use-assets';
import { useAssetStore } from '@/store/asset-store';
import { useFilterStore } from '@/store/filter-store';
import { AssetCard } from '@/components/assets/asset-card';
import { FilterPanel } from '@/components/assets/filter-panel';
import { SearchBar } from '@/components/assets/search-bar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LayoutGrid, List, SlidersHorizontal, PackageOpen, CheckSquare, Archive, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

function AssetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="p-3.5 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <PackageOpen className="w-10 h-10 opacity-40" />
      </div>
      <p className="text-lg font-semibold">暂无素材</p>
      <p className="text-sm mt-1 text-muted-foreground/70">尝试调整筛选条件或切换品牌</p>
    </div>
  );
}

export default function AssetsPage() {
  const filteredAssets = useAssets();
  const allAssets = useAssetStore((s) => s.assets);
  const batchUpdateStatus = useAssetStore((s) => s.batchUpdateStatus);
  const { viewMode, setViewMode, sortBy, setSortBy, activeBrandId, searchMode } = useFilterStore();
  const [showFilter, setShowFilter] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  React.useEffect(() => setHydrated(true), []);

  const [semanticIds, setSemanticIds] = useState<string[]>([]);
  const [semanticReason, setSemanticReason] = useState('');

  const handleSemanticResults = useCallback((ids: string[], reason: string) => {
    setSemanticIds(ids);
    setSemanticReason(reason);
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds(new Set());
  }, []);

  const handleBatchAction = useCallback((action: 'archived' | 'expired') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    batchUpdateStatus(ids, action);
    toast.success(`已${action === 'archived' ? '归档' : '标记过期'} ${ids.length} 个素材`);
    exitSelectMode();
  }, [selectedIds, batchUpdateStatus, exitSelectMode]);

  const displayAssets =
    (searchMode === 'semantic' || searchMode === 'image') && semanticIds.length > 0
      ? semanticIds
          .map((id) => allAssets.find((a) => a.id === id))
          .filter((a): a is NonNullable<typeof a> => !!a)
      : filteredAssets;

  const brandAssetCount = allAssets.filter((a) => a.brandId === activeBrandId).length;

  return (
    <div className="flex h-full -m-6">
      {/* Filter sidebar */}
      {showFilter && <FilterPanel onClose={() => setShowFilter(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-border/40 space-y-3 bg-gradient-warm">
          <SearchBar onSemanticResults={handleSemanticResults} />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {!showFilter && (
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs rounded-full px-3.5 border-border/60" onClick={() => setShowFilter(true)}>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  筛选
                </Button>
              )}
              <Button
                variant={selectMode ? 'default' : 'outline'}
                size="sm"
                className={cn('h-8 gap-1.5 text-xs rounded-full px-3.5', selectMode ? 'bg-primary' : 'border-border/60')}
                onClick={() => selectMode ? exitSelectMode() : setSelectMode(true)}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                {selectMode ? '取消选择' : '多选'}
              </Button>
              <span className="text-xs text-muted-foreground font-medium">
                {selectMode && selectedIds.size > 0
                  ? `已选 ${selectedIds.size} 个`
                  : `共 ${displayAssets.length} 个素材`}
                {!selectMode && displayAssets.length !== brandAssetCount && ` / ${brandAssetCount}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={(v) => v && setSortBy(v as typeof sortBy)}
                items={{ newest: '最新上传', most_downloads: '最多下载', relevance: '相关性' }}
              >
                <SelectTrigger className="h-8 w-[130px] text-xs rounded-full border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上传</SelectItem>
                  <SelectItem value="most_downloads">最多下载</SelectItem>
                  <SelectItem value="relevance">相关性</SelectItem>
                </SelectContent>
              </Select>

              {/* View toggle — pill group */}
              <div className="flex rounded-full border border-border/60 overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className={cn('h-8 w-8 rounded-none', viewMode === 'grid' && 'bg-primary')}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className={cn('h-8 w-8 rounded-none', viewMode === 'list' && 'bg-primary')}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Asset grid / list */}
        <div className="flex-1 overflow-auto p-5">
          {!hydrated ? (
            <AssetGridSkeleton />
          ) : displayAssets.length === 0 ? (
            <EmptyState />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayAssets.map((asset, i) => (
                <div key={asset.id} className="animate-float-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <AssetCard
                    asset={asset}
                    viewMode="grid"
                    selectable={selectMode}
                    selected={selectedIds.has(asset.id)}
                    onToggleSelect={toggleSelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {displayAssets.map((asset, i) => (
                <div key={asset.id} className="animate-float-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <AssetCard
                    asset={asset}
                    viewMode="list"
                    selectable={selectMode}
                    selected={selectedIds.has(asset.id)}
                    onToggleSelect={toggleSelect}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Batch action toolbar */}
        {selectMode && selectedIds.size > 0 && (
          <div className="sticky bottom-0 mx-5 mb-4">
            <div className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-card border border-border/60 shadow-xl">
              <span className="text-sm font-medium">已选 {selectedIds.size} 个素材</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs rounded-full px-4"
                  onClick={() => {
                    const allIds = displayAssets.map((a) => a.id);
                    setSelectedIds(new Set(allIds));
                  }}
                >
                  全选
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs rounded-full px-4"
                  onClick={() => handleBatchAction('archived')}
                >
                  <Archive className="w-3.5 h-3.5" />
                  批量归档
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs rounded-full px-4"
                  onClick={() => handleBatchAction('expired')}
                >
                  <Clock className="w-3.5 h-3.5" />
                  标记过期
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs rounded-full px-3"
                  onClick={exitSelectMode}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
