import { Brand, User, Asset, ApprovalItem, NamingRule } from '@/types';

// ==================== Brands ====================
export const brands: Brand[] = [
  { id: 'judydoll', name: '橘朵', nameEn: 'Judydoll', logo: '🍊', color: '#FE8576' },
  { id: 'into_you', name: 'INTO YOU', nameEn: 'Into You', logo: '💋', color: '#E85D75' },
  { id: 'colorkey', name: 'Colorkey', nameEn: 'Colorkey', logo: '🎨', color: '#9B6BF5' },
];

// ==================== Users ====================
export const users: User[] = [
  { id: 'u1', name: '林小美', email: 'xiaomei@judydoll.com', role: 'admin', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Xiaomei', brandIds: ['judydoll', 'into_you', 'colorkey'] },
  { id: 'u2', name: '王品宣', email: 'pinxuan@judydoll.com', role: 'brand_manager', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pinxuan', brandIds: ['judydoll'] },
  { id: 'u3', name: '张设计', email: 'design@judydoll.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Designer', brandIds: ['judydoll', 'into_you'] },
  { id: 'u4', name: '李审核', email: 'reviewer@judydoll.com', role: 'reviewer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Reviewer', brandIds: ['judydoll', 'into_you', 'colorkey'] },
  { id: 'u5', name: '陈美妆', email: 'meizhuang@intoyou.com', role: 'brand_manager', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Meizhuang', brandIds: ['into_you'] },
  { id: 'u6', name: '赵运营', email: 'ops@colorkey.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ops', brandIds: ['colorkey'] },
  { id: 'u7', name: '周查看', email: 'viewer@judydoll.com', role: 'viewer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Viewer', brandIds: ['judydoll'] },
  { id: 'u8', name: '吴策划', email: 'plan@judydoll.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Plan', brandIds: ['into_you', 'colorkey'] },
];

// ==================== Helper ====================
// Use Unsplash source for beauty/cosmetics-themed images
function beautyImg(keyword: string, w = 400, h = 400) {
  return `https://images.unsplash.com/photo-${keyword}?w=${w}&h=${h}&fit=crop&auto=format`;
}

// Curated beauty/cosmetics Unsplash photo IDs
const BEAUTY_PHOTOS = {
  // Lipstick / lip products
  lipstick1: '1586495777744-4413f21062fa',   // lipstick closeup
  lipstick2: '1631214524020-7e18db9a8f92',   // lip products
  lipstick3: '1596462502278-27bfdc403348',   // red lipstick
  lipstick4: '1583241800698-e8ab01830a07',   // lip color swatches
  // Eyeshadow / eye makeup
  eyeshadow1: '1512496015851-a90fb38ba796',  // eyeshadow palette
  eyeshadow2: '1522335789203-aabd1fc54bc9',  // eye makeup
  eyeshadow3: '1607008829553-1fa6a2d9d4c5',  // colorful palette
  // Foundation / base
  foundation1: '1596755094514-5c7c0c0b1c1d',// foundation bottle
  foundation2: '1571781926291-c477ebfd024b',  // skincare products
  powder1: '1599733594230-8bab15807c80',      // powder compact
  // Blush
  blush1: '1583241800698-e8ab01830a07',       // blush products
  blush2: '1616394584738-fc6e612e71b9',       // blush palette
  // Mascara
  mascara1: '1631214524020-7e18db9a8f92',     // mascara
  // Skincare
  skincare1: '1556228578-8c89e6adf883',       // skincare bottles
  skincare2: '1570172619644-dfd03ed5d881',     // skincare flatlay
  // Poster / campaign
  poster1: '1522335789203-aabd1fc54bc9',      // beauty campaign
  poster2: '1596462502278-27bfdc403348',       // beauty promo
  // Video thumbnail
  video1: '1487412912498-0447578fcca8',        // beauty tutorial
  // Brand doc
  doc1: '1586495777744-4413f21062fa',          // brand book
  // Generic beauty
  beauty1: '1571781926291-c477ebfd024b',
  beauty2: '1596755094514-5c7c0c0b1c1d',
  beauty3: '1556228578-8c89e6adf883',
};

function img(key: keyof typeof BEAUTY_PHOTOS, w = 400, h = 400) {
  return `https://images.unsplash.com/photo-${BEAUTY_PHOTOS[key]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// Fallback for seeds that don't have a curated photo
function seedImg(seed: string, w = 400, h = 400) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function dateStr(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

// ==================== Assets ====================
export const assets: Asset[] = [
  // === Judydoll (橘朵) — Primary brand ===
  {
    id: 'a1', name: '橘朵_丝绒唇釉_Shopee_800x800_v3', fileName: 'judydoll_velvet_lip_shopee_800x800_v3.jpg',
    brandId: 'judydoll', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee'], tags: ['唇釉', '丝绒', '珊瑚色', '日常妆'], sku: 'JD-LP-001',
    aiTags: [
      { label: '唇釉', labelEn: 'Lip Glaze', confidence: 0.98, category: 'product' },
      { label: '珊瑚色', labelEn: 'Coral', confidence: 0.95, category: 'color' },
      { label: '丝绒质感', labelEn: 'Velvet Texture', confidence: 0.92, category: 'style' },
      { label: '产品特写', labelEn: 'Product Close-up', confidence: 0.89, category: 'scene' },
    ],
    width: 800, height: 800, fileSize: 524288, url: img('lipstick1', 800, 800), thumbnailUrl: img('lipstick1', 400, 400),
    versions: [
      { version: 1, url: img('lipstick3', 800, 800), uploadedAt: dateStr(30), uploadedBy: 'u3', changeNote: '初版设计', size: 480000 },
      { version: 2, url: img('lipstick2', 800, 800), uploadedAt: dateStr(15), uploadedBy: 'u3', changeNote: '调整色温和构图', size: 510000 },
      { version: 3, url: img('lipstick1', 800, 800), uploadedAt: dateStr(5), uploadedBy: 'u3', changeNote: '最终版-增加珊瑚色调', size: 524288 },
    ],
    currentVersion: 3, uploadedBy: 'u3', uploadedAt: dateStr(30), updatedAt: dateStr(5), downloads: 128,
    auditTrail: [
      { id: 'at1', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(30) },
      { id: 'at2', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(20) },
      { id: 'at3', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(18), note: '质量优秀，色彩准确' },
    ],
    relatedAssetIds: ['a2', 'a3'], description: '橘朵丝绒唇釉 Shopee 主图，珊瑚色系新品',
  },
  {
    id: 'a2', name: '橘朵_丝绒唇釉_TikTok_1080x1920_v2', fileName: 'judydoll_velvet_lip_tiktok_1080x1920_v2.jpg',
    brandId: 'judydoll', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['tiktok'], tags: ['唇釉', '丝绒', '竖版', '短视频封面'], sku: 'JD-LP-001',
    aiTags: [
      { label: '唇釉', labelEn: 'Lip Glaze', confidence: 0.97, category: 'product' },
      { label: '竖版构图', labelEn: 'Vertical', confidence: 0.94, category: 'scene' },
      { label: '暖色调', labelEn: 'Warm Tone', confidence: 0.88, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 680000, url: img('lipstick2', 1080, 1920), thumbnailUrl: img('lipstick2', 400, 711),
    versions: [
      { version: 1, url: img('lipstick4', 1080, 1920), uploadedAt: dateStr(25), uploadedBy: 'u3', changeNote: '初版', size: 650000 },
      { version: 2, url: img('lipstick2', 1080, 1920), uploadedAt: dateStr(10), uploadedBy: 'u3', changeNote: '优化竖版构图', size: 680000 },
    ],
    currentVersion: 2, uploadedBy: 'u3', uploadedAt: dateStr(25), updatedAt: dateStr(10), downloads: 89,
    auditTrail: [
      { id: 'at4', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(25) },
      { id: 'at5', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(8) },
    ],
    relatedAssetIds: ['a1', 'a3'],
  },
  {
    id: 'a3', name: '橘朵_柔焦粉饼_Google_1200x628_v1', fileName: 'judydoll_powder_google_1200x628_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'foundation', status: 'in_review',
    channels: ['google'], tags: ['粉饼', '柔焦', '定妆', '清透'], sku: 'JD-PW-002',
    aiTags: [
      { label: '粉饼', labelEn: 'Powder Compact', confidence: 0.96, category: 'product' },
      { label: '裸色', labelEn: 'Nude', confidence: 0.91, category: 'color' },
      { label: '简约', labelEn: 'Minimalist', confidence: 0.85, category: 'style' },
    ],
    width: 1200, height: 628, fileSize: 420000, url: img('powder1', 1200, 628), thumbnailUrl: img('powder1', 400, 209),
    versions: [{ version: 1, url: img('powder1', 1200, 628), uploadedAt: dateStr(3), uploadedBy: 'u3', changeNote: '首版', size: 420000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(3), updatedAt: dateStr(3), downloads: 12,
    auditTrail: [
      { id: 'at6', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(3) },
      { id: 'at7', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(2) },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a4', name: '橘朵_七色眼影盘_Shopee_800x800_v1', fileName: 'judydoll_eyeshadow_shopee_800x800_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['眼影', '七色盘', '大地色', '日常妆'], sku: 'JD-ES-003',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.97, category: 'product' },
      { label: '大地色', labelEn: 'Earth Tones', confidence: 0.93, category: 'color' },
      { label: '多色盘', labelEn: 'Multi-Pan', confidence: 0.90, category: 'material' },
      { label: '少女风', labelEn: 'Girly Style', confidence: 0.88, category: 'style' },
    ],
    width: 800, height: 800, fileSize: 560000, url: img('eyeshadow1', 800, 800), thumbnailUrl: img('eyeshadow1', 400, 400),
    versions: [{ version: 1, url: img('eyeshadow1', 800, 800), uploadedAt: dateStr(12), uploadedBy: 'u3', changeNote: '七色眼影系列', size: 560000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(12), updatedAt: dateStr(12), downloads: 67,
    auditTrail: [
      { id: 'at8', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(10) },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a5', name: '橘朵_夏日活动海报_Instagram_1080x1080_v2', fileName: 'judydoll_summer_poster_ig_1080x1080_v2.jpg',
    brandId: 'judydoll', type: 'image', category: 'poster', status: 'approved',
    channels: ['instagram'], tags: ['海报', '夏日', '清新', '活动'], sku: 'JD-PS-004',
    aiTags: [
      { label: '海报', labelEn: 'Poster', confidence: 0.96, category: 'product' },
      { label: '珊瑚色', labelEn: 'Coral', confidence: 0.94, category: 'color' },
      { label: '清新', labelEn: 'Fresh', confidence: 0.92, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 720000, url: img('poster1', 1080, 1080), thumbnailUrl: img('poster1', 400, 400),
    versions: [
      { version: 1, url: img('poster2', 1080, 1080), uploadedAt: dateStr(20), uploadedBy: 'u3', changeNote: '初版', size: 700000 },
      { version: 2, url: img('poster1', 1080, 1080), uploadedAt: dateStr(14), uploadedBy: 'u3', changeNote: '增加促销信息', size: 720000 },
    ],
    currentVersion: 2, uploadedBy: 'u3', uploadedAt: dateStr(20), updatedAt: dateStr(14), downloads: 45,
    auditTrail: [
      { id: 'at9', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(13) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a6', name: '橘朵_品牌指南_v1', fileName: 'judydoll_brand_guide_v1.pdf',
    brandId: 'judydoll', type: 'document', category: 'brand_doc', status: 'approved',
    channels: ['official_site'], tags: ['品牌指南', 'VI', '规范'], sku: 'JD-DOC-001',
    aiTags: [{ label: '品牌文档', labelEn: 'Brand Document', confidence: 0.99, category: 'product' }],
    width: 0, height: 0, fileSize: 15000000, url: '#', thumbnailUrl: img('doc1', 400, 300),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(60), uploadedBy: 'u2', changeNote: '品牌规范手册', size: 15000000 }],
    currentVersion: 1, uploadedBy: 'u2', uploadedAt: dateStr(60), updatedAt: dateStr(60), downloads: 234,
    auditTrail: [
      { id: 'at10', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(58) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a7', name: '橘朵_唇釉试色视频_TikTok_v1', fileName: 'judydoll_lip_swatch_tiktok_v1.mp4',
    brandId: 'judydoll', type: 'video', category: 'video', status: 'in_review',
    channels: ['tiktok'], tags: ['试色', '唇釉', '短视频', 'KOL'], sku: 'JD-VD-001',
    aiTags: [
      { label: '视频', labelEn: 'Video', confidence: 0.99, category: 'product' },
      { label: '试色', labelEn: 'Swatch', confidence: 0.93, category: 'scene' },
      { label: '珊瑚色系', labelEn: 'Coral Tones', confidence: 0.88, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 45000000, url: '#', thumbnailUrl: img('video1', 400, 711),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(2), uploadedBy: 'u3', changeNote: '试色视频初版', size: 45000000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(2), updatedAt: dateStr(2), downloads: 5,
    auditTrail: [
      { id: 'at11', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(1) },
    ],
    relatedAssetIds: ['a1', 'a2'],
  },
  {
    id: 'a8', name: '橘朵_腮红_Shopee_800x800_v1', fileName: 'judydoll_blush_shopee_800x800_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'blush', status: 'draft',
    channels: ['shopee'], tags: ['腮红', '蜜桃', '自然', '少女'], sku: 'JD-BL-001',
    aiTags: [
      { label: '腮红', labelEn: 'Blush', confidence: 0.96, category: 'product' },
      { label: '蜜桃色', labelEn: 'Peach', confidence: 0.92, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 380000, url: img('blush1', 800, 800), thumbnailUrl: img('blush1', 400, 400),
    versions: [{ version: 1, url: img('blush1', 800, 800), uploadedAt: dateStr(1), uploadedBy: 'u3', changeNote: '草稿', size: 380000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(1), updatedAt: dateStr(1), downloads: 0,
    auditTrail: [
      { id: 'at12', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(1) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a9', name: '橘朵_丝绒唇釉_过期素材', fileName: 'judydoll_lip_old.jpg',
    brandId: 'judydoll', type: 'image', category: 'lipstick', status: 'expired',
    channels: ['shopee'], tags: ['唇釉', '旧版', '过期'], sku: 'JD-LP-001',
    aiTags: [{ label: '唇釉', labelEn: 'Lip Glaze', confidence: 0.97, category: 'product' }],
    width: 800, height: 800, fileSize: 450000, url: img('lipstick3', 800, 800), thumbnailUrl: img('lipstick3', 400, 400),
    versions: [{ version: 1, url: img('lipstick3', 800, 800), uploadedAt: dateStr(120), uploadedBy: 'u3', changeNote: '旧版', size: 450000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(120), updatedAt: dateStr(30), expiresAt: dateStr(5), downloads: 340,
    auditTrail: [
      { id: 'at13', action: '素材过期', fromStatus: 'approved', toStatus: 'expired', userId: 'u1', userName: '系统', timestamp: dateStr(5), note: '超过有效期自动过期' },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a10', name: '橘朵_眉笔_被拒素材', fileName: 'judydoll_eyebrow_rejected.jpg',
    brandId: 'judydoll', type: 'image', category: 'lipstick', status: 'rejected',
    channels: ['shopee'], tags: ['眉笔', '被拒'], sku: 'JD-EB-001',
    aiTags: [{ label: '眉笔', labelEn: 'Eyebrow Pencil', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 320000, url: seedImg('jd-eyebrow', 800, 800), thumbnailUrl: seedImg('jd-eyebrow', 400, 400),
    versions: [{ version: 1, url: seedImg('jd-eyebrow', 800, 800), uploadedAt: dateStr(8), uploadedBy: 'u3', changeNote: '初版', size: 320000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(8), updatedAt: dateStr(6), downloads: 0,
    auditTrail: [
      { id: 'at14', action: '审核拒绝', fromStatus: 'in_review', toStatus: 'rejected', userId: 'u4', userName: '李审核', timestamp: dateStr(6), note: '图片分辨率不足，色彩偏差较大' },
    ],
    relatedAssetIds: [],
  },

  // === INTO YOU ===
  {
    id: 'a11', name: 'INTOYOU_水光唇釉_Shopee_800x800_v2', fileName: 'intoyou_water_gloss_shopee_800x800_v2.jpg',
    brandId: 'into_you', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['唇釉', '水光', '玻璃唇', '日常妆'], sku: 'IY-LG-001',
    aiTags: [
      { label: '唇釉', labelEn: 'Lip Gloss', confidence: 0.98, category: 'product' },
      { label: '水光感', labelEn: 'Glossy', confidence: 0.94, category: 'style' },
      { label: '玫红色', labelEn: 'Rose', confidence: 0.87, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 490000, url: img('lipstick4', 800, 800), thumbnailUrl: img('lipstick4', 400, 400),
    versions: [
      { version: 1, url: seedImg('iy-gloss-v1', 800, 800), uploadedAt: dateStr(22), uploadedBy: 'u8', changeNote: '初版', size: 470000 },
      { version: 2, url: img('lipstick4', 800, 800), uploadedAt: dateStr(15), uploadedBy: 'u8', changeNote: '优化产品角度', size: 490000 },
    ],
    currentVersion: 2, uploadedBy: 'u8', uploadedAt: dateStr(22), updatedAt: dateStr(15), downloads: 156,
    auditTrail: [
      { id: 'at15', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(14) },
    ],
    relatedAssetIds: ['a12'],
  },
  {
    id: 'a12', name: 'INTOYOU_雾面唇泥_TikTok_1080x1920_v1', fileName: 'intoyou_matte_lip_tiktok_1080x1920_v1.jpg',
    brandId: 'into_you', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['tiktok'], tags: ['唇泥', '雾面', '试色', '哑光'], sku: 'IY-ML-002',
    aiTags: [
      { label: '唇泥', labelEn: 'Lip Mud', confidence: 0.96, category: 'product' },
      { label: '哑光', labelEn: 'Matte', confidence: 0.92, category: 'style' },
      { label: '豆沙色', labelEn: 'Bean Paste', confidence: 0.89, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 620000, url: img('lipstick3', 1080, 1920), thumbnailUrl: img('lipstick3', 400, 711),
    versions: [{ version: 1, url: img('lipstick3', 1080, 1920), uploadedAt: dateStr(10), uploadedBy: 'u8', changeNote: '首版', size: 620000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(10), updatedAt: dateStr(10), downloads: 78,
    auditTrail: [
      { id: 'at16', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(8) },
    ],
    relatedAssetIds: ['a11'],
  },
  {
    id: 'a13', name: 'INTOYOU_粉底液_Google_1200x628_v1', fileName: 'intoyou_foundation_google_1200x628_v1.jpg',
    brandId: 'into_you', type: 'image', category: 'foundation', status: 'approved',
    channels: ['google'], tags: ['粉底液', '持妆', '控油', '轻薄'], sku: 'IY-FD-003',
    aiTags: [
      { label: '粉底液', labelEn: 'Foundation', confidence: 0.97, category: 'product' },
      { label: '裸色', labelEn: 'Nude', confidence: 0.90, category: 'color' },
    ],
    width: 1200, height: 628, fileSize: 410000, url: img('foundation1', 1200, 628), thumbnailUrl: img('foundation1', 400, 209),
    versions: [{ version: 1, url: img('foundation1', 1200, 628), uploadedAt: dateStr(18), uploadedBy: 'u3', changeNote: '首版', size: 410000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(18), updatedAt: dateStr(18), downloads: 52,
    auditTrail: [
      { id: 'at17', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(16) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a14', name: 'INTOYOU_618大促海报_全渠道_v3', fileName: 'intoyou_618_poster_v3.jpg',
    brandId: 'into_you', type: 'image', category: 'poster', status: 'approved',
    channels: ['shopee', 'tiktok', 'instagram', 'lazada'], tags: ['618', '大促', '海报', '限时'], sku: 'IY-PS-001',
    aiTags: [
      { label: '促销海报', labelEn: 'Promo Poster', confidence: 0.98, category: 'product' },
      { label: '红色', labelEn: 'Red', confidence: 0.95, category: 'color' },
      { label: '节日', labelEn: 'Festival', confidence: 0.91, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 850000, url: img('poster2', 1080, 1080), thumbnailUrl: img('poster2', 400, 400),
    versions: [
      { version: 1, url: seedImg('iy-618-v1', 1080, 1080), uploadedAt: dateStr(35), uploadedBy: 'u8', changeNote: '初版', size: 780000 },
      { version: 2, url: seedImg('iy-618-v2', 1080, 1080), uploadedAt: dateStr(28), uploadedBy: 'u8', changeNote: '增加折扣信息', size: 810000 },
      { version: 3, url: img('poster2', 1080, 1080), uploadedAt: dateStr(20), uploadedBy: 'u8', changeNote: '最终审核版', size: 850000 },
    ],
    currentVersion: 3, uploadedBy: 'u8', uploadedAt: dateStr(35), updatedAt: dateStr(20), downloads: 203,
    auditTrail: [
      { id: 'at18', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(19) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a15', name: 'INTOYOU_睫毛膏_Shopee_800x800_v1', fileName: 'intoyou_mascara_shopee_800x800_v1.jpg',
    brandId: 'into_you', type: 'image', category: 'mascara', status: 'in_review',
    channels: ['shopee'], tags: ['睫毛膏', '浓密', '卷翘', '防水'], sku: 'IY-MC-004',
    aiTags: [
      { label: '睫毛膏', labelEn: 'Mascara', confidence: 0.97, category: 'product' },
      { label: '黑色', labelEn: 'Black', confidence: 0.95, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 390000, url: img('mascara1', 800, 800), thumbnailUrl: img('mascara1', 400, 400),
    versions: [{ version: 1, url: img('mascara1', 800, 800), uploadedAt: dateStr(4), uploadedBy: 'u8', changeNote: '新品首版', size: 390000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(4), updatedAt: dateStr(4), downloads: 8,
    auditTrail: [
      { id: 'at19', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u8', userName: '吴策划', timestamp: dateStr(3) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a16', name: 'INTOYOU_卸妆水_Instagram_1080x1080_v1', fileName: 'intoyou_cleanser_ig_1080x1080_v1.jpg',
    brandId: 'into_you', type: 'image', category: 'skincare', status: 'in_review',
    channels: ['instagram'], tags: ['卸妆', '温和', '敏感肌'], sku: 'IY-CL-005',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.95, category: 'product' },
      { label: '蓝色', labelEn: 'Blue', confidence: 0.88, category: 'color' },
      { label: '清爽', labelEn: 'Fresh', confidence: 0.84, category: 'style' },
    ],
    width: 1080, height: 1080, fileSize: 440000, url: img('skincare1', 1080, 1080), thumbnailUrl: img('skincare1', 400, 400),
    versions: [{ version: 1, url: img('skincare1', 1080, 1080), uploadedAt: dateStr(5), uploadedBy: 'u3', changeNote: '首版', size: 440000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(5), updatedAt: dateStr(5), downloads: 3,
    auditTrail: [
      { id: 'at20', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(4) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a17', name: 'INTOYOU_品牌视频_官网_v1', fileName: 'intoyou_brand_video_v1.mp4',
    brandId: 'into_you', type: 'video', category: 'video', status: 'approved',
    channels: ['official_site', 'tiktok'], tags: ['品牌视频', '形象片', '品牌故事'], sku: 'IY-VD-001',
    aiTags: [
      { label: '品牌视频', labelEn: 'Brand Video', confidence: 0.98, category: 'product' },
      { label: '叙事', labelEn: 'Narrative', confidence: 0.86, category: 'scene' },
    ],
    width: 1920, height: 1080, fileSize: 120000000, url: '#', thumbnailUrl: img('video1', 400, 225),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(40), uploadedBy: 'u5', changeNote: '品牌宣传片', size: 120000000 }],
    currentVersion: 1, uploadedBy: 'u5', uploadedAt: dateStr(40), updatedAt: dateStr(40), downloads: 67,
    auditTrail: [
      { id: 'at21', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(38) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a18', name: 'INTOYOU_散粉_草稿', fileName: 'intoyou_loose_powder_draft.jpg',
    brandId: 'into_you', type: 'image', category: 'foundation', status: 'draft',
    channels: ['shopee'], tags: ['散粉', '控油', '草稿'], sku: 'IY-LP-006',
    aiTags: [{ label: '散粉', labelEn: 'Loose Powder', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 350000, url: img('foundation2', 800, 800), thumbnailUrl: img('foundation2', 400, 400),
    versions: [{ version: 1, url: img('foundation2', 800, 800), uploadedAt: dateStr(1), uploadedBy: 'u8', changeNote: '草稿', size: 350000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(1), updatedAt: dateStr(1), downloads: 0,
    auditTrail: [
      { id: 'at22', action: '创建素材', toStatus: 'draft', userId: 'u8', userName: '吴策划', timestamp: dateStr(1) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a19', name: 'INTOYOU_被拒海报', fileName: 'intoyou_rejected_poster.jpg',
    brandId: 'into_you', type: 'image', category: 'poster', status: 'rejected',
    channels: ['shopee'], tags: ['海报', '被拒'], sku: 'IY-PS-002',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.96, category: 'product' }],
    width: 800, height: 800, fileSize: 550000, url: seedImg('iy-rejected', 800, 800), thumbnailUrl: seedImg('iy-rejected', 400, 400),
    versions: [{ version: 1, url: seedImg('iy-rejected', 800, 800), uploadedAt: dateStr(10), uploadedBy: 'u8', changeNote: '初版', size: 550000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(10), updatedAt: dateStr(7), downloads: 0,
    auditTrail: [
      { id: 'at23', action: '审核拒绝', fromStatus: 'in_review', toStatus: 'rejected', userId: 'u5', userName: '陈美妆', timestamp: dateStr(7), note: '品牌调性不符，用色过于鲜艳' },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a20', name: 'INTOYOU_归档素材', fileName: 'intoyou_archived.jpg',
    brandId: 'into_you', type: 'image', category: 'poster', status: 'archived',
    channels: ['shopee'], tags: ['归档', '旧活动'], sku: 'IY-PS-003',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.93, category: 'product' }],
    width: 1080, height: 1080, fileSize: 600000, url: seedImg('iy-archived', 1080, 1080), thumbnailUrl: seedImg('iy-archived', 400, 400),
    versions: [{ version: 1, url: seedImg('iy-archived', 1080, 1080), uploadedAt: dateStr(90), uploadedBy: 'u8', changeNote: '旧活动海报', size: 600000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(90), updatedAt: dateStr(45), downloads: 180,
    auditTrail: [
      { id: 'at24', action: '归档', fromStatus: 'approved', toStatus: 'archived', userId: 'u5', userName: '陈美妆', timestamp: dateStr(45), note: '活动已结束' },
    ],
    relatedAssetIds: [],
  },

  // === Colorkey ===
  {
    id: 'a21', name: 'Colorkey_空气唇釉_Shopee_800x800_v2', fileName: 'colorkey_air_lip_shopee_800x800_v2.jpg',
    brandId: 'colorkey', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['唇釉', '空气感', '轻薄', '少女'], sku: 'CK-LP-001',
    aiTags: [
      { label: '唇釉', labelEn: 'Lip Glaze', confidence: 0.97, category: 'product' },
      { label: '粉色', labelEn: 'Pink', confidence: 0.95, category: 'color' },
      { label: '清透', labelEn: 'Sheer', confidence: 0.93, category: 'style' },
      { label: '少女风', labelEn: 'Girly', confidence: 0.91, category: 'material' },
    ],
    width: 800, height: 800, fileSize: 510000, url: img('lipstick2', 800, 800), thumbnailUrl: img('lipstick2', 400, 400),
    versions: [
      { version: 1, url: seedImg('ck-lip-v1', 800, 800), uploadedAt: dateStr(20), uploadedBy: 'u6', changeNote: '初版', size: 480000 },
      { version: 2, url: img('lipstick2', 800, 800), uploadedAt: dateStr(12), uploadedBy: 'u6', changeNote: '增加清透滤镜', size: 510000 },
    ],
    currentVersion: 2, uploadedBy: 'u6', uploadedAt: dateStr(20), updatedAt: dateStr(12), downloads: 98,
    auditTrail: [
      { id: 'at25', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(11) },
    ],
    relatedAssetIds: ['a22'],
  },
  {
    id: 'a22', name: 'Colorkey_眼线笔_TikTok_1080x1920_v1', fileName: 'colorkey_eyeliner_tiktok_1080x1920_v1.jpg',
    brandId: 'colorkey', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['tiktok'], tags: ['眼线笔', '极细', '防水', '新手友好'], sku: 'CK-EL-001',
    aiTags: [
      { label: '眼线笔', labelEn: 'Eyeliner', confidence: 0.96, category: 'product' },
      { label: '黑色', labelEn: 'Black', confidence: 0.91, category: 'color' },
      { label: '精准', labelEn: 'Precise', confidence: 0.88, category: 'style' },
    ],
    width: 1080, height: 1920, fileSize: 670000, url: img('eyeshadow2', 1080, 1920), thumbnailUrl: img('eyeshadow2', 400, 711),
    versions: [{ version: 1, url: img('eyeshadow2', 1080, 1920), uploadedAt: dateStr(8), uploadedBy: 'u6', changeNote: '首版', size: 670000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(8), updatedAt: dateStr(8), downloads: 62,
    auditTrail: [
      { id: 'at26', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(6) },
    ],
    relatedAssetIds: ['a21'],
  },
  {
    id: 'a23', name: 'Colorkey_彩色眼影_Google_1200x628_v1', fileName: 'colorkey_eyeshadow_google_1200x628_v1.jpg',
    brandId: 'colorkey', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['google'], tags: ['眼影', '彩色', '甜美', '广告图'], sku: 'CK-ES-002',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.95, category: 'product' },
      { label: '多彩', labelEn: 'Colorful', confidence: 0.90, category: 'color' },
      { label: '甜美', labelEn: 'Sweet', confidence: 0.88, category: 'style' },
    ],
    width: 1200, height: 628, fileSize: 430000, url: img('eyeshadow3', 1200, 628), thumbnailUrl: img('eyeshadow3', 400, 209),
    versions: [{ version: 1, url: img('eyeshadow3', 1200, 628), uploadedAt: dateStr(14), uploadedBy: 'u6', changeNote: '首版', size: 430000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(14), updatedAt: dateStr(14), downloads: 41,
    auditTrail: [
      { id: 'at27', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(12) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a24', name: 'Colorkey_周年庆_海报_v1', fileName: 'colorkey_anniversary_poster_v1.jpg',
    brandId: 'colorkey', type: 'image', category: 'poster', status: 'approved',
    channels: ['instagram', 'shopee'], tags: ['周年庆', '限定', '海报', '活动'], sku: 'CK-PS-001',
    aiTags: [
      { label: '海报', labelEn: 'Poster', confidence: 0.97, category: 'product' },
      { label: '紫色', labelEn: 'Purple', confidence: 0.92, category: 'color' },
      { label: '活动', labelEn: 'Campaign', confidence: 0.94, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 780000, url: img('poster1', 1080, 1080), thumbnailUrl: img('poster1', 400, 400),
    versions: [{ version: 1, url: img('poster1', 1080, 1080), uploadedAt: dateStr(25), uploadedBy: 'u8', changeNote: '周年庆海报', size: 780000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(25), updatedAt: dateStr(25), downloads: 87,
    auditTrail: [
      { id: 'at28', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(23) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a25', name: 'Colorkey_定妆喷雾_Shopee_800x800_v1', fileName: 'colorkey_setting_spray_shopee_800x800_v1.jpg',
    brandId: 'colorkey', type: 'image', category: 'foundation', status: 'in_review',
    channels: ['shopee'], tags: ['定妆喷雾', '持妆', '控油', '清爽'], sku: 'CK-SS-003',
    aiTags: [
      { label: '定妆喷雾', labelEn: 'Setting Spray', confidence: 0.96, category: 'product' },
      { label: '透明', labelEn: 'Clear', confidence: 0.91, category: 'color' },
      { label: '清爽', labelEn: 'Refreshing', confidence: 0.87, category: 'style' },
    ],
    width: 800, height: 800, fileSize: 420000, url: img('skincare2', 800, 800), thumbnailUrl: img('skincare2', 400, 400),
    versions: [{ version: 1, url: img('skincare2', 800, 800), uploadedAt: dateStr(3), uploadedBy: 'u6', changeNote: '新品首版', size: 420000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(3), updatedAt: dateStr(3), downloads: 5,
    auditTrail: [
      { id: 'at29', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u6', userName: '赵运营', timestamp: dateStr(2) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a26', name: 'Colorkey_品牌视频_官网_v1', fileName: 'colorkey_brand_video_v1.mp4',
    brandId: 'colorkey', type: 'video', category: 'video', status: 'approved',
    channels: ['official_site'], tags: ['品牌视频', '潮流', '年轻'], sku: 'CK-VD-001',
    aiTags: [
      { label: '品牌视频', labelEn: 'Brand Video', confidence: 0.98, category: 'product' },
      { label: '潮流', labelEn: 'Trendy', confidence: 0.90, category: 'style' },
    ],
    width: 1920, height: 1080, fileSize: 85000000, url: '#', thumbnailUrl: img('beauty1', 400, 225),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(30), uploadedBy: 'u6', changeNote: '品牌宣传片', size: 85000000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(30), updatedAt: dateStr(30), downloads: 43,
    auditTrail: [
      { id: 'at30', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(28) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a27', name: 'Colorkey_遮瑕棒_草稿', fileName: 'colorkey_concealer_draft.jpg',
    brandId: 'colorkey', type: 'image', category: 'foundation', status: 'draft',
    channels: ['shopee'], tags: ['遮瑕', '草稿'], sku: 'CK-CC-001',
    aiTags: [{ label: '遮瑕', labelEn: 'Concealer', confidence: 0.93, category: 'product' }],
    width: 800, height: 800, fileSize: 310000, url: img('beauty2', 800, 800), thumbnailUrl: img('beauty2', 400, 400),
    versions: [{ version: 1, url: img('beauty2', 800, 800), uploadedAt: dateStr(0), uploadedBy: 'u6', changeNote: '草稿', size: 310000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(0), updatedAt: dateStr(0), downloads: 0,
    auditTrail: [
      { id: 'at31', action: '创建素材', toStatus: 'draft', userId: 'u6', userName: '赵运营', timestamp: dateStr(0) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a28', name: 'Colorkey_过期活动图', fileName: 'colorkey_expired_event.jpg',
    brandId: 'colorkey', type: 'image', category: 'poster', status: 'expired',
    channels: ['shopee', 'lazada'], tags: ['活动', '过期'], sku: 'CK-PS-002',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.95, category: 'product' }],
    width: 800, height: 800, fileSize: 520000, url: seedImg('ck-expired', 800, 800), thumbnailUrl: seedImg('ck-expired', 400, 400),
    versions: [{ version: 1, url: seedImg('ck-expired', 800, 800), uploadedAt: dateStr(100), uploadedBy: 'u8', changeNote: '活动图', size: 520000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(100), updatedAt: dateStr(60), expiresAt: dateStr(10), downloads: 120,
    auditTrail: [
      { id: 'at32', action: '素材过期', fromStatus: 'approved', toStatus: 'expired', userId: 'u1', userName: '系统', timestamp: dateStr(10) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a29', name: 'Colorkey_归档旧图', fileName: 'colorkey_archived_old.jpg',
    brandId: 'colorkey', type: 'image', category: 'blush', status: 'archived',
    channels: ['shopee'], tags: ['归档', '旧版'], sku: 'CK-BL-002',
    aiTags: [{ label: '腮红', labelEn: 'Blush', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 460000, url: img('blush2', 800, 800), thumbnailUrl: img('blush2', 400, 400),
    versions: [{ version: 1, url: img('blush2', 800, 800), uploadedAt: dateStr(80), uploadedBy: 'u6', changeNote: '旧版', size: 460000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(80), updatedAt: dateStr(50), downloads: 95,
    auditTrail: [
      { id: 'at33', action: '归档', fromStatus: 'approved', toStatus: 'archived', userId: 'u1', userName: '林小美', timestamp: dateStr(50), note: '产品下架' },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a30', name: 'Colorkey_护肤套装_Instagram_1080x1080_v1', fileName: 'colorkey_skincare_ig_1080x1080_v1.jpg',
    brandId: 'colorkey', type: 'image', category: 'skincare', status: 'draft',
    channels: ['instagram'], tags: ['护肤', '套装', '保湿'], sku: 'CK-SK-001',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.95, category: 'product' },
      { label: '白色', labelEn: 'White', confidence: 0.89, category: 'color' },
      { label: '简约', labelEn: 'Minimalist', confidence: 0.85, category: 'style' },
    ],
    width: 1080, height: 1080, fileSize: 480000, url: img('skincare1', 1080, 1080), thumbnailUrl: img('skincare1', 400, 400),
    versions: [{ version: 1, url: img('skincare1', 1080, 1080), uploadedAt: dateStr(0), uploadedBy: 'u6', changeNote: '新品草稿', size: 480000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(0), updatedAt: dateStr(0), downloads: 0,
    auditTrail: [
      { id: 'at34', action: '创建素材', toStatus: 'draft', userId: 'u6', userName: '赵运营', timestamp: dateStr(0) },
    ],
    relatedAssetIds: [],
  },
  // Extra Judydoll assets for more variety
  {
    id: 'a31', name: '橘朵_柔焦散粉_Lazada_800x800_v1', fileName: 'judydoll_loose_powder_lazada_800x800_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'foundation', status: 'approved',
    channels: ['lazada'], tags: ['散粉', '柔焦', '定妆', '便携'], sku: 'JD-PW-003',
    aiTags: [
      { label: '散粉', labelEn: 'Loose Powder', confidence: 0.96, category: 'product' },
      { label: '裸色', labelEn: 'Nude', confidence: 0.89, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 400000, url: img('foundation2', 800, 800), thumbnailUrl: img('foundation2', 400, 400),
    versions: [{ version: 1, url: img('foundation2', 800, 800), uploadedAt: dateStr(16), uploadedBy: 'u3', changeNote: '首版', size: 400000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(16), updatedAt: dateStr(16), downloads: 33,
    auditTrail: [
      { id: 'at35', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(14) },
    ],
    relatedAssetIds: ['a3'],
  },
  {
    id: 'a32', name: '橘朵_高光修容盘_TikTok_1080x1920_v1', fileName: 'judydoll_highlight_tiktok_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'blush', status: 'approved',
    channels: ['tiktok'], tags: ['高光', '修容', '立体', '竖版'], sku: 'JD-HL-004',
    aiTags: [
      { label: '高光修容', labelEn: 'Highlight & Contour', confidence: 0.95, category: 'product' },
      { label: '香槟色', labelEn: 'Champagne', confidence: 0.90, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 580000, url: img('blush2', 1080, 1920), thumbnailUrl: img('blush2', 400, 711),
    versions: [{ version: 1, url: img('blush2', 1080, 1920), uploadedAt: dateStr(7), uploadedBy: 'u3', changeNote: '首版', size: 580000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(7), updatedAt: dateStr(7), downloads: 45,
    auditTrail: [
      { id: 'at36', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(5) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a33', name: '橘朵_彩色眼影盘_Shopee_800x800_v1', fileName: 'judydoll_color_eyeshadow_shopee_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'eyeshadow', status: 'in_review',
    channels: ['shopee'], tags: ['眼影', '彩色', '渐变', '春季'], sku: 'JD-ES-005',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.97, category: 'product' },
      { label: '渐变色', labelEn: 'Gradient', confidence: 0.92, category: 'color' },
      { label: '多彩', labelEn: 'Colorful', confidence: 0.90, category: 'material' },
    ],
    width: 800, height: 800, fileSize: 500000, url: img('eyeshadow3', 800, 800), thumbnailUrl: img('eyeshadow3', 400, 400),
    versions: [{ version: 1, url: img('eyeshadow3', 800, 800), uploadedAt: dateStr(2), uploadedBy: 'u3', changeNote: '新品', size: 500000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(2), updatedAt: dateStr(2), downloads: 2,
    auditTrail: [
      { id: 'at37', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(1) },
    ],
    relatedAssetIds: ['a4'],
  },
  {
    id: 'a34', name: '橘朵_卸妆膏_官网_1920x1080_v1', fileName: 'judydoll_cleansing_official_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'skincare', status: 'approved',
    channels: ['official_site'], tags: ['卸妆', '温和', '养肤'], sku: 'JD-SK-001',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.96, category: 'product' },
      { label: '绿色', labelEn: 'Green', confidence: 0.88, category: 'color' },
      { label: '自然', labelEn: 'Natural', confidence: 0.91, category: 'style' },
    ],
    width: 1920, height: 1080, fileSize: 750000, url: img('skincare2', 1920, 1080), thumbnailUrl: img('skincare2', 400, 225),
    versions: [{ version: 1, url: img('skincare2', 1920, 1080), uploadedAt: dateStr(9), uploadedBy: 'u3', changeNote: '首版', size: 750000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(9), updatedAt: dateStr(9), downloads: 28,
    auditTrail: [
      { id: 'at38', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(7) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a35', name: '橘朵_唇釉色卡_全渠道_v1', fileName: 'judydoll_color_chart_v1.jpg',
    brandId: 'judydoll', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee', 'tiktok', 'instagram', 'lazada', 'official_site'], tags: ['色卡', '唇釉', '全色号', '参考'], sku: 'JD-LP-REF',
    aiTags: [
      { label: '色卡', labelEn: 'Color Chart', confidence: 0.97, category: 'product' },
      { label: '多色', labelEn: 'Multicolor', confidence: 0.95, category: 'color' },
    ],
    width: 1200, height: 1200, fileSize: 920000, url: img('lipstick4', 1200, 1200), thumbnailUrl: img('lipstick4', 400, 400),
    versions: [{ version: 1, url: img('lipstick4', 1200, 1200), uploadedAt: dateStr(45), uploadedBy: 'u2', changeNote: '完整色卡', size: 920000 }],
    currentVersion: 1, uploadedBy: 'u2', uploadedAt: dateStr(45), updatedAt: dateStr(45), downloads: 312,
    auditTrail: [
      { id: 'at39', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(43) },
    ],
    relatedAssetIds: ['a1', 'a2'],
  },
];

// ==================== Approval Items ====================
export const approvalItems: ApprovalItem[] = [
  { id: 'ap1', assetId: 'a3', requestedBy: 'u3', requestedAt: dateStr(2), status: 'pending' },
  { id: 'ap2', assetId: 'a7', requestedBy: 'u3', requestedAt: dateStr(1), status: 'pending' },
  { id: 'ap3', assetId: 'a15', requestedBy: 'u8', requestedAt: dateStr(3), status: 'pending' },
  { id: 'ap4', assetId: 'a16', requestedBy: 'u3', requestedAt: dateStr(4), status: 'pending' },
  { id: 'ap5', assetId: 'a25', requestedBy: 'u6', requestedAt: dateStr(2), status: 'pending' },
  { id: 'ap6', assetId: 'a33', requestedBy: 'u3', requestedAt: dateStr(1), status: 'pending' },
  // Historical
  { id: 'ap7', assetId: 'a1', requestedBy: 'u3', requestedAt: dateStr(20), status: 'approved', reviewedBy: 'u4', reviewedAt: dateStr(18), note: '质量优秀' },
  { id: 'ap8', assetId: 'a10', requestedBy: 'u3', requestedAt: dateStr(7), status: 'rejected', reviewedBy: 'u4', reviewedAt: dateStr(6), rejectReason: '图片分辨率不足' },
  { id: 'ap9', assetId: 'a11', requestedBy: 'u8', requestedAt: dateStr(16), status: 'approved', reviewedBy: 'u5', reviewedAt: dateStr(14) },
  { id: 'ap10', assetId: 'a19', requestedBy: 'u8', requestedAt: dateStr(8), status: 'rejected', reviewedBy: 'u5', reviewedAt: dateStr(7), rejectReason: '品牌调性不符' },
  { id: 'ap11', assetId: 'a21', requestedBy: 'u6', requestedAt: dateStr(13), status: 'approved', reviewedBy: 'u4', reviewedAt: dateStr(11) },
  { id: 'ap12', assetId: 'a14', requestedBy: 'u8', requestedAt: dateStr(21), status: 'approved', reviewedBy: 'u5', reviewedAt: dateStr(19) },
];

// ==================== Naming Rules ====================
export const namingRules: NamingRule[] = [
  { id: 'nr1', brandId: 'judydoll', pattern: '{品牌}_{SKU}_{渠道}_{尺寸}_{版本}', example: '橘朵_JD-LP-001_Shopee_800x800_v3', fields: ['品牌', 'SKU', '渠道', '尺寸', '版本'] },
  { id: 'nr2', brandId: 'into_you', pattern: '{品牌}_{产品}_{渠道}_{尺寸}_{版本}', example: 'INTOYOU_水光唇釉_Shopee_800x800_v2', fields: ['品牌', '产品', '渠道', '尺寸', '版本'] },
  { id: 'nr3', brandId: 'colorkey', pattern: '{品牌}_{系列}_{产品}_{渠道}_{尺寸}_{版本}', example: 'Colorkey_空气_唇釉_Shopee_800x800_v2', fields: ['品牌', '系列', '产品', '渠道', '尺寸', '版本'] },
];

// ==================== Semantic Search Mapping ====================
export const semanticSearchMap: Record<string, { assetIds: string[]; reason: string }> = {
  '珊瑚唇釉': { assetIds: ['a1', 'a2', 'a9', 'a35'], reason: '语义匹配：珊瑚色系唇釉产品' },
  'coral lip': { assetIds: ['a1', 'a2', 'a9', 'a35'], reason: 'Cross-lingual match: coral lip products' },
  '红色口红': { assetIds: ['a1', 'a2', 'a11', 'a21', 'a35'], reason: '语义匹配：红色系唇部产品' },
  'red lipstick': { assetIds: ['a1', 'a2', 'a11', 'a21', 'a35'], reason: 'Cross-lingual match: red lipstick products' },
  '夏日': { assetIds: ['a5', 'a24'], reason: '语义匹配：夏日/活动相关素材' },
  'summer': { assetIds: ['a5', 'a24'], reason: 'Cross-lingual match: summer campaign assets' },
  '少女风': { assetIds: ['a4', 'a21', 'a22', 'a33'], reason: '语义匹配：少女风格素材' },
  'girly style': { assetIds: ['a4', 'a21', 'a22', 'a33'], reason: 'Cross-lingual match: girly/cute style assets' },
  '大促海报': { assetIds: ['a5', 'a14', 'a24'], reason: '语义匹配：促销活动海报' },
  'promotion poster': { assetIds: ['a5', 'a14', 'a24'], reason: 'Cross-lingual match: promotional posters' },
  '眼妆': { assetIds: ['a4', 'a22', 'a23', 'a33', 'a15'], reason: '语义匹配：眼部彩妆（眼影+眼线+睫毛膏）' },
  'eye makeup': { assetIds: ['a4', 'a22', 'a23', 'a33', 'a15'], reason: 'Cross-lingual match: eye makeup products' },
  '粉底定妆': { assetIds: ['a3', 'a13', 'a25', 'a31'], reason: '语义匹配：底妆/定妆类产品' },
  'base makeup': { assetIds: ['a3', 'a13', 'a25', 'a31'], reason: 'Cross-lingual match: base/setting makeup' },
  '视频素材': { assetIds: ['a7', 'a17', 'a26'], reason: '语义匹配：视频类型素材' },
  'video content': { assetIds: ['a7', 'a17', 'a26'], reason: 'Cross-lingual match: video assets' },
  '护肤': { assetIds: ['a16', 'a30', 'a34'], reason: '语义匹配：护肤类产品' },
  'skincare': { assetIds: ['a16', 'a30', 'a34'], reason: 'Cross-lingual match: skincare products' },
  '竖版': { assetIds: ['a2', 'a7', 'a12', 'a22', 'a32'], reason: '语义匹配：竖版/TikTok 尺寸素材' },
  'vertical': { assetIds: ['a2', 'a7', 'a12', 'a22', 'a32'], reason: 'Cross-lingual match: vertical format assets' },
};

// ==================== Portal Passwords ====================
export const portalPasswords: Record<string, string> = {
  judydoll: 'judydoll2024',
  into_you: 'intoyou2024',
  colorkey: 'colorkey2024',
};
