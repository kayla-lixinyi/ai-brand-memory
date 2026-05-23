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
        <Card className="flex items-center gap-4 p-3 hover:shadow-md hover:shadow-primary/5 transition-shadow cursor-pointer group">
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
            <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover" />
            <div className="absolute top-1 left-1">
              <TypeIcon className="w-3.5 h-3.5 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{asset.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={cn('text-[10px] px-1.5 py-0', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
                {statusCfg.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{CATEGORY_LABELS[asset.category]}</span>
              <span className="text-xs text-muted-foreground">{asset.width}x{asset.height}</span>
            </div>
          </div>

          {/* Channels */}
          <div className="flex gap-1">
            {asset.channels.slice(0, 3).map((ch) => (
              <Badge key={ch} variant="outline" className="text-[10px] px-1.5 py-0">
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
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/assets/${asset.id}`}>
      <Card className="overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group border-border/40">
        {/* Thumbnail */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Status badge */}
          <div className="absolute top-2 left-2">
            <Badge className={cn('text-[10px] px-2 py-0.5 shadow-sm', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
              {statusCfg.label}
            </Badge>
          </div>
          {/* Type icon */}
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
            <TypeIcon className="w-3.5 h-3.5 text-white" />
          </div>
          {/* Channels */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            {asset.channels.slice(0, 3).map((ch) => (
              <span
                key={ch}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/50 text-white backdrop-blur-sm"
              >
                {CHANNEL_CONFIG[ch].label}
              </span>
            ))}
            {asset.channels.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/50 text-white backdrop-blur-sm">
                +{asset.channels.length - 3}
              </span>
            )}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{asset.name}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {asset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
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
