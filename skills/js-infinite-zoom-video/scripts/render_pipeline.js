#!/usr/bin/env node
/**
 * Headless Chrome + FFmpeg Offline Video Rendering Pipeline
 * Part of js-infinite-zoom-video skill
 *
 * Usage:
 *   node render_pipeline.js [--html index.html] [--out dist/output.mp4] [--fps 24] [--duration 28.05] [--audio assets/audio.mp3]
 */

const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : def;
};

const HTML_FILE = path.resolve(process.cwd(), getArg('--html', 'index.html'));
const OUT_FILE = path.resolve(process.cwd(), getArg('--out', 'dist/output.mp4'));
const AUDIO_FILE = path.resolve(process.cwd(), getArg('--audio', 'assets/audio.mp3'));
const FPS = parseInt(getArg('--fps', '24'), 10);
const DURATION = parseFloat(getArg('--duration', '28.05'));
const PORT = parseInt(getArg('--port', '8099'), 10);
const TOTAL_FRAMES = Math.floor(DURATION * FPS);

// Find Chrome on host system
function getChromePath() {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(macChrome)) return macChrome;
  const linuxChrome = '/usr/bin/google-chrome';
  if (fs.existsSync(linuxChrome)) return linuxChrome;
  throw new Error('Google Chrome binary not found.');
}

function startStaticServer(baseDir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      let filePath = path.join(baseDir, reqPath === '/' ? 'index.html' : reqPath);
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      const mime = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.mp3': 'audio/mpeg'
      }[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': mime, 'Access-Control-Allow-Origin': '*' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => resolve(server));
  });
}

(async () => {
  const baseDir = path.dirname(HTML_FILE);
  const outDir = path.dirname(OUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🎬 Infinite Zoom Headless Video Exporter`);
  console.log(`🎯 Canvas: 1080x1080 | FPS: ${FPS} | Duration: ${DURATION}s (${TOTAL_FRAMES} frames)`);
  console.log(`======================================================\n`);

  const server = await startStaticServer(baseDir, PORT);
  console.log(`[1/4] HTTP Static Server running at http://localhost:${PORT}/`);

  console.log(`[2/4] Launching Headless Chrome...`);
  const browser = await puppeteer.launch({
    executablePath: getChromePath(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  await page.waitForFunction(() => window.__engine && window.__engine.sceneManager?.loaded);
  console.log(`[3/4] JavaScript Scene Engine initialized & ready!`);

  const canvas = await page.$('#renderCanvas');

  console.log(`[4/4] Starting FFmpeg H.264 pipe...`);
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(FPS),
    '-i', '-',
    ...(fs.existsSync(AUDIO_FILE) ? ['-i', AUDIO_FILE] : []),
    '-vf', 'scale=1080:1080:flags=lanczos',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    OUT_FILE
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs);
  const startTime = Date.now();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const t = i / FPS;

    await page.evaluate((timestamp) => {
      window.__engine.renderFrame(timestamp);
    }, t);

    const buffer = await canvas.screenshot({ type: 'png' });
    ffmpeg.stdin.write(buffer);

    if (i % 24 === 0 || i === TOTAL_FRAMES - 1) {
      const pct = ((i / TOTAL_FRAMES) * 100).toFixed(1);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r⏳ Exporting: ${i}/${TOTAL_FRAMES} frames (${pct}%) | ${t.toFixed(1)}s / ${DURATION}s | Elapsed: ${elapsed}s`);
    }
  }

  process.stdout.write('\n\nFinalizing video...\n');
  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  await browser.close();
  server.close();

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const sizeMb = (fs.statSync(OUT_FILE).size / (1024 * 1024)).toFixed(2);

  console.log(`\n🎉 Render Complete!`);
  console.log(`📁 File: ${OUT_FILE} (${sizeMb} MB)`);
  console.log(`⏱️ Time: ${totalTime}s\n`);
})();
