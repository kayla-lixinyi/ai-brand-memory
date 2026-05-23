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
      // Store in sessionStorage for demo
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
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold mt-4">品牌素材门户</h1>
          <p className="text-sm text-muted-foreground mt-1">请输入访问密码查看品牌素材</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">选择品牌</Label>
            <Select value={brandId} onValueChange={(v) => v && setBrandId(v)}>
              <SelectTrigger>
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
            <Label className="text-xs">访问密码</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="输入密码"
                className="pl-9"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button className="w-full" onClick={handleLogin}>
            进入素材库
          </Button>
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">Demo 密码：</p>
          <div className="flex justify-center gap-3 text-xs text-muted-foreground">
            <span>橘朵: judydoll2024</span>
            <span>INTO YOU: intoyou2024</span>
            <span>Colorkey: colorkey2024</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
