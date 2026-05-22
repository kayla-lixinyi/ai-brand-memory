'use client';

import { create } from 'zustand';
import { AssetFilters, AssetType, AssetStatus, Channel, AssetCategory, SearchMode, SortBy, ViewMode } from '@/types';

interface FilterState {
  filters: AssetFilters;
  searchQuery: string;
  searchMode: SearchMode;
  sortBy: SortBy;
  viewMode: ViewMode;
  setFilter: <K extends keyof AssetFilters>(key: K, value: AssetFilters[K]) => void;
  setSearchQuery: (q: string) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSortBy: (sort: SortBy) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleFilterItem: <K extends keyof AssetFilters>(key: K, item: string) => void;
  resetFilters: () => void;
  activeBrandId: string;
  setActiveBrandId: (brandId: string) => void;
}

const defaultFilters: AssetFilters = {
  types: [],
  statuses: [],
  channels: [],
  categories: [],
  tags: [],
  brandId: 'florasis',
};

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: { ...defaultFilters },
  searchQuery: '',
  searchMode: 'fulltext',
  sortBy: 'newest',
  viewMode: 'grid',
  activeBrandId: 'florasis',
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSearchMode: (mode) => set({ searchMode: mode }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleFilterItem: (key, item) => {
    const current = get().filters[key];
    if (Array.isArray(current)) {
      const arr = current as string[];
      const next = arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
      set((state) => ({ filters: { ...state.filters, [key]: next } }));
    }
  },
  resetFilters: () => set({ filters: { ...defaultFilters, brandId: get().activeBrandId }, searchQuery: '' }),
  setActiveBrandId: (brandId) =>
    set((state) => ({ activeBrandId: brandId, filters: { ...state.filters, brandId } })),
}));
