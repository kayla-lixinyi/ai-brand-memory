'use client';

import { useState, useCallback } from 'react';
import { semanticSearchMap } from '@/data/mock';
import { useAssetStore } from '@/store/asset-store';
import { SearchResult } from '@/types';

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [matchReason, setMatchReason] = useState('');
  const assets = useAssetStore((s) => s.assets);

  const semanticSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setResults([]);
        setMatchReason('');
        return;
      }

      setLoading(true);
      setResults([]);
      setMatchReason('');

      // Simulate AI processing delay
      setTimeout(() => {
        const q = query.toLowerCase().trim();
        let matched: SearchResult[] = [];
        let reason = '';

        // Check semantic map (case insensitive)
        for (const [key, value] of Object.entries(semanticSearchMap)) {
          if (key.toLowerCase().includes(q) || q.includes(key.toLowerCase())) {
            matched = value.assetIds.map((id, i) => ({
              assetId: id,
              score: 0.95 - i * 0.05,
              matchReason: value.reason,
            }));
            reason = value.reason;
            break;
          }
        }

        // Fallback: fuzzy match on AI tags
        if (matched.length === 0) {
          const tagMatches = assets.filter((a) =>
            a.aiTags.some(
              (t) => t.label.toLowerCase().includes(q) || t.labelEn.toLowerCase().includes(q)
            )
          );
          matched = tagMatches.map((a, i) => ({
            assetId: a.id,
            score: 0.8 - i * 0.03,
            matchReason: `AI 标签匹配: ${a.aiTags
              .filter((t) => t.label.toLowerCase().includes(q) || t.labelEn.toLowerCase().includes(q))
              .map((t) => t.label)
              .join(', ')}`,
          }));
          if (matched.length > 0) {
            reason = `AI 标签模糊匹配 "${query}"`;
          }
        }

        setResults(matched);
        setMatchReason(reason);
        setLoading(false);
      }, 600);
    },
    [assets]
  );

  return { results, loading, matchReason, semanticSearch };
}
