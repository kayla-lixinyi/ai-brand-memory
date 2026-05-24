'use client';

import { useMemo } from 'react';
import { useAssetStore } from '@/store/asset-store';
import { useFilterStore } from '@/store/filter-store';
import { Asset, SIZE_PRESETS } from '@/types';

export function useAssets() {
  const assets = useAssetStore((s) => s.assets);
  const { filters, searchQuery, searchMode, sortBy, activeBrandId } = useFilterStore();

  return useMemo(() => {
    let result = assets.filter((a) => a.brandId === activeBrandId);

    // Apply filters
    if (filters.types.length > 0) {
      result = result.filter((a) => filters.types.includes(a.type));
    }
    if (filters.statuses.length > 0) {
      result = result.filter((a) => filters.statuses.includes(a.status));
    }
    if (filters.channels.length > 0) {
      result = result.filter((a) => a.channels.some((c) => filters.channels.includes(c)));
    }
    if (filters.categories.length > 0) {
      result = result.filter((a) => filters.categories.includes(a.category));
    }
    if (filters.tags.length > 0) {
      result = result.filter((a) => filters.tags.some((t) => a.tags.includes(t)));
    }
    if (filters.sku) {
      result = result.filter((a) => a.sku.toLowerCase().includes(filters.sku!.toLowerCase()));
    }
    if (filters.sizePreset) {
      const preset = SIZE_PRESETS.find((p) => p.label === filters.sizePreset);
      if (preset) {
        result = result.filter((a) => a.width === preset.width && a.height === preset.height);
      }
    }

    // Fulltext search
    if (searchQuery && searchMode === 'fulltext') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.sku.toLowerCase().includes(q) ||
          a.aiTags.some((t) => t.label.toLowerCase().includes(q) || t.labelEn.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        break;
      case 'most_downloads':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'relevance':
      default:
        break;
    }

    return result;
  }, [assets, filters, searchQuery, searchMode, sortBy, activeBrandId]);
}
