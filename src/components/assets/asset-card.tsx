'use client';

import React from 'react';
import Link from 'next/link';
import { Asset, STATUS_CONFIG, CHANNEL_CONFIG, CATEGORY_LABELS, TYPE_LABELS } from '@/types';
import { cn, formatFileSize, timeAgo } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Download, Eye, Film, FileText, Image as ImageIcon } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Film,
  document: FileText,
  psd: FileText,
  ai: FileText,
};

export function AssetCard({ asset, viewMode = 'grid' }: { asset: Asset; viewMode?: 'grid' | 'list' }) {
  const statusCfg = STATUS_CONFIG[asset.status];
  const TypeIcon = typeIcons[asset.type] || ImageIcon;

  if (viewMode === 'list') {
    return (
      <Link href={`/assets/${asset.id}`}>
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-card ring-1 ring-foreground/5 shadow-sm card-lift cursor-pointer group">
          {/* Thumbnail */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border/30">
            <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute top-0.5 left-0.5">
              <TypeIcon className="w-3 h-3 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{asset.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={cn('text-[10px] px-2 py-0 rounded-full', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
                {statusCfg.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{CATEGORY_LABELS[asset.category]}</span>
              {asset.width > 0 && <span className="text-xs text-muted-foreground">{asset.width}×{asset.height}</span>}
            </div>
          </div>

          {/* Channels */}
          <div className="hidden md:flex gap-1 shrink-0">
            {asset.channels.slice(0, 3).map((ch) => (
              <Badge key={ch} variant="outline" className="text-[10px] px-2 py-0 rounded-full border-border/60">
                {CHANNEL_CONFIG[ch].label}
              </Badge>
            ))}
          </div>

          {/* Meta */}
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">{timeAgo(asset.updatedAt)}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
              <Download className="w-3 h-3" /> {asset.downloads}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/assets/${asset.id}`}>
      <Card className="overflow-hidden card-lift cursor-pointer group border-border/40">
        {/* Thumbnail — large, visual-first */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Status badge — pill */}
          <div className="absolute top-2.5 left-2.5">
            <Badge className={cn('text-[10px] px-2.5 py-0.5 rounded-full shadow-sm', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
              {statusCfg.label}
            </Badge>
          </div>
          {/* Type icon — softer circle */}
          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <TypeIcon className="w-3.5 h-3.5 text-white" />
          </div>
          {/* Channels — bottom pills */}
          <div className="absolute bottom-2.5 left-2.5 flex gap-1">
            {asset.channels.slice(0, 3).map((ch) => (
              <span
                key={ch}
                className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-black/40 text-white backdrop-blur-sm"
              >
                {CHANNEL_CONFIG[ch].label}
              </span>
            ))}
            {asset.channels.length > 3 && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-black/40 text-white backdrop-blur-sm">
                +{asset.channels.length - 3}
              </span>
            )}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
              <Eye className="w-5 h-5 text-foreground/80" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{asset.name}</p>
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            {asset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 rounded-full font-normal border-border/50">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2.5 text-xs text-muted-foreground">
            <span>{timeAgo(asset.updatedAt)}</span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" /> {asset.downloads}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
