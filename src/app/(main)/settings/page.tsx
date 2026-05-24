'use client';

import React, { useState } from 'react';
import { useFilterStore } from '@/store/filter-store';
import { useAssetStore } from '@/store/asset-store';
import { useApprovalStore } from '@/store/approval-store';
import { brands, namingRules } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Tag, FileText, RotateCcw, Shield, Sparkles, Zap, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { activeBrandId } = useFilterStore();
  const resetAssets = useAssetStore((s) => s.resetData);
  const resetApprovals = useApprovalStore((s) => s.resetData);
  const brand = brands.find((b) => b.id === activeBrandId);
  const rule = namingRules.find((r) => r.brandId === activeBrandId);

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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">品牌设置</h1>
          <p className="text-sm text-muted-foreground">{brand?.name} ({brand?.nameEn})</p>
        </div>
      </div>

      {/* Naming rules */}
      <Card className="p-0 overflow-hidden border-border/40">
        <div className="p-5 pb-0">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> 命名规则
          </h2>
        </div>
        <div className="p-5">
          {rule ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">命名模板</Label>
                <div className="p-3 glass rounded-xl font-mono text-sm text-primary font-medium">{rule.pattern}</div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">示例</Label>
                <div className="p-3 glass rounded-xl font-mono text-sm">{rule.example}</div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">字段</Label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {rule.fields.map((f) => (
                    <Badge key={f} variant="secondary" className="text-[11px] rounded-full px-3 py-0.5">{f}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">暂无命名规则</p>
          )}
        </div>
      </Card>

      {/* Tag management */}
      <Card className="p-0 overflow-hidden border-border/40">
        <div className="p-5 pb-0">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" /> 标签管理
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px] gap-1.5 rounded-full px-3 py-1 pr-2 transition-all hover:bg-destructive/10">
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
              className="h-9 text-xs flex-1 rounded-full border-border/60"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
            <Button size="sm" className="h-9 text-xs rounded-full px-5 bg-gradient-coral text-white shadow-sm" onClick={addTag}>添加</Button>
          </div>
        </div>
      </Card>

      {/* Demo settings */}
      <Card className="p-0 overflow-hidden border-border/40">
        <div className="p-5 pb-0">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> 演示设置
          </h2>
        </div>
        <div className="p-5 space-y-1">
          <SettingRow
            icon={Sparkles}
            title="AI 自动标签"
            desc="上传时识别产品品类、色号、妆效风格"
            defaultChecked
          />
          <SettingRow
            icon={Zap}
            title="相似素材检测"
            desc="检测重复素材，避免不同渠道使用过期版本"
            defaultChecked
          />
          <SettingRow
            icon={Bell}
            title="飞书通知"
            desc="审批结果、素材过期提醒同步到飞书「橘朵素材管理」群"
            defaultChecked
          />
        </div>
      </Card>

      {/* Reset */}
      <Card className="p-5 border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold text-destructive">重置 Demo 数据</p>
              <p className="text-xs text-muted-foreground">恢复所有素材和审批数据到初始状态</p>
            </div>
          </div>
          <Button variant="destructive" size="sm" className="gap-1.5 rounded-full px-5 shadow-sm" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5" /> 重置
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SettingRow({ icon: Icon, title, desc, defaultChecked }: {
  icon: React.ElementType; title: string; desc: string; defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
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
