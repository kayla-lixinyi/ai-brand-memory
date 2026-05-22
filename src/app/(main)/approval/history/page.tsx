'use client';

import React from 'react';
import Link from 'next/link';
import { useApprovalStore } from '@/store/approval-store';
import { useAssetStore } from '@/store/asset-store';
import { users } from '@/data/mock';
import { cn, timeAgo } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, X } from 'lucide-react';

export default function ApprovalHistoryPage() {
  const history = useApprovalStore((s) => s.getHistory());
  const getAsset = useAssetStore((s) => s.getAsset);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/approval">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-semibold">审批历史</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{history.length} 条记录</p>
        </div>
      </div>

      {/* Table-like list */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-3 px-4 py-2 bg-muted text-xs font-medium text-muted-foreground">
          <span>素材</span>
          <span>提交人</span>
          <span>审核人</span>
          <span>结果</span>
          <span>备注</span>
        </div>
        {history.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">暂无审批记录</div>
        ) : (
          history.map((item) => {
            const asset = getAsset(item.assetId);
            const requester = users.find((u) => u.id === item.requestedBy);
            const reviewer = users.find((u) => u.id === item.reviewedBy);
            return (
              <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-3 px-4 py-3 border-t border-border items-center">
                <div className="flex items-center gap-2 min-w-0">
                  {asset && (
                    <div className="w-8 h-8 rounded overflow-hidden bg-muted shrink-0">
                      <img src={asset.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <Link href={`/assets/${item.assetId}`} className="text-sm truncate hover:text-primary transition-colors">
                    {asset?.name || item.assetId}
                  </Link>
                </div>
                <span className="text-xs text-muted-foreground">{requester?.name || '-'}</span>
                <span className="text-xs text-muted-foreground">{reviewer?.name || '-'}</span>
                <div>
                  {item.status === 'approved' ? (
                    <Badge className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 gap-1">
                      <Check className="w-3 h-3" /> 通过
                    </Badge>
                  ) : (
                    <Badge className="text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 gap-1">
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
