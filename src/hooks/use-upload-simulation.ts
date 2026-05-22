'use client';

import { useState, useCallback } from 'react';
import { AITag } from '@/types';

interface UploadSimulation {
  progress: number;
  stage: 'idle' | 'uploading' | 'analyzing' | 'tagging' | 'complete';
  aiTags: AITag[];
  similarWarning: boolean;
  autoName: string;
}

const MOCK_AI_TAGS: AITag[] = [
  { label: '口红', labelEn: 'Lipstick', confidence: 0.98, category: 'product' },
  { label: '红色', labelEn: 'Red', confidence: 0.95, category: 'color' },
  { label: '产品特写', labelEn: 'Product Close-up', confidence: 0.92, category: 'scene' },
  { label: '简约风', labelEn: 'Minimalist', confidence: 0.88, category: 'style' },
  { label: '哑光质感', labelEn: 'Matte Texture', confidence: 0.84, category: 'material' },
];

export function useUploadSimulation() {
  const [state, setState] = useState<UploadSimulation>({
    progress: 0,
    stage: 'idle',
    aiTags: [],
    similarWarning: false,
    autoName: '',
  });

  const startUpload = useCallback((brandName: string, sku: string, channel: string, size: string) => {
    setState({ progress: 0, stage: 'uploading', aiTags: [], similarWarning: false, autoName: '' });

    // Upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        setState((s) => ({ ...s, progress: 100, stage: 'analyzing' }));

        // AI analysis
        setTimeout(() => {
          setState((s) => ({ ...s, stage: 'tagging' }));

          // Reveal tags one by one
          MOCK_AI_TAGS.forEach((tag, i) => {
            setTimeout(() => {
              setState((s) => ({
                ...s,
                aiTags: [...s.aiTags, tag],
              }));
            }, (i + 1) * 500);
          });

          // Auto name + similar warning
          setTimeout(() => {
            const autoName = `${brandName}_${sku}_${channel}_${size}_v1`;
            setState((s) => ({
              ...s,
              stage: 'complete',
              autoName,
              similarWarning: Math.random() > 0.4, // 60% chance
            }));
          }, MOCK_AI_TAGS.length * 500 + 300);
        }, 800);
      } else {
        setState((s) => ({ ...s, progress }));
      }
    }, 200);
  }, []);

  const reset = useCallback(() => {
    setState({ progress: 0, stage: 'idle', aiTags: [], similarWarning: false, autoName: '' });
  }, []);

  return { ...state, startUpload, reset };
}
