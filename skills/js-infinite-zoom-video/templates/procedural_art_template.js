/**
 * 100% Pure Procedural Generative Art Engine for Zhuangzi Butterfly Dream
 * Zero external images. Pure mathematical algorithms, Bézier curves, and generative aesthetics.
 */

class ProceduralArt {
  /**
   * 1. Layered Misty Mountains (水墨群峰与远山烟雨)
   */
  static drawMistyMountains(ctx, t, palette) {
    ctx.save();

    // 3 distinct mountain ranges from distance to foreground
    const layers = [
      { baseHeight: 480, amp: 85, freq: 0.0035, color: 'rgba(29, 106, 134, 0.22)', speed: 0.04 },
      { baseHeight: 620, amp: 120, freq: 0.005, color: 'rgba(29, 106, 134, 0.45)', speed: 0.08 },
      { baseHeight: 760, amp: 160, freq: 0.0065, color: 'rgba(22, 25, 30, 0.75)', speed: 0.12 }
    ];

    layers.forEach((l, idx) => {
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.moveTo(0, 1080);
      ctx.lineTo(0, l.baseHeight);

      for (let x = 0; x <= 1080; x += 15) {
        // Multi-frequency harmonic synthesis
        const y = l.baseHeight 
          - Math.sin(x * l.freq + t * l.speed + idx) * l.amp
          - Math.sin(x * l.freq * 2.3 + idx * 2) * (l.amp * 0.4)
          - Math.cos(x * l.freq * 4.1) * (l.amp * 0.15);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(1080, 1080);
      ctx.closePath();
      ctx.fill();

      // Mountain ridge linework
      ctx.strokeStyle = idx === 2 ? palette.carbonBlack : palette.azurite;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Cloud mist bands drifting between peaks
    for (let m = 0; m < 4; m++) {
      const my = 520 + m * 80 + Math.sin(t * 0.5 + m) * 15;
      const mx = ((t * 20 + m * 280) % 1380) - 150;
      ctx.fillStyle = 'rgba(247, 242, 231, 0.35)';
      ctx.beginPath();
      ctx.ellipse(mx, my, 180, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * 2. Gnarled Ancient Pine Tree (苍虬古松与松针放射)
   */
  static drawAncientPine(ctx, cx, cy, scale = 1.0, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Pine Trunk (Twisted, muscular bark lines)
    ctx.fillStyle = palette.carbonBlack;
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 3;

    // Main Trunk
    ctx.beginPath();
    ctx.moveTo(-70, 480);
    ctx.bezierCurveTo(-50, 260, 20, 140, -10, -40);
    ctx.bezierCurveTo(-20, -110, -90, -180, -40, -260);
    ctx.bezierCurveTo(40, -310, 180, -290, 260, -320);
    // Outer trunk return
    ctx.bezierCurveTo(180, -260, 50, -240, 10, -180);
    ctx.bezierCurveTo(40, -90, 20, 80, -10, 260);
    ctx.bezierCurveTo(-20, 360, 20, 440, 30, 480);
    ctx.closePath();
    ctx.fill();

    // Bark grain lines
    ctx.strokeStyle = 'rgba(247, 242, 231, 0.25)';
    ctx.lineWidth = 1.5;
    for (let b = 0; b < 12; b++) {
      const by = 420 - b * 55;
      ctx.beginPath();
      ctx.arc(-20 + (b % 3) * 10, by, 18 + (b % 4) * 4, -0.8, 0.8);
      ctx.stroke();
    }

    // Pine Needle Clusters (Radial bursts of dark green & soot needles)
    const clusterNodes = [
      { x: 260, y: -320, r: 65 },
      { x: 160, y: -290, r: 75 },
      { x: 60, y: -330, r: 70 },
      { x: -40, y: -260, r: 65 },
      { x: -110, y: -200, r: 55 },
      { x: 210, y: -240, r: 58 },
      { x: 310, y: -280, r: 50 }
    ];

    clusterNodes.forEach((node, nIdx) => {
      const wobble = Math.sin(t * 2 + nIdx) * 2;
      const nx = node.x + wobble;
      const ny = node.y + wobble;

      ctx.save();
      ctx.translate(nx, ny);

      // Multiple dense radial needle layers
      for (let a = 0; a < 36; a++) {
        const angle = (a / 36) * Math.PI * 2;
        const len = node.r * (0.7 + (a % 5) * 0.08);

        // Dark pine needle
        ctx.strokeStyle = (a % 3 === 0) ? palette.jadeTeal : palette.carbonBlack;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        ctx.stroke();
      }

      // Cinnabar pine cone seed dot
      ctx.fillStyle = palette.cinnabar;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    ctx.restore();
  }

  /**
   * 3. Procedural Scholar Zhuangzi (参数化庄周人物)
   */
  static drawProceduralZhuangzi(ctx, cx, cy, scale = 1.0, palette, t = 0, state = {}) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Stone ledge where he sits
    ctx.fillStyle = '#C8BEAF';
    ctx.beginPath();
    ctx.moveTo(-160, 180);
    ctx.lineTo(240, 180);
    ctx.lineTo(200, 230);
    ctx.lineTo(-140, 230);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 1. Daoist Robe & Fold Lines
    ctx.fillStyle = '#E8E1D5';
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2.4;

    // Cross-legged body shape
    ctx.beginPath();
    ctx.moveTo(-110, 180);
    ctx.bezierCurveTo(-140, 140, -120, 80, -70, 30);
    ctx.bezierCurveTo(-50, -20, -30, -50, -35, -70);
    ctx.lineTo(35, -70);
    ctx.bezierCurveTo(30, -50, 50, -20, 70, 30);
    ctx.bezierCurveTo(120, 80, 140, 140, 110, 180);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Collar / Lapel cross folds (交领右衽)
    ctx.beginPath();
    ctx.moveTo(-35, -70);
    ctx.lineTo(15, 20);
    ctx.lineTo(-5, 180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(35, -70);
    ctx.lineTo(-20, -10);
    ctx.stroke();

    // Belt sash
    ctx.strokeStyle = palette.azurite;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-50, 45);
    ctx.lineTo(50, 45);
    ctx.stroke();

    // 2. Head with sleep nodding
    const nodAngle = state.nodAngle || (Math.sin(t * 3.2) * 0.08);
    const headX = 0;
    const headY = -95;

    ctx.save();
    ctx.translate(headX, headY);
    ctx.rotate(nodAngle);

    // Face oval
    ctx.fillStyle = '#F2E9DE';
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Beard
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.moveTo(-14, 18);
    ctx.quadraticCurveTo(0, 58, 14, 18);
    ctx.closePath();
    ctx.fill();

    // Peaceful closed eyelids (打瞌睡细线)
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(-9, -2, 6, 0.2, Math.PI - 0.2); // left eye
    ctx.arc(9, -2, 6, 0.2, Math.PI - 0.2);  // right eye
    ctx.stroke();

    // Gentle smile
    ctx.beginPath();
    ctx.arc(0, 12, 6, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Spiritual third eye / brow dot
    ctx.fillStyle = palette.cinnabar;
    ctx.beginPath();
    ctx.arc(0, -12, 3, 0, Math.PI * 2);
    ctx.fill();

    // 3. Hair Bun (Can pop off if state.lidPop > 0)
    const lidPopY = state.lidPopY || 0;
    ctx.save();
    ctx.translate(0, -32 + lidPopY);
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.arc(0, 0, 16, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Wooden hair pin (簪子)
    ctx.strokeStyle = palette.cinnabar;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.lineTo(24, -4);
    ctx.stroke();
    ctx.restore();

    ctx.restore(); // end head
    ctx.restore(); // end figure
  }

  /**
   * 4. Parametric Procedural Butterfly (参数化数学蝴蝶与分形翅脉)
   */
  static drawProceduralButterfly(ctx, cx, cy, size = 60, flapAngle = 0, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    // Flapping perspective scaling
    const cosFlap = Math.cos(flapAngle);
    ctx.scale(cosFlap, 1.0);

    const drawWingPair = (isRight) => {
      const sign = isRight ? 1 : -1;
      ctx.save();

      // Top Forewing
      ctx.fillStyle = 'rgba(29, 106, 134, 0.85)';
      ctx.strokeStyle = palette.carbonBlack;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(sign * size * 0.8, -size * 0.9, sign * size * 1.7, -size * 1.2, sign * size * 1.9, -size * 0.5);
      ctx.bezierCurveTo(sign * size * 2.0, size * 0.2, sign * size * 1.3, size * 0.6, 0, size * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bottom Hindwing
      ctx.fillStyle = 'rgba(232, 74, 59, 0.85)';
      ctx.beginPath();
      ctx.moveTo(0, size * 0.2);
      ctx.bezierCurveTo(sign * size * 1.2, size * 0.6, sign * size * 1.5, size * 1.4, sign * size * 0.8, size * 1.8);
      ctx.bezierCurveTo(sign * size * 0.3, size * 2.0, 0, size * 1.2, 0, size * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Fractal Venation Lines (翅脉分形纹路)
      ctx.strokeStyle = palette.carbonBlack;
      ctx.lineWidth = 1.2;
      for (let v = 1; v <= 5; v++) {
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.1);
        const vx = sign * size * (0.6 + v * 0.22);
        const vy = -size * 0.8 + v * size * 0.3;
        ctx.quadraticCurveTo(sign * size * 0.4, -size * 0.2 + v * 10, vx, vy);
        ctx.stroke();

        // Cinnabar/Gold spot along vein
        ctx.fillStyle = (v % 2 === 0) ? palette.ochreGold : palette.mistWhite;
        ctx.beginPath();
        ctx.arc(vx * 0.8, vy * 0.8, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Draw Left and Right Wings
    drawWingPair(false);
    drawWingPair(true);

    // Slender Body & Thorax
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.2, size * 0.08, size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antennae
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.25);
    ctx.quadraticCurveTo(-size * 0.2, -size * 0.7, -size * 0.4, -size * 0.8);
    ctx.moveTo(0, -size * 0.25);
    ctx.quadraticCurveTo(size * 0.2, -size * 0.7, size * 0.4, -size * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * 5. Procedural Leviathan Whale Kun (贝塞尔动态巨鲲)
   */
  static drawProceduralKunWhale(ctx, cx, cy, scale = 1.0, puffFactor = 1.0, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale * puffFactor, scale);

    // Swimming body wave
    const wave = Math.sin(t * 4) * 15;

    // Whale Body (Smooth streamlined bezier)
    ctx.fillStyle = palette.carbonBlack;
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(-220, 0); // Snout
    ctx.bezierCurveTo(-180, -90, -40, -120, 80, -80); // Head & Back
    ctx.bezierCurveTo(180, -50, 240, -20, 320, wave); // Tail stem
    // Fluke Top
    ctx.lineTo(380, -50 + wave);
    ctx.lineTo(360, wave);
    // Fluke Bottom
    ctx.lineTo(380, 50 + wave);
    ctx.lineTo(320, 20 + wave);
    // Belly return
    ctx.bezierCurveTo(220, 60, 100, 110, -40, 90);
    ctx.bezierCurveTo(-140, 80, -200, 40, -220, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Belly Grooves (Cinnabar / White ribbed grooves)
    ctx.strokeStyle = 'rgba(232, 74, 59, 0.75)';
    ctx.lineWidth = 2;
    for (let g = 0; g < 7; g++) {
      const gx = -160 + g * 35;
      ctx.beginPath();
      ctx.moveTo(gx, 25);
      ctx.quadraticCurveTo(gx + 30, 75, gx + 70, 50);
      ctx.stroke();
    }

    // Cute Eye
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-165, -15, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.arc(-163, -15, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Spouting Water Mist from Blowhole
    ctx.strokeStyle = 'rgba(29, 106, 134, 0.85)';
    ctx.lineWidth = 2.5;
    for (let s = -2; s <= 2; s++) {
      const spoutHeight = 90 + Math.sin(t * 8 + s) * 20;
      ctx.beginPath();
      ctx.moveTo(-40, -100);
      ctx.quadraticCurveTo(-40 + s * 20, -100 - spoutHeight * 0.6, -40 + s * 45, -100 - spoutHeight);
      ctx.stroke();
    }

    // Huge Flipper Fin
    const finAngle = Math.sin(t * 5) * 0.25;
    ctx.save();
    ctx.translate(-20, 30);
    ctx.rotate(finAngle);
    ctx.fillStyle = palette.azurite;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(30, 40, 50, 100, 20, 120);
    ctx.bezierCurveTo(-10, 80, -20, 40, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  /**
   * 6. Procedural Celestial Peng Bird (展翅大鹏)
   */
  static drawProceduralPengBird(ctx, cx, cy, scale = 1.0, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    const flap = Math.sin(t * 6) * 0.35;

    // Wing Left
    ctx.save();
    ctx.rotate(-flap);
    ctx.fillStyle = palette.cinnabar;
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-100, -180, -240, -220, -380, -140);
    ctx.bezierCurveTo(-300, -40, -180, 20, 0, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Wing Right
    ctx.save();
    ctx.rotate(flap);
    ctx.fillStyle = palette.cinnabar;
    ctx.strokeStyle = palette.carbonBlack;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(100, -180, 240, -220, 380, -140);
    ctx.bezierCurveTo(300, -40, 180, 20, 0, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Body & Raptor Head
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.ellipse(0, 10, 35, 75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden Beak
    ctx.fillStyle = palette.ochreGold;
    ctx.beginPath();
    ctx.moveTo(-12, -60);
    ctx.lineTo(0, -95);
    ctx.lineTo(12, -60);
    ctx.closePath();
    ctx.fill();

    // Glowing Eyes
    ctx.fillStyle = palette.cinnabar;
    ctx.beginPath();
    ctx.arc(-14, -62, 5, 0, Math.PI * 2);
    ctx.arc(14, -62, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * 7. Procedural Qi-Wu Mandala (太极八卦与齐物大曼陀罗)
   */
  static drawProceduralMandala(ctx, cx, cy, radius = 420, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    // Rotating outer ring
    ctx.rotate(t * 0.06);

    // 1. Concentric Guide Rings
    const rings = [radius, radius * 0.85, radius * 0.65, radius * 0.45, radius * 0.28];
    rings.forEach((r, idx) => {
      ctx.strokeStyle = (idx % 2 === 0) ? palette.carbonBlack : palette.cinnabar;
      ctx.lineWidth = idx === 0 ? 3.5 : 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 2. 8 Trigrams (先天八卦爻符)
    const trigrams = [
      [1, 1, 1], // 乾
      [0, 1, 1], // 兑
      [1, 0, 1], // 离
      [0, 0, 1], // 震
      [1, 1, 0], // 巽
      [0, 1, 0], // 坎
      [1, 0, 0], // 艮
      [0, 0, 0]  // 坤
    ];

    const trigramRadius = radius * 0.75;
    trigrams.forEach((lines, idx) => {
      const angle = (idx / 8) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.translate(0, -trigramRadius);

      lines.forEach((isYang, lineIdx) => {
        const ly = lineIdx * 10 - 10;
        ctx.strokeStyle = palette.carbonBlack;
        ctx.lineWidth = 3.2;

        if (isYang) {
          // Solid Yang Line
          ctx.beginPath();
          ctx.moveTo(-24, ly);
          ctx.lineTo(24, ly);
          ctx.stroke();
        } else {
          // Broken Yin Line
          ctx.beginPath();
          ctx.moveTo(-24, ly);
          ctx.lineTo(-6, ly);
          ctx.moveTo(6, ly);
          ctx.lineTo(24, ly);
          ctx.stroke();
        }
      });
      ctx.restore();
    });

    // 3. 28 Constellation Stars (二十八星宿)
    const starRadius = radius * 0.55;
    for (let s = 0; s < 28; s++) {
      const sAngle = (s / 28) * Math.PI * 2;
      const sx = Math.cos(sAngle) * starRadius;
      const sy = Math.sin(sAngle) * starRadius;

      ctx.fillStyle = palette.cinnabar;
      ctx.beginPath();
      ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Connecting constellation line
      if (s % 4 !== 3) {
        const nextAngle = ((s + 1) / 28) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(22, 25, 30, 0.4)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(Math.cos(nextAngle) * starRadius, Math.sin(nextAngle) * starRadius);
        ctx.stroke();
      }
    }

    // 4. Central Yin-Yang Taiji (太极双鱼)
    const taijiR = radius * 0.28;
    ctx.save();
    ctx.rotate(t * 0.4); // slow central spin

    // Yin Half (Black)
    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.arc(0, 0, taijiR, -Math.PI / 2, Math.PI / 2);
    ctx.arc(0, taijiR / 2, taijiR / 2, Math.PI / 2, -Math.PI / 2);
    ctx.arc(0, -taijiR / 2, taijiR / 2, Math.PI / 2, (3 * Math.PI) / 2, true);
    ctx.closePath();
    ctx.fill();

    // Yang Half (Cinnabar / Paper)
    ctx.fillStyle = palette.cinnabar;
    ctx.beginPath();
    ctx.arc(0, 0, taijiR, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.arc(0, -taijiR / 2, taijiR / 2, (3 * Math.PI) / 2, Math.PI / 2);
    ctx.arc(0, taijiR / 2, taijiR / 2, (3 * Math.PI) / 2, Math.PI / 2, true);
    ctx.closePath();
    ctx.fill();

    // Fish Eyes
    ctx.fillStyle = palette.cinnabar;
    ctx.beginPath();
    ctx.arc(0, -taijiR / 2, taijiR * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.carbonBlack;
    ctx.beginPath();
    ctx.arc(0, taijiR / 2, taijiR * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // end taiji

    ctx.restore(); // end mandala
  }

  /**
   * 8. Procedural Classical Cinnabar Seal Stamp (随机风化金石印章与篆刻)
   */
  static drawProceduralSeal(ctx, cx, cy, size = 380, palette, t = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    // Stochastic roughened border for stone-carved authenticity
    const half = size / 2;
    ctx.fillStyle = palette.cinnabar;
    ctx.strokeStyle = palette.cinnabar;
    ctx.lineWidth = 12;

    ctx.beginPath();
    // Rough top edge
    ctx.moveTo(-half, -half);
    for (let x = -half; x <= half; x += 25) {
      ctx.lineTo(x, -half + (Math.sin(x * 0.4) * 4));
    }
    // Rough right edge
    for (let y = -half; y <= half; y += 25) {
      ctx.lineTo(half + (Math.cos(y * 0.35) * 4), y);
    }
    // Rough bottom edge
    for (let x = half; x >= -half; x -= 25) {
      ctx.lineTo(x, half + (Math.sin(x * 0.3) * 4));
    }
    // Rough left edge
    for (let y = half; y >= -half; y -= 25) {
      ctx.lineTo(-half + (Math.cos(y * 0.45) * 4), y);
    }
    ctx.closePath();
    ctx.stroke();

    // Porous red ink seal fill with authentic micro-voids
    ctx.globalAlpha = 0.94;
    ctx.fillRect(-half + 8, -half + 8, size - 16, size - 16);

    // Carved Seal Script Calligraphy in Paper White (白文篆刻)
    ctx.fillStyle = palette.paper;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.floor(size * 0.26)}px "Songti SC", "Noto Serif SC", STSong, serif`;

    // 4-character seal layout: [ 庄 周 ]
    //                         [ 梦 蝶 ]
    ctx.fillText('庄', half * 0.48, -half * 0.45);
    ctx.fillText('周', half * 0.48, half * 0.45);
    ctx.fillText('梦', -half * 0.48, -half * 0.45);
    ctx.fillText('蝶', -half * 0.48, half * 0.45);

    // Outer Calligraphy Inscriptions (南华齐物 · 此之谓物化)
    ctx.fillStyle = palette.carbonBlack;
    ctx.font = `bold ${Math.floor(size * 0.12)}px "Songti SC", "Noto Serif SC", serif`;
    ctx.fillText('此 之 谓 物 化', 0, -half - 55);
    ctx.fillText('南 华 齐 物 论', 0, half + 65);

    // Flying cinnabar butterflies on upper corners
    ProceduralArt.drawProceduralButterfly(ctx, -half - 30, -half - 35, 24, 0.4, palette, t);
    ProceduralArt.drawProceduralButterfly(ctx, half + 30, -half - 35, 24, -0.4, palette, t);

    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.ProceduralArt = ProceduralArt;
}
if (typeof module !== 'undefined') {
  module.exports = { ProceduralArt };
}
