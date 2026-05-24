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
import { Search, Sparkles, ImageIcon, Loader2, X, Upload } from 'lucide-react';

const MODES: { mode: SearchMode; label: string; icon: React.ElementType; desc: string }[] = [
  { mode: 'fulltext', label: '全文搜索', icon: Search, desc: '按名称、标签、SKU 搜索' },
  { mode: 'semantic', label: 'AI 语义搜索', icon: Sparkles, desc: '自然语言描述，AI 理解意图' },
  { mode: 'image', label: '以图搜图', icon: ImageIcon, desc: '上传图片查找相似素材' },
];

export function SearchBar({
  onSemanticResults,
}: {
  onSemanticResults?: (assetIds: string[], reason: string) => void;
}) {
  const { searchQuery, setSearchQuery, searchMode, setSearchMode } = useFilterStore();
  const { results, loading, matchReason, semanticSearch } = useSearch();
  const [showImageDrop, setShowImageDrop] = useState(false);
  const [imageSearchState, setImageSearchState] = useState<'idle' | 'processing' | 'done'>('idle');

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
    <div className="space-y-2.5">
      {/* Mode tabs — pill radio group */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-full w-fit">
        {MODES.map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
              searchMode === mode
                ? 'bg-white dark:bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => {
              setSearchMode(mode);
              if (mode !== searchMode) {
                setSearchQuery('');
                setImageSearchState('idle');
                if (onSemanticResults) onSemanticResults([], '');
              }
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Search input */}
      {searchMode !== 'image' ? (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchMode === 'fulltext' ? '搜索素材名称、标签、SKU...' : '输入自然语言描述，如"红色口红"、"夏日清新风格"...'}
            className="pl-10 pr-10 h-10 rounded-full border-border/60 bg-background/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                setSearchQuery('');
                if (onSemanticResults) onSemanticResults([], '');
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {loading && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        /* Image search drop zone */
        <div className="space-y-2.5">
          <div
            className={cn(
              'border-2 border-dashed rounded-2xl p-8 text-center transition-all',
              imageSearchState === 'processing' ? 'border-primary bg-primary/5' :
              showImageDrop ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 hover:border-primary/50',
              imageSearchState !== 'processing' && 'cursor-pointer'
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setShowImageDrop(true);
            }}
            onDragLeave={() => setShowImageDrop(false)}
            onDrop={(e) => {
              e.preventDefault();
              setShowImageDrop(false);
              triggerImageSearch();
            }}
            onClick={() => {
              if (imageSearchState !== 'processing') {
                triggerImageSearch();
              }
            }}
          >
            {imageSearchState === 'processing' ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/a1-judydoll-velvet-lip.png"
                  alt="上传预览"
                  className="w-14 h-14 rounded-2xl mx-auto mb-3 object-cover ring-2 ring-primary/30"
                />
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-sm font-medium text-primary">AI 分析中...</p>
                </div>
                <p className="text-xs text-muted-foreground">正在提取视觉特征并匹配相似素材</p>
              </>
            ) : imageSearchState === 'done' ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/a1-judydoll-velvet-lip.png"
                  alt="上传预览"
                  className="w-14 h-14 rounded-2xl mx-auto mb-3 object-cover ring-2 ring-primary/20 opacity-60"
                />
                <p className="text-sm font-medium text-muted-foreground">分析完成 — 点击重新上传</p>
                <p className="text-xs text-muted-foreground mt-1">或拖拽新图片替换</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-muted mx-auto mb-3 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">拖拽图片到此处，或点击上传</p>
                <p className="text-xs text-muted-foreground mt-1">AI 将查找视觉相似的素材</p>
              </>
            )}
          </div>

          {/* Image search result summary */}
          {imageSearchState === 'done' && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/a1-judydoll-velvet-lip.png"
                alt="参考图"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <p className="text-xs text-primary font-medium">找到 4 个视觉相似素材</p>
                <p className="text-[10px] text-muted-foreground">最高相似度 92%</p>
              </div>
              <Badge variant="secondary" className="text-[10px] ml-auto shrink-0 rounded-full px-2.5 bg-primary/10 text-primary border-0">
                92% 匹配
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
          )}
        </div>
      )}

      {/* Semantic search results hint */}
      {searchMode === 'semantic' && matchReason && !loading && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-full">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium">{matchReason}</p>
          <Badge variant="secondary" className="text-[10px] ml-auto shrink-0 rounded-full px-2.5 bg-primary/10 text-primary border-0">
            {results.length} 个结果
          </Badge>
        </div>
      )}
    </div>
  );
}
