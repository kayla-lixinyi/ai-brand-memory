'use client';

import { create } from 'zustand';
import { Asset, AssetStatus } from '@/types';
import { assets as mockAssets } from '@/data/mock';

interface AssetState {
  assets: Asset[];
  getAsset: (id: string) => Asset | undefined;
  getAssetsByBrand: (brandId: string) => Asset[];
  updateAssetStatus: (assetId: string, status: AssetStatus, note?: string, userId?: string, userName?: string) => void;
  addAsset: (asset: Asset) => void;
  resetData: () => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [...mockAssets],
  getAsset: (id) => get().assets.find((a) => a.id === id),
  getAssetsByBrand: (brandId) => get().assets.filter((a) => a.brandId === brandId),
  updateAssetStatus: (assetId, status, note, userId, userName) => {
    set((state) => ({
      assets: state.assets.map((a) => {
        if (a.id !== assetId) return a;
        const auditEntry = {
          id: `at-${Date.now()}`,
          action: status === 'approved' ? '审核通过' : status === 'rejected' ? '审核拒绝' : `状态变更为${status}`,
          fromStatus: a.status,
          toStatus: status,
          userId: userId || 'u1',
          userName: userName || '系统',
          timestamp: new Date().toISOString(),
          note,
        };
        return { ...a, status, updatedAt: new Date().toISOString(), auditTrail: [...a.auditTrail, auditEntry] };
      }),
    }));
  },
  addAsset: (asset) => set((state) => ({ assets: [asset, ...state.assets] })),
  resetData: () => set({ assets: [...mockAssets] }),
}));
