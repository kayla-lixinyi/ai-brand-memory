'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useAssetStore } from '@/store/asset-store';
import { Asset, STATUS_CONFIG, CHANNEL_CONFIG, CATEGORY_LABELS, TYPE_LABELS } from '@/types';
import { cn, formatFileSize, timeAgo, formatDateTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Download, Clock, User, Tag, FileText, Layers,
  ChevronRight, Eye, History, GitBranch,
} from 'lucide-react';

export default function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const asset = useAssetStore((s) => s.getAsset(id));
  const allAssets = useAssetStore((s) => s.assets);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-medium text-muted-foreground">素材不存在</p>
        <Link href="/assets">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> 返回素材库
          </Button>
        </Link>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[asset.status];
  const viewingVersion = selectedVersion ?? asset.currentVersion;
  const versionData = asset.versions.find((v) => v.version === viewingVersion);
  const relatedAssets = asset.relatedAssetIds
    .map((rid) => allAssets.find((a) => a.id === rid))
    .filter(Boolean) as Asset[];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/assets" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> 素材库
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate max-w-xs">{asset.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Preview */}
        <div className="lg:col-span-2 space-y-4">
          {/* Image preview */}
          <Card className="overflow-hidden">
            <div className="relative bg-muted">
              {!showCompare ? (
                <img
                  src={versionData?.url || asset.url}
                  alt={asset.name}
                  className="w-full max-h-[500px] object-contain"
                />
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <img
                      src={asset.versions[asset.versions.length - 2]?.url || asset.url}
                      alt="Previous"
                      className="w-full max-h-[400px] object-contain"
                    />
                    <Badge className="absolute top-2 left-2 text-xs">v{asset.currentVersion - 1}</Badge>
                  </div>
                  <div className="relative">
                    <img
                      src={asset.versions[asset.versions.length - 1]?.url || asset.url}
                      alt="Current"
                      className="w-full max-h-[400px] object-contain"
                    />
                    <Badge className="absolute top-2 left-2 text-xs bg-primary">v{asset.currentVersion}</Badge>
                  </div>
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className={cn('shadow-sm', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
                  {statusCfg.label}
                </Badge>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">查看版本 v{viewingVersion}</span>
                {asset.versions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setShowCompare(!showCompare)}
                  >
                    <GitBranch className="w-3 h-3 mr-1" />
                    {showCompare ? '关闭对比' : '版本对比'}
                  </Button>
                )}
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <Download className="w-3 h-3" /> 下载
              </Button>
            </div>
          </Card>

          {/* Version timeline */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 版本历史
            </h3>
            <div className="space-y-3">
              {asset.versions.map((v, i) => (
                <div
                  key={v.version}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors',
                    viewingVersion === v.version ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'
                  )}
                  onClick={() => {
                    setSelectedVersion(v.version);
                    setShowCompare(false);
                  }}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                    v.version === asset.currentVersion ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    v{v.version}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{v.changeNote}</p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(v.uploadedAt)} · {formatFileSize(v.size)}
                    </p>
                  </div>
                  {v.version === asset.currentVersion && (
                    <Badge className="text-[10px]">当前</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* State Machine */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4" /> 状态流转
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {(['draft', 'in_review', 'approved', 'expired'] as const).map((s, i) => {
                const cfg = STATUS_CONFIG[s];
                const isCurrent = asset.status === s;
                const isPast = getStatusOrder(asset.status) > getStatusOrder(s);
                return (
                  <React.Fragment key={s}>
                    {i > 0 && <div className={cn('w-8 h-0.5', isPast || isCurrent ? 'bg-primary' : 'bg-border')} />}
                    <div className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border-2 whitespace-nowrap',
                      isCurrent ? `${cfg.bgClass} ${cfg.textClass} border-current` :
                      isPast ? 'bg-muted text-muted-foreground border-muted-foreground/30' :
                      'bg-background text-muted-foreground border-border'
                    )}>
                      {cfg.label}
                    </div>
                  </React.Fragment>
                );
              })}
              {/* Rejected branch */}
              <div className="flex items-center gap-2 ml-2 opacity-60">
                <span className="text-xs text-muted-foreground">|</span>
                <div className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border-2 whitespace-nowrap',
                  asset.status === 'rejected'
                    ? `${STATUS_CONFIG.rejected.bgClass} ${STATUS_CONFIG.rejected.textClass} border-current`
                    : 'bg-background text-muted-foreground border-border'
                )}>
                  {STATUS_CONFIG.rejected.label}
                </div>
              </div>
            </div>
          </Card>

          {/* Audit trail */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <History className="w-4 h-4" /> 审计记录
            </h3>
            <div className="space-y-3">
              {asset.auditTrail.map((entry) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{entry.userName}</span>
                      {' '}{entry.action}
                      {entry.fromStatus && entry.toStatus && (
                        <span className="text-muted-foreground">
                          {' '}({STATUS_CONFIG[entry.fromStatus].label} → {STATUS_CONFIG[entry.toStatus].label})
                        </span>
                      )}
                    </p>
                    {entry.note && <p className="text-xs text-muted-foreground mt-0.5">"{entry.note}"</p>}
                    <p className="text-xs text-muted-foreground">{formatDateTime(entry.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Meta panel */}
        <div className="space-y-4">
          {/* Basic info */}
          <Card className="p-4 space-y-3">
            <h3 className="text-sm font-semibold">{asset.name}</h3>
            {asset.description && <p className="text-xs text-muted-foreground">{asset.description}</p>}

            <Separator />

            <MetaRow label="文件名" value={asset.fileName} />
            <MetaRow label="类型" value={TYPE_LABELS[asset.type]} />
            <MetaRow label="品类" value={CATEGORY_LABELS[asset.category]} />
            <MetaRow label="SKU" value={asset.sku} />
            {asset.width > 0 && <MetaRow label="尺寸" value={`${asset.width} × ${asset.height}`} />}
            <MetaRow label="文件大小" value={formatFileSize(asset.fileSize)} />
            <MetaRow label="版本" value={`v${asset.currentVersion}`} />
            <MetaRow label="下载次数" value={String(asset.downloads)} />
            <MetaRow label="上传时间" value={formatDateTime(asset.uploadedAt)} />
            <MetaRow label="更新时间" value={timeAgo(asset.updatedAt)} />
            {asset.expiresAt && <MetaRow label="过期时间" value={formatDateTime(asset.expiresAt)} />}
          </Card>

          {/* Channels */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-2">投放渠道</h3>
            <div className="flex flex-wrap gap-1.5">
              {asset.channels.map((ch) => (
                <Badge key={ch} variant="outline" className="text-xs">
                  {CHANNEL_CONFIG[ch].label}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" /> 标签
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* AI Tags */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-primary">✦</span> AI 标签
            </h3>
            <div className="space-y-2">
              {asset.aiTags.map((tag) => (
                <div key={tag.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {tag.label} <span className="text-muted-foreground">/ {tag.labelEn}</span>
                    </span>
                    <span className="text-muted-foreground">{Math.round(tag.confidence * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${tag.confidence * 100}%`, animation: 'confidence-fill 0.8s ease-out' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Related assets */}
          {relatedAssets.length > 0 && (
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3">相关素材</h3>
              <div className="grid grid-cols-3 gap-2">
                {relatedAssets.map((ra) => (
                  <Link key={ra.id} href={`/assets/${ra.id}`}>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted hover:ring-2 ring-primary transition-all">
                      <img src={ra.thumbnailUrl} alt={ra.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                        <p className="text-[9px] text-white truncate">{ra.name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

function getStatusOrder(status: string): number {
  const order: Record<string, number> = { draft: 0, in_review: 1, approved: 2, expired: 3, rejected: 1.5, archived: 3.5 };
  return order[status] ?? 0;
}
