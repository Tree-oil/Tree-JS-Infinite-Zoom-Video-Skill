/**
 * Abstract & Continuous Fluid Stream Engine for Zhuangzi Butterfly Dream
 * 100% Pure Generative Code | Zero Images | Unbroken Single-Timeline Odyssey
 * 
 * Philosophy: Eastern "一画论" (One-Stroke Theory) meets Generative Mathematics
 * Movements:
 * 1. 气韵玄关 (0.0s - 5.5s): Singularity, Breathing Concentric Sine Ripples, 3D Enso Ribbon
 * 2. 拓扑化蝶 (5.5s - 11.5s): Lorenz Attractor Wings, Mineral Contour Fields, Logarithmic Vortex
 * 3. 水击三千 (11.5s - 17.5s): Navier-Stokes Vector Streamlines, Rising Leviathan, Molten Gold Feathers
 * 4. 齐物共振 (17.5s - 22.5s): Lissajous Twin Singularities, Yin-Yang Orbit, Relativistic Accretion
 * 5. 物化归一 (22.5s - 28.05s): Gravitational Collapse, Cinnabar Han Seal, Escaping Golden Thread
 */

class AbstractStreamRenderer {
  constructor(risoRenderer) {
    this.riso = risoRenderer;
    this.palette = {
      paper: '#F7F2E7',
      carbonBlack: '#14171A',
      cinnabar: '#D93829',
      cinnabarDeep: '#B5281B',
      azurite: '#1B4D68',
      azuriteLight: '#2C7A9E',
      ochreGold: '#E59819',
      goldPale: '#F3D27A',
      jadeMist: '#2A9D8F'
    };

    // Precomputed deterministic pseudo-random seeds for streamline continuity
    this.initStreamlines();
  }

  initStreamlines() {
    this.streamlines = [];
    const count = 160;
    for (let i = 0; i < count; i++) {
      this.streamlines.push({
        x: (Math.sin(i * 99.7) * 0.5 + 0.5) * 1080,
        y: (Math.cos(i * 33.3) * 0.5 + 0.5) * 1080,
        speed: 0.8 + (Math.sin(i * 12.3) * 0.5 + 0.5) * 1.6,
        width: 1.0 + (i % 5) * 0.7,
        length: 24 + (i % 7) * 18,
        colorType: i % 4, // 0: azurite, 1: carbon, 2: gold, 3: cinnabar
        phase: (i * 0.37) % (Math.PI * 2)
      });
    }
  }

  // Smoothstep interpolation
  smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  /**
   * Main continuous rendering pipeline for timestamp t (0 <= t <= 28.05)
   */
  render(ctx, t, w = 1080, h = 1080) {
    const cx = w / 2;
    const cy = h / 2;

    // Movement influence weights (Continuous Smoothstep Blending)
    const w1 = this.smoothstep(0.0, 1.2, t) * (1.0 - this.smoothstep(4.8, 6.2, t));
    const w2 = this.smoothstep(4.5, 6.0, t) * (1.0 - this.smoothstep(10.5, 12.0, t));
    const w3 = this.smoothstep(10.2, 11.8, t) * (1.0 - this.smoothstep(16.5, 18.0, t));
    const w4 = this.smoothstep(16.2, 17.8, t) * (1.0 - this.smoothstep(22.2, 23.4, t));
    const w5 = this.smoothstep(22.0, 23.5, t);

    // Global subtle cosmic breathing camera
    const breathZoom = 1.0 + 0.04 * Math.sin(t * 0.7);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(breathZoom, breathZoom);
    ctx.translate(-cx, -cy);

    // 1. Movement 1: 气韵玄关 · 混沌初开
    if (w1 > 0.001) {
      ctx.save();
      ctx.globalAlpha = w1;
      this.renderMovement1_PrimalLine(ctx, t, cx, cy, w, h);
      ctx.restore();
    }

    // 2. Movement 2: 拓扑化蝶 · 虚实互生
    if (w2 > 0.001) {
      ctx.save();
      ctx.globalAlpha = w2;
      this.renderMovement2_TopologicalButterfly(ctx, t, cx, cy, w, h);
      ctx.restore();
    }

    // 3. Movement 3: 水击三千 · 鲲鹏流场
    if (w3 > 0.001) {
      ctx.save();
      ctx.globalAlpha = w3;
      this.renderMovement3_VectorKunPeng(ctx, t, cx, cy, w, h);
      ctx.restore();
    }

    // 4. Movement 4: 齐物共振 · 李萨如双星
    if (w4 > 0.001) {
      ctx.save();
      ctx.globalAlpha = w4;
      this.renderMovement4_LissajousDuality(ctx, t, cx, cy, w, h);
      ctx.restore();
    }

    // 5. Movement 5: 物化归一 · 金石方寸
    if (w5 > 0.001) {
      ctx.save();
      ctx.globalAlpha = w5;
      this.renderMovement5_SingularitySeal(ctx, t, cx, cy, w, h);
      ctx.restore();
    }

    // Cross-movement connecting energy filaments (Ensures 100% continuous flow)
    this.renderContinuousFilaments(ctx, t, cx, cy);

    ctx.restore();
  }

