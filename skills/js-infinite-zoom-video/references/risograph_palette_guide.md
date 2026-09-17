# Risograph 丝网印刷色彩与网点工程指南 (Risograph & Halftone Guide)

Risograph（理想印刷 / 丝网孔版印刷）具有极具辨识度的复古手工质感，其视觉灵魂包含四大要素：
1. **未漂白植物纤维纸张基底**
2. **高纯度特定荧光/原色油墨**
3. **半色调网点（Ben-Day Halftone Dots）**
4. **手工套印错位（Registration Errors / Bleed）**

---

## 1. 经典 Riso 油墨配色表 (Hex & RGB)

| 墨色名称 | 标准 HEX | 视觉角色 | 叠印属性 |
| :--- | :--- | :--- | :--- |
| **Federal Blue (联邦蓝/靛青)** | `#1B2A4A` / `#0B132B` | 阴影、文字、深空基调、主轮廓 | 吸收光线，压底主色 |
| **Fluorescent Pink (荧光粉)** | `#FF2A6D` / `#FF3377` | 高光点缀、星芒边缘、情感焦点 | 半透明，与青色叠印成深紫 |
| **Electric Cyan / Light Teal (极速青)** | `#00F0FF` / `#0077B6` | 能量光环、视听波纹、科技未来感 | 扩散光环，与黄色叠印成翡翠绿 |
| **Sunflower Yellow (向日葵金黄)** | `#FFD100` / `#FFB703` | 暖阳、发光晶圆、逻辑门脉冲 | 最强明度通道 |
| **Emerald Green (翡翠湖绿)** | `#06D6A0` / `#2D6A4F` | 植物、细胞生物学、自然波形 | 纯正中调 |
| **Unbleached Paper (未漂白暖纸)** | `#FAF7EE` / `#FBF8F1` | 纸张底色，略带淡暖黄色温 | 模拟古董棉质纸，避免纯白刺眼 |

---

## 2. Ben-Day 半色调网点生成算法

半色调使用网点疏密和大小模拟连续色调。在 HTML5 Canvas 中，最轻量高效的实现方法是**预渲染离屏网点 Pattern**：

```javascript
function createHalftonePattern(dotSize = 12, dotRadius = 2.1, color = 'rgba(11, 19, 43, 0.12)') {
  const canvas = document.createElement('canvas');
  canvas.width = dotSize;
  canvas.height = dotSize;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.beginPath();
  // 居中圆点
  ctx.arc(dotSize / 2, dotSize / 2, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}
```

叠加模式使用：
```javascript
ctx.save();
ctx.globalCompositeOperation = 'multiply';
ctx.fillStyle = ctx.createPattern(halftonePattern, 'repeat');
ctx.fillRect(0, 0, width, height);
ctx.restore();
```

---

## 3. 手工套印错位（Misregistration Offset）算法

在实际孔版印刷过程中，滚筒和送纸的机械公差会导致青色版和洋红版产生 $1 \sim 2$ 像素的物理平移，产生极具艺术质感的边缘色散：

```javascript
function drawRisoStroke(ctx, drawPathFn, color = '#1A73E8') {
  ctx.save();
  
  // 1. 青色版（向左上方微移 1.5px, 1.0px）
  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = 1.8;
  ctx.save();
  ctx.translate(-1.5, -1.0);
  drawPathFn(ctx);
  ctx.restore();

  // 2. 洋红/荧光粉版（向右下方微移 1.5px, 1.0px）
  ctx.strokeStyle = '#FF2A6D';
  ctx.lineWidth = 1.4;
  ctx.save();
  ctx.translate(1.5, 1.0);
  drawPathFn(ctx);
  ctx.restore();

  // 3. 核心主色版（居中对齐）
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.0;
  drawPathFn(ctx);

  ctx.restore();
}
```
