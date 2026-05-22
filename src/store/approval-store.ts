'use client';

import { create } from 'zustand';
import { ApprovalItem } from '@/types';
import { approvalItems as mockApprovals } from '@/data/mock';

interface ApprovalState {
  items: ApprovalItem[];
  getPending: () => ApprovalItem[];
  getHistory: () => ApprovalItem[];
  approve: (itemId: string, reviewerId: string) => void;
  reject: (itemId: string, reviewerId: string, reason: string) => void;
  batchApprove: (itemIds: string[], reviewerId: string) => void;
  resetData: () => void;
}

export const useApprovalStore = create<ApprovalState>((set, get) => ({
  items: [...mockApprovals],
  getPending: () => get().items.filter((i) => i.status === 'pending'),
  getHistory: () => get().items.filter((i) => i.status !== 'pending'),
  approve: (itemId, reviewerId) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId
          ? { ...i, status: 'approved' as const, reviewedBy: reviewerId, reviewedAt: new Date().toISOString() }
          : i
      ),
    }));
  },
  reject: (itemId, reviewerId, reason) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId
          ? { ...i, status: 'rejected' as const, reviewedBy: reviewerId, reviewedAt: new Date().toISOString(), rejectReason: reason }
          : i
      ),
    }));
  },
  batchApprove: (itemIds, reviewerId) => {
    set((state) => ({
      items: state.items.map((i) =>
        itemIds.includes(i.id)
          ? { ...i, status: 'approved' as const, reviewedBy: reviewerId, reviewedAt: new Date().toISOString() }
          : i
      ),
    }));
  },
  resetData: () => set({ items: [...mockApprovals] }),
}));
