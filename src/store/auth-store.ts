'use client';

import { create } from 'zustand';
import { User, UserRole } from '@/types';
import { users } from '@/data/mock';

interface AuthState {
  currentUser: User;
  switchUser: (userId: string) => void;
  hasPermission: (action: 'upload' | 'approve' | 'delete' | 'manage_settings' | 'view') => boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['upload', 'approve', 'delete', 'manage_settings', 'view'],
  brand_manager: ['upload', 'approve', 'delete', 'manage_settings', 'view'],
  designer: ['upload', 'view'],
  reviewer: ['approve', 'view'],
  viewer: ['view'],
};

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: users[0],
  switchUser: (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
  },
  hasPermission: (action) => {
    const { currentUser } = get();
    return ROLE_PERMISSIONS[currentUser.role]?.includes(action) ?? false;
  },
}));
