'use client';

import React, { useState } from 'react';
import { useUploadSimulation } from '@/hooks/use-upload-simulation';
import { useFilterStore } from '@/store/filter-store';
import { brands } from '@/data/mock';
import { Channel, AssetCategory, CHANNEL_CONFIG, CATEGORY_LABELS } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Upload, FileImage, Sparkles, AlertTriangle, Check, Loader2, X, CloudUpload,
} from 'lucide-react';

const allChannels: Channel[] = ['shopee', 'tiktok', 'google', 'instagram', 'lazada', 'official_site'];
const allCategories: AssetCategory[] = ['lipstick', 'foundation', 'eyeshadow', 'poster', 'video', 'brand_doc', 'blush', 'mascara', 'skincare'];

export default function UploadPage() {
  const { activeBrandId } = useFilterStore();
  const brand = brands.find((b) => b.id === activeBrandId);

  const [files, setFiles] = useState<File[]>([]);
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<AssetCategory>('lipstick');
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>(['shopee']);
  const [dragActive, setDragActive] = useState(false);

  const {
    stage, progress, aiTags, autoName, similarWarning, startUpload, reset,
  } = useUploadSimulation();

  const toggleChannel = (ch: Channel) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) setFiles(dropped);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (selected.length > 0) setFiles(selected);
  };

  const handleUpload = () => {
    startUpload(
      brand?.name || '品牌',
      sku || 'SKU-001',
      CHANNEL_CONFIG[selectedChannels[0] || 'shopee'].label,
      '800x800'
    );
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setSku('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-coral shadow-lg shadow-primary/20">
          <CloudUpload className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">上传素材</h1>
          <p className="text-sm text-muted-foreground">为 {brand?.name || '品牌'} 上传新的素材文件</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer overflow-hidden',
          dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 hover:border-primary/50',
          files.length > 0 && 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.psd,.ai"
          className="hidden"
          onChange={handleFileSelect}
        />
        {files.length === 0 ? (
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-3xl bg-muted/80 mx-auto flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold">拖拽文件到此处，或点击选择</p>
            <p className="text-xs text-muted-foreground">支持 JPG、PNG、MP4、PDF、PSD、AI 等格式</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 mx-auto flex items-center justify-center">
              <FileImage className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm font-semibold">{files.length} 个文件已选择</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {files.map((f, i) => (
                <Badge key={i} variant="secondary" className="text-xs gap-1.5 rounded-full px-3 py-1">
                  {f.name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles((prev) => prev.filter((_, j) => j !== i));
                    }}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <Card className="p-6 space-y-5 border-border/40">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> 素材信息
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">品类 *</Label>
            <Select
              value={category}
              onValueChange={(v) => v && setCategory(v as AssetCategory)}
              items={Object.fromEntries(allCategories.map((c) => [c, CATEGORY_LABELS[c]]))}
            >
              <SelectTrigger className="h-9 rounded-full border-border/60"><SelectValue /></SelectTrigger>
              <SelectContent>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">SKU *</Label>
            <Input placeholder="如 FLR-LP-001" className="h-9 rounded-full border-border/60" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">投放渠道 *</Label>
          <div className="flex flex-wrap gap-1.5">
            {allChannels.map((ch) => (
              <Badge
                key={ch}
                variant={selectedChannels.includes(ch) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer text-[11px] px-3 py-1 rounded-full transition-all border-border/50',
                  selectedChannels.includes(ch) && 'bg-primary border-primary shadow-sm shadow-primary/20'
                )}
                onClick={() => toggleChannel(ch)}
              >
                {CHANNEL_CONFIG[ch].label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Auto-name preview */}
        {sku && (
          <div className="p-4 glass rounded-2xl">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">自动命名预览</Label>
            <p className="text-sm font-mono mt-1.5 text-primary font-medium">
              {brand?.name}_{sku}_{CHANNEL_CONFIG[selectedChannels[0] || 'shopee'].label}_800x800_v1
            </p>
          </div>
        )}

        <Button
          className="w-full gap-2 h-11 rounded-full bg-gradient-coral text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
          disabled={files.length === 0 || !sku || stage !== 'idle'}
          onClick={handleUpload}
        >
          <Upload className="w-4 h-4" />
          开始上传
        </Button>
      </Card>

      {/* Upload progress */}
      {stage !== 'idle' && (
        <Card className="p-6 space-y-5 border-border/40 overflow-hidden">
          {/* Progress bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold flex items-center gap-2">
                {stage === 'uploading' && <><Loader2 className="w-4 h-4 animate-spin text-primary" /> 上传中...</>}
                {stage === 'analyzing' && <><Loader2 className="w-4 h-4 animate-spin text-primary" /> AI 分析中...</>}
                {stage === 'tagging' && <><Sparkles className="w-4 h-4 text-primary animate-pulse-glow" /> AI 自动打标签...</>}
                {stage === 'complete' && <><Check className="w-4 h-4 text-emerald-500" /> 上传完成</>}
              </span>
              <span className="text-xs font-medium text-muted-foreground px-2.5 py-0.5 rounded-full bg-muted">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>

          {/* AI Tagging animation */}
          {(stage === 'tagging' || stage === 'complete') && aiTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> AI 自动标签
              </h3>
              <div className="space-y-2">
                {aiTags.map((tag, i) => (
                  <div
                    key={tag.label}
                    className="flex items-center gap-3 p-3 rounded-2xl glass animate-float-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Badge variant="secondary" className="text-[11px] shrink-0 rounded-full px-3 bg-primary/10 text-primary border-0 font-semibold">
                      {tag.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex-1">/ {tag.labelEn}</span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-coral rounded-full"
                        style={{
                          width: `${tag.confidence * 100}%`,
                          transition: 'width 0.8s ease-out',
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold w-10 text-right text-primary">
                      {Math.round(tag.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Auto name result */}
          {stage === 'complete' && autoName && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">自动命名</span>
              </div>
              <p className="text-sm font-mono mt-2 pl-9">{autoName}</p>
            </div>
          )}

          {/* Similar warning */}
          {stage === 'complete' && similarWarning && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">发现相似素材</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 pl-9">
                系统检测到已有视觉相似的素材，请确认是否为新版本或重复上传。
              </p>
              <div className="flex gap-2 mt-3 pl-9">
                <Button variant="outline" size="sm" className="text-xs h-8 rounded-full px-4">查看相似素材</Button>
                <Button variant="outline" size="sm" className="text-xs h-8 rounded-full px-4">忽略</Button>
              </div>
            </div>
          )}

          {/* Reset */}
          {stage === 'complete' && (
            <Button variant="outline" className="w-full rounded-full h-10" onClick={handleReset}>
              继续上传
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
