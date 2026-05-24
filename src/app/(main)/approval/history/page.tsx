'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useApprovalStore } from '@/store/approval-store';
import { useAssetStore } from '@/store/asset-store';
import { users } from '@/data/mock';
import { cn, timeAgo } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, X, History } from 'lucide-react';

export default function ApprovalHistoryPage() {
  const approvalItems = useApprovalStore((s) => s.items);
  const history = useMemo(() => approvalItems.filter((i) => i.status !== 'pending'), [approvalItems]);
  const getAsset = useAssetStore((s) => s.getAsset);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/approval">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
            <History className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">审批历史</h1>
            <p className="text-sm text-muted-foreground">{history.length} 条记录</p>
          </div>
        </div>
      </div>

      {/* Table-like list */}
      <Card className="overflow-hidden border-border/40">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-3 px-5 py-3 bg-muted/50 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>素材</span>
          <span>提交人</span>
          <span>审核人</span>
          <span>结果</span>
          <span>备注</span>
        </div>
        {history.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">暂无审批记录</div>
        ) : (
          history.map((item, i) => {
            const asset = getAsset(item.assetId);
            const requester = users.find((u) => u.id === item.requestedBy);
            const reviewer = users.find((u) => u.id === item.reviewedBy);
            return (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-3 px-5 py-3.5 border-t border-border/20 items-center hover:bg-muted/30 transition-colors animate-float-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {asset && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border/30">
                      <img src={asset.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <Link href={`/assets/${item.assetId}`} className="text-sm font-medium truncate hover:text-primary transition-colors">
                    {asset?.name || item.assetId}
                  </Link>
                </div>
                <span className="text-xs text-muted-foreground">{requester?.name || '-'}</span>
                <span className="text-xs text-muted-foreground">{reviewer?.name || '-'}</span>
                <div>
                  {item.status === 'approved' ? (
                    <Badge className="text-[10px] rounded-full px-2.5 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 gap-1 border-0">
                      <Check className="w-3 h-3" /> 通过
                    </Badge>
                  ) : (
                    <Badge className="text-[10px] rounded-full px-2.5 py-0.5 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 gap-1 border-0">
                      <X className="w-3 h-3" /> 拒绝
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground truncate">
                  {item.rejectReason || item.note || '-'}
                </span>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}
