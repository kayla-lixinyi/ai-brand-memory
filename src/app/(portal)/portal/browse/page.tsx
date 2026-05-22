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
import { Download, LogOut, Image as ImageIcon, Stamp } from 'lucide-react';
import { toast } from 'sonner';

const allChannels: Channel[] = ['shopee', 'tiktok', 'google', 'instagram', 'lazada', 'official_site'];

export default function PortalBrowsePage() {
  const router = useRouter();
  const assets = useAssetStore((s) => s.assets);
  const [brandId, setBrandId] = useState('florasis');
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

  // Only show approved assets
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
          <h1 className="text-lg font-semibold">{brand?.name} 素材库</h1>
          <p className="text-sm text-muted-foreground mt-0.5">仅显示已审批通过的素材</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={handleLogout}>
          <LogOut className="w-3.5 h-3.5" /> 退出
        </Button>
      </div>

      {/* Channel tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <Button
          variant={selectedChannel === 'all' ? 'default' : 'outline'}
          size="sm"
          className="h-8 text-xs shrink-0"
          onClick={() => setSelectedChannel('all')}
        >
          全部渠道
        </Button>
        {allChannels.map((ch) => (
          <Button
            key={ch}
            variant={selectedChannel === ch ? 'default' : 'outline'}
            size="sm"
            className="h-8 text-xs shrink-0"
            onClick={() => setSelectedChannel(ch)}
          >
            {CHANNEL_CONFIG[ch].label}
          </Button>
        ))}
      </div>

      {/* Size presets */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-xs text-muted-foreground shrink-0">尺寸筛选:</span>
        <Badge
          variant={!selectedSize ? 'default' : 'outline'}
          className="cursor-pointer text-xs shrink-0"
          onClick={() => setSelectedSize(null)}
        >
          全部
        </Badge>
        {SIZE_PRESETS.map((sp) => (
          <Badge
            key={sp.label}
            variant={selectedSize === sp.label ? 'default' : 'outline'}
            className="cursor-pointer text-xs shrink-0"
            onClick={() => setSelectedSize(selectedSize === sp.label ? null : sp.label)}
          >
            {sp.width}×{sp.height}
          </Badge>
        ))}
      </div>

      {/* Asset count */}
      <p className="text-xs text-muted-foreground">{approvedAssets.length} 个素材</p>

      {/* Grid */}
      {approvedAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <ImageIcon className="w-10 h-10 mb-2" />
          <p className="text-sm">暂无符合条件的素材</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {approvedAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden group">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <Stamp className="w-16 h-16 text-white rotate-[-15deg]" />
                </div>
                {/* Channel badges */}
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {asset.channels.slice(0, 2).map((ch) => (
                    <span
                      key={ch}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/50 text-white backdrop-blur-sm"
                    >
                      {CHANNEL_CONFIG[ch].label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium truncate">{asset.name}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{asset.width}×{asset.height}</span>
                  <span>{formatFileSize(asset.fileSize)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 text-xs gap-1.5"
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
