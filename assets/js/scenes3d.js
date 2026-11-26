/* G9 — The Last Save — 3D Visual Systems:
   1) Ambient Deep-Tech Particle Field
   2) Rotatable 3D G9 Processor / Memory Core Cube
   3) True 3D Vanishing-Point Memory Tunnel (Z-depth traversal)
*/
import { resolveMediaThumb } from './placeholders.js';

export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    localStorage.getItem('g9-reduced-motion') === '1';
}

export function isLowPowerDevice() {
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  return mem <= 2 || cores <= 2;
}

/* ---------------- 1. TECH PARTICLE & DATA NODE CANVAS ---------------- */
export class TechStarfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.rafId = 0;
    this.running = false;
    window.addEventListener('resize', () => this.resize(), { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.pause();
      else this.start();
    });
    this.resize();
    this.initNodes();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  initNodes() {
    const count = isLowPowerDevice() ? 32 : (this.w < 640 ? 48 : 80);
    this.nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: i % 6 === 0 ? 2 : 1.1,
      violet: i % 4 === 0
    }));
  }

  render(t) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    const reduced = isReducedMotion();
    for (const n of this.nodes) {
      if (!reduced) {
        n.x = (n.x + n.vx + this.w) % this.w;
        n.y = (n.y + n.vy + this.h) % this.h;
      }
      ctx.fillStyle = n.violet
        ? 'rgba(146, 120, 237, 0.48)'
        : 'rgba(220, 232, 244, 0.38)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  start() {
    if (this.running) return;
    if (isReducedMotion()) {
      this.render(0);
      return;
    }
    this.running = true;
    const loop = (t) => {
      if (!this.running) return;
      this.render(t);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  pause() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }
}

/* ---------------- 2. ROTATABLE 3D G9 MEMORY CORE CUBE ---------------- */
export function mountProcessorCore(container, { interactive = true, onTapCore = null, onLongPressCore = null } = {}) {
  container.replaceChildren();

  const stage = document.createElement('div');
  stage.className = 'core-3d-stage';
  stage.innerHTML = `
    <div class="core-holo-ring core-ring-1"></div>
    <div class="core-holo-ring core-ring-2"></div>
    <div class="core-cube-wrap" id="core-cube-wrap" ${interactive ? 'role="button" tabindex="0" aria-label="G9 3D Processor Core — drag to rotate, tap to extract memory"' : ''}>
      <div class="core-cube" id="core-cube">
        <div class="cube-face face-front"><span class="chip-circuit"></span><strong>G9</strong><small>CORE</small></div>
        <div class="cube-face face-back"><span class="chip-circuit"></span><strong>2026</strong><small>SAVE</small></div>
        <div class="cube-face face-right"><span class="chip-circuit"></span><strong>SE</strong><small>ARCHIVE</small></div>
        <div class="cube-face face-left"><span class="chip-circuit"></span><strong>0xG9</strong><small>MEM</small></div>
        <div class="cube-face face-top"><span class="chip-circuit"></span><strong>SYS</strong></div>
        <div class="cube-face face-bottom"><span class="chip-circuit"></span><strong>LOCK</strong></div>
      </div>
      <div class="core-inner-glow"></div>
    </div>
    <div class="core-contact-shadow"></div>
  `;
  container.appendChild(stage);

  const cube = stage.querySelector('#core-cube');
  const wrap = stage.querySelector('#core-cube-wrap');
  let rx = -18;
  let ry = 28;
  let velY = 0.25;
  let dragging = false;
  let moved = false;
  let sx = 0;
  let sy = 0;
  let pressTimer = 0;
  let longFired = false;
  let rafId = 0;
  let destroyed = false;

  if (interactive) {
    wrap.addEventListener('pointerdown', (e) => {
      dragging = true;
      moved = false;
      longFired = false;
      sx = e.clientX;
      sy = e.clientY;
      wrap.setPointerCapture(e.pointerId);
      if (onLongPressCore) {
        pressTimer = setTimeout(() => {
          longFired = true;
          onLongPressCore();
        }, 900);
      }
    });

    wrap.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        moved = true;
        clearTimeout(pressTimer);
      }
      ry += dx * 0.55;
      rx = Math.max(-75, Math.min(75, rx - dy * 0.45));
      velY = dx * 0.12;
      sx = e.clientX;
      sy = e.clientY;
    });

    wrap.addEventListener('pointerup', () => {
      dragging = false;
      clearTimeout(pressTimer);
      if (!moved && !longFired && onTapCore) {
        onTapCore();
      }
    });

    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onTapCore) onTapCore();
      }
    });
  }

  const loop = () => {
    if (destroyed) return;
    const reduced = isReducedMotion();
    if (!dragging && !reduced) {
      ry += velY;
      velY = velY * 0.94 + 0.25 * 0.06;
    }
    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (!reduced && !document.hidden) {
      rafId = requestAnimationFrame(loop);
    }
  };
  rafId = requestAnimationFrame(loop);

  return {
    destroy() {
      destroyed = true;
      clearTimeout(pressTimer);
      if (rafId) cancelAnimationFrame(rafId);
    }
  };
}

