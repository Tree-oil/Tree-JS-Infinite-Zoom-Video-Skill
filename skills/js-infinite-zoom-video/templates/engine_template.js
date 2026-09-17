/**
 * Generic Reusable Infinite Zoom Engine for HTML5 Canvas
 * Part of js-infinite-zoom-video skill
 */

class InfiniteZoomEngine {
  constructor(canvas, sceneDefinitions, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = options.width || 1080;
    this.height = options.height || 1080;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scenes = sceneDefinitions;
    this.textures = {};
    this.loaded = false;

    this.duration = options.duration || 28.05;
    this.currentTime = 0;
    this.isPlaying = false;
    this.playbackRate = 1.0;
    this.lastTimestamp = 0;

    // Callbacks
    this.onTimeUpdate = options.onTimeUpdate || null;
    this.onPlayStateChange = options.onPlayStateChange || null;
  }

  async loadAssets(basePath = 'assets/scenes/') {
    const promises = [];
    const unique = new Set(this.scenes.map(s => s.texture).filter(Boolean));

    for (const name of unique) {
      promises.push(new Promise((resolve) => {
        const img = new Image();
        img.src = `${basePath}${name}.png`;
        img.onload = () => { this.textures[name] = img; resolve(); };
        img.onerror = () => {
          // fallback to jpg
          const fallback = new Image();
          fallback.src = `${basePath}${name}.jpg`;
          fallback.onload = () => { this.textures[name] = fallback; resolve(); };
          fallback.onerror = () => resolve();
        };
      }));
    }

    await Promise.all(promises);
    this.loaded = true;
  }

  getSceneAt(t) {
    t = Math.max(0, Math.min(this.duration, t));
    for (let i = 0; i < this.scenes.length; i++) {
      const s = this.scenes[i];
      if (t >= s.startTime && t <= s.endTime) {
        const duration = s.endTime - s.startTime;
        const progress = (t - s.startTime) / duration;
        return {
          current: s,
          next: this.scenes[i + 1] || s,
          progress: progress,
          index: i
        };
      }
    }
    const last = this.scenes[this.scenes.length - 1];
    return { current: last, next: last, progress: 1.0, index: this.scenes.length - 1 };
  }

  renderFrame(t, targetCtx = this.ctx) {
    const ctx = targetCtx;
    const { current, next, progress } = this.getSceneAt(t);
    const cx = this.width / 2;
    const cy = this.height / 2;
    const outerRadius = 410;
    const portalRadius = current.portal?.radius || 28;

    // Continuous exponential zoom factor (1.0 -> 15.0)
    const zoomScale = Math.pow(15.0, progress);

    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Current Scene inside outer circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
    ctx.clip();

    const currImg = this.textures[current.texture];
    if (currImg) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoomScale, zoomScale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(currImg, 0, 0, this.width, this.height);
      ctx.restore();
    }

    // 2. Draw Next Scene inside central portal
    const childScale = zoomScale / 15.0;
    const currentPortalRadius = portalRadius * zoomScale;
    const nextImg = this.textures[next.texture];

    if (nextImg && currentPortalRadius > 1.5) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, currentPortalRadius, 0, Math.PI * 2);
      ctx.clip();

      ctx.translate(cx, cy);
      ctx.scale(childScale, childScale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(nextImg, 0, 0, this.width, this.height);
      ctx.restore();
    }

    ctx.restore(); // end clip
  }
}

if (typeof module !== 'undefined') {
  module.exports = { InfiniteZoomEngine };
}
