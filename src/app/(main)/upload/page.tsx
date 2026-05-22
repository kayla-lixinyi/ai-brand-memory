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
  Upload, FileImage, Sparkles, AlertTriangle, Check, Loader2, X,
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
      <div>
        <h1 className="text-lg font-semibold">上传素材</h1>
        <p className="text-sm text-muted-foreground mt-1">为 {brand?.name || '品牌'} 上传新的素材文件</p>
      </div>

      {/* Drop zone */}
      <Card
        className={cn(
          'border-2 border-dashed p-8 text-center transition-all cursor-pointer',
          dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50',
          files.length > 0 && 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20'
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
          <>
            <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium">拖拽文件到此处，或点击选择</p>
            <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG、MP4、PDF、PSD、AI 等格式</p>
          </>
        ) : (
          <>
            <FileImage className="w-10 h-10 mx-auto text-emerald-600 mb-3" />
            <p className="text-sm font-medium">{files.length} 个文件已选择</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {files.map((f, i) => (
                <Badge key={i} variant="secondary" className="text-xs gap-1">
                  {f.name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles((prev) => prev.filter((_, j) => j !== i));
                    }}
                  />
                </Badge>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Form */}
      <Card className="p-6 space-y-4">
        <h2 className="text-sm font-semibold">素材信息</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">品类 *</Label>
            <Select value={category} onValueChange={(v) => v && setCategory(v as AssetCategory)}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">SKU *</Label>
            <Input placeholder="如 FLR-LP-001" className="h-9" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">投放渠道 *</Label>
          <div className="flex flex-wrap gap-2">
            {allChannels.map((ch) => (
              <Badge
                key={ch}
                variant={selectedChannels.includes(ch) ? 'default' : 'outline'}
                className={cn('cursor-pointer text-xs px-3 py-1 transition-colors', selectedChannels.includes(ch) && 'bg-primary')}
                onClick={() => toggleChannel(ch)}
              >
                {CHANNEL_CONFIG[ch].label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Auto-name preview */}
        {sku && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <Label className="text-xs text-muted-foreground">自动命名预览</Label>
            <p className="text-sm font-mono mt-1">
              {brand?.name}_{sku}_{CHANNEL_CONFIG[selectedChannels[0] || 'shopee'].label}_800x800_v1
            </p>
          </div>
        )}

        <Button
          className="w-full gap-2"
          disabled={files.length === 0 || !sku || stage !== 'idle'}
          onClick={handleUpload}
        >
          <Upload className="w-4 h-4" />
          开始上传
        </Button>
      </Card>

      {/* Upload progress */}
      {stage !== 'idle' && (
        <Card className="p-6 space-y-4">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {stage === 'uploading' && '上传中...'}
                {stage === 'analyzing' && 'AI 分析中...'}
                {stage === 'tagging' && 'AI 自动打标签...'}
                {stage === 'complete' && '上传完成'}
              </span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* AI Tagging animation */}
          {(stage === 'tagging' || stage === 'complete') && aiTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> AI 自动标签
              </h3>
              <div className="space-y-2">
                {aiTags.map((tag, i) => (
                  <div
                    key={tag.label}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 animate-[tag-reveal_0.4s_ease-out]"
                  >
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {tag.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex-1">/ {tag.labelEn}</span>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${tag.confidence * 100}%`,
                          transition: 'width 0.6s ease-out',
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium w-10 text-right">
                      {Math.round(tag.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Auto name result */}
          {stage === 'complete' && autoName && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">自动命名</span>
              </div>
              <p className="text-sm font-mono mt-1">{autoName}</p>
            </div>
          )}

          {/* Similar warning */}
          {stage === 'complete' && similarWarning && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">发现相似素材</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                系统检测到已有视觉相似的素材，请确认是否为新版本或重复上传。
              </p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="text-xs h-7">查看相似素材</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">忽略</Button>
              </div>
            </div>
          )}

          {/* Reset */}
          {stage === 'complete' && (
            <Button variant="outline" className="w-full" onClick={handleReset}>
              继续上传
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
