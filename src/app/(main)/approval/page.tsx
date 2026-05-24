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
import { Check, X, CheckCheck, History, MessageSquare, Bell, Sparkles, Clock, User } from 'lucide-react';
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
      {/* Header with gradient accent */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">审批队列</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {pending.length > 0 ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {pending.length} 个素材等待审批
                </span>
              ) : '全部审批完成'}
            </p>
          </div>
        </div>
        <Link href="/approval/history">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full px-4 hover:shadow-md transition-shadow">
            <History className="w-3.5 h-3.5" /> 审批历史
          </Button>
        </Link>
      </div>

      {/* Batch bar — glassmorphism */}
      {selected.size > 0 && (
        <div className="glass rounded-2xl p-4 flex items-center justify-between animate-float-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-coral flex items-center justify-center text-white text-sm font-bold">
              {selected.size}
            </div>
            <span className="text-sm font-medium">已选择素材</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-9 gap-1.5 rounded-full px-5 bg-gradient-coral hover:opacity-90 shadow-md shadow-primary/20 text-white border-0" onClick={handleBatchApprove}>
              <CheckCheck className="w-4 h-4" /> 批量通过
            </Button>
            <Button variant="ghost" size="sm" className="h-9 text-xs rounded-full" onClick={() => setSelected(new Set())}>
              取消
            </Button>
          </div>
        </div>
      )}

      {/* Pending list — visual-first card grid */}
      {pending.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="w-20 h-20 rounded-full bg-gradient-coral/10 flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-primary/60" />
          </div>
          <p className="text-lg font-semibold">全部审批完成</p>
          <p className="text-sm mt-1 text-muted-foreground/70">暂无待审批素材，休息一下吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {pending.map((item, index) => {
            const asset = getAsset(item.assetId);
            if (!asset) return null;
            const requester = users.find((u) => u.id === item.requestedBy);
            const isSelected = selected.has(item.id);
            return (
              <div
                key={item.id}
                className="animate-float-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Card
                  className={cn(
                    'overflow-hidden card-lift border-border/40 transition-all',
                    isSelected && 'ring-2 ring-primary shadow-lg shadow-primary/10'
                  )}
                >
                  {/* Large thumbnail — visual-first */}
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden group cursor-pointer"
                    onClick={() => toggleSelect(item.id)}
                  >
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Checkbox overlay */}
                    <div className={cn(
                      'absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-sm',
                      isSelected
                        ? 'bg-gradient-coral border-transparent text-white scale-110'
                        : 'border-white/70 bg-black/20 backdrop-blur-sm hover:border-white'
                    )}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    {/* Channel pills */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {asset.channels.slice(0, 3).map((ch) => (
                        <span
                          key={ch}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/40 text-white backdrop-blur-sm"
                        >
                          {CHANNEL_CONFIG[ch].label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-3">
                    <div>
                      <Link href={`/assets/${asset.id}`}>
                        <p className="text-sm font-semibold hover:text-primary transition-colors truncate">{asset.name}</p>
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{requester?.name || '未知'}</span>
                        <span className="text-border">·</span>
                        <Clock className="w-3 h-3" />
                        <span>{timeAgo(item.requestedAt)}</span>
                      </div>
                    </div>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 rounded-full font-normal border-border/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action buttons — prominent, pill-shaped */}
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        className="flex-1 h-9 gap-1.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 border-0 hover-bounce"
                        onClick={() => handleApprove(item.id, item.assetId)}
                      >
                        <Check className="w-3.5 h-3.5" /> 通过
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-9 gap-1.5 rounded-full text-xs font-semibold border-destructive/30 text-destructive hover:bg-destructive/10 hover-bounce"
                        onClick={() => setRejectDialog({ open: true, itemId: item.id })}
                      >
                        <X className="w-3.5 h-3.5" /> 拒绝
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(o) => !o && setRejectDialog({ open: false, itemId: '' })}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>拒绝原因</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="请填写拒绝原因，如：图片分辨率不足、品牌调性不符..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
            className="rounded-xl"
          />
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setRejectDialog({ open: false, itemId: '' })}>取消</Button>
            <Button variant="destructive" className="rounded-full" onClick={handleReject} disabled={!rejectReason.trim()}>确认拒绝</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feishu notification — glassmorphism toast */}
      {showFeishu && (
        <div className="fixed bottom-6 right-6 w-80 animate-in slide-in-from-bottom-5 z-50">
          <div className="glass rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-blue-500/30">
                <Bell className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">飞书 Bot 通知</span>
            </div>
            <p className="text-sm font-semibold">素材审批通知</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentUser.name} 已审批素材，结果已同步到飞书群。
            </p>
            <Separator className="my-2.5" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">已发送至「品牌素材审批群」</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
