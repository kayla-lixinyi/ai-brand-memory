'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useFilterStore } from '@/store/filter-store';
import { useSearch } from '@/hooks/use-search';
import { useAssetStore } from '@/store/asset-store';
import { SearchMode } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Search, Sparkles, ImageIcon, Loader2, X, Upload, Wand2, ScanEye } from 'lucide-react';

export function SearchBar({
  onSemanticResults,
}: {
  onSemanticResults?: (assetIds: string[], reason: string) => void;
}) {
  const { searchQuery, setSearchQuery, searchMode, setSearchMode } = useFilterStore();
  const { results, loading, matchReason, semanticSearch } = useSearch();
  const [showImageDrop, setShowImageDrop] = useState(false);
  const [imageSearchState, setImageSearchState] = useState<'idle' | 'processing' | 'done'>('idle');

  const switchMode = useCallback((mode: SearchMode) => {
    if (mode === searchMode) return;
    setSearchMode(mode);
    setSearchQuery('');
    setImageSearchState('idle');
    if (onSemanticResults) onSemanticResults([], '');
  }, [searchMode, setSearchMode, setSearchQuery, onSemanticResults]);

  const triggerImageSearch = useCallback(() => {
    if (imageSearchState === 'processing') return;
    setImageSearchState('processing');
    setTimeout(() => {
      setImageSearchState('done');
      if (onSemanticResults) {
        onSemanticResults(
          ['a1', 'a4', 'a11', 'a21'],
          '以图搜图：找到 4 个视觉相似的素材（最高相似度 92%）'
        );
      }
    }, 800);
  }, [imageSearchState, onSemanticResults]);

  useEffect(() => {
    if (searchMode === 'semantic' && searchQuery) {
      semanticSearch(searchQuery);
    }
  }, [searchQuery, searchMode, semanticSearch]);

  useEffect(() => {
    if (searchMode === 'semantic' && results.length > 0 && onSemanticResults) {
      onSemanticResults(
        results.map((r) => r.assetId),
        matchReason
      );
    }
  }, [results, matchReason, searchMode, onSemanticResults]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchMode === 'semantic') {
        semanticSearch(searchQuery);
      }
    },
    [searchMode, searchQuery, semanticSearch]
  );

  return (
    <div className="space-y-3">
      {/* Unified search bar with integrated mode switcher */}
      <div className="flex gap-2 items-stretch">
        {/* Main search input area */}
        <div className="flex-1 relative">
          {/* Left icon changes with mode */}
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
            {searchMode === 'semantic' ? (
              <Sparkles className="w-4 h-4 text-primary" />
            ) : searchMode === 'image' ? (
              <ScanEye className="w-4 h-4 text-primary" />
            ) : (
              <Search className="w-4 h-4 text-muted-foreground" />
            )}
          </div>

          {searchMode !== 'image' ? (
            <input
              placeholder={
                searchMode === 'fulltext'
                  ? '搜索素材名称、标签、SKU...'
                  : '用自然语言搜索，如 "红色系口红主图"、"夏日清新风格海报"...'
              }
              className={cn(
                'w-full h-11 pl-10 pr-10 text-sm bg-background border rounded-xl outline-none transition-all',
                'placeholder:text-muted-foreground/50',
                searchMode === 'semantic'
                  ? 'border-primary/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 shadow-sm shadow-primary/5'
                  : 'border-border/60 focus:border-border focus:ring-1 focus:ring-border/30'
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            /* Image search: inline drop zone */
            <div
              className={cn(
                'flex items-center gap-3 h-11 pl-10 pr-4 border rounded-xl transition-all',
                imageSearchState === 'processing'
                  ? 'border-primary/40 bg-primary/5'
                  : imageSearchState === 'done'
                    ? 'border-primary/30 bg-primary/5'
                    : showImageDrop
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-primary/30 hover:border-primary/40 cursor-pointer shadow-sm shadow-primary/5'
              )}
              onDragOver={(e) => { e.preventDefault(); setShowImageDrop(true); }}
              onDragLeave={() => setShowImageDrop(false)}
              onDrop={(e) => {
                e.preventDefault();
                setShowImageDrop(false);
                triggerImageSearch();
              }}
              onClick={() => {
                if (imageSearchState !== 'processing') triggerImageSearch();
              }}
            >
              {imageSearchState === 'processing' ? (
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                  <span className="text-primary font-medium">AI 视觉分析中...</span>
                </div>
              ) : imageSearchState === 'done' ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/a1-judydoll-velvet-lip.png"
                    alt="参考图"
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-primary/20 shrink-0"
                  />
                  <span className="text-xs text-primary font-medium">找到 4 个相似素材</span>
                  <Badge variant="secondary" className="text-[10px] ml-auto shrink-0 rounded-full px-2 py-0 bg-primary/10 text-primary border-0">
                    92%
                  </Badge>
                  <button
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageSearchState('idle');
                      if (onSemanticResults) onSemanticResults([], '');
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground/60">拖拽或点击上传图片，AI 查找视觉相似素材</span>
              )}
            </div>
          )}

          {/* Clear button */}
          {searchMode !== 'image' && searchQuery && (
            <button
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                setSearchQuery('');
                if (onSemanticResults) onSemanticResults([], '');
              }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {searchMode !== 'image' && loading && (
            <div className="absolute right-9 top-1/2 -translate-y-1/2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* AI feature quick-switch buttons — always visible, visually prominent */}
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => switchMode('fulltext')}
            className={cn(
              'flex items-center gap-1.5 px-3 h-11 rounded-xl text-xs font-medium transition-all border',
              searchMode === 'fulltext'
                ? 'bg-foreground/5 border-border/60 text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">搜索</span>
          </button>

          <button
            onClick={() => switchMode('semantic')}
            className={cn(
              'flex items-center gap-1.5 px-3 h-11 rounded-xl text-xs font-medium transition-all border',
              searchMode === 'semantic'
                ? 'bg-primary/8 border-primary/25 text-primary shadow-sm shadow-primary/10'
                : 'border-transparent text-muted-foreground hover:text-primary/80 hover:bg-primary/5'
            )}
          >
            <Sparkles className={cn('w-3.5 h-3.5', searchMode === 'semantic' && 'animate-pulse-glow')} />
            <span className="hidden sm:inline">AI 搜索</span>
          </button>

          <button
            onClick={() => switchMode('image')}
            className={cn(
              'flex items-center gap-1.5 px-3 h-11 rounded-xl text-xs font-medium transition-all border',
              searchMode === 'image'
                ? 'bg-primary/8 border-primary/25 text-primary shadow-sm shadow-primary/10'
                : 'border-transparent text-muted-foreground hover:text-primary/80 hover:bg-primary/5'
            )}
          >
            <ScanEye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">以图搜图</span>
          </button>
        </div>
      </div>

      {/* AI feature hint — shows when NOT in AI mode, to promote the features */}
      {searchMode === 'fulltext' && !searchQuery && (
        <div className="flex items-center gap-4 px-1">
          <button
            onClick={() => switchMode('semantic')}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-primary transition-colors group"
          >
            <Wand2 className="w-3 h-3 group-hover:text-primary transition-colors" />
            试试 AI 语义搜索 — 用自然语言描述你想要的素材
          </button>
          <span className="text-border">|</span>
          <button
            onClick={() => switchMode('image')}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-primary transition-colors group"
          >
            <ScanEye className="w-3 h-3 group-hover:text-primary transition-colors" />
            以图搜图 — 上传图片查找相似素材
          </button>
        </div>
      )}

      {/* Semantic search results bar */}
      {searchMode === 'semantic' && matchReason && !loading && (
        <div className="flex items-center gap-2.5 px-4 py-2 glass rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium">{matchReason}</p>
          <Badge variant="secondary" className="text-[10px] ml-auto shrink-0 rounded-full px-2.5 bg-primary/10 text-primary border-0">
            {results.length} 个结果
          </Badge>
        </div>
      )}
    </div>
  );
}
