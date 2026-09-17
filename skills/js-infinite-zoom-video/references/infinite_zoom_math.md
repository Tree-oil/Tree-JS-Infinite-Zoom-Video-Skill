# 无限变焦嵌套传送门数学模型与视锥变换 (Infinite Zoom Mathematics)

无限变焦（Infinite Zoom / Nested Portal Zoom）的核心目标是在视觉上维持**完全匀速、连续、无卡顿的下钻穿梭感**。若采用简单的线性比例缩放 $S(t) = a + b \cdot t$，人眼会感觉到“一开始缩放极慢，临近时突然急剧加速撞墙”。必须采用**对数/指数尺度系统（Logarithmic / Exponential Scaling）**。

---

## 1. 指数尺度模型 (Exponential Scale Model)

设每个场景的标准视口外圈半径为 $R$（如 1080p 画布下 $R = 410\text{px}$），其内部中心传送门圆孔半径为 $r$（如 $r = 27.33\text{px}$）。
则单级变焦跨度比（Zoom Ratio）为：
$$K = \frac{R}{r} = \frac{410}{27.33} \approx 15.0$$

若场景 $i$ 的生命周期为时间段 $[t_i, t_{i+1}]$，归一化进度为：
$$p(t) = \frac{t - t_i}{t_{i+1} - t_i} \in [0, 1]$$

则当前场景在视口中的瞬时放大倍数 $S(p)$ 为：
$$S(p) = K^p = e^{p \cdot \ln K}$$

### 边界连续性验证：
- 当 $p = 0$ 时：
  - 当前父场景尺度：$S(0) = 1.0$（外圈恰好贴合视口 $R$）。
  - 下一级子场景嵌套在中心传送门内，其局部缩放尺度为：
    $$S_{\text{child}}(0) = \frac{S(0)}{K} = \frac{1}{K} \approx 0.067$$
    其半径为 $R \cdot S_{\text{child}}(0) = \frac{R}{K} = r$，**严丝合缝填满父级中心圆孔**。
- 当 $p \to 1$ 时：
  - 当前父场景尺度：$S(1) = K = 15.0$，其外圈扩散到 $R \times 15 = 6150\text{px}$，已完全放大并移出视口边界。
  - 下一级子场景尺度：
    $$S_{\text{child}}(1) = \frac{S(1)}{K} = 1.0$$
    **子场景恰好缩放到标准半径 $R$，无缝无感地成为下一轮的父场景！**

---

## 2. 传送门偏心锚点变换 (Off-center Portal Anchoring)

若内部传送门不在场景绝对中心 $(cx_0, cy_0) = (540, 540)$，而是在某个视觉特征点 $(px, py)$（例如猫咪颈圈、琴弦交叉点、灯塔顶端），则摄像机需要同时进行**平移插值与缩放**：

摄像机聚焦点坐标变换：
$$C(p) = (1 - \text{smooth}(p)) \cdot (cx_0, cy_0) + \text{smooth}(p) \cdot (px, py)$$

Canvas 2D 矩阵调用顺序：
```javascript
ctx.save();
// 1. 将视口原点平移到画布中心
ctx.translate(canvasWidth / 2, canvasHeight / 2);
// 2. 应用指数级缩放
ctx.scale(scale, scale);
// 3. 将焦点逆向平移到当前场景的目标锚点
ctx.translate(-C.x, -C.y);
// 4. 绘制场景图形或纹理
ctx.drawImage(img, 0, 0, 1080, 1080);
ctx.restore();
```

---

## 3. 双缓冲可见性剔除 (Two-Tier Visibility Culling)

虽然整个宇宙可能包含 30 甚至上百个嵌套场景，但在任意一帧中，**人眼可见的只有 2 层**：
1. **当前层（Current Scene）**：放大倍数在 $1.0 \sim 15.0$ 之间，向外淡出或被子场景覆盖。
2. **下一层（Next Scene）**：放大倍数在 $0.067 \sim 1.0$ 之间，嵌套在传送门内逐渐放大。
3. **上一层（Parent Scene）**：放大倍数 $> 15.0$，早已被视口遮罩剔除，无需绘制。
4. **后代层（Grandchild Scene）**：放大倍数 $< 0.004$，像素尺寸已小于 1 像素，直接简化为单像素色点。

因此渲染复杂度始终为 $O(1)$，即使在移动端低功耗设备上也能稳定达到 **60 FPS**！
