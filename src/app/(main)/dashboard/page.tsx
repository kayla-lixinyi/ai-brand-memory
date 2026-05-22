'use client';

import React from 'react';
import { useAssetStore } from '@/store/asset-store';
import { useApprovalStore } from '@/store/approval-store';
import { useFilterStore } from '@/store/filter-store';
import { STATUS_CONFIG, ROLE_LABELS, AssetStatus } from '@/types';
import { users } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, timeAgo } from '@/lib/utils';
import { BarChart3, Clock, Users, AlertTriangle, FileImage, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const assets = useAssetStore((s) => s.assets);
  const pending = useApprovalStore((s) => s.getPending());
  const { activeBrandId } = useFilterStore();

  const brandAssets = assets.filter((a) => a.brandId === activeBrandId);
  const totalAssets = brandAssets.length;
  const pendingCount = pending.length;
  const activeUsers = new Set(brandAssets.map((a) => a.uploadedBy)).size;
  const expiringSoon = brandAssets.filter((a) => a.status === 'expired').length;

  // Status distribution for pie chart
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

  // Build conic-gradient
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

  // Recent uploads
  const recentUploads = [...brandAssets].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">管理看板</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileImage} label="总素材数" value={totalAssets} color="text-primary" />
        <StatCard icon={Clock} label="待审批" value={pendingCount} color="text-amber-500" />
        <StatCard icon={Users} label="活跃用户" value={activeUsers} color="text-blue-500" />
        <StatCard icon={AlertTriangle} label="已过期" value={expiringSoon} color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> 状态分布
          </h3>
          <div className="flex items-center gap-6">
            <div
              className="w-32 h-32 rounded-full shrink-0"
              style={{ background: totalAssets > 0 ? gradient : '#e5e7eb' }}
            />
            <div className="space-y-2 flex-1">
              {pieSegments.map(({ status, count, percent }) => (
                <div key={status} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: statusColors[status] }} />
                  <span className="flex-1">{STATUS_CONFIG[status].label}</span>
                  <span className="font-medium">{count}</span>
                  <span className="text-muted-foreground w-10 text-right">{percent.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent uploads */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> 最近上传
          </h3>
          <div className="space-y-3">
            {recentUploads.map((asset) => {
              const uploader = users.find((u) => u.id === asset.uploadedBy);
              const cfg = STATUS_CONFIG[asset.status];
              return (
                <Link key={asset.id} href={`/assets/${asset.id}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img src={asset.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate group-hover:text-primary transition-colors">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{uploader?.name} · {timeAgo(asset.uploadedAt)}</p>
                  </div>
                  <Badge className={cn('text-[10px] px-1.5 py-0', cfg.bgClass, cfg.textClass)} variant="secondary">
                    {cfg.label}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* RBAC overview */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" /> 角色权限概览
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">角色</th>
                <th className="text-center py-2 font-medium text-muted-foreground">查看</th>
                <th className="text-center py-2 font-medium text-muted-foreground">上传</th>
                <th className="text-center py-2 font-medium text-muted-foreground">审批</th>
                <th className="text-center py-2 font-medium text-muted-foreground">删除</th>
                <th className="text-center py-2 font-medium text-muted-foreground">设置</th>
              </tr>
            </thead>
            <tbody>
              {(['admin', 'brand_manager', 'designer', 'reviewer', 'viewer'] as const).map((role) => (
                <tr key={role} className="border-b border-border/50">
                  <td className="py-2 font-medium">{ROLE_LABELS[role]}</td>
                  {['view', 'upload', 'approve', 'delete', 'manage_settings'].map((perm) => (
                    <td key={perm} className="text-center py-2">
                      {hasRolePerm(role, perm) ? '✓' : '—'}
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

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center bg-muted', color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
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
