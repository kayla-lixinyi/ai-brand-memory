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
import { LayoutGrid, List, SlidersHorizontal, PackageOpen } from 'lucide-react';

function AssetGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
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
      <PackageOpen className="w-12 h-12 mb-3 opacity-40" />
      <p className="text-lg font-medium">暂无素材</p>
      <p className="text-sm mt-1">尝试调整筛选条件或切换品牌</p>
    </div>
  );
}

export default function AssetsPage() {
  const filteredAssets = useAssets();
  const allAssets = useAssetStore((s) => s.assets);
  const { viewMode, setViewMode, sortBy, setSortBy, activeBrandId, searchMode } = useFilterStore();
  const [showFilter, setShowFilter] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  React.useEffect(() => setHydrated(true), []);

  // Semantic / image search overrides
  const [semanticIds, setSemanticIds] = useState<string[]>([]);
  const [semanticReason, setSemanticReason] = useState('');

  const handleSemanticResults = useCallback((ids: string[], reason: string) => {
    setSemanticIds(ids);
    setSemanticReason(reason);
  }, []);

  // Determine final display list
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
        <div className="p-4 border-b border-border space-y-3">
          <SearchBar onSemanticResults={handleSemanticResults} />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!showFilter && (
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => setShowFilter(true)}>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  筛选
                </Button>
              )}
              <span className="text-xs text-muted-foreground">
                共 {displayAssets.length} 个素材
                {displayAssets.length !== brandAssetCount && ` / ${brandAssetCount}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => v && setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="h-8 w-[130px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上传</SelectItem>
                  <SelectItem value="most_downloads">最多下载</SelectItem>
                  <SelectItem value="relevance">相关性</SelectItem>
                </SelectContent>
              </Select>

              {/* View toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Asset grid / list */}
        <div className="flex-1 overflow-auto p-4">
          {!hydrated ? (
            <AssetGridSkeleton />
          ) : displayAssets.length === 0 ? (
            <EmptyState />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {displayAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
