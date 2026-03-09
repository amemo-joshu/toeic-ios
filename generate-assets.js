// アイコン・スプラッシュを全サイズ生成
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size / 2;

  // 背景
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(0, 0, size, size);

  // 外円（インジゴ）
  ctx.beginPath();
  ctx.arc(r, r, r * 0.82, 0, Math.PI * 2);
  ctx.fillStyle = '#4f46e5';
  ctx.fill();

  // 内円（濃いインジゴ）
  ctx.beginPath();
  ctx.arc(r, r, r * 0.65, 0, Math.PI * 2);
  ctx.fillStyle = '#1e1b4b';
  ctx.fill();

  // "700+" テキスト
  ctx.fillStyle = '#f59e0b';
  ctx.font = `bold ${size * 0.22}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('700+', r, r * 0.92);

  // "TOEIC" テキスト
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.11}px Arial`;
  ctx.fillText('TOEIC', r, r * 1.28);

  return canvas;
}

function drawSplash(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景グラデーション
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 中央にアイコン
  const iconSize = Math.min(width, height) * 0.35;
  const cx = width / 2, cy = height / 2 - iconSize * 0.1;
  const r = iconSize / 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
  ctx.fillStyle = '#4f46e5';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
  ctx.fillStyle = '#1e1b4b';
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.font = `bold ${iconSize * 0.22}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('700+', cx, cy * 0.98);

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${iconSize * 0.11}px Arial`;
  ctx.fillText('TOEIC', cx, cy + iconSize * 0.18);

  // アプリ名
  ctx.fillStyle = '#94a3b8';
  ctx.font = `${iconSize * 0.09}px Arial`;
  ctx.fillText('TOEIC 700+ MASTER', cx, cy + iconSize * 0.6);

  return canvas;
}

// アイコンサイズ一覧 (iOS)
const iconSizes = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];
const iconDir = path.join('ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
fs.mkdirSync(iconDir, { recursive: true });

console.log('アイコン生成中...');
const iconImages = [];
for (const size of iconSizes) {
  const canvas = drawIcon(size);
  const buf = canvas.toBuffer('image/png');
  const filename = `icon-${size}.png`;
  fs.writeFileSync(path.join(iconDir, filename), buf);
  iconImages.push({ filename, size });
  process.stdout.write(`  ${size}x${size} ✓\n`);
}

// Contents.json 生成
const contentsJson = {
  images: [
    { idiom:"universal", platform:"ios", size:"1024x1024", filename:"icon-1024.png" },
    { idiom:"iphone", scale:"2x", size:"20x20", filename:"icon-40.png" },
    { idiom:"iphone", scale:"3x", size:"20x20", filename:"icon-60.png" },
    { idiom:"iphone", scale:"2x", size:"29x29", filename:"icon-58.png" },
    { idiom:"iphone", scale:"3x", size:"29x29", filename:"icon-87.png" },
    { idiom:"iphone", scale:"2x", size:"40x40", filename:"icon-80.png" },
    { idiom:"iphone", scale:"3x", size:"40x40", filename:"icon-120.png" },
    { idiom:"iphone", scale:"2x", size:"60x60", filename:"icon-120.png" },
    { idiom:"iphone", scale:"3x", size:"60x60", filename:"icon-180.png" },
    { idiom:"ipad",   scale:"1x", size:"20x20", filename:"icon-20.png" },
    { idiom:"ipad",   scale:"2x", size:"20x20", filename:"icon-40.png" },
    { idiom:"ipad",   scale:"1x", size:"29x29", filename:"icon-29.png" },
    { idiom:"ipad",   scale:"2x", size:"29x29", filename:"icon-58.png" },
    { idiom:"ipad",   scale:"1x", size:"40x40", filename:"icon-40.png" },
    { idiom:"ipad",   scale:"2x", size:"40x40", filename:"icon-80.png" },
    { idiom:"ipad",   scale:"1x", size:"76x76", filename:"icon-76.png" },
    { idiom:"ipad",   scale:"2x", size:"76x76", filename:"icon-152.png" },
    { idiom:"ipad",   scale:"2x", size:"83.5x83.5", filename:"icon-167.png" },
  ],
  info: { author:"xcode", version:1 }
};
fs.writeFileSync(path.join(iconDir, 'Contents.json'), JSON.stringify(contentsJson, null, 2));
console.log('アイコン Contents.json 生成完了');

// スプラッシュ画像生成
const splashDir = path.join('ios', 'App', 'App', 'Assets.xcassets', 'Splash.imageset');
fs.mkdirSync(splashDir, { recursive: true });
console.log('\nスプラッシュ生成中...');
const splashSizes = [
  { w:2732, h:2732, name:'splash-2732.png' },
];
for (const s of splashSizes) {
  const canvas = drawSplash(s.w, s.h);
  fs.writeFileSync(path.join(splashDir, s.name), canvas.toBuffer('image/png'));
  console.log(`  ${s.w}x${s.h} ✓`);
}
const splashContents = {
  images: [{ idiom:"universal", filename:"splash-2732.png", scale:"1x" }],
  info: { author:"xcode", version:1 }
};
fs.writeFileSync(path.join(splashDir, 'Contents.json'), JSON.stringify(splashContents, null, 2));

// assetsディレクトリにも保存
fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync('assets/icon.png', drawIcon(1024).toBuffer('image/png'));
fs.writeFileSync('assets/splash.png', drawSplash(2732, 2732).toBuffer('image/png'));

console.log('\n✅ 全アセット生成完了！');
