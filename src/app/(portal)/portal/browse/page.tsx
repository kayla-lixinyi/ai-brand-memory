'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAssetStore } from '@/store/asset-store';
import { brands } from '@/data/mock';
import { Asset, Channel, CHANNEL_CONFIG, SIZE_PRESETS } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, formatFileSize } from '@/lib/utils';
import { Download, LogOut, Image as ImageIcon, Stamp, Eye } from 'lucide-react';
import { toast } from 'sonner';

const allChannels: Channel[] = ['shopee', 'tiktok', 'google', 'instagram', 'lazada', 'official_site'];

export default function PortalBrowsePage() {
  const router = useRouter();
  const assets = useAssetStore((s) => s.assets);
  const [brandId, setBrandId] = useState('judydoll');
  const [selectedChannel, setSelectedChannel] = useState<Channel | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('portal_auth');
      const bid = sessionStorage.getItem('portal_brand');
      if (!auth) {
        router.push('/portal');
        return;
      }
      if (bid) setBrandId(bid);
    }
  }, [router]);

  const brand = brands.find((b) => b.id === brandId);

  const approvedAssets = useMemo(() => {
    let result = assets.filter((a) => a.brandId === brandId && a.status === 'approved');
    if (selectedChannel !== 'all') {
      result = result.filter((a) => a.channels.includes(selectedChannel));
    }
    if (selectedSize) {
      const preset = SIZE_PRESETS.find((sp) => sp.label === selectedSize);
      if (preset) {
        result = result.filter((a) => a.width === preset.width && a.height === preset.height);
      }
    }
    return result;
  }, [assets, brandId, selectedChannel, selectedSize]);

  const handleDownload = (asset: Asset) => {
    toast.success(`已下载: ${asset.name}（带水印）`, { description: '水印已自动添加到下载文件中' });
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('portal_auth');
      sessionStorage.removeItem('portal_brand');
    }
    router.push('/portal');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{brand?.name} 素材库</h1>
          <p className="text-sm text-muted-foreground mt-0.5">仅显示已审批通过的素材</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full px-4 border-border/60" onClick={handleLogout}>
          <LogOut className="w-3.5 h-3.5" /> 退出
        </Button>
      </div>

      {/* Channel tabs — pill radio group */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-full w-fit overflow-x-auto">
        <button
          className={cn(
            'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0',
            selectedChannel === 'all'
              ? 'bg-white dark:bg-card text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setSelectedChannel('all')}
        >
          全部渠道
        </button>
        {allChannels.map((ch) => (
          <button
            key={ch}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0',
              selectedChannel === ch
                ? 'bg-white dark:bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setSelectedChannel(ch)}
          >
            {CHANNEL_CONFIG[ch].label}
          </button>
        ))}
      </div>

      {/* Size presets */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">尺寸</span>
        <Badge
          variant={!selectedSize ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer text-[11px] shrink-0 rounded-full px-3 py-0.5 transition-all border-border/50',
            !selectedSize && 'bg-primary border-primary shadow-sm shadow-primary/20'
          )}
          onClick={() => setSelectedSize(null)}
        >
          全部
        </Badge>
        {SIZE_PRESETS.map((sp) => (
          <Badge
            key={sp.label}
            variant={selectedSize === sp.label ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer text-[11px] shrink-0 rounded-full px-3 py-0.5 transition-all border-border/50',
              selectedSize === sp.label && 'bg-primary border-primary shadow-sm shadow-primary/20'
            )}
            onClick={() => setSelectedSize(selectedSize === sp.label ? null : sp.label)}
          >
            {sp.width}×{sp.height}
          </Badge>
        ))}
      </div>

      {/* Asset count */}
      <p className="text-xs text-muted-foreground font-medium">{approvedAssets.length} 个素材</p>

      {/* Grid */}
      {approvedAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
            <ImageIcon className="w-8 h-8 opacity-40" />
          </div>
          <p className="text-sm font-medium">暂无符合条件的素材</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {approvedAssets.map((asset, i) => (
            <Card
              key={asset.id}
              className="overflow-hidden group card-lift border-border/40 animate-float-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                  <Stamp className="w-16 h-16 text-white rotate-[-15deg]" />
                </div>
                {/* Channel pills */}
                <div className="absolute bottom-2.5 left-2.5 flex gap-1">
                  {asset.channels.slice(0, 2).map((ch) => (
                    <span
                      key={ch}
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-black/40 text-white backdrop-blur-sm"
                    >
                      {CHANNEL_CONFIG[ch].label}
                    </span>
                  ))}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5 text-foreground/80" />
                  </div>
                </div>
              </div>
              <div className="p-3.5 space-y-2.5">
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{asset.name}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{asset.width}×{asset.height}</span>
                  <span>{formatFileSize(asset.fileSize)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 text-xs gap-1.5 rounded-full border-border/60"
                  onClick={() => handleDownload(asset)}
                >
                  <Download className="w-3.5 h-3.5" /> 下载（含水印）
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
