'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brands, portalPasswords } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Lock, AlertCircle } from 'lucide-react';

export default function PortalLoginPage() {
  const router = useRouter();
  const [brandId, setBrandId] = useState('judydoll');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const correctPwd = portalPasswords[brandId];
    if (password === correctPwd) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('portal_brand', brandId);
        sessionStorage.setItem('portal_auth', 'true');
      }
      router.push('/portal/browse');
    } else {
      setError('密码错误，请重试');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <Card className="w-full max-w-md p-8 space-y-6 border-border/40">
        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-coral flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold mt-5 tracking-tight">品牌素材门户</h1>
          <p className="text-sm text-muted-foreground mt-1.5">请输入访问密码查看品牌素材</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">选择品牌</Label>
            <Select value={brandId} onValueChange={(v) => v && setBrandId(v)}>
              <SelectTrigger className="rounded-full border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.logo} {b.name} ({b.nameEn})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">访问密码</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="输入密码"
                className="pl-10 rounded-full border-border/60"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive px-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            className="w-full h-11 rounded-full bg-gradient-coral text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            onClick={handleLogin}
          >
            进入素材库
          </Button>
        </div>

        <div className="text-center space-y-1.5 pt-2">
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Demo 密码</p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="px-2.5 py-1 rounded-full bg-muted/50">橘朵: judydoll2024</span>
            <span className="px-2.5 py-1 rounded-full bg-muted/50">INTO YOU: intoyou2024</span>
            <span className="px-2.5 py-1 rounded-full bg-muted/50">Colorkey: colorkey2024</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
