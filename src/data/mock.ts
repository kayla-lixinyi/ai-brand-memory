import { Brand, User, Asset, ApprovalItem, NamingRule } from '@/types';

// ==================== Brands ====================
export const brands: Brand[] = [
  { id: 'florasis', name: '花西子', nameEn: 'Florasis', logo: '🌸', color: '#C45B7C' },
  { id: 'perfect_diary', name: '完美日记', nameEn: 'Perfect Diary', logo: '💄', color: '#E8456B' },
  { id: 'flower_knows', name: '花知晓', nameEn: 'Flower Knows', logo: '🌷', color: '#F4A0B5' },
];

// ==================== Users ====================
export const users: User[] = [
  { id: 'u1', name: '林小美', email: 'xiaomei@juyi.com', role: 'admin', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Xiaomei', brandIds: ['florasis', 'perfect_diary', 'flower_knows'] },
  { id: 'u2', name: '王品宣', email: 'pinxuan@juyi.com', role: 'brand_manager', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pinxuan', brandIds: ['florasis'] },
  { id: 'u3', name: '张设计', email: 'design@juyi.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Designer', brandIds: ['florasis', 'perfect_diary'] },
  { id: 'u4', name: '李审核', email: 'reviewer@juyi.com', role: 'reviewer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Reviewer', brandIds: ['florasis', 'perfect_diary', 'flower_knows'] },
  { id: 'u5', name: '陈美妆', email: 'meizhuang@juyi.com', role: 'brand_manager', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Meizhuang', brandIds: ['perfect_diary'] },
  { id: 'u6', name: '赵运营', email: 'ops@juyi.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ops', brandIds: ['flower_knows'] },
  { id: 'u7', name: '周查看', email: 'viewer@juyi.com', role: 'viewer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Viewer', brandIds: ['florasis'] },
  { id: 'u8', name: '吴策划', email: 'plan@juyi.com', role: 'designer', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Plan', brandIds: ['perfect_diary', 'flower_knows'] },
];

// ==================== Helper ====================
function img(seed: string, w = 400, h = 400) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function dateStr(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

// ==================== Assets ====================
export const assets: Asset[] = [
  // === Florasis (花西子) ===
  {
    id: 'a1', name: '花西子_同心锁口红_Shopee_800x800_v3', fileName: 'florasis_lipstick_shopee_800x800_v3.jpg',
    brandId: 'florasis', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee'], tags: ['口红', '同心锁', '新年限定', '红色'], sku: 'FLR-LP-001',
    aiTags: [
      { label: '口红', labelEn: 'Lipstick', confidence: 0.98, category: 'product' },
      { label: '红色', labelEn: 'Red', confidence: 0.95, category: 'color' },
      { label: '中国风', labelEn: 'Chinese Style', confidence: 0.92, category: 'style' },
      { label: '产品特写', labelEn: 'Product Close-up', confidence: 0.89, category: 'scene' },
    ],
    width: 800, height: 800, fileSize: 524288, url: img('florasis-lipstick', 800, 800), thumbnailUrl: img('florasis-lipstick', 400, 400),
    versions: [
      { version: 1, url: img('florasis-lipstick-v1', 800, 800), uploadedAt: dateStr(30), uploadedBy: 'u3', changeNote: '初版设计', size: 480000 },
      { version: 2, url: img('florasis-lipstick-v2', 800, 800), uploadedAt: dateStr(15), uploadedBy: 'u3', changeNote: '调整色温和构图', size: 510000 },
      { version: 3, url: img('florasis-lipstick', 800, 800), uploadedAt: dateStr(5), uploadedBy: 'u3', changeNote: '最终版-增加新年元素', size: 524288 },
    ],
    currentVersion: 3, uploadedBy: 'u3', uploadedAt: dateStr(30), updatedAt: dateStr(5), downloads: 128,
    auditTrail: [
      { id: 'at1', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(30) },
      { id: 'at2', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(20) },
      { id: 'at3', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(18), note: '质量优秀，色彩准确' },
    ],
    relatedAssetIds: ['a2', 'a3'], description: '花西子同心锁口红 Shopee 主图，新年限定包装',
  },
  {
    id: 'a2', name: '花西子_同心锁口红_TikTok_1080x1920_v2', fileName: 'florasis_lipstick_tiktok_1080x1920_v2.jpg',
    brandId: 'florasis', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['tiktok'], tags: ['口红', '同心锁', '竖版', '短视频封面'], sku: 'FLR-LP-001',
    aiTags: [
      { label: '口红', labelEn: 'Lipstick', confidence: 0.97, category: 'product' },
      { label: '竖版构图', labelEn: 'Vertical', confidence: 0.94, category: 'scene' },
      { label: '暖色调', labelEn: 'Warm Tone', confidence: 0.88, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 680000, url: img('florasis-lipstick-tk', 1080, 1920), thumbnailUrl: img('florasis-lipstick-tk', 400, 711),
    versions: [
      { version: 1, url: img('florasis-lipstick-tk-v1', 1080, 1920), uploadedAt: dateStr(25), uploadedBy: 'u3', changeNote: '初版', size: 650000 },
      { version: 2, url: img('florasis-lipstick-tk', 1080, 1920), uploadedAt: dateStr(10), uploadedBy: 'u3', changeNote: '优化竖版构图', size: 680000 },
    ],
    currentVersion: 2, uploadedBy: 'u3', uploadedAt: dateStr(25), updatedAt: dateStr(10), downloads: 89,
    auditTrail: [
      { id: 'at4', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(25) },
      { id: 'at5', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(8) },
    ],
    relatedAssetIds: ['a1', 'a3'],
  },
  {
    id: 'a3', name: '花西子_蜜粉_Google_1200x628_v1', fileName: 'florasis_powder_google_1200x628_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'foundation', status: 'in_review',
    channels: ['google'], tags: ['蜜粉', '定妆', '清透'], sku: 'FLR-PW-002',
    aiTags: [
      { label: '粉底/蜜粉', labelEn: 'Foundation/Powder', confidence: 0.96, category: 'product' },
      { label: '裸色', labelEn: 'Nude', confidence: 0.91, category: 'color' },
      { label: '简约', labelEn: 'Minimalist', confidence: 0.85, category: 'style' },
    ],
    width: 1200, height: 628, fileSize: 420000, url: img('florasis-powder', 1200, 628), thumbnailUrl: img('florasis-powder', 400, 209),
    versions: [{ version: 1, url: img('florasis-powder', 1200, 628), uploadedAt: dateStr(3), uploadedBy: 'u3', changeNote: '首版', size: 420000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(3), updatedAt: dateStr(3), downloads: 12,
    auditTrail: [
      { id: 'at6', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(3) },
      { id: 'at7', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(2) },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a4', name: '花西子_眼影盘_Shopee_800x800_v1', fileName: 'florasis_eyeshadow_shopee_800x800_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['眼影', '百鸟朝凤', '雕花', '国风'], sku: 'FLR-ES-003',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.97, category: 'product' },
      { label: '多色', labelEn: 'Multicolor', confidence: 0.93, category: 'color' },
      { label: '雕花工艺', labelEn: 'Carved', confidence: 0.90, category: 'material' },
      { label: '中国风', labelEn: 'Chinese Style', confidence: 0.95, category: 'style' },
    ],
    width: 800, height: 800, fileSize: 560000, url: img('florasis-eyeshadow', 800, 800), thumbnailUrl: img('florasis-eyeshadow', 400, 400),
    versions: [{ version: 1, url: img('florasis-eyeshadow', 800, 800), uploadedAt: dateStr(12), uploadedBy: 'u3', changeNote: '百鸟朝凤系列', size: 560000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(12), updatedAt: dateStr(12), downloads: 67,
    auditTrail: [
      { id: 'at8', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(10) },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a5', name: '花西子_春季活动海报_Instagram_1080x1080_v2', fileName: 'florasis_spring_poster_ig_1080x1080_v2.jpg',
    brandId: 'florasis', type: 'image', category: 'poster', status: 'approved',
    channels: ['instagram'], tags: ['海报', '春季', '花卉', '活动'], sku: 'FLR-PS-004',
    aiTags: [
      { label: '海报', labelEn: 'Poster', confidence: 0.96, category: 'product' },
      { label: '粉色', labelEn: 'Pink', confidence: 0.94, category: 'color' },
      { label: '花卉', labelEn: 'Floral', confidence: 0.92, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 720000, url: img('florasis-spring', 1080, 1080), thumbnailUrl: img('florasis-spring', 400, 400),
    versions: [
      { version: 1, url: img('florasis-spring-v1', 1080, 1080), uploadedAt: dateStr(20), uploadedBy: 'u3', changeNote: '初版', size: 700000 },
      { version: 2, url: img('florasis-spring', 1080, 1080), uploadedAt: dateStr(14), uploadedBy: 'u3', changeNote: '增加促销信息', size: 720000 },
    ],
    currentVersion: 2, uploadedBy: 'u3', uploadedAt: dateStr(20), updatedAt: dateStr(14), downloads: 45,
    auditTrail: [
      { id: 'at9', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(13) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a6', name: '花西子_品牌指南_v1', fileName: 'florasis_brand_guide_v1.pdf',
    brandId: 'florasis', type: 'document', category: 'brand_doc', status: 'approved',
    channels: ['official_site'], tags: ['品牌指南', 'VI', '规范'], sku: 'FLR-DOC-001',
    aiTags: [{ label: '品牌文档', labelEn: 'Brand Document', confidence: 0.99, category: 'product' }],
    width: 0, height: 0, fileSize: 15000000, url: '#', thumbnailUrl: img('florasis-doc', 400, 300),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(60), uploadedBy: 'u2', changeNote: '品牌规范手册', size: 15000000 }],
    currentVersion: 1, uploadedBy: 'u2', uploadedAt: dateStr(60), updatedAt: dateStr(60), downloads: 234,
    auditTrail: [
      { id: 'at10', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(58) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a7', name: '花西子_口红试色视频_TikTok_v1', fileName: 'florasis_lipstick_swatch_tiktok_v1.mp4',
    brandId: 'florasis', type: 'video', category: 'video', status: 'in_review',
    channels: ['tiktok'], tags: ['试色', '口红', '短视频', 'KOL'], sku: 'FLR-VD-001',
    aiTags: [
      { label: '视频', labelEn: 'Video', confidence: 0.99, category: 'product' },
      { label: '试色', labelEn: 'Swatch', confidence: 0.93, category: 'scene' },
      { label: '红色系', labelEn: 'Red Tones', confidence: 0.88, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 45000000, url: '#', thumbnailUrl: img('florasis-video', 400, 711),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(2), uploadedBy: 'u3', changeNote: '试色视频初版', size: 45000000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(2), updatedAt: dateStr(2), downloads: 5,
    auditTrail: [
      { id: 'at11', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(1) },
    ],
    relatedAssetIds: ['a1', 'a2'],
  },
  {
    id: 'a8', name: '花西子_腮红_Shopee_800x800_v1', fileName: 'florasis_blush_shopee_800x800_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'blush', status: 'draft',
    channels: ['shopee'], tags: ['腮红', '桃花', '自然'], sku: 'FLR-BL-001',
    aiTags: [
      { label: '腮红', labelEn: 'Blush', confidence: 0.96, category: 'product' },
      { label: '粉色', labelEn: 'Pink', confidence: 0.92, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 380000, url: img('florasis-blush', 800, 800), thumbnailUrl: img('florasis-blush', 400, 400),
    versions: [{ version: 1, url: img('florasis-blush', 800, 800), uploadedAt: dateStr(1), uploadedBy: 'u3', changeNote: '草稿', size: 380000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(1), updatedAt: dateStr(1), downloads: 0,
    auditTrail: [
      { id: 'at12', action: '创建素材', toStatus: 'draft', userId: 'u3', userName: '张设计', timestamp: dateStr(1) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a9', name: '花西子_同心锁口红_过期素材', fileName: 'florasis_lipstick_old.jpg',
    brandId: 'florasis', type: 'image', category: 'lipstick', status: 'expired',
    channels: ['shopee'], tags: ['口红', '旧版', '过期'], sku: 'FLR-LP-001',
    aiTags: [{ label: '口红', labelEn: 'Lipstick', confidence: 0.97, category: 'product' }],
    width: 800, height: 800, fileSize: 450000, url: img('florasis-old', 800, 800), thumbnailUrl: img('florasis-old', 400, 400),
    versions: [{ version: 1, url: img('florasis-old', 800, 800), uploadedAt: dateStr(120), uploadedBy: 'u3', changeNote: '旧版', size: 450000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(120), updatedAt: dateStr(30), expiresAt: dateStr(5), downloads: 340,
    auditTrail: [
      { id: 'at13', action: '素材过期', fromStatus: 'approved', toStatus: 'expired', userId: 'u1', userName: '系统', timestamp: dateStr(5), note: '超过有效期自动过期' },
    ],
    relatedAssetIds: ['a1'],
  },
  {
    id: 'a10', name: '花西子_眉笔_被拒素材', fileName: 'florasis_eyebrow_rejected.jpg',
    brandId: 'florasis', type: 'image', category: 'lipstick', status: 'rejected',
    channels: ['shopee'], tags: ['眉笔', '被拒'], sku: 'FLR-EB-001',
    aiTags: [{ label: '眉笔', labelEn: 'Eyebrow Pencil', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 320000, url: img('florasis-rejected', 800, 800), thumbnailUrl: img('florasis-rejected', 400, 400),
    versions: [{ version: 1, url: img('florasis-rejected', 800, 800), uploadedAt: dateStr(8), uploadedBy: 'u3', changeNote: '初版', size: 320000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(8), updatedAt: dateStr(6), downloads: 0,
    auditTrail: [
      { id: 'at14', action: '审核拒绝', fromStatus: 'in_review', toStatus: 'rejected', userId: 'u4', userName: '李审核', timestamp: dateStr(6), note: '图片分辨率不足，色彩偏差较大' },
    ],
    relatedAssetIds: [],
  },

  // === Perfect Diary (完美日记) ===
  {
    id: 'a11', name: '完美日记_动物眼影_Shopee_800x800_v2', fileName: 'pd_animal_eyeshadow_shopee_800x800_v2.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['眼影', '动物系列', '小猫盘', '日常妆'], sku: 'PD-ES-001',
    aiTags: [
      { label: '眼影盘', labelEn: 'Eyeshadow Palette', confidence: 0.98, category: 'product' },
      { label: '大地色', labelEn: 'Earth Tones', confidence: 0.94, category: 'color' },
      { label: '可爱', labelEn: 'Cute', confidence: 0.87, category: 'style' },
    ],
    width: 800, height: 800, fileSize: 490000, url: img('pd-eyeshadow', 800, 800), thumbnailUrl: img('pd-eyeshadow', 400, 400),
    versions: [
      { version: 1, url: img('pd-eyeshadow-v1', 800, 800), uploadedAt: dateStr(22), uploadedBy: 'u8', changeNote: '初版', size: 470000 },
      { version: 2, url: img('pd-eyeshadow', 800, 800), uploadedAt: dateStr(15), uploadedBy: 'u8', changeNote: '优化产品角度', size: 490000 },
    ],
    currentVersion: 2, uploadedBy: 'u8', uploadedAt: dateStr(22), updatedAt: dateStr(15), downloads: 156,
    auditTrail: [
      { id: 'at15', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(14) },
    ],
    relatedAssetIds: ['a12'],
  },
  {
    id: 'a12', name: '完美日记_唇釉_TikTok_1080x1920_v1', fileName: 'pd_lipgloss_tiktok_1080x1920_v1.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['tiktok'], tags: ['唇釉', '水光', '试色'], sku: 'PD-LG-002',
    aiTags: [
      { label: '唇釉', labelEn: 'Lip Gloss', confidence: 0.96, category: 'product' },
      { label: '水光感', labelEn: 'Glossy', confidence: 0.92, category: 'style' },
      { label: '玫红色', labelEn: 'Rose Red', confidence: 0.89, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 620000, url: img('pd-lipgloss', 1080, 1920), thumbnailUrl: img('pd-lipgloss', 400, 711),
    versions: [{ version: 1, url: img('pd-lipgloss', 1080, 1920), uploadedAt: dateStr(10), uploadedBy: 'u8', changeNote: '首版', size: 620000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(10), updatedAt: dateStr(10), downloads: 78,
    auditTrail: [
      { id: 'at16', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(8) },
    ],
    relatedAssetIds: ['a11'],
  },
  {
    id: 'a13', name: '完美日记_粉底液_Google_1200x628_v1', fileName: 'pd_foundation_google_1200x628_v1.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'foundation', status: 'approved',
    channels: ['google'], tags: ['粉底液', '持妆', '控油'], sku: 'PD-FD-003',
    aiTags: [
      { label: '粉底液', labelEn: 'Foundation', confidence: 0.97, category: 'product' },
      { label: '裸色', labelEn: 'Nude', confidence: 0.90, category: 'color' },
    ],
    width: 1200, height: 628, fileSize: 410000, url: img('pd-foundation', 1200, 628), thumbnailUrl: img('pd-foundation', 400, 209),
    versions: [{ version: 1, url: img('pd-foundation', 1200, 628), uploadedAt: dateStr(18), uploadedBy: 'u3', changeNote: '首版', size: 410000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(18), updatedAt: dateStr(18), downloads: 52,
    auditTrail: [
      { id: 'at17', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(16) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a14', name: '完美日记_双十一海报_全渠道_v3', fileName: 'pd_1111_poster_v3.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'poster', status: 'approved',
    channels: ['shopee', 'tiktok', 'instagram', 'lazada'], tags: ['双十一', '大促', '海报', '限时'], sku: 'PD-PS-001',
    aiTags: [
      { label: '促销海报', labelEn: 'Promo Poster', confidence: 0.98, category: 'product' },
      { label: '红色', labelEn: 'Red', confidence: 0.95, category: 'color' },
      { label: '节日', labelEn: 'Festival', confidence: 0.91, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 850000, url: img('pd-1111', 1080, 1080), thumbnailUrl: img('pd-1111', 400, 400),
    versions: [
      { version: 1, url: img('pd-1111-v1', 1080, 1080), uploadedAt: dateStr(35), uploadedBy: 'u8', changeNote: '初版', size: 780000 },
      { version: 2, url: img('pd-1111-v2', 1080, 1080), uploadedAt: dateStr(28), uploadedBy: 'u8', changeNote: '增加折扣信息', size: 810000 },
      { version: 3, url: img('pd-1111', 1080, 1080), uploadedAt: dateStr(20), uploadedBy: 'u8', changeNote: '最终审核版', size: 850000 },
    ],
    currentVersion: 3, uploadedBy: 'u8', uploadedAt: dateStr(35), updatedAt: dateStr(20), downloads: 203,
    auditTrail: [
      { id: 'at18', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(19) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a15', name: '完美日记_睫毛膏_Shopee_800x800_v1', fileName: 'pd_mascara_shopee_800x800_v1.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'mascara', status: 'in_review',
    channels: ['shopee'], tags: ['睫毛膏', '浓密', '卷翘'], sku: 'PD-MC-004',
    aiTags: [
      { label: '睫毛膏', labelEn: 'Mascara', confidence: 0.97, category: 'product' },
      { label: '黑色', labelEn: 'Black', confidence: 0.95, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 390000, url: img('pd-mascara', 800, 800), thumbnailUrl: img('pd-mascara', 400, 400),
    versions: [{ version: 1, url: img('pd-mascara', 800, 800), uploadedAt: dateStr(4), uploadedBy: 'u8', changeNote: '新品首版', size: 390000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(4), updatedAt: dateStr(4), downloads: 8,
    auditTrail: [
      { id: 'at19', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u8', userName: '吴策划', timestamp: dateStr(3) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a16', name: '完美日记_卸妆水_Instagram_1080x1080_v1', fileName: 'pd_cleanser_ig_1080x1080_v1.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'skincare', status: 'in_review',
    channels: ['instagram'], tags: ['卸妆', '温和', '敏感肌'], sku: 'PD-CL-005',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.95, category: 'product' },
      { label: '蓝色', labelEn: 'Blue', confidence: 0.88, category: 'color' },
      { label: '清爽', labelEn: 'Fresh', confidence: 0.84, category: 'style' },
    ],
    width: 1080, height: 1080, fileSize: 440000, url: img('pd-cleanser', 1080, 1080), thumbnailUrl: img('pd-cleanser', 400, 400),
    versions: [{ version: 1, url: img('pd-cleanser', 1080, 1080), uploadedAt: dateStr(5), uploadedBy: 'u3', changeNote: '首版', size: 440000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(5), updatedAt: dateStr(5), downloads: 3,
    auditTrail: [
      { id: 'at20', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u3', userName: '张设计', timestamp: dateStr(4) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a17', name: '完美日记_品牌视频_官网_v1', fileName: 'pd_brand_video_v1.mp4',
    brandId: 'perfect_diary', type: 'video', category: 'video', status: 'approved',
    channels: ['official_site', 'tiktok'], tags: ['品牌视频', '形象片', '品牌故事'], sku: 'PD-VD-001',
    aiTags: [
      { label: '品牌视频', labelEn: 'Brand Video', confidence: 0.98, category: 'product' },
      { label: '叙事', labelEn: 'Narrative', confidence: 0.86, category: 'scene' },
    ],
    width: 1920, height: 1080, fileSize: 120000000, url: '#', thumbnailUrl: img('pd-brand-video', 400, 225),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(40), uploadedBy: 'u5', changeNote: '品牌宣传片', size: 120000000 }],
    currentVersion: 1, uploadedBy: 'u5', uploadedAt: dateStr(40), updatedAt: dateStr(40), downloads: 67,
    auditTrail: [
      { id: 'at21', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(38) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a18', name: '完美日记_散粉_草稿', fileName: 'pd_loose_powder_draft.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'foundation', status: 'draft',
    channels: ['shopee'], tags: ['散粉', '控油', '草稿'], sku: 'PD-LP-006',
    aiTags: [{ label: '散粉', labelEn: 'Loose Powder', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 350000, url: img('pd-loose-powder', 800, 800), thumbnailUrl: img('pd-loose-powder', 400, 400),
    versions: [{ version: 1, url: img('pd-loose-powder', 800, 800), uploadedAt: dateStr(1), uploadedBy: 'u8', changeNote: '草稿', size: 350000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(1), updatedAt: dateStr(1), downloads: 0,
    auditTrail: [
      { id: 'at22', action: '创建素材', toStatus: 'draft', userId: 'u8', userName: '吴策划', timestamp: dateStr(1) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a19', name: '完美日记_被拒海报', fileName: 'pd_rejected_poster.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'poster', status: 'rejected',
    channels: ['shopee'], tags: ['海报', '被拒'], sku: 'PD-PS-002',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.96, category: 'product' }],
    width: 800, height: 800, fileSize: 550000, url: img('pd-rejected', 800, 800), thumbnailUrl: img('pd-rejected', 400, 400),
    versions: [{ version: 1, url: img('pd-rejected', 800, 800), uploadedAt: dateStr(10), uploadedBy: 'u8', changeNote: '初版', size: 550000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(10), updatedAt: dateStr(7), downloads: 0,
    auditTrail: [
      { id: 'at23', action: '审核拒绝', fromStatus: 'in_review', toStatus: 'rejected', userId: 'u5', userName: '陈美妆', timestamp: dateStr(7), note: '品牌调性不符，用色过于鲜艳' },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a20', name: '完美日记_归档素材', fileName: 'pd_archived.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'poster', status: 'archived',
    channels: ['shopee'], tags: ['归档', '旧活动'], sku: 'PD-PS-003',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.93, category: 'product' }],
    width: 1080, height: 1080, fileSize: 600000, url: img('pd-archived', 1080, 1080), thumbnailUrl: img('pd-archived', 400, 400),
    versions: [{ version: 1, url: img('pd-archived', 1080, 1080), uploadedAt: dateStr(90), uploadedBy: 'u8', changeNote: '旧活动海报', size: 600000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(90), updatedAt: dateStr(45), downloads: 180,
    auditTrail: [
      { id: 'at24', action: '归档', fromStatus: 'approved', toStatus: 'archived', userId: 'u5', userName: '陈美妆', timestamp: dateStr(45), note: '活动已结束' },
    ],
    relatedAssetIds: [],
  },

  // === Flower Knows (花知晓) ===
  {
    id: 'a21', name: '花知晓_独角兽腮红_Shopee_800x800_v2', fileName: 'fk_unicorn_blush_shopee_800x800_v2.jpg',
    brandId: 'flower_knows', type: 'image', category: 'blush', status: 'approved',
    channels: ['shopee', 'lazada'], tags: ['腮红', '独角兽', '梦幻', '少女'], sku: 'FK-BL-001',
    aiTags: [
      { label: '腮红', labelEn: 'Blush', confidence: 0.97, category: 'product' },
      { label: '粉色', labelEn: 'Pink', confidence: 0.95, category: 'color' },
      { label: '梦幻', labelEn: 'Dreamy', confidence: 0.93, category: 'style' },
      { label: '独角兽', labelEn: 'Unicorn', confidence: 0.91, category: 'material' },
    ],
    width: 800, height: 800, fileSize: 510000, url: img('fk-unicorn', 800, 800), thumbnailUrl: img('fk-unicorn', 400, 400),
    versions: [
      { version: 1, url: img('fk-unicorn-v1', 800, 800), uploadedAt: dateStr(20), uploadedBy: 'u6', changeNote: '初版', size: 480000 },
      { version: 2, url: img('fk-unicorn', 800, 800), uploadedAt: dateStr(12), uploadedBy: 'u6', changeNote: '增加梦幻滤镜', size: 510000 },
    ],
    currentVersion: 2, uploadedBy: 'u6', uploadedAt: dateStr(20), updatedAt: dateStr(12), downloads: 98,
    auditTrail: [
      { id: 'at25', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(11) },
    ],
    relatedAssetIds: ['a22'],
  },
  {
    id: 'a22', name: '花知晓_天鹅唇膏_TikTok_1080x1920_v1', fileName: 'fk_swan_lipstick_tiktok_1080x1920_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['tiktok'], tags: ['唇膏', '天鹅', '浪漫', '少女心'], sku: 'FK-LP-001',
    aiTags: [
      { label: '唇膏', labelEn: 'Lipstick', confidence: 0.96, category: 'product' },
      { label: '浪漫', labelEn: 'Romantic', confidence: 0.91, category: 'style' },
      { label: '粉紫色', labelEn: 'Pink Purple', confidence: 0.88, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 670000, url: img('fk-swan', 1080, 1920), thumbnailUrl: img('fk-swan', 400, 711),
    versions: [{ version: 1, url: img('fk-swan', 1080, 1920), uploadedAt: dateStr(8), uploadedBy: 'u6', changeNote: '首版', size: 670000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(8), updatedAt: dateStr(8), downloads: 62,
    auditTrail: [
      { id: 'at26', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(6) },
    ],
    relatedAssetIds: ['a21'],
  },
  {
    id: 'a23', name: '花知晓_草莓系列_Google_1200x628_v1', fileName: 'fk_strawberry_google_1200x628_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'eyeshadow', status: 'approved',
    channels: ['google'], tags: ['眼影', '草莓', '甜美', '广告图'], sku: 'FK-ES-002',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.95, category: 'product' },
      { label: '草莓红', labelEn: 'Strawberry Red', confidence: 0.90, category: 'color' },
      { label: '甜美', labelEn: 'Sweet', confidence: 0.88, category: 'style' },
    ],
    width: 1200, height: 628, fileSize: 430000, url: img('fk-strawberry', 1200, 628), thumbnailUrl: img('fk-strawberry', 400, 209),
    versions: [{ version: 1, url: img('fk-strawberry', 1200, 628), uploadedAt: dateStr(14), uploadedBy: 'u6', changeNote: '首版', size: 430000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(14), updatedAt: dateStr(14), downloads: 41,
    auditTrail: [
      { id: 'at27', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(12) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a24', name: '花知晓_圣诞限定_海报_v1', fileName: 'fk_xmas_poster_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'poster', status: 'approved',
    channels: ['instagram', 'shopee'], tags: ['圣诞', '限定', '海报', '节日'], sku: 'FK-PS-001',
    aiTags: [
      { label: '海报', labelEn: 'Poster', confidence: 0.97, category: 'product' },
      { label: '红绿色', labelEn: 'Red & Green', confidence: 0.92, category: 'color' },
      { label: '节日', labelEn: 'Holiday', confidence: 0.94, category: 'scene' },
    ],
    width: 1080, height: 1080, fileSize: 780000, url: img('fk-xmas', 1080, 1080), thumbnailUrl: img('fk-xmas', 400, 400),
    versions: [{ version: 1, url: img('fk-xmas', 1080, 1080), uploadedAt: dateStr(25), uploadedBy: 'u8', changeNote: '圣诞海报', size: 780000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(25), updatedAt: dateStr(25), downloads: 87,
    auditTrail: [
      { id: 'at28', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u4', userName: '李审核', timestamp: dateStr(23) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a25', name: '花知晓_小天使散粉_Shopee_800x800_v1', fileName: 'fk_angel_powder_shopee_800x800_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'foundation', status: 'in_review',
    channels: ['shopee'], tags: ['散粉', '天使', '定妆', '细腻'], sku: 'FK-PW-003',
    aiTags: [
      { label: '散粉', labelEn: 'Powder', confidence: 0.96, category: 'product' },
      { label: '白色', labelEn: 'White', confidence: 0.91, category: 'color' },
      { label: '精致', labelEn: 'Delicate', confidence: 0.87, category: 'style' },
    ],
    width: 800, height: 800, fileSize: 420000, url: img('fk-angel', 800, 800), thumbnailUrl: img('fk-angel', 400, 400),
    versions: [{ version: 1, url: img('fk-angel', 800, 800), uploadedAt: dateStr(3), uploadedBy: 'u6', changeNote: '新品首版', size: 420000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(3), updatedAt: dateStr(3), downloads: 5,
    auditTrail: [
      { id: 'at29', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u6', userName: '赵运营', timestamp: dateStr(2) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a26', name: '花知晓_品牌视频_官网_v1', fileName: 'fk_brand_video_v1.mp4',
    brandId: 'flower_knows', type: 'video', category: 'video', status: 'approved',
    channels: ['official_site'], tags: ['品牌视频', '梦幻', '少女'], sku: 'FK-VD-001',
    aiTags: [
      { label: '品牌视频', labelEn: 'Brand Video', confidence: 0.98, category: 'product' },
      { label: '梦幻', labelEn: 'Dreamy', confidence: 0.90, category: 'style' },
    ],
    width: 1920, height: 1080, fileSize: 85000000, url: '#', thumbnailUrl: img('fk-brand-video', 400, 225),
    versions: [{ version: 1, url: '#', uploadedAt: dateStr(30), uploadedBy: 'u6', changeNote: '品牌宣传片', size: 85000000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(30), updatedAt: dateStr(30), downloads: 43,
    auditTrail: [
      { id: 'at30', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u1', userName: '林小美', timestamp: dateStr(28) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a27', name: '花知晓_眉笔_草稿', fileName: 'fk_eyebrow_draft.jpg',
    brandId: 'flower_knows', type: 'image', category: 'lipstick', status: 'draft',
    channels: ['shopee'], tags: ['眉笔', '草稿'], sku: 'FK-EB-001',
    aiTags: [{ label: '眉笔', labelEn: 'Eyebrow', confidence: 0.93, category: 'product' }],
    width: 800, height: 800, fileSize: 310000, url: img('fk-eyebrow', 800, 800), thumbnailUrl: img('fk-eyebrow', 400, 400),
    versions: [{ version: 1, url: img('fk-eyebrow', 800, 800), uploadedAt: dateStr(0), uploadedBy: 'u6', changeNote: '草稿', size: 310000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(0), updatedAt: dateStr(0), downloads: 0,
    auditTrail: [
      { id: 'at31', action: '创建素材', toStatus: 'draft', userId: 'u6', userName: '赵运营', timestamp: dateStr(0) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a28', name: '花知晓_过期活动图', fileName: 'fk_expired_event.jpg',
    brandId: 'flower_knows', type: 'image', category: 'poster', status: 'expired',
    channels: ['shopee', 'lazada'], tags: ['活动', '过期'], sku: 'FK-PS-002',
    aiTags: [{ label: '海报', labelEn: 'Poster', confidence: 0.95, category: 'product' }],
    width: 800, height: 800, fileSize: 520000, url: img('fk-expired', 800, 800), thumbnailUrl: img('fk-expired', 400, 400),
    versions: [{ version: 1, url: img('fk-expired', 800, 800), uploadedAt: dateStr(100), uploadedBy: 'u8', changeNote: '活动图', size: 520000 }],
    currentVersion: 1, uploadedBy: 'u8', uploadedAt: dateStr(100), updatedAt: dateStr(60), expiresAt: dateStr(10), downloads: 120,
    auditTrail: [
      { id: 'at32', action: '素材过期', fromStatus: 'approved', toStatus: 'expired', userId: 'u1', userName: '系统', timestamp: dateStr(10) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a29', name: '花知晓_归档旧图', fileName: 'fk_archived_old.jpg',
    brandId: 'flower_knows', type: 'image', category: 'blush', status: 'archived',
    channels: ['shopee'], tags: ['归档', '旧版'], sku: 'FK-BL-002',
    aiTags: [{ label: '腮红', labelEn: 'Blush', confidence: 0.94, category: 'product' }],
    width: 800, height: 800, fileSize: 460000, url: img('fk-archived', 800, 800), thumbnailUrl: img('fk-archived', 400, 400),
    versions: [{ version: 1, url: img('fk-archived', 800, 800), uploadedAt: dateStr(80), uploadedBy: 'u6', changeNote: '旧版', size: 460000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(80), updatedAt: dateStr(50), downloads: 95,
    auditTrail: [
      { id: 'at33', action: '归档', fromStatus: 'approved', toStatus: 'archived', userId: 'u1', userName: '林小美', timestamp: dateStr(50), note: '产品下架' },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a30', name: '花知晓_护肤套装_Instagram_1080x1080_v1', fileName: 'fk_skincare_ig_1080x1080_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'skincare', status: 'draft',
    channels: ['instagram'], tags: ['护肤', '套装', '保湿'], sku: 'FK-SK-001',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.95, category: 'product' },
      { label: '白色', labelEn: 'White', confidence: 0.89, category: 'color' },
      { label: '简约', labelEn: 'Minimalist', confidence: 0.85, category: 'style' },
    ],
    width: 1080, height: 1080, fileSize: 480000, url: img('fk-skincare', 1080, 1080), thumbnailUrl: img('fk-skincare', 400, 400),
    versions: [{ version: 1, url: img('fk-skincare', 1080, 1080), uploadedAt: dateStr(0), uploadedBy: 'u6', changeNote: '新品草稿', size: 480000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(0), updatedAt: dateStr(0), downloads: 0,
    auditTrail: [
      { id: 'at34', action: '创建素材', toStatus: 'draft', userId: 'u6', userName: '赵运营', timestamp: dateStr(0) },
    ],
    relatedAssetIds: [],
  },
  // Extra assets for more variety
  {
    id: 'a31', name: '花西子_蜜粉饼_Lazada_800x800_v1', fileName: 'florasis_compact_lazada_800x800_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'foundation', status: 'approved',
    channels: ['lazada'], tags: ['蜜粉饼', '定妆', '便携'], sku: 'FLR-PW-003',
    aiTags: [
      { label: '蜜粉', labelEn: 'Powder', confidence: 0.96, category: 'product' },
      { label: '金色', labelEn: 'Gold', confidence: 0.89, category: 'color' },
    ],
    width: 800, height: 800, fileSize: 400000, url: img('florasis-compact', 800, 800), thumbnailUrl: img('florasis-compact', 400, 400),
    versions: [{ version: 1, url: img('florasis-compact', 800, 800), uploadedAt: dateStr(16), uploadedBy: 'u3', changeNote: '首版', size: 400000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(16), updatedAt: dateStr(16), downloads: 33,
    auditTrail: [
      { id: 'at35', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(14) },
    ],
    relatedAssetIds: ['a3'],
  },
  {
    id: 'a32', name: '完美日记_遮瑕笔_TikTok_1080x1920_v1', fileName: 'pd_concealer_tiktok_v1.jpg',
    brandId: 'perfect_diary', type: 'image', category: 'foundation', status: 'approved',
    channels: ['tiktok'], tags: ['遮瑕', '细节', '竖版'], sku: 'PD-CC-007',
    aiTags: [
      { label: '遮瑕', labelEn: 'Concealer', confidence: 0.95, category: 'product' },
      { label: '肤色', labelEn: 'Skin Tone', confidence: 0.90, category: 'color' },
    ],
    width: 1080, height: 1920, fileSize: 580000, url: img('pd-concealer', 1080, 1920), thumbnailUrl: img('pd-concealer', 400, 711),
    versions: [{ version: 1, url: img('pd-concealer', 1080, 1920), uploadedAt: dateStr(7), uploadedBy: 'u3', changeNote: '首版', size: 580000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(7), updatedAt: dateStr(7), downloads: 45,
    auditTrail: [
      { id: 'at36', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u5', userName: '陈美妆', timestamp: dateStr(5) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a33', name: '花知晓_蝴蝶系列_Shopee_800x800_v1', fileName: 'fk_butterfly_shopee_v1.jpg',
    brandId: 'flower_knows', type: 'image', category: 'eyeshadow', status: 'in_review',
    channels: ['shopee'], tags: ['眼影', '蝴蝶', '渐变', '春季'], sku: 'FK-ES-003',
    aiTags: [
      { label: '眼影', labelEn: 'Eyeshadow', confidence: 0.97, category: 'product' },
      { label: '渐变色', labelEn: 'Gradient', confidence: 0.92, category: 'color' },
      { label: '蝴蝶', labelEn: 'Butterfly', confidence: 0.90, category: 'material' },
    ],
    width: 800, height: 800, fileSize: 500000, url: img('fk-butterfly', 800, 800), thumbnailUrl: img('fk-butterfly', 400, 400),
    versions: [{ version: 1, url: img('fk-butterfly', 800, 800), uploadedAt: dateStr(2), uploadedBy: 'u6', changeNote: '新品', size: 500000 }],
    currentVersion: 1, uploadedBy: 'u6', uploadedAt: dateStr(2), updatedAt: dateStr(2), downloads: 2,
    auditTrail: [
      { id: 'at37', action: '提交审核', fromStatus: 'draft', toStatus: 'in_review', userId: 'u6', userName: '赵运营', timestamp: dateStr(1) },
    ],
    relatedAssetIds: ['a21'],
  },
  {
    id: 'a34', name: '花西子_卸妆油_官网_1920x1080_v1', fileName: 'florasis_cleansing_official_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'skincare', status: 'approved',
    channels: ['official_site'], tags: ['卸妆', '养肤', '国风'], sku: 'FLR-SK-001',
    aiTags: [
      { label: '护肤品', labelEn: 'Skincare', confidence: 0.96, category: 'product' },
      { label: '绿色', labelEn: 'Green', confidence: 0.88, category: 'color' },
      { label: '自然', labelEn: 'Natural', confidence: 0.91, category: 'style' },
    ],
    width: 1920, height: 1080, fileSize: 750000, url: img('florasis-cleansing', 1920, 1080), thumbnailUrl: img('florasis-cleansing', 400, 225),
    versions: [{ version: 1, url: img('florasis-cleansing', 1920, 1080), uploadedAt: dateStr(9), uploadedBy: 'u3', changeNote: '首版', size: 750000 }],
    currentVersion: 1, uploadedBy: 'u3', uploadedAt: dateStr(9), updatedAt: dateStr(9), downloads: 28,
    auditTrail: [
      { id: 'at38', action: '审核通过', fromStatus: 'in_review', toStatus: 'approved', userId: 'u2', userName: '王品宣', timestamp: dateStr(7) },
    ],
    relatedAssetIds: [],
  },
  {
    id: 'a35', name: '花西子_口红色卡_全渠道_v1', fileName: 'florasis_color_chart_v1.jpg',
    brandId: 'florasis', type: 'image', category: 'lipstick', status: 'approved',
    channels: ['shopee', 'tiktok', 'instagram', 'lazada', 'official_site'], tags: ['色卡', '口红', '全色号', '参考'], sku: 'FLR-LP-REF',
    aiTags: [
      { label: '色卡', labelEn: 'Color Chart', confidence: 0.97, category: 'product' },
      { label: '多色', labelEn: 'Multicolor', confidence: 0.95, category: 'color' },
    ],
    width: 1200, height: 1200, fileSize: 920000, url: img('florasis-colors', 1200, 1200), thumbnailUrl: img('florasis-colors', 400, 400),
    versions: [{ version: 1, url: img('florasis-colors', 1200, 1200), uploadedAt: dateStr(45), uploadedBy: 'u2', changeNote: '完整色卡', size: 920000 }],
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
  { id: 'ap6', assetId: 'a33', requestedBy: 'u6', requestedAt: dateStr(1), status: 'pending' },
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
  { id: 'nr1', brandId: 'florasis', pattern: '{品牌}_{SKU}_{渠道}_{尺寸}_{版本}', example: '花西子_FLR-LP-001_Shopee_800x800_v3', fields: ['品牌', 'SKU', '渠道', '尺寸', '版本'] },
  { id: 'nr2', brandId: 'perfect_diary', pattern: '{品牌}_{产品}_{渠道}_{尺寸}_{版本}', example: '完美日记_动物眼影_Shopee_800x800_v2', fields: ['品牌', '产品', '渠道', '尺寸', '版本'] },
  { id: 'nr3', brandId: 'flower_knows', pattern: '{品牌}_{系列}_{产品}_{渠道}_{尺寸}_{版本}', example: '花知晓_独角兽_腮红_Shopee_800x800_v2', fields: ['品牌', '系列', '产品', '渠道', '尺寸', '版本'] },
];

// ==================== Semantic Search Mapping ====================
export const semanticSearchMap: Record<string, { assetIds: string[]; reason: string }> = {
  '红色口红': { assetIds: ['a1', 'a2', 'a9', 'a35'], reason: '语义匹配：红色系口红产品' },
  'red lipstick': { assetIds: ['a1', 'a2', 'a9', 'a35'], reason: 'Cross-lingual match: red lipstick products' },
  '新年': { assetIds: ['a1', 'a5', 'a24'], reason: '语义匹配：节日/新年相关素材' },
  'chinese new year': { assetIds: ['a1', 'a5', 'a24'], reason: 'Cross-lingual match: Chinese New Year assets' },
  '梦幻少女': { assetIds: ['a21', 'a22', 'a26', 'a33'], reason: '语义匹配：梦幻少女风格素材' },
  'dreamy girl': { assetIds: ['a21', 'a22', 'a26', 'a33'], reason: 'Cross-lingual match: dreamy/cute style assets' },
  '国风': { assetIds: ['a1', 'a4', 'a6', 'a34', 'a35'], reason: '语义匹配：中国风/国潮风格' },
  'chinese style': { assetIds: ['a1', 'a4', 'a6', 'a34', 'a35'], reason: 'Cross-lingual match: Chinese traditional style' },
  '大促海报': { assetIds: ['a5', 'a14', 'a24'], reason: '语义匹配：促销活动海报' },
  'promotion poster': { assetIds: ['a5', 'a14', 'a24'], reason: 'Cross-lingual match: promotional posters' },
  '眼妆': { assetIds: ['a4', 'a11', 'a23', 'a33', 'a15'], reason: '语义匹配：眼部彩妆（眼影+睫毛膏）' },
  'eye makeup': { assetIds: ['a4', 'a11', 'a23', 'a33', 'a15'], reason: 'Cross-lingual match: eye makeup products' },
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
  florasis: 'florasis2024',
  perfect_diary: 'pd2024',
  flower_knows: 'fk2024',
};