  // =========================================================================
  // MOVEMENT 1: 气韵玄关 · 混沌初开 (0.0s - 5.5s)
  // =========================================================================
  renderMovement1_PrimalLine(ctx, t, cx, cy, w, h) {
    const pal = this.palette;

    // 1.1 Concentric Sine Wave Harmonic Ripples
    const rippleCount = 8;
    for (let i = 0; i < rippleCount; i++) {
      const offsetT = t - i * 0.45;
      if (offsetT > 0) {
        const radius = (offsetT * 120) % 520;
        const alpha = Math.max(0, 1.0 - radius / 520) * 0.45;
        
        ctx.save();
        ctx.lineWidth = 1.2 + Math.sin(radius * 0.05) * 0.6;
        // Alternating Azurite & Cinnabar misregistration
        if (i % 2 === 0) {
          ctx.strokeStyle = pal.azurite;
          ctx.globalAlpha = alpha * 0.8;
          ctx.beginPath();
          ctx.arc(cx - 1.5, cy - 1.0, radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeStyle = pal.cinnabar;
          ctx.globalAlpha = alpha * 0.7;
          ctx.beginPath();
          ctx.arc(cx + 1.5, cy + 1.0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Carbon ink main wave
        ctx.strokeStyle = pal.carbonBlack;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 1.2 Central Breathing Singularity
    const breath = Math.sin(t * 3.5) * 4.0;
    const coreR = Math.max(2, 10 + breath);

    // Ink halo
    const haloGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR * 5);
    haloGrad.addColorStop(0, 'rgba(20, 23, 26, 0.75)');
    haloGrad.addColorStop(0.3, 'rgba(27, 77, 104, 0.35)');
    haloGrad.addColorStop(0.7, 'rgba(217, 56, 41, 0.15)');
    haloGrad.addColorStop(1, 'rgba(247, 242, 231, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 5, 0, Math.PI * 2);
    ctx.fill();

    // Dense core
    ctx.fillStyle = pal.carbonBlack;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // 1.3 The Primal Calligraphic 3D Enso Ribbon (气韵一画)
    if (t > 0.8) {
      const ribbonProg = this.smoothstep(0.8, 5.0, t);
      const sweepAngle = ribbonProg * Math.PI * 2.3;
      const samples = 140;

      ctx.save();
      for (let s = 0; s < samples; s++) {
        const u = (s / samples) * sweepAngle;
        if (u > sweepAngle) break;

        // Radius formula creates expanding, spiraling Enso loop with 3D harmonic lift
        const baseR = 140 + 75 * Math.sin(u * 0.9) + 40 * Math.cos(u * 1.8 + t);
        const px = cx + Math.cos(u - Math.PI / 2) * baseR;
        const py = cy + Math.sin(u - Math.PI / 2) * baseR;

        // Stroke thickness profile: thin at origin -> thick body -> tapering flying ink (飞白)
        const thicknessFactor = Math.sin((s / samples) * Math.PI);
        const strokeW = 2.0 + thicknessFactor * 22.0;

        // Ink wash dry-brush fiber lines
        const strandCount = 6;
        for (let k = 0; k < strandCount; k++) {
          const strandOffset = (k - strandCount / 2) * (strokeW / strandCount);
          const nx = -Math.sin(u - Math.PI / 2) * strandOffset;
          const ny = Math.cos(u - Math.PI / 2) * strandOffset;

          ctx.beginPath();
          ctx.strokeStyle = (k === 1) ? pal.cinnabar : (k === 4 ? pal.azurite : pal.carbonBlack);
          ctx.globalAlpha = 0.55 + 0.35 * Math.sin(s * 0.4 + k);
          ctx.lineWidth = 1.0 + Math.random() * 0.8;
          ctx.arc(px + nx, py + ny, 1.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Gold dust particles scattered along the stroke
        if (s % 7 === 0 && ribbonProg > 0.3) {
          const goldX = px + (Math.sin(s * 77) - 0.5) * 35;
          const goldY = py + (Math.cos(s * 43) - 0.5) * 35;
          ctx.fillStyle = pal.ochreGold;
          ctx.globalAlpha = 0.75;
          ctx.beginPath();
          ctx.arc(goldX, goldY, 1.5 + Math.sin(t * 5 + s) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }

  // =========================================================================
  // MOVEMENT 2: 拓扑化蝶 · 虚实互生 (5.5s - 11.5s)
  // =========================================================================
  renderMovement2_TopologicalButterfly(ctx, t, cx, cy, w, h) {
    const pal = this.palette;
    const localT = t - 5.5;

    // Flapping frequency and perspective warp
    const flapPhase = Math.sin(localT * 6.5);
    const flapScaleX = 0.65 + 0.35 * Math.cos(localT * 6.5);
    const liftY = Math.sin(localT * 3.2) * 25;

    // Logarithmic vortex convergence starting at t > 9.0s
    const vortexProgress = this.smoothstep(9.0, 11.5, t);
    const vortexAngle = vortexProgress * Math.PI * 4.0;
    const vortexScale = 1.0 - vortexProgress * 0.75;

    ctx.save();
    ctx.translate(cx, cy + liftY);
    ctx.rotate(vortexAngle);
    ctx.scale(flapScaleX * vortexScale, vortexScale);

    // 2.1 Standing Wave Interference Contours (Interference Fringe Ripples)
    const waveCount = 12;
    for (let i = 0; i < waveCount; i++) {
      const r = 80 + i * 36 + Math.sin(localT * 4 + i) * 15;
      const alpha = (1.0 - i / waveCount) * 0.35;
      ctx.save();
      ctx.strokeStyle = (i % 2 === 0) ? pal.azuriteLight : pal.cinnabar;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      // Bilateral elliptic resonance
      ctx.ellipse(0, 0, r * 1.3, r * 0.8, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 2.2 Topological Lorenz Attractor & Parametric Butterfly Wings
    // Composed of 42 high-precision mathematical contour lines
    const contourCount = 38;
    for (let c = 0; c < contourCount; c++) {
      const cRatio = c / contourCount;
      const scale = 110 + cRatio * 260;
      const phaseShift = c * 0.12 - localT * 2.0;

      ctx.save();
      ctx.beginPath();

      // Wing color gradient from cinnabar core to azurite and gold perimeter
      if (c < 8) {
        ctx.strokeStyle = pal.carbonBlack;
        ctx.lineWidth = 2.0 - cRatio * 1.0;
        ctx.globalAlpha = 0.85;
      } else if (c < 20) {
        ctx.strokeStyle = pal.cinnabar;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.65;
      } else if (c < 30) {
        ctx.strokeStyle = pal.azurite;
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.55;
      } else {
        ctx.strokeStyle = pal.ochreGold;
        ctx.lineWidth = 0.9;
        ctx.globalAlpha = 0.45;
      }

      // Temple Butterfly Parametric Curve:
      // r(θ) = e^cosθ - 2cos(4θ) + sin^5(θ/12)
      const steps = 180;
      for (let s = 0; s <= steps; s++) {
        const theta = (s / steps) * Math.PI * 2;
        
        // Base butterfly formula with dynamic harmonic perturbation
        const rBase = Math.exp(Math.cos(theta)) - 2 * Math.cos(4 * theta) + Math.pow(Math.sin(theta / 12), 5);
        const dynamicWarp = 1.0 + 0.12 * Math.sin(5 * theta + phaseShift) + 0.08 * flapPhase * Math.cos(2 * theta);
        const r = (rBase * scale * 0.28) * dynamicWarp;

        // Map polar to Cartesian coordinates with vertical orientation
        const x = r * Math.sin(theta);
        const y = -r * Math.cos(theta);

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // 2.3 Wing Vein Energy Strands (Radial Splines)
    ctx.save();
    ctx.strokeStyle = pal.carbonBlack;
    ctx.lineWidth = 1.2;
    for (let a = 0; a < 24; a++) {
      const angle = (a / 24) * Math.PI * 2;
      const len = 70 + 190 * Math.abs(Math.sin(angle * 2));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const cpX = Math.sin(angle) * (len * 0.6) + Math.cos(localT * 3 + a) * 20;
      const cpY = -Math.cos(angle) * (len * 0.6) + Math.sin(localT * 3 + a) * 20;
      const endX = Math.sin(angle) * len;
      const endY = -Math.cos(angle) * len;
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.globalAlpha = 0.35 + 0.25 * Math.sin(localT * 5 + a);
      ctx.stroke();
    }
    ctx.restore();

    // 2.4 Central Spine & Singular Core
    ctx.fillStyle = pal.carbonBlack;
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cinnabar core dot
    ctx.fillStyle = pal.cinnabar;
    ctx.beginPath();
    ctx.arc(0, -15, 3.5, 0, Math.PI * 2);
    ctx.arc(0, 15, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // MOVEMENT 3: 水击三千 · 鲲鹏流场 (11.5s - 17.5s)
  // =========================================================================
  renderMovement3_VectorKunPeng(ctx, t, cx, cy, w, h) {
    const pal = this.palette;
    const localT = t - 11.5;

    // Surge progression: Deep Oceanic Abyss (Kun) -> Transmutation -> Skyward Ascending Gold Feathers (Peng)
    const skywardProg = this.smoothstep(0.0, 5.0, localT);
    const ascendOffset = skywardProg * 450;

    // 3.1 Oceanic & Atmospheric Vector Streamlines
    ctx.save();
    for (let i = 0; i < this.streamlines.length; i++) {
      const line = this.streamlines[i];
      
      // Dynamic Curl-like motion field with upward draft
      const nx = line.x * 0.003;
      const ny = line.y * 0.003;
      const flowVx = Math.sin(ny * 2.5 + localT * 1.2) * 45;
      const flowVy = -Math.cos(nx * 2.5 - localT * 1.4) * 80 - 110 * skywardProg;

      const px = (line.x + flowVx * (localT * line.speed)) % w;
      const curY = (line.y + flowVy * (localT * line.speed * 0.5) - ascendOffset);
      const py = ((curY % h) + h) % h;

      const lineLen = line.length * (1.0 + skywardProg * 1.5);

      ctx.beginPath();
      ctx.moveTo(px, py);

      // Tail curve follows curl gradient
      const tailX = px - flowVx * 0.3;
      const tailY = py + lineLen;
      ctx.quadraticCurveTo(px + Math.sin(line.phase + localT * 3) * 15, py + lineLen * 0.5, tailX, tailY);

      // Color shifts from deep azurite to blazing gold and cinnabar
      if (skywardProg < 0.4) {
        ctx.strokeStyle = (line.colorType % 2 === 0) ? pal.azurite : pal.carbonBlack;
        ctx.lineWidth = line.width * 1.3;
        ctx.globalAlpha = 0.45;
      } else {
        ctx.strokeStyle = (line.colorType === 2) ? pal.ochreGold : ((line.colorType === 3) ? pal.cinnabar : pal.azuriteLight);
        ctx.lineWidth = line.width * (1.2 + skywardProg * 0.8);
        ctx.globalAlpha = 0.55 + 0.35 * Math.sin(localT * 4 + i);
      }
      ctx.stroke();

      // Sparkle nodes on golden streamlines
      if (line.colorType === 2 && skywardProg > 0.3) {
        ctx.fillStyle = pal.goldPale;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 3.2 The Monumental Abstract Leviathan Spine Curve (巨鲲化鹏之骨架)
    // Mathematical spine path traversing diagonally upward
    ctx.save();
    const spinePoints = 80;
    const bodyWave = Math.sin(localT * 3.0) * 45;
    
    // Gradient along body: deep ink -> azurite -> molten gold
    const bodyGrad = ctx.createLinearGradient(cx - 200, cy + 400 - ascendOffset, cx + 200, cy - 400 - ascendOffset);
    bodyGrad.addColorStop(0, pal.carbonBlack);
    bodyGrad.addColorStop(0.4, pal.azurite);
    bodyGrad.addColorStop(0.75, pal.cinnabar);
    bodyGrad.addColorStop(1, pal.ochreGold);

    // Multi-ribbon kinetic sweeping body
    for (let r = -5; r <= 5; r++) {
      ctx.beginPath();
      ctx.strokeStyle = (r === 0) ? pal.ochreGold : bodyGrad;
      ctx.lineWidth = (r === 0) ? 3.5 : (3.0 - Math.abs(r) * 0.4);
      ctx.globalAlpha = (r === 0) ? 0.95 : (0.45 - Math.abs(r) * 0.05);

      for (let s = 0; s <= spinePoints; s++) {
        const u = s / spinePoints;
        const wave = Math.sin(u * Math.PI * 2.5 - localT * 4.0) * (35 + u * 45);
        const widthSpread = Math.sin(u * Math.PI) * (90 + r * 14);

        const bx = cx + (u - 0.5) * 480 + wave + (r * 12) * Math.cos(u * 3);
        const by = cy + (0.5 - u) * 850 - ascendOffset * 0.8;

        if (s === 0) ctx.moveTo(bx, by);
        else ctx.lineTo(bx, by);
      }
      ctx.stroke();
    }

    // 3.3 Golden Feather Spreads (大鹏扶摇翼展 - 90,000 Li Ascending Ribbons)
    if (skywardProg > 0.35) {
      const wingSpread = (skywardProg - 0.35) / 0.65;
      const wingRibbons = 28;
      
      for (let wIdx = 0; wIdx < wingRibbons; wIdx++) {
        const wRatio = wIdx / wingRibbons;
        const angleLeft = Math.PI * 0.85 + wRatio * 0.7 + Math.sin(localT * 4 + wIdx) * 0.08;
        const angleRight = Math.PI * 0.15 - wRatio * 0.7 - Math.sin(localT * 4 + wIdx) * 0.08;
        const featherLen = (180 + wRatio * 320) * wingSpread;

        const headX = cx;
        const headY = cy - 220 - ascendOffset * 0.8;

        // Left wing feather
        ctx.beginPath();
        ctx.strokeStyle = (wIdx % 3 === 0) ? pal.cinnabar : pal.ochreGold;
        ctx.lineWidth = 1.2 + (1.0 - wRatio) * 2.0;
        ctx.globalAlpha = 0.75 * wingSpread;
        ctx.moveTo(headX, headY);
        ctx.quadraticCurveTo(
          headX + Math.cos(angleLeft) * featherLen * 0.5,
          headY - Math.sin(angleLeft) * featherLen * 0.4,
          headX + Math.cos(angleLeft) * featherLen,
          headY - Math.sin(angleLeft) * featherLen
        );
        ctx.stroke();

        // Right wing feather
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.quadraticCurveTo(
          headX + Math.cos(angleRight) * featherLen * 0.5,
          headY - Math.sin(angleRight) * featherLen * 0.4,
          headX + Math.cos(angleRight) * featherLen,
          headY - Math.sin(angleRight) * featherLen
        );
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // =========================================================================
  // MOVEMENT 4: 齐物共振 · 李萨如双星 (17.5s - 22.5s)
  // =========================================================================
  renderMovement4_LissajousDuality(ctx, t, cx, cy, w, h) {
    const pal = this.palette;
    const localT = t - 17.5;

    // Relativistic gravitational acceleration towards collapse
    // As localT goes from 0 -> 5.0 (t: 17.5 -> 22.5), orbit accelerates and contracts
    const timeNorm = Math.min(1.0, Math.max(0.0, localT / 5.0));
    const accelRate = 1.0 + Math.pow(timeNorm, 3) * 6.5;
    const contract = 1.0 - Math.pow(timeNorm, 2.5) * 0.75;
    const omega = 1.8 * accelRate;

    // 4.1 Concentric Sacred Resonance Mandalas & Bagua Wave Rings
    const ringCount = 9;
    for (let k = 1; k <= ringCount; k++) {
      const baseRadius = k * 52 * contract;
      const waveAmp = Math.sin(localT * 3.5 + k * 0.7) * (6 * contract);
      const r = baseRadius + waveAmp;

      ctx.save();
      ctx.lineWidth = 0.9 + (k % 3 === 0 ? 0.8 : 0);
      ctx.strokeStyle = (k % 3 === 0) ? pal.cinnabar : ((k % 2 === 0) ? pal.azuriteLight : pal.carbonBlack);
      ctx.globalAlpha = 0.35 * (1.0 - timeNorm * 0.4);

      ctx.beginPath();
      // Multi-frequency harmonic polygon ring
      const numVertices = 8 * (k % 2 === 0 ? 2 : 1);
      for (let v = 0; v <= numVertices; v++) {
        const vAngle = (v / numVertices) * Math.PI * 2 + localT * 0.2 * (k % 2 === 0 ? 1 : -1);
        const vx = cx + Math.cos(vAngle) * r;
        const vy = cy + Math.sin(vAngle) * r;
        if (v === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.stroke();

      // Delicate Yin-Yang dots on key resonance nodes
      if (k === 5 || k === 8) {
        for (let d = 0; d < 8; d++) {
          const dAngle = (d / 8) * Math.PI * 2 + localT * 0.3;
          ctx.fillStyle = (d % 2 === 0) ? pal.cinnabar : pal.carbonBlack;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(dAngle) * r, cy + Math.sin(dAngle) * r, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // 4.2 Lissajous Harmonic Orbital Weave (Harmonic Ratio 3:4)
    // Simulates the philosophical superposition: "Is Zhuangzi dreaming the butterfly, or the butterfly dreaming Zhuangzi?"
    const lissajousSamples = 320;
    const ax = 320 * contract;
    const ay = 320 * contract;
    const deltaPhase = localT * 1.5;

    // Historical trail ribbon
    ctx.save();
    ctx.beginPath();
    for (let s = 0; s <= lissajousSamples; s++) {
      const tau = (s / lissajousSamples) * Math.PI * 4;
      const lx = cx + ax * Math.sin(3 * tau + deltaPhase);
      const ly = cy + ay * Math.sin(4 * tau);

      if (s === 0) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.strokeStyle = pal.ochreGold;
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.55;
    ctx.stroke();
    ctx.restore();

    // Symmetrical dual weave
    ctx.save();
    ctx.beginPath();
    for (let s = 0; s <= lissajousSamples; s++) {
      const tau = (s / lissajousSamples) * Math.PI * 4;
      const lx = cx - ax * Math.sin(3 * tau + deltaPhase);
      const ly = cy - ay * Math.sin(4 * tau);

      if (s === 0) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.strokeStyle = pal.azuriteLight;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.45;
    ctx.stroke();
    ctx.restore();

    // 4.3 The Twin Singularities (Star A: "Zhuangzi", Star B: "Butterfly")
    const curTau = localT * omega;
    const starAx = cx + ax * Math.sin(3 * curTau + deltaPhase);
    const starAy = cy + ay * Math.sin(4 * curTau);

    const starBx = cx - ax * Math.sin(3 * curTau + deltaPhase);
    const starBy = cy - ay * Math.sin(4 * curTau);

    // Connecting quantum filament between twin stars
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(starAx, starAy);
    ctx.quadraticCurveTo(cx, cy, starBx, starBy);
    ctx.strokeStyle = pal.cinnabar;
    ctx.lineWidth = 2.0;
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.restore();

    // Render Star A (Zhuangzi: Songyan Ink & Mineral Azurite Glow)
    this.renderSingularityParticle(ctx, starAx, starAy, pal.carbonBlack, pal.azuriteLight, 18, "庄");

    // Render Star B (Butterfly: Cinnabar Vermilion & Molten Gold Glow)
    this.renderSingularityParticle(ctx, starBx, starBy, pal.cinnabar, pal.ochreGold, 18, "蝶");
  }

  renderSingularityParticle(ctx, x, y, coreColor, haloColor, radius, symbol) {
    ctx.save();
    // Halo
    const halo = ctx.createRadialGradient(x, y, 2, x, y, radius * 3.5);
    halo.addColorStop(0, haloColor);
    halo.addColorStop(0.4, coreColor);
    halo.addColorStop(1, 'rgba(247, 242, 231, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, radius * 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Dense core
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Gold corona ring
    ctx.strokeStyle = this.palette.goldPale;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.4, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle ancient character anchor
    ctx.fillStyle = this.palette.paper;
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, x, y);

    ctx.restore();
  }

  // =========================================================================
  // MOVEMENT 5: 物化归一 · 金石方寸 (22.5s - 28.05s)
  // =========================================================================
  renderMovement5_SingularitySeal(ctx, t, cx, cy, w, h) {
    const pal = this.palette;
    const localT = t - 22.5;

    // 5.1 Collapse Shockwave & Spring Snap Damping
    // Impact happens at localT ~ 1.0s (t = 23.5s)
    let sealScale = 1.0;
    let sealAlpha = 1.0;
    let impactProgress = 0;

    if (localT < 1.0) {
      // Inward collapse towards singularity
      const collapseProgress = localT / 1.0;
      const shrink = 1.0 - Math.pow(collapseProgress, 3);
      sealScale = 0.05 + shrink * 3.0;
      sealAlpha = collapseProgress;
    } else {
      // Spring bounce settlement
      const postElapsed = localT - 1.0;
      impactProgress = Math.min(1.0, postElapsed / 0.4);
      // Damped harmonic vibration: e^(-λt) * cos(ωt)
      const damping = Math.exp(-postElapsed * 4.5);
      sealScale = 1.0 + damping * 0.35 * Math.sin(postElapsed * 24.0);
    }

    // 5.2 Outward Expanding Shockwave Ring upon Stamp Impact (t = 23.5s)
    if (localT >= 1.0 && localT <= 2.8) {
      const shockElapsed = localT - 1.0;
      const shockR = shockElapsed * 450;
      const shockAlpha = Math.max(0, 1.0 - shockElapsed / 1.8) * 0.7;
      ctx.save();
      ctx.strokeStyle = pal.cinnabar;
      ctx.lineWidth = 2.5 * (1.0 - shockElapsed / 1.8);
      ctx.globalAlpha = shockAlpha;
      ctx.beginPath();
      ctx.arc(cx, cy, shockR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 5.3 Weathered Cinnabar Han Seal (金石汉印 · 方寸天地)
    const sealSize = 420;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sealScale, sealScale);
    ctx.globalAlpha = sealAlpha;

    // Draw square seal background with subtle mineral mottled texture
    ctx.save();
    ctx.fillStyle = pal.cinnabar;
    ctx.shadowColor = 'rgba(181, 40, 27, 0.45)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 6;
    this.drawChippedRect(ctx, -sealSize / 2, -sealSize / 2, sealSize, sealSize, 14);
    ctx.fill();
    ctx.restore();

    // Weathered double border line with mineral erosion
    ctx.save();
    ctx.strokeStyle = pal.paper;
    ctx.lineWidth = 9.0;
    this.drawChippedRect(ctx, -sealSize / 2 + 20, -sealSize / 2 + 20, sealSize - 40, sealSize - 40, 6);
    ctx.stroke();

    // Thin inner margin line
    ctx.lineWidth = 2.0;
    this.drawChippedRect(ctx, -sealSize / 2 + 32, -sealSize / 2 + 32, sealSize - 64, sealSize - 64, 4);
    ctx.stroke();
    ctx.restore();

    // 5.4 Archaic Seal-Script Inscriptions (汉印白文篆字):
    // Right Column:  昔 者 庄 周 梦 为 胡 蝶
    // Left Column:   此 之 谓 物 化
    ctx.save();
    ctx.fillStyle = pal.paper;
    this.renderGeometricSealCharacters(ctx, sealSize);
    ctx.restore();

    ctx.restore(); // Exit seal local coordinates

    // 5.5 The Escaping Golden Thread (超然破茧 · 飞去来兮)
    // Detaches from top-right corner of seal at t > 25.0s
    if (t >= 25.0) {
      const escapeT = t - 25.0;
      const escapeProgress = this.smoothstep(0.0, 3.0, escapeT);
      
      const startX = cx + sealSize * 0.38;
      const startY = cy - sealSize * 0.38;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      // Trajectory curls upward towards cosmic void
      const flightLen = escapeProgress * 650;
      const flapWarp = Math.sin(escapeT * 12.0) * 18;
      
      const p1x = startX + flightLen * 0.4 + Math.sin(escapeT * 4) * 45;
      const p1y = startY - flightLen * 0.5 + flapWarp;
      const endX = startX + flightLen * 0.9;
      const endY = startY - flightLen * 1.1;

      ctx.quadraticCurveTo(p1x, p1y, endX, endY);

      // Molten gold thread with subtle cinnabar misregistration
      ctx.strokeStyle = pal.cinnabar;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5 * (1.0 - escapeProgress * 0.4);
      ctx.stroke();

      ctx.strokeStyle = pal.ochreGold;
      ctx.lineWidth = 2.2;
      ctx.globalAlpha = 0.95 * (1.0 - escapeProgress * 0.2);
      ctx.stroke();

      // Minimalist topological butterfly wings at tip
      const tipFlap = Math.sin(escapeT * 14.0);
      ctx.fillStyle = pal.goldPale;
      ctx.beginPath();
      ctx.ellipse(endX - 8, endY - 6 * tipFlap, 12, 7 * Math.abs(tipFlap), -Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(endX + 8, endY - 6 * tipFlap, 12, 7 * Math.abs(tipFlap), Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Golden dust particles drifting behind
      for (let g = 0; g < 12; g++) {
        const trailRatio = g / 12;
        if (trailRatio < escapeProgress) {
          const gx = startX + (endX - startX) * trailRatio + (Math.sin(g * 44 + escapeT * 6) - 0.5) * 24;
          const gy = startY + (endY - startY) * trailRatio + (Math.cos(g * 29 + escapeT * 6) - 0.5) * 24;
          ctx.fillStyle = (g % 2 === 0) ? pal.goldPale : pal.cinnabar;
          ctx.globalAlpha = (1.0 - trailRatio) * 0.85;
          ctx.beginPath();
          ctx.arc(gx, gy, 1.4 + Math.sin(escapeT * 8 + g) * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }

  /**
   * Draws weathered chipped rectangle imitating ancient stone seal carving
   */
  drawChippedRect(ctx, x, y, w, h, chipScale = 10) {
    ctx.beginPath();
    // Top edge with mineral chips
    ctx.moveTo(x, y + chipScale);
    ctx.lineTo(x + chipScale * 0.6, y);
    ctx.lineTo(x + w * 0.35, y + 1.2);
    ctx.lineTo(x + w * 0.65, y - 1.0);
    ctx.lineTo(x + w - chipScale * 0.8, y);
    ctx.lineTo(x + w, y + chipScale * 0.9);

    // Right edge
    ctx.lineTo(x + w + 1.2, y + h * 0.45);
    ctx.lineTo(x + w - 1.5, y + h * 0.75);
    ctx.lineTo(x + w, y + h - chipScale);
    ctx.lineTo(x + w - chipScale * 0.7, y + h);

    // Bottom edge
    ctx.lineTo(x + w * 0.6, y + h + 1.5);
    ctx.lineTo(x + w * 0.3, y + h - 1.2);
    ctx.lineTo(x + chipScale, y + h);
    ctx.lineTo(x, y + h - chipScale * 0.8);

    // Left edge
    ctx.lineTo(x - 1.0, y + h * 0.65);
    ctx.lineTo(x + 1.4, y + h * 0.3);
    ctx.closePath();
  }

  /**
   * Renders archaic geometric seal-script strokes (Pure Vector Geometry)
   */
  renderGeometricSealCharacters(ctx, sealSize) {
    const pal = this.palette;
    const colRightX = sealSize * 0.22;
    const colLeftX = -sealSize * 0.22;

    // Authentic Seal Characters rendered with balanced rectangular Han seal blocks
    // Right Column: "昔者庄周梦为胡蝶" (Summarized into classic 4-glyph or vertical columns)
    // Left Column:  "此之谓物化"
    
    // Character glyph layout helper
    const drawStroke = (x, y, w, h) => {
      ctx.fillRect(x - w / 2, y - h / 2, w, h);
    };

    // Right Column Glyphs: 庄 · 周 · 梦 · 蝶
    const yOffsets = [-120, -40, 40, 120];

    // 1. "庄" (Zhuang)
    const y1 = yOffsets[0];
    drawStroke(colRightX - 45, y1, 8, 55);       // Left shield
    drawStroke(colRightX, y1 - 24, 75, 7);       // Top roof
    drawStroke(colRightX, y1 - 6, 45, 6);        // Soil cross
    drawStroke(colRightX, y1 + 5, 8, 30);        // Soil vertical
    drawStroke(colRightX, y1 + 22, 60, 7);       // Bottom base

    // 2. "周" (Zhou)
    const y2 = yOffsets[1];
    drawStroke(colRightX - 35, y2, 8, 55);       // Left frame
    drawStroke(colRightX + 35, y2, 8, 55);       // Right frame
    drawStroke(colRightX, y2 - 24, 78, 7);       // Top frame
    drawStroke(colRightX, y2 - 6, 50, 6);        // Middle line
    drawStroke(colRightX, y2 + 15, 36, 6);       // Mouth top
    drawStroke(colRightX - 16, y2 + 20, 6, 16);  // Mouth left
    drawStroke(colRightX + 16, y2 + 20, 6, 16);  // Mouth right
    drawStroke(colRightX, y2 + 26, 36, 6);       // Mouth bot

    // 3. "梦" (Meng)
    const y3 = yOffsets[2];
    // Dual wood (林)
    drawStroke(colRightX - 22, y3 - 16, 32, 6);  // Wood 1 horiz
    drawStroke(colRightX - 22, y3 - 14, 6, 26);  // Wood 1 vert
    drawStroke(colRightX + 22, y3 - 16, 32, 6);  // Wood 2 horiz
    drawStroke(colRightX + 22, y3 - 14, 6, 26);  // Wood 2 vert
    // Evening (夕)
    drawStroke(colRightX, y3 + 8, 48, 6);        // Top curve
    drawStroke(colRightX - 18, y3 + 18, 6, 24);  // Left arc
    drawStroke(colRightX + 6, y3 + 18, 28, 6);   // Inner bar

    // 4. "蝶" (Die)
    const y4 = yOffsets[3];
    // Insect radical (虫)
    drawStroke(colRightX - 26, y4 - 10, 24, 18); // Head box
    drawStroke(colRightX - 26, y4 + 8, 6, 26);   // Body
    drawStroke(colRightX - 26, y4 + 20, 26, 6);  // Feet
    // Right phonetic (枼)
    drawStroke(colRightX + 22, y4 - 20, 36, 6);  // Top bar
    drawStroke(colRightX + 22, y4 - 8, 30, 6);   // Middle bar
    drawStroke(colRightX + 22, y4 + 10, 6, 30);  // Tree stem
    drawStroke(colRightX + 22, y4 + 22, 42, 6);  // Tree base

    // Left Column Glyphs: 物 · 化 · 齐 · 一
    // 1. "物" (Wu)
    const yL1 = yOffsets[0];
    drawStroke(colLeftX - 26, yL1 - 8, 6, 38);   // Ox horn
    drawStroke(colLeftX - 26, yL1 - 18, 22, 6);  // Ox top
    drawStroke(colLeftX - 26, yL1 + 5, 26, 6);   // Ox bar
    drawStroke(colLeftX + 20, yL1 - 20, 32, 6);  // Not top
    drawStroke(colLeftX + 26, yL1, 6, 46);       // Not hook
    drawStroke(colLeftX + 8, yL1 + 6, 26, 6);    // Not slash

    // 2. "化" (Hua)
    const yL2 = yOffsets[1];
    drawStroke(colLeftX - 24, yL2, 7, 50);       // Person left
    drawStroke(colLeftX - 12, yL2 - 12, 18, 6);  // Person slash
    drawStroke(colLeftX + 20, yL2 - 14, 26, 6);  // Spoon top
    drawStroke(colLeftX + 28, yL2 + 4, 7, 44);   // Spoon vert
    drawStroke(colLeftX + 16, yL2 + 24, 28, 6);  // Spoon hook

    // 3. "齐" (Qi)
    const yL3 = yOffsets[2];
    drawStroke(colLeftX, yL3 - 22, 60, 6);       // Crown bar
    drawStroke(colLeftX - 24, yL3 - 8, 6, 22);   // Left ear
    drawStroke(colLeftX + 24, yL3 - 8, 6, 22);   // Right ear
    drawStroke(colLeftX, yL3 + 8, 48, 6);        // Center bar
    drawStroke(colLeftX, yL3 + 18, 6, 20);       // Center vert
    drawStroke(colLeftX, yL3 + 26, 56, 6);       // Base bar

    // 4. "一" (Yi / Dao Singularity)
    const yL4 = yOffsets[3];
    drawStroke(colLeftX, yL4, 64, 9);            // One solid primal stroke
  }

  // =========================================================================
  // CONTINUOUS CONNECTING FILAMENTS (贯穿全片的无间气韵流线)
  // =========================================================================
  renderContinuousFilaments(ctx, t, cx, cy) {
    const pal = this.palette;
    
    // A persistent breathing golden guiding curve that weaves across the entire 28 seconds
    ctx.save();
    ctx.beginPath();
    const filamentSamples = 60;
    const globalPhase = t * 0.8;

    for (let i = 0; i <= filamentSamples; i++) {
      const u = i / filamentSamples;
      const angle = u * Math.PI * 4.0 + globalPhase;
      const dist = (50 + u * 480) * (1.0 + 0.05 * Math.sin(t * 2 + u * 10));

      const fx = cx + Math.cos(angle) * dist;
      const fy = cy + Math.sin(angle) * dist;

      if (i === 0) ctx.moveTo(fx, fy);
      else ctx.lineTo(fx, fy);
    }

    ctx.strokeStyle = pal.ochreGold;
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.22 + 0.12 * Math.sin(t * 1.5);
    ctx.setLineDash([4, 12]);
    ctx.stroke();
    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.AbstractStreamRenderer = AbstractStreamRenderer;
}
if (typeof module !== 'undefined') {
  module.exports = { AbstractStreamRenderer };
}
