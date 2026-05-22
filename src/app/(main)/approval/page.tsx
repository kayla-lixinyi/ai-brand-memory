'use client';

import React, { useState } from 'react';
import { useApprovalStore } from '@/store/approval-store';
import { useAssetStore } from '@/store/asset-store';
import { useAuthStore } from '@/store/auth-store';
import { users } from '@/data/mock';
import { STATUS_CONFIG, CHANNEL_CONFIG } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { cn, timeAgo } from '@/lib/utils';
import { Check, X, CheckCheck, History, MessageSquare, Bell } from 'lucide-react';
import Link from 'next/link';

export default function ApprovalPage() {
  const { items, approve, reject, batchApprove } = useApprovalStore();
  const getAsset = useAssetStore((s) => s.getAsset);
  const updateAssetStatus = useAssetStore((s) => s.updateAssetStatus);
  const currentUser = useAuthStore((s) => s.currentUser);

  const pending = items.filter((i) => i.status === 'pending');

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; itemId: string }>({ open: false, itemId: '' });
  const [rejectReason, setRejectReason] = useState('');
  const [showFeishu, setShowFeishu] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleApprove = (itemId: string, assetId: string) => {
    approve(itemId, currentUser.id);
    updateAssetStatus(assetId, 'approved', currentUser.id, currentUser.name);
    setShowFeishu(true);
    setTimeout(() => setShowFeishu(false), 4000);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    const item = items.find((i) => i.id === rejectDialog.itemId);
    if (item) {
      reject(rejectDialog.itemId, currentUser.id, rejectReason);
      updateAssetStatus(item.assetId, 'rejected', currentUser.id, currentUser.name, rejectReason);
    }
    setRejectDialog({ open: false, itemId: '' });
    setRejectReason('');
  };

  const handleBatchApprove = () => {
    const ids = Array.from(selected);
    batchApprove(ids, currentUser.id);
    ids.forEach((itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (item) updateAssetStatus(item.assetId, 'approved', currentUser.id, currentUser.name);
    });
    setSelected(new Set());
    setShowFeishu(true);
    setTimeout(() => setShowFeishu(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">审批队列</h1>
          <p className="text-sm text-muted-foreground mt-1">{pending.length} 个素材待审批</p>
        </div>
        <Link href="/approval/history">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <History className="w-3.5 h-3.5" /> 审批历史
          </Button>
        </Link>
      </div>

      {/* Batch bar */}
      {selected.size > 0 && (
        <Card className="p-3 flex items-center justify-between bg-primary/5 border-primary/20">
          <span className="text-sm font-medium">已选择 {selected.size} 个</span>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={handleBatchApprove}>
              <CheckCheck className="w-3.5 h-3.5" /> 批量通过
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setSelected(new Set())}>
              取消
            </Button>
          </div>
        </Card>
      )}

      {/* Pending list */}
      {pending.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <Check className="w-10 h-10 mb-2" />
          <p className="text-lg font-medium">全部审批完成</p>
          <p className="text-sm mt-1">暂无待审批素材</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((item) => {
            const asset = getAsset(item.assetId);
            if (!asset) return null;
            const requester = users.find((u) => u.id === item.requestedBy);
            return (
              <Card
                key={item.id}
                className={cn(
                  'flex items-center gap-4 p-4 transition-all',
                  selected.has(item.id) && 'ring-2 ring-primary bg-primary/5'
                )}
              >
                {/* Checkbox */}
                <button
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                    selected.has(item.id) ? 'bg-primary border-primary text-white' : 'border-border'
                  )}
                  onClick={() => toggleSelect(item.id)}
                >
                  {selected.has(item.id) && <Check className="w-3 h-3" />}
                </button>

                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/assets/${asset.id}`}>
                    <p className="text-sm font-medium hover:text-primary transition-colors truncate">{asset.name}</p>
                  </Link>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {asset.channels.slice(0, 3).map((ch) => (
                      <Badge key={ch} variant="outline" className="text-[10px] px-1.5 py-0">{CHANNEL_CONFIG[ch].label}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {requester?.name || '未知'} 提交于 {timeAgo(item.requestedAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    className="h-8 gap-1 text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApprove(item.id, item.assetId)}
                  >
                    <Check className="w-3.5 h-3.5" /> 通过
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                    onClick={() => setRejectDialog({ open: true, itemId: item.id })}
                  >
                    <X className="w-3.5 h-3.5" /> 拒绝
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Reject dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(o) => !o && setRejectDialog({ open: false, itemId: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>拒绝原因</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="请填写拒绝原因，如：图片分辨率不足、品牌调性不符..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, itemId: '' })}>取消</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>确认拒绝</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feishu notification mock */}
      {showFeishu && (
        <div className="fixed bottom-6 right-6 w-80 animate-in slide-in-from-bottom-5 z-50">
          <Card className="p-4 shadow-lg border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600">飞书 Bot 通知</span>
            </div>
            <p className="text-sm font-medium">素材审批通知</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentUser.name} 已审批素材，结果已同步到飞书群。
            </p>
            <Separator className="my-2" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">已发送至「品牌素材审批群」</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
