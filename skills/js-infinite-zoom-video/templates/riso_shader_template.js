/**
 * Generic Reusable Risograph Renderer for HTML5 Canvas
 * Part of js-infinite-zoom-video skill
 */

class RisoRenderer {
  constructor(width = 1080, height = 1080, palette = {}) {
    this.width = width;
    this.height = height;

    this.palette = Object.assign({
      paper: '#FAF7EE',
      primary: '#1A73E8',
      cyan: '#00F0FF',
      magenta: '#FF2A6D',
      gold: '#FFB703',
      dark: '#0B132B'
    }, palette);

    this.paperPattern = this.createPaperTexture();
    this.halftonePattern = this.createHalftonePattern();
  }

  createPaperTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = this.palette.paper;
    ctx.fillRect(0, 0, 512, 512);

    const imgData = ctx.getImageData(0, 0, 512, 512);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 12;
      d[i] += n;
      d[i + 1] += n;
      d[i + 2] += n * 0.8;
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  createHalftonePattern(size = 12, dotR = 2.1) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(11, 19, 43, 0.12)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, dotR, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
  }

  drawPaper(ctx) {
    ctx.save();
    ctx.fillStyle = ctx.createPattern(this.paperPattern, 'repeat');
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  drawHalftoneOverlay(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = ctx.createPattern(this.halftonePattern, 'repeat');
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  drawMisregistered(ctx, x, y, radius, strokeColor, fillColor) {
    ctx.save();
    // Cyan plate offset
    if (strokeColor) {
      ctx.strokeStyle = this.palette.cyan;
      ctx.beginPath();
      ctx.arc(x - 1.2, y - 0.8, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = this.palette.magenta;
      ctx.beginPath();
      ctx.arc(x + 1.2, y + 0.8, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = { RisoRenderer };
}
