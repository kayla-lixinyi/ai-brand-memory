'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useFilterStore } from '@/store/filter-store';
import { useSearch } from '@/hooks/use-search';
import { useAssetStore } from '@/store/asset-store';
import { SearchMode, Asset } from '@/types';
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

  // Trigger semantic search when query changes in semantic mode
  useEffect(() => {
    if (searchMode === 'semantic' && searchQuery) {
      semanticSearch(searchQuery);
    }
  }, [searchQuery, searchMode, semanticSearch]);

  // Notify parent of semantic results
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
    <div className="space-y-2">
      {/* Mode tabs */}
      <div className="flex items-center gap-1">
        {MODES.map(({ mode, label, icon: Icon }) => (
          <Button
            key={mode}
            variant={searchMode === mode ? 'default' : 'ghost'}
            size="sm"
            className={cn('h-7 text-xs gap-1.5', searchMode === mode && 'bg-primary')}
            onClick={() => {
              setSearchMode(mode);
              if (mode !== searchMode) {
                setSearchQuery('');
                if (onSemanticResults) onSemanticResults([], '');
              }
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Button>
        ))}
      </div>

      {/* Search input */}
      {searchMode !== 'image' ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchMode === 'fulltext' ? '搜索素材名称、标签、SKU...' : '输入自然语言描述，如"红色口红"、"dreamy girl style"...'}
            className="pl-9 pr-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
            showImageDrop ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setShowImageDrop(true);
          }}
          onDragLeave={() => setShowImageDrop(false)}
          onDrop={(e) => {
            e.preventDefault();
            setShowImageDrop(false);
            // Simulate image search (demo only)
            if (onSemanticResults) {
              onSemanticResults(['a1', 'a2', 'a4', 'a21'], '以图搜图：找到视觉相似的素材');
            }
          }}
          onClick={() => {
            // Simulate image search on click (demo only)
            if (onSemanticResults) {
              onSemanticResults(['a1', 'a4', 'a11', 'a21'], '以图搜图演示：找到视觉相似的素材');
            }
          }}
        >
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">拖拽图片到此处，或点击上传</p>
          <p className="text-xs text-muted-foreground mt-1">AI 将查找视觉相似的素材</p>
        </div>
      )}

      {/* Semantic search results hint */}
      {searchMode === 'semantic' && matchReason && !loading && (
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs text-primary">{matchReason}</p>
          <Badge variant="secondary" className="text-[10px] ml-auto shrink-0">
            {results.length} 个结果
          </Badge>
        </div>
      )}

      {/* Mode description */}
      <p className="text-[11px] text-muted-foreground">
        {MODES.find((m) => m.mode === searchMode)?.desc}
      </p>
    </div>
  );
}
