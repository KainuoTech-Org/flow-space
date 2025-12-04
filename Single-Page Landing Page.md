# Flow Space - 單頁網站需求文檔與開發指導

## 1. 項目概述 (Project Overview)
**項目名稱**：Flow Space (流動空間)
**核心業務**：高端瑜伽與冥想工作室
**目標受眾**：追求生活品質、尋求內心平靜的高淨值人群
**核心關鍵詞**：極簡 (Minimalist)、留白 (White Space)、呼吸感 (Breathing)、微交互 (Micro-interactions)

---

## 2. 設計規範 (Design Specifications)

### 視覺風格
- **配色方案 (Color Palette)**：
  - 主色：Off-White (米白/暖白) `#F5F5F0` - 背景基調
  - 輔助色：Sage Green (鼠尾草綠) `#8A9A8A` - 點綴與按鈕
  - 文字色：Charcoal Grey (深炭灰) `#333333` - 替代純黑，減少視覺銳度
- **字體 (Typography)**：
  - 標題：Serif 字體 (如 Playfair Display 或 Noto Serif TC) - 傳遞優雅與高端感
  - 正文：Sans-Serif 字體 (如 Lato, Montserrat 或 Noto Sans TC) - 保持現代與易讀性
- **佈局 (Layout)**：
  - 大面積留白，內容不填滿屏幕。
  - 圖片採用非對稱佈局或疊加效果。

### 動效設計 (Animation & Interaction)
- **呼吸感動畫**：元素 (如背景圓形光暈、圖片) 進行緩慢的縮放 (Scale) 和透明度 (Opacity) 變化，模擬呼吸節奏 (4-7-8 呼吸法)。
- **滾動視差 (Parallax)**：文字與圖片以不同速度滾動，創造深度。
- **微交互 (Micro-interactions)**：
  - 按鈕 Hover：緩慢的顏色過渡，輕微的位移或磁吸效果 (Magnetic)。
  - 圖片 Reveal：滾動進入視口時，使用遮罩 (Mask) 緩慢揭示圖片。
  - 鼠標跟隨：可選，一個半透明的光標跟隨圓點，增加沈浸感。

---

## 3. 功能需求 (Functional Requirements)

網站為單頁滾動結構 (Single Page Application structure)，包含以下區塊：

### 3.1 Hero Section (首屏)
- **內容**：品牌 Logo、核心 Slogan ("Breathe into Flow")、預約 CTA 按鈕。
- **交互**：加載時文字逐行浮現 (Fade Up)；背景有極其緩慢流動的抽象圖形。

### 3.2 Philosophy (理念)
- **內容**：簡短的品牌故事，強調身心連結。
- **交互**：文字隨滾動高亮或解鎖；配圖採用視差滾動。

### 3.3 Classes / Offerings (課程展示)
- **內容**：3-4 個核心課程卡片 (如 Hatha, Vinyasa, Meditation)。
- **樣式**：極簡卡片，無邊框，僅通過陰影或背景色塊區分。
- **交互**：鼠標懸停時，卡片輕微上浮，背景圖變得清晰。

### 3.4 Membership / Visit (預約與探店)
- **內容**：工作室環境圖輪播或拼接、簡單的價格方案。
- **交互**：圖片採用錯位佈局。

### 3.5 Footer (頁腳)
- **內容**：地址、社交媒體鏈接、版權信息。
- **風格**：極簡，與背景融為一體。

---

## 4. 技術開發指導 (Development Guide)

### 4.1 技術棧推薦
為了實現極致的性能和定制化動畫，建議不使用重型框架 (如 React/Vue)，而是採用原生技術棧配合高性能動畫庫。

- **HTML5**: 語義化標籤 (`<main>`, `<section>`, `<article>`)。
- **CSS3**: 
  - Flexbox & Grid 佈局。
  - CSS Variables (管理顏色與間距)。
  - `clamp()` 函數實現流體排版 (Fluid Typography)。
- **JavaScript**: ES6+ Vanilla JS。
- **動畫庫 (關鍵)**: **GSAP (GreenSock Animation Platform)**。
  - `GSAP Core`: 處理時間軸和補間動畫。
  - `ScrollTrigger`: 處理滾動觸發的動畫 (這是實現「高級感」的核心)。
  - `Lenis` (可選): 實現平滑滾動 (Smooth Scroll)，消除原生滾動的生硬感。

### 4.2 目錄結構
```text
/project-root
  ├── index.html        # 入口文件
  ├── css/
  │   ├── style.css     # 主樣式表
  │   └── reset.css     # 重置樣式
  ├── js/
  │   ├── main.js       # 邏輯與動畫入口
  │   └── animations.js # 具體動畫實現
  └── assets/
      ├── images/       # 高清圖片
      └── fonts/        # 字體文件
```

### 4.3 開發步驟 (Roadmap)

1.  **結構搭建 (Structure)**：
    - 創建 HTML 骨架，定義各個 Section。
    - 引入字體和必要的 CDN (GSAP, Lenis)。

2.  **基礎樣式 (Styling)**：
    - 定義 CSS 變量 (顏色、字體大小)。
    - 實現響應式佈局，確保移動端適配。
    - 處理「留白」，設置較大的 `padding` 和 `margin`。

3.  **動畫實現 (Animation) - 核心環節**：
    - **Step 1 - 平滑滾動**：初始化 Lenis，讓網頁滾動像絲綢一樣順滑。
    - **Step 2 - 呼吸效果**：使用 GSAP `yoyo: true, repeat: -1` 製作背景元素的呼吸動畫。
    - **Step 3 - 進場動畫**：配置 ScrollTrigger，讓元素在進入視口時優雅地浮現 (`y: 50, opacity: 0` -> `y: 0, opacity: 1`)。
    - **Step 4 - 微交互**：添加 Button 的 Hover 效果和自定義光標。

4.  **性能優化**：
    - 圖片懶加載 (Lazy Load)。
    - 壓縮資源。

---

## 5. 下一步行動
建議立即初始化項目文件夾，並開始編寫 `index.html` 骨架與基礎 CSS。
