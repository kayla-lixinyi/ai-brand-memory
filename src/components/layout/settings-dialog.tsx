'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useUIStore } from '@/store/ui-store';
import { useFilterStore } from '@/store/filter-store';
import { useAssetStore } from '@/store/asset-store';
import { useApprovalStore } from '@/store/approval-store';
import { brands, namingRules } from '@/data/mock';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tag, FileText, RotateCcw, Shield, Sparkles, Zap, Bell } from 'lucide-react';
import { toast } from 'sonner';

const ALL_TOKENS = ['品牌', 'SKU', '产品', '系列', '渠道', '尺寸', '版本', '日期'] as const;

function NamingRuleEditor({ brandId }: { brandId: string }) {
  const rule = namingRules.find((r) => r.brandId === brandId);
  const [pattern, setPattern] = useState(rule?.pattern ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const insertToken = (token: string) => {
    const el = inputRef.current;
    if (!el) {
      setPattern((p) => (p ? `${p}_{${token}}` : `{${token}}`));
      return;
    }
    const start = el.selectionStart ?? pattern.length;
    const end = el.selectionEnd ?? pattern.length;
    const insert = `{${token}}`;
    const next = pattern.slice(0, start) + insert + pattern.slice(end);
    setPattern(next);
    // restore cursor after React re-render
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + insert.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const preview = useMemo(() => {
    const sampleValues: Record<string, string> = {
      '品牌': '橘朵',
      'SKU': 'JD-LP-001',
      '产品': '丝绒唇釉',
      '系列': '空气',
      '渠道': 'Shopee',
      '尺寸': '800x800',
      '版本': 'v3',
      '日期': '20260524',
    };
    return pattern.replace(/\{([^}]+)\}/g, (_, key) => sampleValues[key] ?? key);
  }, [pattern]);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">可用字段</Label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TOKENS.map((token) => (
            <Badge
              key={token}
              variant="outline"
              className="text-[11px] rounded-full px-2.5 py-0.5 cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
              render={<button type="button" onClick={() => insertToken(token)} />}
            >
              {token}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">命名模板</Label>
        <Input
          ref={inputRef}
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="点击上方字段插入，或手动输入模板"
          className="h-9 text-sm font-mono border-border/60 rounded-lg"
        />
      </div>
      {pattern && (
        <div className="space-y-1.5">
          <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">预览</Label>
          <div className="p-2.5 bg-muted/50 rounded-lg font-mono text-sm text-primary break-all">{preview}</div>
        </div>
      )}
    </div>
  );
}

function SettingRow({ icon: Icon, title, desc, defaultChecked }: {
  icon: React.ElementType; title: string; desc: string; defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

export function SettingsDialog() {
  const { settingsOpen, setSettingsOpen } = useUIStore();
  const { activeBrandId } = useFilterStore();
  const resetAssets = useAssetStore((s) => s.resetData);
  const resetApprovals = useApprovalStore((s) => s.resetData);
  const brand = brands.find((b) => b.id === activeBrandId);

  const [tags, setTags] = useState([
    '丝绒唇釉', '柔焦散粉', '七色眼影盘', '高光修容', '腮红', '眉笔',
    '卸妆膏', '唇釉色卡', 'Shopee主图', 'TikTok竖版', 'Instagram方图',
    '618大促', '新品上市', '品牌指南', 'KOL素材', '产品特写',
  ]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleReset = () => {
    resetAssets();
    resetApprovals();
    toast.success('Demo 数据已重置');
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>品牌设置</DialogTitle>
          <DialogDescription>{brand?.name} ({brand?.nameEn})</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          {/* Naming rules — interactive */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> 命名规则
            </h3>
            <NamingRuleEditor brandId={activeBrandId} />
          </section>

          <hr className="border-border/40" />

          {/* Tag management */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> 标签管理
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[11px] gap-1.5 rounded-full px-2.5 py-0.5 pr-1.5 transition-all hover:bg-destructive/10">
                  {tag}
                  <button className="hover:text-destructive transition-colors" onClick={() => removeTag(tag)}>
                    <span className="text-xs">×</span>
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="添加新标签"
                className="h-8 text-xs flex-1 rounded-lg border-border/60"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
              />
              <Button size="sm" className="h-8 text-xs rounded-lg px-4" onClick={addTag}>添加</Button>
            </div>
          </section>

          <hr className="border-border/40" />

          {/* Demo settings */}
          <section className="space-y-1">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-primary" /> 演示设置
            </h3>
            <SettingRow icon={Sparkles} title="AI 自动标签" desc="上传时识别产品品类、色号、妆效风格" defaultChecked />
            <SettingRow icon={Zap} title="相似素材检测" desc="检测重复素材，避免不同渠道使用过期版本" defaultChecked />
            <SettingRow icon={Bell} title="飞书通知" desc={`审批结果、素材过期提醒同步到飞书「${brand?.name || '品牌'}素材管理」群`} defaultChecked />
          </section>

          <hr className="border-border/40" />

          {/* Reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive">重置 Demo 数据</p>
                <p className="text-xs text-muted-foreground">恢复所有素材和审批数据到初始状态</p>
              </div>
            </div>
            <Button variant="destructive" size="sm" className="gap-1.5 rounded-lg px-4 shadow-sm" onClick={handleReset}>
              <RotateCcw className="w-3.5 h-3.5" /> 重置
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
