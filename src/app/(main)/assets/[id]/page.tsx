'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useAssetStore } from '@/store/asset-store';
import { Asset, STATUS_CONFIG, CHANNEL_CONFIG, CATEGORY_LABELS, TYPE_LABELS } from '@/types';
import { cn, formatFileSize, timeAgo, formatDateTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft, Download, Tag, Layers, ChevronRight, Eye, History, GitBranch, Sparkles, Info,
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
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Eye className="w-10 h-10 opacity-40" />
        </div>
        <p className="text-lg font-semibold text-muted-foreground">素材不存在</p>
        <Link href="/assets">
          <Button variant="outline" className="mt-4 gap-2 rounded-full px-5">
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
      <div className="flex items-center gap-2.5 text-sm">
        <Link href="/assets" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> 素材库
        </Link>
        <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
        <span className="font-semibold truncate max-w-xs">{asset.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Preview */}
        <div className="lg:col-span-2 space-y-5">
          {/* Image preview */}
          <Card className="overflow-hidden border-border/40">
            <div className="relative bg-muted/50">
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
                    <Badge className="absolute top-3 left-3 text-[10px] rounded-full px-2.5 shadow-sm">v{asset.currentVersion - 1}</Badge>
                  </div>
                  <div className="relative">
                    <img
                      src={asset.versions[asset.versions.length - 1]?.url || asset.url}
                      alt="Current"
                      className="w-full max-h-[400px] object-contain"
                    />
                    <Badge className="absolute top-3 left-3 text-[10px] rounded-full px-2.5 bg-primary shadow-sm shadow-primary/20">v{asset.currentVersion}</Badge>
                  </div>
                </div>
              )}
              {/* Status badge overlay */}
              <div className="absolute top-3 right-3">
                <Badge className={cn('text-[10px] px-2.5 py-0.5 rounded-full shadow-sm', statusCfg.bgClass, statusCfg.textClass)} variant="secondary">
                  {statusCfg.label}
                </Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-border/30">
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-muted-foreground font-medium">版本 v{viewingVersion}</span>
                {asset.versions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs gap-1.5 rounded-full"
                    onClick={() => setShowCompare(!showCompare)}
                  >
                    <GitBranch className="w-3 h-3" />
                    {showCompare ? '关闭对比' : '版本对比'}
                  </Button>
                )}
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-full px-4 border-border/60">
                <Download className="w-3 h-3" /> 下载
              </Button>
            </div>
          </Card>

          {/* Version timeline */}
          <Card className="p-5 border-border/40">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> 版本历史
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-border/40" />
              <div className="space-y-3">
                {asset.versions.map((v) => (
                  <div
                    key={v.version}
                    className={cn(
                      'relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all',
                      viewingVersion === v.version ? 'bg-primary/10 shadow-sm' : 'hover:bg-muted/50'
                    )}
                    onClick={() => {
                      setSelectedVersion(v.version);
                      setShowCompare(false);
                    }}
                  >
                    <div className={cn(
                      'relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all',
                      v.version === asset.currentVersion
                        ? 'bg-gradient-coral text-white shadow-md shadow-primary/30'
                        : viewingVersion === v.version
                          ? 'bg-primary/20 text-primary ring-2 ring-primary/30'
                          : 'bg-muted text-muted-foreground'
                    )}>
                      v{v.version}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{v.changeNote}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {timeAgo(v.uploadedAt)} · {formatFileSize(v.size)}
                      </p>
                    </div>
                    {v.version === asset.currentVersion && (
                      <Badge className="text-[10px] rounded-full px-2.5 bg-primary/10 text-primary border-0">当前</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* State Machine */}
          <Card className="p-5 border-border/40">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary" /> 状态流转
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {(['draft', 'in_review', 'approved', 'expired'] as const).map((s, i) => {
                const cfg = STATUS_CONFIG[s];
                const isCurrent = asset.status === s;
                const isPast = getStatusOrder(asset.status) > getStatusOrder(s);
                return (
                  <React.Fragment key={s}>
                    {i > 0 && (
                      <div className={cn(
                        'w-8 h-0.5 rounded-full transition-colors',
                        isPast || isCurrent ? 'bg-primary' : 'bg-border/60'
                      )} />
                    )}
                    <div className={cn(
                      'px-4 py-2 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition-all',
                      isCurrent
                        ? `${cfg.bgClass} ${cfg.textClass} border-current shadow-sm`
                        : isPast
                          ? 'bg-muted text-muted-foreground border-transparent'
                          : 'bg-background text-muted-foreground/60 border-border/40'
                    )}>
                      {cfg.label}
                    </div>
                  </React.Fragment>
                );
              })}
              {/* Rejected + Archived branches */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/40">
                <div className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold border-2 whitespace-nowrap',
                  asset.status === 'rejected'
                    ? `${STATUS_CONFIG.rejected.bgClass} ${STATUS_CONFIG.rejected.textClass} border-current shadow-sm`
                    : 'bg-background text-muted-foreground/40 border-border/30'
                )}>
                  {STATUS_CONFIG.rejected.label}
                </div>
                <div className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold border-2 whitespace-nowrap',
                  asset.status === 'archived'
                    ? `${STATUS_CONFIG.archived.bgClass} ${STATUS_CONFIG.archived.textClass} border-current shadow-sm`
                    : 'bg-background text-muted-foreground/40 border-border/30'
                )}>
                  {STATUS_CONFIG.archived.label}
                </div>
              </div>
            </div>
          </Card>

          {/* Audit trail */}
          <Card className="p-5 border-border/40">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-primary" /> 审计记录
            </h3>
            <div className="relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-border/30" />
              <div className="space-y-4">
                {asset.auditTrail.map((entry, i) => (
                  <div key={entry.id} className="flex gap-4 animate-float-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="relative z-10 w-3 h-3 rounded-full bg-primary/80 mt-1 shrink-0 ring-4 ring-background" />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{entry.userName}</span>
                        {' '}{entry.action}
                        {entry.fromStatus && entry.toStatus && (
                          <span className="text-muted-foreground">
                            {' '}
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full">{STATUS_CONFIG[entry.fromStatus].label}</Badge>
                            {' → '}
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full">{STATUS_CONFIG[entry.toStatus].label}</Badge>
                          </span>
                        )}
                      </p>
                      {entry.note && <p className="text-xs text-muted-foreground mt-1 italic">"{entry.note}"</p>}
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{formatDateTime(entry.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Meta panel */}
        <div className="space-y-5">
          {/* Basic info */}
          <Card className="p-5 space-y-4 border-border/40">
            <div>
              <h3 className="text-base font-bold">{asset.name}</h3>
              {asset.description && <p className="text-xs text-muted-foreground mt-1.5">{asset.description}</p>}
            </div>

            <div className="space-y-3 pt-3 border-t border-border/20">
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
            </div>
          </Card>

          {/* Channels */}
          <Card className="p-5 border-border/40">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> 投放渠道
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {asset.channels.map((ch) => (
                <Badge key={ch} variant="outline" className="text-[11px] rounded-full px-3 py-0.5 border-border/50">
                  {CHANNEL_CONFIG[ch].label}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-5 border-border/40">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> 标签
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[11px] font-normal rounded-full px-3 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* AI Tags */}
          <Card className="p-5 border-border/40 overflow-hidden">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> AI 标签
            </h3>
            <div className="space-y-3">
              {asset.aiTags.map((tag, i) => (
                <div key={tag.label} className="space-y-1.5 animate-float-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">
                      {tag.label} <span className="text-muted-foreground font-normal">/ {tag.labelEn}</span>
                    </span>
                    <span className="font-bold text-primary">{Math.round(tag.confidence * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-coral rounded-full transition-all"
                      style={{ width: `${tag.confidence * 100}%`, animation: 'confidence-fill 0.8s ease-out' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Related assets */}
          {relatedAssets.length > 0 && (
            <Card className="p-5 border-border/40">
              <h3 className="text-sm font-bold mb-3">相关素材</h3>
              <div className="grid grid-cols-3 gap-2">
                {relatedAssets.map((ra) => (
                  <Link key={ra.id} href={`/assets/${ra.id}`}>
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-muted group hover:ring-2 ring-primary/50 transition-all card-lift">
                      <img src={ra.thumbnailUrl} alt={ra.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
                        <p className="text-[9px] text-white truncate font-medium">{ra.name}</p>
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
    <div className="flex items-center justify-between text-xs py-0.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

function getStatusOrder(status: string): number {
  const order: Record<string, number> = { draft: 0, in_review: 1, approved: 2, expired: 3, rejected: 1.5, archived: 3.5 };
  return order[status] ?? 0;
}
