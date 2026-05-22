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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Settings, Tag, FileText, RotateCcw, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { activeBrandId } = useFilterStore();
  const resetAssets = useAssetStore((s) => s.resetData);
  const resetApprovals = useApprovalStore((s) => s.resetData);
  const brand = brands.find((b) => b.id === activeBrandId);
  const rule = namingRules.find((r) => r.brandId === activeBrandId);

  const [tags, setTags] = useState(['口红', '眼影', '粉底', '腮红', '海报', '视频', '国风', '简约', '梦幻', '日常']);
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
      <div>
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" /> 品牌设置
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{brand?.name} ({brand?.nameEn})</p>
      </div>

      {/* Naming rules */}
      <Card className="p-5 space-y-4">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4" /> 命名规则
        </h2>
        {rule ? (
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">命名模板</Label>
              <div className="p-2 bg-muted rounded-md font-mono text-sm mt-1">{rule.pattern}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">示例</Label>
              <div className="p-2 bg-muted rounded-md font-mono text-sm mt-1">{rule.example}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">字段</Label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {rule.fields.map((f) => (
                  <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">暂无命名规则</p>
        )}
      </Card>

      {/* Tag management */}
      <Card className="p-5 space-y-4">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Tag className="w-4 h-4" /> 标签管理
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs gap-1 pr-1">
              {tag}
              <button className="hover:text-destructive ml-1" onClick={() => removeTag(tag)}>×</button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="添加新标签"
            className="h-8 text-xs flex-1"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
          />
          <Button size="sm" className="h-8 text-xs" onClick={addTag}>添加</Button>
        </div>
      </Card>

      {/* Demo settings */}
      <Card className="p-5 space-y-4">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4" /> 演示设置
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">AI 自动标签</p>
              <p className="text-xs text-muted-foreground">上传时自动识别素材内容</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">相似素材检测</p>
              <p className="text-xs text-muted-foreground">上传时检查是否有重复素材</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">飞书通知</p>
              <p className="text-xs text-muted-foreground">审批结果同步到飞书群</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Reset */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-destructive">重置 Demo 数据</p>
            <p className="text-xs text-muted-foreground">恢复所有素材和审批数据到初始状态</p>
          </div>
          <Button variant="destructive" size="sm" className="gap-1.5" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5" /> 重置
          </Button>
        </div>
      </Card>
    </div>
  );
}
