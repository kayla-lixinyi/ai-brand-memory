// ==================== Brand ====================
export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  color: string;
}

// ==================== User / Auth ====================
export type UserRole = 'admin' | 'brand_manager' | 'designer' | 'reviewer' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  brandIds: string[];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: '管理员',
  brand_manager: '品牌经理',
  designer: '设计师',
  reviewer: '审核员',
  viewer: '查看者',
};

// ==================== Asset ====================
export type AssetStatus = 'draft' | 'in_review' | 'approved' | 'expired' | 'rejected' | 'archived';

export type AssetType = 'image' | 'video' | 'document' | 'psd' | 'ai';

export type Channel = 'shopee' | 'tiktok' | 'google' | 'instagram' | 'lazada' | 'official_site';

export type AssetCategory = 'lipstick' | 'foundation' | 'eyeshadow' | 'poster' | 'video' | 'brand_doc' | 'blush' | 'mascara' | 'skincare';

export interface SizePreset {
  label: string;
  width: number;
  height: number;
  channel: Channel;
}

export interface AITag {
  label: string;
  labelEn: string;
  confidence: number;
  category: 'product' | 'color' | 'scene' | 'style' | 'material';
}

export interface AssetVersion {
  version: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  changeNote: string;
  size: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  fromStatus?: AssetStatus;
  toStatus?: AssetStatus;
  userId: string;
  userName: string;
  timestamp: string;
  note?: string;
}

export interface Asset {
  id: string;
  name: string;
  fileName: string;
  brandId: string;
  type: AssetType;
  category: AssetCategory;
  status: AssetStatus;
  channels: Channel[];
  tags: string[];
  aiTags: AITag[];
  sku: string;
  width: number;
  height: number;
  fileSize: number;
  url: string;
  thumbnailUrl: string;
  versions: AssetVersion[];
  currentVersion: number;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
  expiresAt?: string;
  downloads: number;
  auditTrail: AuditEntry[];
  relatedAssetIds: string[];
  description?: string;
}

// ==================== Approval ====================
export interface ApprovalItem {
  id: string;
  assetId: string;
  requestedBy: string;
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  note?: string;
}

// ==================== Search ====================
export type SearchMode = 'fulltext' | 'semantic' | 'image';

export interface SearchResult {
  assetId: string;
  score: number;
  matchReason?: string;
  highlightedTerms?: string[];
}

// ==================== Filter ====================
export interface AssetFilters {
  types: AssetType[];
  statuses: AssetStatus[];
  channels: Channel[];
  categories: AssetCategory[];
  tags: string[];
  brandId: string;
  sizePreset?: string;
  sku?: string;
  dateRange?: { from: string; to: string };
}

// ==================== Portal ====================
export interface PortalSession {
  authenticated: boolean;
  brandId?: string;
  expiresAt?: string;
}

// ==================== Naming Rule ====================
export interface NamingRule {
  id: string;
  brandId: string;
  pattern: string;
  example: string;
  fields: string[];
}

// ==================== UI State ====================
export type ViewMode = 'grid' | 'list';
export type SortBy = 'relevance' | 'newest' | 'most_downloads';

// ==================== Constants ====================
export const STATUS_CONFIG: Record<AssetStatus, { label: string; color: string; bgClass: string; textClass: string }> = {
  draft: { label: '草稿', color: 'slate', bgClass: 'bg-slate-100 dark:bg-slate-800', textClass: 'text-slate-700 dark:text-slate-300' },
  in_review: { label: '审核中', color: 'amber', bgClass: 'bg-amber-100 dark:bg-amber-900', textClass: 'text-amber-700 dark:text-amber-300' },
  approved: { label: '已通过', color: 'emerald', bgClass: 'bg-emerald-100 dark:bg-emerald-900', textClass: 'text-emerald-700 dark:text-emerald-300' },
  expired: { label: '已过期', color: 'red', bgClass: 'bg-red-100 dark:bg-red-900', textClass: 'text-red-700 dark:text-red-300' },
  rejected: { label: '已拒绝', color: 'rose', bgClass: 'bg-rose-100 dark:bg-rose-900', textClass: 'text-rose-700 dark:text-rose-300' },
  archived: { label: '已归档', color: 'zinc', bgClass: 'bg-zinc-100 dark:bg-zinc-800', textClass: 'text-zinc-700 dark:text-zinc-300' },
};

export const CHANNEL_CONFIG: Record<Channel, { label: string; icon: string; color: string }> = {
  shopee: { label: 'Shopee', icon: 'ShoppingBag', color: '#EE4D2D' },
  tiktok: { label: 'TikTok', icon: 'Music', color: '#000000' },
  google: { label: 'Google Ads', icon: 'Search', color: '#4285F4' },
  instagram: { label: 'Instagram', icon: 'Instagram', color: '#E4405F' },
  lazada: { label: 'Lazada', icon: 'Store', color: '#0F146D' },
  official_site: { label: '官网', icon: 'Globe', color: '#6366F1' },
};

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  lipstick: '口红',
  foundation: '粉底',
  eyeshadow: '眼影',
  poster: '活动海报',
  video: '视频',
  brand_doc: '品牌文档',
  blush: '腮红',
  mascara: '睫毛膏',
  skincare: '护肤',
};

export const SIZE_PRESETS: SizePreset[] = [
  { label: '800×800 (Shopee主图)', width: 800, height: 800, channel: 'shopee' },
  { label: '1200×628 (Google Ads)', width: 1200, height: 628, channel: 'google' },
  { label: '1080×1920 (TikTok/Story)', width: 1080, height: 1920, channel: 'tiktok' },
  { label: '1080×1080 (Instagram)', width: 1080, height: 1080, channel: 'instagram' },
  { label: '1920×1080 (横版视频)', width: 1920, height: 1080, channel: 'official_site' },
];

export const TYPE_LABELS: Record<AssetType, string> = {
  image: '图片',
  video: '视频',
  document: '文档',
  psd: 'PSD',
  ai: 'AI',
};
