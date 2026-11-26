/* G9 — The Last Save — Architectural Grey Tech Placeholder Generator & On-Demand Video Player */

const svgCache = new Map();

export function getG9PlaceholderSrc(item) {
  const key = `${item.id}_${item.aspectRatio}_${item.type}`;
  if (svgCache.has(key)) return svgCache.get(key);

  const ratio = item.aspectRatio || 1;
  const w = 640;
  const h = Math.round(w / ratio);
  const code = item.label || `MEM-${String((item.index ?? 0) + 1).padStart(2, '0')}`;
  const kindLabel = item.type === 'video' ? 'VIDEO ARCHIVE STREAM' : 'PHOTO ARCHIVE FRAME';

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g9bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#222a38"/>
      <stop offset="55%" stop-color="#181f2b"/>
      <stop offset="100%" stop-color="#101520"/>
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#a6b5c8" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g9bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <path d="M22 44 V22 H44 M${w - 44} 22 H${w - 22} V44 M22 ${h - 44} V${h - 22} H44 M${w - 44} ${h - 22} H${w - 22} V${h - 44}" fill="none" stroke="#9278ed" stroke-opacity="0.65" stroke-width="2"/>
  <g transform="translate(${w / 2}, ${h / 2 - 12})" fill="none" stroke="#a6b5c8" stroke-opacity="0.5">
    <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" stroke-width="1.3"/>
    <circle r="18" stroke="#9278ed" stroke-opacity="0.7" stroke-width="1.2"/>
    ${item.type === 'video' ? '<polygon points="-6,-9 11,0 -6,9" fill="#dce8f4" fill-opacity="0.75" stroke="none"/>' : '<rect x="-6" y="-6" width="12" height="12" stroke="#dce8f4" stroke-opacity="0.75" stroke-width="1.2"/>'}
  </g>
  <text x="${w / 2}" y="${h / 2 + 66}" text-anchor="middle" fill="#dce8f4" fill-opacity="0.9" font-family="monospace" font-size="22" letter-spacing="3">${code}</text>
  <text x="${w / 2}" y="${h / 2 + 94}" text-anchor="middle" fill="#a6b5c8" fill-opacity="0.68" font-family="monospace" font-size="11" letter-spacing="2">${kindLabel} · PLACEHOLDER</text>
</svg>`.trim();

  const uri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  svgCache.set(key, uri);
  return uri;
}

export function resolveMediaThumb(item) {
  if (!item) return '';
  if (!item.isPlaceholder) {
    if (item.type === 'video' && item.poster) return item.poster;
    if (item.thumb || item.src) return item.thumb || item.src;
  }
  return getG9PlaceholderSrc(item);
}

export function resolveMediaFull(item) {
  if (!item) return '';
  if (!item.isPlaceholder && item.src) return item.src;
  return getG9PlaceholderSrc(item);
}

export function mountG9Video(container, item, { autoplay = false } = {}) {
  container.replaceChildren();

  if (!item.isPlaceholder && item.src) {
    const v = document.createElement('video');
    v.className = 'g9-video-el';
    v.controls = true;
    v.playsInline = true;
    v.preload = 'metadata';
    if (item.poster) v.poster = item.poster;
    v.src = item.src;
    container.appendChild(v);
    if (autoplay) v.play().catch(() => {});
    return {
      destroy() {
        try {
          v.pause();
          v.removeAttribute('src');
          v.load();
        } catch (_) {}
      }
    };
  }

  const wrap = document.createElement('div');
  wrap.className = 'sim-tech-player';
  wrap.innerHTML = `
    <div class="sim-tech-stage">
      <canvas class="sim-tech-canvas" width="640" height="360"></canvas>
      <div class="sim-tech-hud">
        <span class="mono-tag">${item.label} · DATA STREAM PLACEHOLDER</span>
        <strong>${item.originalName}</strong>
      </div>
    </div>
    <div class="sim-tech-controls">
      <button type="button" class="btn-tech-sm sim-play-btn">Play Stream</button>
      <input type="range" class="sim-tech-scrub" min="0" max="100" value="0" aria-label="Seek video timeline">
      <span class="mono-tag sim-tech-time">00:00 / ${item.duration || '00:15'}</span>
      <button type="button" class="btn-tech-sm sim-fs-btn">Fullscreen</button>
    </div>
  `;
  container.appendChild(wrap);

  const canvas = wrap.querySelector('.sim-tech-canvas');
  const ctx = canvas.getContext('2d');
  const playBtn = wrap.querySelector('.sim-play-btn');
  const scrub = wrap.querySelector('.sim-tech-scrub');
  const timeEl = wrap.querySelector('.sim-tech-time');
  const fsBtn = wrap.querySelector('.sim-fs-btn');

  let playing = Boolean(autoplay);
  let pct = 0;
  let rafId = 0;
  let lastTs = 0;
  const totalSec = 15;

  const draw = (t) => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#0c1220';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(146, 120, 237, 0.25)';
    ctx.lineWidth = 1;
    const bars = 24;
    for (let i = 0; i < bars; i++) {
      const bx = 60 + i * 22;
      const amp = 24 + Math.sin(t * 0.004 + i * 0.6 + pct * 0.2) * 32;
      ctx.beginPath();
      ctx.moveTo(bx, h / 2 - amp);
      ctx.lineTo(bx, h / 2 + amp);
      ctx.stroke();
    }

    // Scanline
    const sy = ((t * 0.06) % h);
    ctx.fillStyle = 'rgba(146, 120, 237, 0.16)';
    ctx.fillRect(0, sy, w, 2);
  };

  const loop = (ts) => {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.1, (ts - lastTs) / 1000);
    lastTs = ts;
    if (playing) {
      pct += (dt / totalSec) * 100;
      if (pct >= 100) {
        pct = 100;
        playing = false;
        playBtn.textContent = 'Replay';
      }
      scrub.value = String(Math.round(pct));
      timeEl.textContent = `00:${String(Math.floor((pct / 100) * totalSec)).padStart(2, '0')} / ${item.duration || '00:15'}`;
    }
    draw(ts);
    if (playing) rafId = requestAnimationFrame(loop);
    else rafId = 0;
  };

  draw(0);
  if (playing) {
    playBtn.textContent = 'Pause';
    rafId = requestAnimationFrame(loop);
  }

  playBtn.addEventListener('click', () => {
    if (pct >= 100) pct = 0;
    playing = !playing;
    playBtn.textContent = playing ? 'Pause' : 'Play Stream';
    lastTs = 0;
    if (playing && !rafId) rafId = requestAnimationFrame(loop);
  });

  scrub.addEventListener('input', () => {
    pct = Number(scrub.value);
    timeEl.textContent = `00:${String(Math.floor((pct / 100) * totalSec)).padStart(2, '0')} / ${item.duration || '00:15'}`;
    draw(performance.now());
  });

  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (wrap.requestFullscreen) wrap.requestFullscreen().catch(() => {});
  });

  return {
    destroy() {
      playing = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}
