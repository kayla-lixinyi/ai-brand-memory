'use client';

import React, { useMemo } from 'react';
import { useAssetStore } from '@/store/asset-store';
import { useApprovalStore } from '@/store/approval-store';
import { useFilterStore } from '@/store/filter-store';
import { STATUS_CONFIG, ROLE_LABELS, AssetStatus, CHANNEL_CONFIG, Channel } from '@/types';
import { users } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, timeAgo } from '@/lib/utils';
import { BarChart3, Clock, Users, AlertTriangle, FileImage, TrendingUp, Sparkles, ArrowUpRight, Download, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const assets = useAssetStore((s) => s.assets);
  const approvalItems = useApprovalStore((s) => s.items);
  const { activeBrandId } = useFilterStore();

  const pendingItems = useMemo(() => approvalItems.filter((i) => i.status === 'pending'), [approvalItems]);
  const brandAssets = useMemo(() => assets.filter((a) => a.brandId === activeBrandId), [assets, activeBrandId]);
  const totalAssets = brandAssets.length;
  const pendingCount = pendingItems.length;
  const activeUsers = new Set(brandAssets.map((a) => a.uploadedBy)).size;
  const expiringSoon = brandAssets.filter((a) => a.status === 'expired').length;

  // Status distribution for donut chart
  const statusCounts: Record<AssetStatus, number> = {
    draft: 0, in_review: 0, approved: 0, expired: 0, rejected: 0, archived: 0,
  };
  brandAssets.forEach((a) => { statusCounts[a.status]++; });

  const pieSegments = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({
      status: status as AssetStatus,
      count,
      percent: totalAssets > 0 ? (count / totalAssets) * 100 : 0,
    }));

  const statusColors: Record<AssetStatus, string> = {
    draft: '#94a3b8', in_review: '#f59e0b', approved: '#10b981', expired: '#ef4444', rejected: '#f43f5e', archived: '#71717a',
  };
  let gradientParts: string[] = [];
  let cumPercent = 0;
  pieSegments.forEach(({ status, percent }) => {
    gradientParts.push(`${statusColors[status]} ${cumPercent}% ${cumPercent + percent}%`);
    cumPercent += percent;
  });
  const gradient = `conic-gradient(${gradientParts.join(', ')})`;

  const recentUploads = [...brandAssets].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 5);

  // Channel distribution
  const channelCounts: Record<Channel, number> = {
    shopee: 0, tiktok: 0, google: 0, instagram: 0, lazada: 0, official_site: 0,
  };
  brandAssets.forEach((a) => { a.channels.forEach((ch) => { channelCounts[ch]++; }); });
  const channelTotal = Object.values(channelCounts).reduce((s, c) => s + c, 0);
  const maxChannelCount = Math.max(...Object.values(channelCounts), 1);
  const channelEntries = (Object.entries(channelCounts) as [Channel, number][])
    .sort(([, a], [, b]) => b - a);

  // Top 5 most-downloaded assets
  const topDownloads = [...brandAssets]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);
  const maxDownloads = topDownloads.length > 0 ? topDownloads[0].downloads : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">管理看板</h1>
          <p className="text-sm text-muted-foreground">品牌素材数据概览</p>
        </div>
      </div>

      {/* Stats cards — gradient backgrounds */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FileImage} label="总素材数" value={totalAssets}
          gradient="stat-coral" iconColor="text-primary"
          link="/assets"
        />
        <StatCard
          icon={Clock} label="待审批" value={pendingCount}
          gradient="stat-amber" iconColor="text-amber-500"
          link="/approval"
        />
        <StatCard
          icon={Users} label="活跃用户" value={activeUsers}
          gradient="stat-blue" iconColor="text-blue-500"
        />
        <StatCard
          icon={AlertTriangle} label="已过期" value={expiringSoon}
          gradient="stat-red" iconColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Donut chart */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 pb-0">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> 状态分布
            </h3>
          </div>
          <div className="flex items-center gap-8 p-5">
            {/* Donut (hollow center) */}
            <div className="relative w-36 h-36 shrink-0">
              <div
                className="w-full h-full rounded-full"
                style={{ background: totalAssets > 0 ? gradient : '#e5e7eb' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-card flex flex-col items-center justify-center shadow-inner">
                  <span className="text-xl font-bold">{totalAssets}</span>
                  <span className="text-[10px] text-muted-foreground">总计</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 flex-1">
              {pieSegments.map(({ status, count, percent }) => (
                <div key={status} className="flex items-center gap-2.5 text-xs">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: statusColors[status] }} />
                  <span className="flex-1 font-medium">{STATUS_CONFIG[status].label}</span>
                  <span className="font-bold">{count}</span>
                  <span className="text-muted-foreground w-10 text-right">{percent.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent uploads */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 pb-0">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> 最近上传
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {recentUploads.map((asset, i) => {
              const uploader = users.find((u) => u.id === asset.uploadedBy);
              const cfg = STATUS_CONFIG[asset.status];
              return (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.id}`}
                  className="flex items-center gap-3 group p-2 -mx-2 rounded-xl hover:bg-muted/50 transition-colors animate-float-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border/30">
                    <img src={asset.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{uploader?.name} · {timeAgo(asset.uploadedAt)}</p>
                  </div>
                  <Badge className={cn('text-[10px] px-2 py-0.5 rounded-full', cfg.bgClass, cfg.textClass)} variant="secondary">
                    {cfg.label}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Channel Distribution & Top Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Channel Distribution Bar Chart */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 pb-0">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> 渠道分布
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {channelEntries.map(([channel, count], i) => {
              const cfg = CHANNEL_CONFIG[channel];
              const percent = channelTotal > 0 ? (count / channelTotal) * 100 : 0;
              const barWidth = maxChannelCount > 0 ? (count / maxChannelCount) * 100 : 0;
              return (
                <div
                  key={channel}
                  className="animate-float-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{cfg.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {count} <span className="text-[10px]">({percent.toFixed(0)}%)</span>
                    </span>
                  </div>
                  <div className="h-5 w-full rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: cfg.color,
                        minWidth: count > 0 ? '8px' : '0px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Downloaded Assets */}
        <Card className="p-0 overflow-hidden">
          <div className="p-5 pb-0">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" /> 热门素材 TOP 5
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {topDownloads.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">暂无数据</p>
            )}
            {topDownloads.map((asset, i) => {
              const dlBarWidth = maxDownloads > 0 ? (asset.downloads / maxDownloads) * 100 : 0;
              return (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.id}`}
                  className="flex items-center gap-3 group p-2 -mx-2 rounded-xl hover:bg-muted/50 transition-colors animate-float-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="text-lg font-bold text-muted-foreground/60 w-6 text-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border/30">
                    <img
                      src={asset.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {asset.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden max-w-[100px]">
                        <div
                          className="h-full rounded-full bg-primary/60 transition-all duration-500"
                          style={{ width: `${dlBarWidth}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {asset.downloads} 次下载
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 shrink-0 max-w-[120px] justify-end">
                    {asset.channels.map((ch) => (
                      <span
                        key={ch}
                        className="inline-flex text-[9px] px-1.5 py-0.5 rounded-full font-medium text-white"
                        style={{ backgroundColor: CHANNEL_CONFIG[ch].color }}
                      >
                        {CHANNEL_CONFIG[ch].label}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* RBAC overview — styled table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> 角色权限概览
          </h3>
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-2.5 font-semibold text-muted-foreground">角色</th>
                <th className="text-center py-2.5 font-semibold text-muted-foreground">查看</th>
                <th className="text-center py-2.5 font-semibold text-muted-foreground">上传</th>
                <th className="text-center py-2.5 font-semibold text-muted-foreground">审批</th>
                <th className="text-center py-2.5 font-semibold text-muted-foreground">删除</th>
                <th className="text-center py-2.5 font-semibold text-muted-foreground">设置</th>
              </tr>
            </thead>
            <tbody>
              {(['admin', 'brand_manager', 'designer', 'reviewer', 'viewer'] as const).map((role) => (
                <tr key={role} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 font-semibold">{ROLE_LABELS[role]}</td>
                  {['view', 'upload', 'approve', 'delete', 'manage_settings'].map((perm) => (
                    <td key={perm} className="text-center py-2.5">
                      {hasRolePerm(role, perm) ? (
                        <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[10px]">✓</span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, gradient, iconColor, link }: {
  icon: React.ElementType; label: string; value: number; gradient: string; iconColor: string; link?: string;
}) {
  const inner = (
    <Card className={cn('p-0 overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow card-lift group', gradient)}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center bg-white/60 dark:bg-black/20 shadow-sm', iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
          {link && <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
        <p className="text-3xl font-bold mt-3 tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">{label}</p>
      </div>
    </Card>
  );

  if (link) return <Link href={link}>{inner}</Link>;
  return inner;
}

function hasRolePerm(role: string, perm: string): boolean {
  const map: Record<string, string[]> = {
    admin: ['view', 'upload', 'approve', 'delete', 'manage_settings'],
    brand_manager: ['view', 'upload', 'approve', 'delete', 'manage_settings'],
    designer: ['view', 'upload'],
    reviewer: ['view', 'approve'],
    viewer: ['view'],
  };
  return map[role]?.includes(perm) ?? false;
}
