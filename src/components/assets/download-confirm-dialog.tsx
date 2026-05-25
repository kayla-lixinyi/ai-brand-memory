'use client';

import React from 'react';
import { Asset } from '@/types';
import { formatFileSize, formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Download, FileText, Layers, Calendar } from 'lucide-react';

export function DownloadConfirmDialog({
  asset,
  open,
  onOpenChange,
  onConfirm,
  watermark,
}: {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (asset: Asset) => void;
  watermark?: boolean;
}) {
  if (!asset) return null;

  const latestVersion = asset.versions[asset.versions.length - 1];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" />
            确认下载
          </DialogTitle>
          <DialogDescription>
            请确认以下素材信息后下载
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="p-3.5 rounded-2xl bg-muted/50 space-y-2.5">
            <p className="text-sm font-semibold truncate">{asset.name}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                <span>版本 v{asset.currentVersion}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{formatDateTime(asset.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3 h-3" />
                <span>{formatFileSize(asset.fileSize)}</span>
              </div>
              {asset.width > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">{asset.width}×{asset.height}</span>
                </div>
              )}
            </div>
            {latestVersion?.changeNote && (
              <p className="text-xs text-muted-foreground border-t border-border/40 pt-2">
                更新说明: {latestVersion.changeNote}
              </p>
            )}
          </div>
          {watermark && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              下载文件将自动添加水印
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="rounded-full px-4 text-xs" />}>
            取消
          </DialogClose>
          <Button
            className="rounded-full px-5 text-xs gap-1.5 bg-gradient-coral text-white"
            onClick={() => {
              onConfirm(asset);
              onOpenChange(false);
            }}
          >
            <Download className="w-3.5 h-3.5" />
            {watermark ? '下载（含水印）' : '确认下载'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