/* ---------------- 3. TRUE 3D VANISHING-POINT MEMORY TUNNEL ---------------- */
export function mountMemoryTunnel(container, mediaList, seenSet, { onSelectMedia }) {
  container.replaceChildren();

  const shell = document.createElement('div');
  shell.className = 'tunnel-shell';
  shell.innerHTML = `
    <div class="tunnel-hud-top">
      <span class="mono-tag">DEPTH Z-TRAVERSAL · DRAG UP/DOWN OR USE CONTROLS</span>
      <span class="mono-tag" id="tunnel-depth-readout">DEPTH: 000m</span>
    </div>
    <div class="tunnel-viewport" id="tunnel-viewport">
      <div class="tunnel-vanishing-glow"></div>
      <div class="tunnel-grid-lines"></div>
      <div class="tunnel-cards-layer" id="tunnel-cards-layer"></div>
    </div>
    <div class="tunnel-controls">
      <button type="button" class="btn-tech-outline" id="tunnel-back-btn">← Retreat</button>
      <input type="range" class="tunnel-slider" id="tunnel-slider" min="0" max="${(mediaList.length - 1) * 100}" value="0" aria-label="Travel along memory tunnel">
      <button type="button" class="btn-tech-outline" id="tunnel-fwd-btn">Advance →</button>
    </div>
  `;
  container.appendChild(shell);

  const viewport = shell.querySelector('#tunnel-viewport');
  const layer = shell.querySelector('#tunnel-cards-layer');
  const slider = shell.querySelector('#tunnel-slider');
  const readout = shell.querySelector('#tunnel-depth-readout');

  const spacing = 280;
  let cameraZ = 0;
  let targetZ = 0;
  let dragging = false;
  let moved = false;
  let lastY = 0;
  let rafId = 0;
  let destroyed = false;

  const cards = mediaList.map((item, idx) => {
    const side = idx % 2 === 0 ? -1 : 1;
    const laneX = side * (95 + (idx % 3) * 42);
    const laneY = ((idx % 4) - 1.5) * 44;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tunnel-node ${seenSet.has(item.id) ? 'is-seen' : ''}`;
    btn.innerHTML = `
      <span class="tunnel-node-frame">
        <img loading="lazy" src="${resolveMediaThumb(item)}" alt="${item.label}">
        <span class="tunnel-node-meta">
          <strong>${item.label}</strong>
          <span>${item.type === 'video' ? 'VIDEO' : 'PHOTO'}</span>
        </span>
      </span>
    `;
    btn.addEventListener('click', () => {
      if (moved) return;
      onSelectMedia(item);
    });
    layer.appendChild(btn);
    return { btn, laneX, laneY, baseZ: idx * spacing };
  });

  const maxZ = Math.max(0, (mediaList.length - 1) * spacing);

  const updateSlider = () => {
    const clamped = Math.max(0, Math.min(maxZ, targetZ));
    targetZ = clamped;
    slider.value = String(Math.round((clamped / spacing) * 100));
    readout.textContent = `DEPTH: ${String(Math.round(clamped / 10)).padStart(3, '0')}m`;
  };

  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    moved = false;
    lastY = e.clientY;
  });

  const onMove = (e) => {
    if (!dragging) return;
    const dy = e.clientY - lastY;
    if (Math.abs(dy) > 4) moved = true;
    targetZ += dy * 3.2;
    lastY = e.clientY;
    updateSlider();
  };

  const onUp = () => {
    dragging = false;
    setTimeout(() => { moved = false; }, 40);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetZ += e.deltaY * 1.4;
    updateSlider();
  }, { passive: false });

  slider.addEventListener('input', () => {
    targetZ = (Number(slider.value) / 100) * spacing;
    readout.textContent = `DEPTH: ${String(Math.round(targetZ / 10)).padStart(3, '0')}m`;
  });

  shell.querySelector('#tunnel-back-btn').addEventListener('click', () => {
    targetZ -= spacing;
    updateSlider();
  });
  shell.querySelector('#tunnel-fwd-btn').addEventListener('click', () => {
    targetZ += spacing;
    updateSlider();
  });

  const render = () => {
    if (destroyed) return;
    cameraZ += (targetZ - cameraZ) * 0.14;
    const fov = 420;

    cards.forEach((c) => {
      const relZ = c.baseZ - cameraZ;
      if (relZ < -180 || relZ > 1500) {
        c.btn.style.display = 'none';
        return;
      }
      c.btn.style.display = 'block';
      const scale = Math.max(0.18, fov / (fov + relZ));
      const sx = c.laneX * scale;
      const sy = c.laneY * scale;
      const opacity = relZ < 0
        ? Math.max(0, 1 + relZ / 160)
        : Math.max(0, 1 - relZ / 1450);

      c.btn.style.zIndex = String(Math.round(2000 - relZ));
      c.btn.style.opacity = String(opacity);
      c.btn.style.transform = `translate(-50%, -50%) translate3d(${sx}px, ${sy}px, 0) scale(${scale})`;
    });

    if (!isReducedMotion() && !document.hidden) {
      rafId = requestAnimationFrame(render);
    } else {
      setTimeout(() => { if (!destroyed) rafId = requestAnimationFrame(render); }, 80);
    }
  };

  rafId = requestAnimationFrame(render);

  return {
    destroy() {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
  };
}
