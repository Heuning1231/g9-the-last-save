import { TechAudio } from './audio.js';
import {
  resolveMediaThumb,
  resolveMediaFull,
  mountG9Video
} from './placeholders.js';
import {
  exportG9PassPNG,
  exportG9BlessingPNG,
  exportFinalCommitPNG
} from './cards.js?v=destiny3';
import {
  TechStarfield,
  mountProcessorCore,
  mountMemoryTunnel,
  isReducedMotion
} from './scenes3d.js';


// Mount the exact matching scene CSS from the same module, independent of cached HTML.
const sceneStyle=document.createElement('style');sceneStyle.id='g9-scene-style';sceneStyle.textContent="\n/* Last Save final hub and open memory field */\n.final-hub{max-width:640px;margin:0 auto}.g9-node-map{position:relative;width:min(100%,480px);height:350px;margin:12px auto 20px;isolation:isolate;background:radial-gradient(ellipse at center,#6960ca23,transparent 70%)}.g9-node-map>svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 0 8px #8178ee88);pointer-events:none}.map-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-5deg);width:90px;height:90px;display:grid;place-content:center;border:1px solid #a1b7e6;background:linear-gradient(145deg,#62789e,#18263f 40%,#242047);box-shadow:0 0 40px #7972ed55,inset 0 0 14px #c0d2f229;font:bold 29px monospace;color:#f2f5ff;clip-path:polygon(16% 0,84% 0,100% 16%,100% 84%,84% 100%,16% 100%,0 84%,0 16%)}.map-core small{font:9px monospace;color:#92e0d3;letter-spacing:.15em}.map-node{position:absolute;transform:translate(-50%,-50%);width:43%;max-width:170px;min-height:105px;padding:10px 5px;border:1px solid #8799cd88;clip-path:polygon(8% 0,92% 0,100% 12%,100% 88%,92% 100%,8% 100%,0 88%,0 12%);background:linear-gradient(135deg,#263c5a,#181b36);color:#e7efff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;box-shadow:inset 0 0 20px #8a85ff22}.map-node i{font:10px monospace;color:#ac9bff}.map-node strong{font-size:14px;line-height:1.25}.map-node small{font:8px monospace;color:#b6c8e5;letter-spacing:.06em}.map-node:hover,.map-node:focus-visible{background:linear-gradient(135deg,#35476d,#443779);outline:2px solid #a897ff}.map-node.n1{left:24%;top:23%}.map-node.n2{left:76%;top:23%}.map-node.n3{left:24%;top:80%}.map-node.n4{left:76%;top:80%}.free-field{position:relative;height:clamp(330px,58svh,560px);overflow:hidden;touch-action:none;cursor:grab;user-select:none;background:radial-gradient(ellipse at center,#35326655,transparent 75%),linear-gradient(#5c77b018 1px,transparent 1px),linear-gradient(90deg,#5c77b018 1px,transparent 1px),#0c1427;background-size:auto,40px 40px,40px 40px;border:1px solid #51688c;border-radius:12px;box-shadow:inset 0 0 45px #040813}.free-field:active{cursor:grabbing}.free-field #free-layer{position:absolute;inset:0}.data-memory{position:absolute;left:0;top:0;width:132px;padding:5px 5px 9px;background:linear-gradient(145deg,#324561,#121e35);border:1px solid #91abd0a0;box-shadow:0 12px 22px #030712a0,0 0 12px #8e7ee533;will-change:transform;color:#e2edff;cursor:pointer}.data-memory img{width:100%;aspect-ratio:1.12;object-fit:cover;display:block;pointer-events:none;-webkit-user-drag:none}.data-memory span,.data-grid-card span{display:block;font:9px monospace;padding-top:6px;letter-spacing:.05em}.all-data-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:16px}.all-data-grid.hidden{display:none}.data-grid-card{padding:4px;background:#17243c;border:1px solid #55678b;color:#e2edff}.data-grid-card img{width:100%;aspect-ratio:1;object-fit:cover;display:block}@media(max-width:380px){.g9-node-map{height:300px}.map-node{min-height:89px}.map-node strong{font-size:12px}.map-core{width:70px;height:70px;font-size:22px}}\n.g9-node-map{height:clamp(300px,47svh,400px);max-width:440px}.g9-node-map .map-node{position:absolute;display:flex;font-family:system-ui,sans-serif;font-size:14px;line-height:1.25;min-height:98px;padding:12px 6px;z-index:2;clip-path:none;border-radius:12px;background:linear-gradient(145deg,#334866,#151d32 65%,#27234c);box-shadow:0 8px 25px #05081399,inset 0 1px #a6b5c844,0 0 16px #8275ed33}.map-node strong{font-size:clamp(13px,3.6vw,17px)}.g9-node-map .map-core{z-index:1}.g9-node-map>svg{z-index:0}.final-hub .hub-hero{padding-top:12px}.final-hub .hud-progress-panel{margin-bottom:10px}.g9-node-map .map-node:active{filter:brightness(1.3)}.map-node small{font-size:9px}.data-memory{font-family:monospace}\n\n/* G9 technical media stream */\n.stream-shell{width:min(100%,860px);margin:auto;box-sizing:border-box;padding-inline:clamp(12px,3vw,28px)}.stream-heading{text-align:center;margin:14px 0 18px}.stream-heading h1{font-size:clamp(30px,6vw,52px);margin:6px 0}.stream-console{padding:10px;border:1px solid #526b99;border-radius:10px;background:linear-gradient(145deg,#202f48,#0b1324 55%,#1d1c38);box-shadow:0 16px 50px #0005,0 0 25px #7770ea17}.stream-status,.stream-rail-heading{display:flex;justify-content:space-between;gap:8px;font:10px/1.5 monospace;letter-spacing:.08em;color:#a7bde0;padding:6px 3px}.stream-status span:first-child{color:#8ce0d8}.stream-screen{position:relative;display:grid;place-items:center;height:clamp(230px,43svh,440px);overflow:hidden;background:repeating-linear-gradient(0deg,#93a9e009 0 1px,transparent 1px 20px),radial-gradient(ellipse,#263452,#070c17 80%);border:1px solid #3c537b;cursor:pointer;touch-action:pan-y}.stream-screen>img{max-width:100%;max-height:100%;width:100%;height:100%;min-height:0;object-fit:contain;display:block}.stream-corner{position:absolute;width:22px;height:22px;border:2px solid #acbfff;pointer-events:none}.stream-corner.tl{top:7px;left:7px;border-right:0;border-bottom:0}.stream-corner.tr{top:7px;right:7px;border-left:0;border-bottom:0}.stream-corner.bl{bottom:7px;left:7px;border-top:0;border-right:0}.stream-corner.br{bottom:7px;right:7px;border-top:0;border-left:0}.stream-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58px;height:58px;display:grid;place-items:center;border:1px solid #b4aaff;border-radius:50%;background:#0c1429cc;box-shadow:0 0 25px #9a86ff88;color:#ebe8ff;font-size:21px}.stream-scan{position:absolute;inset:0;pointer-events:none;background:linear-gradient(transparent 47%,#a7d8ff88 50%,transparent 53%);transform:translateY(-100%)}.scanning .stream-scan{animation:streamSweep .65s ease-out forwards}@keyframes streamSweep{to{transform:translateY(100%)}}.scanning>img{animation:recordReveal .35s ease-out}@keyframes recordReveal{from{opacity:.3;filter:brightness(1.6)}to{opacity:1;filter:none}}.stream-info,.stream-nav{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 3px}.stream-info strong,.stream-info small{display:block;font-family:monospace}.stream-info small{font-size:10px;color:#9cb0ce;margin-top:4px}.stream-nav{border-top:1px solid #43577655;padding-bottom:2px;font:12px monospace}.stream-nav button{font-size:11px;min-width:80px}.stream-rail-heading{margin-top:20px}.stream-rail{position:relative;display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x proximity;padding:10px 3px 16px;scrollbar-color:#7266c8 #111d30;overscroll-behavior-inline:contain}.stream-card{flex:0 0 100px;min-width:0;scroll-snap-align:center;border:1px solid #465a80;background:#111d30;color:#b8c7e0;padding:4px;border-radius:5px;opacity:.65;transition:opacity .2s,border-color .2s,transform .2s}.stream-card.active{opacity:1;border-color:#af9cff;box-shadow:0 0 12px #9178ef66;transform:translateY(-4px)}.stream-card img{display:block;width:100%;height:68px;object-fit:cover}.stream-card span{display:block;padding:7px 2px 3px;font:10px monospace;white-space:nowrap}.stream-shell .action-row{margin-top:14px}.stream-shell .all-data-grid{grid-template-columns:repeat(auto-fit,minmax(90px,1fr))}.stream-shell .data-grid-card img{aspect-ratio:1.3}.g9-modal-box{animation:recordReveal .3s ease-out}.stream-shell button:focus-visible{outline:2px solid #b3a8ff;outline-offset:2px}@media(max-width:420px){.stream-status,.stream-rail-heading{font-size:9px;letter-spacing:0}.stream-info .btn-tech-primary{font-size:12px;padding:10px}.stream-card{flex-basis:85px}.stream-card img{height:58px}}\n\n";document.head.appendChild(sceneStyle);
sceneStyle.textContent += ".g9-node-map{background:radial-gradient(ellipse at center,#6654bd38,transparent 70%),linear-gradient(#7193d00b 1px,transparent 1px),linear-gradient(90deg,#7193d00b 1px,transparent 1px);background-size:auto,26px 26px,26px 26px}.g9-node-map .data-pulse{stroke:#c4b6ff;stroke-width:2.5;stroke-dasharray:9 125;animation:g9DataFlow 2.7s linear infinite;filter:drop-shadow(0 0 4px #b3a0ff)}.g9-node-map .data-pulse:nth-of-type(2){animation-delay:-.7s}.g9-node-map .data-pulse:nth-of-type(3){animation-delay:-1.4s}.g9-node-map .data-pulse:nth-of-type(4){animation-delay:-2.1s}.g9-orbit{transform-origin:180px 175px;animation:g9Orbit 15s linear infinite}.g9-orbit.inner{animation-direction:reverse;animation-duration:9s}.g9-node-map .map-core{animation:g9CorePulse 3s ease-in-out infinite;transform-style:preserve-3d}.g9-node-map .map-node{animation:g9NodeEnter .65s cubic-bezier(.2,.8,.2,1) both;transition:filter .2s,box-shadow .2s,border-color .2s}.g9-node-map .n2{animation-delay:.12s}.g9-node-map .n3{animation-delay:.24s}.g9-node-map .n4{animation-delay:.36s}.g9-node-map .map-node:hover,.g9-node-map .map-node.is-transmitting{border-color:#d1c6ff;box-shadow:0 0 28px #9c87ff88,inset 0 0 20px #9a86ff33;filter:brightness(1.2)}.g9-node-map.is-transmitting .data-pulse{animation-duration:.45s}.g9-node-map.is-transmitting .map-core{filter:brightness(1.5)}.g9-scene-enter{animation:g9SceneEnter .42s ease-out both}@keyframes g9DataFlow{to{stroke-dashoffset:-134}}@keyframes g9Orbit{to{transform:rotate(360deg)}}@keyframes g9CorePulse{0%,100%{transform:translate(-50%,-50%) rotate(-5deg);filter:drop-shadow(0 0 8px #9278ed66)}50%{transform:translate(-50%,-50%) rotate(5deg) scale(1.04);filter:drop-shadow(0 0 20px #b2a0ffaa)}}@keyframes g9NodeEnter{from{opacity:0;transform:translate(-50%,-44%) scale(.88)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes g9SceneEnter{from{opacity:.2;filter:brightness(1.35);transform:translateY(5px)}to{opacity:1;filter:none;transform:none}}@media(prefers-reduced-motion:reduce){.g9-node-map *,.g9-scene-enter{animation:none!important}}";
const $ = (id) => document.getElementById(id);

const SVG_ICONS = {
  chip: `<svg viewBox="0 0 36 36" class="svg-glyph" aria-hidden="true"><rect x="9" y="9" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="13" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M14 4V9M22 4V9M14 27V32M22 27V32M4 14H9M4 22H9M27 14H32M27 22H32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  soundOn: `<svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><path d="M4 9H8L13 4V20L8 15H4V9Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M16.5 8.5C17.8 9.8 17.8 14.2 16.5 15.5M19 6C21.5 9 21.5 15 19 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  soundOff: `<svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><path d="M4 9H8L13 4V20L8 15H4V9Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 9L21 15M21 9L17 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  signal: `<svg viewBox="0 0 36 36" class="svg-glyph" aria-hidden="true"><polygon points="18,4 32,18 18,32 4,18" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="18" r="4.5" fill="currentColor"/></svg>`
};

class G9ArchiveApp {
  constructor() {
    this.config = null;
    this.mediaList = [];
    this.audio = new TechAudio();
    this.starfield = null;
    this.activeCleanup = [];
    this.activeVideoCtrl = null;
    this.cineTimer = null;

    this.state = {
      admitted: false,
      booted: false,
      seenIds: [],
      drawnBlessings: [],
      blessingHistory: [],
      signalTaps: 0,
      eggsUnlocked: [],
      passId: 'G9-2026-8F4A',
      reducedMotionPref: false
    };

    this.fieldIndex = 0;
    this.fieldOrder = [];
    this.cmdHistory = [];
    this.cmdHistoryIdx = -1;
  }

  async init() {
    this.starfield = new TechStarfield($('bg-tech'));
    this.starfield.start();

    try {
      const [cfgRes, medRes] = await Promise.all([
        fetch('./config.json'),
        fetch('./media.json')
      ]);
      this.config = await cfgRes.json();
      const medJson = await medRes.json();
      this.mediaList = medJson.media || [];
      this.fieldOrder = this.mediaList.map((_, i) => i);
    } catch (err) {
      $('app').innerHTML = `
        <section class="tech-shell">
          <div class="tech-panel">
            <span class="mono-tag">ARCHIVE RECOVERY ERROR</span>
            <h1>G9 — THE LAST SAVE</h1>
            <p class="muted">Please serve this folder via a local HTTP server or GitHub Pages to load config.json and media.json.</p>
          </div>
        </section>`;
      return;
    }

    this.loadState();
    this.bindChrome();
    this.syncControls();

    if (this.state.admitted && this.state.booted) {
      this.renderHub('core');
    } else if (this.state.admitted) {
      this.renderSystemBoot();
    } else {
      this.renderSystemBoot();
    }
  }

  loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem('g9-v4-state') || 'null');
      if (saved && typeof saved === 'object') {
        Object.assign(this.state, saved);
      }
      if (!this.state.passId) {
        this.state.passId = `G9-2026-${Math.floor(1000 + Math.random() * 8999)}`;
      }
      if (localStorage.getItem('g9-reduced-motion') === '1') {
        this.state.reducedMotionPref = true;
        document.documentElement.classList.add('reduced-motion');
      }
    } catch (_) {}
  }

  saveState() {
    try {
      localStorage.setItem('g9-v4-state', JSON.stringify(this.state));
    } catch (_) {}
  }

  bindChrome() {
    $('btn-hub').addEventListener('click', () => {
      this.audio.playScan(680, 0.16);
      this.renderHub('core');
    });
    $('btn-sound').addEventListener('click', () => {
      this.audio.toggleMute();
      this.syncControls();
    });
    $('btn-motion').addEventListener('click', () => {
      this.state.reducedMotionPref = !this.state.reducedMotionPref;
      try {
        localStorage.setItem('g9-reduced-motion', this.state.reducedMotionPref ? '1' : '0');
      } catch (_) {}
      document.documentElement.classList.toggle('reduced-motion', this.state.reducedMotionPref);
      this.starfield.pause();
      this.starfield.start();
      this.syncControls();
    });
    $('btn-replay-terminal').addEventListener('click', () => {
      this.state.admitted = false;
      this.state.booted = false;
      this.saveState();
      this.renderAdmissionTerminal();
    });
    $('modal-close').addEventListener('click', () => this.closeModal());
    $('media-modal').addEventListener('click', (e) => {
      if (e.target === $('media-modal')) this.closeModal();
    });
    $('egg-close').addEventListener('click', () => $('egg-toast').classList.add('hidden'));
  }

  syncControls() {
    const sBtn = $('btn-sound');
    sBtn.innerHTML = this.audio.muted
      ? `${SVG_ICONS.soundOff}<span>Audio Off</span>`
      : `${SVG_ICONS.soundOn}<span>Audio On</span>`;
    sBtn.setAttribute('aria-pressed', String(!this.audio.muted));

    const mBtn = $('btn-motion');
    mBtn.textContent = this.state.reducedMotionPref ? 'Motion: Reduced' : 'Motion: Full';
    mBtn.setAttribute('aria-pressed', String(this.state.reducedMotionPref));

    const prog = $('hud-progress-pill');
    if (prog) {
      prog.textContent = `ARCHIVE: ${this.state.seenIds.length} / ${this.mediaList.length}`;
    }
  }

  clearScene() {
    this.activeCleanup.forEach((fn) => {
      try { fn(); } catch (_) {}
    });
    this.activeCleanup = [];
    if (this.activeVideoCtrl) {
      this.activeVideoCtrl.destroy();
      this.activeVideoCtrl = null;
    }
    if (this.cineTimer) {
      clearInterval(this.cineTimer);
      this.cineTimer = null;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  setChromeVisible(visible) {
    $('top-bar').classList.toggle('is-hidden', !visible);
  }

  markSeen(item) {
    if (!item) return;
    if (!this.state.seenIds.includes(item.id)) {
      this.state.seenIds.push(item.id);
      this.saveState();
      this.syncControls();
    }
  }

  triggerEgg(id, title, detail) {
    if (!this.state.eggsUnlocked.includes(id)) {
      this.state.eggsUnlocked.push(id);
      this.saveState();
    }
    this.audio.playDataUnlock();
    $('egg-title').textContent = title;
    $('egg-body').textContent = detail;
    $('egg-count').textContent = `SYSTEM SECRET UNLOCKED (${this.state.eggsUnlocked.length} / 3)`;
    $('egg-toast').classList.remove('hidden');
  }

  /* ---------------- MODAL: UNIFIED PHOTO & VIDEO VIEWER ---------------- */
  openMediaModal(item) {
    if (!item) return;
    this.markSeen(item);
    const modal = $('media-modal');
    const stage = $('modal-stage');
    stage.replaceChildren();

    const idx = this.mediaList.findIndex((m) => m.id === item.id);
    const box = document.createElement('div');
    box.className = 'g9-modal-box';

    const mediaSlot = document.createElement('div');
    mediaSlot.className = 'g9-modal-media-slot';

    if (item.type === 'video') {
      this.activeVideoCtrl = mountG9Video(mediaSlot, item, { autoplay: false });
    } else {
      const img = document.createElement('img');
      img.src = resolveMediaFull(item);
      img.alt = item.label;
      img.className = 'g9-modal-img';
      mediaSlot.appendChild(img);
    }

    const footer = document.createElement('div');
    footer.className = 'g9-modal-footer';
    footer.innerHTML = `
      <div class="g9-modal-meta">
        <span class="mono-tag">${item.label} · ${item.type.toUpperCase()}</span>
        <span class="muted">${item.originalName}</span>
      </div>
      <div class="action-row">
        <button type="button" class="btn-tech-outline" id="modal-prev-btn">← Prev</button>
        <button type="button" class="btn-tech-outline" id="modal-next-btn">Next →</button>
      </div>
    `;

    box.append(mediaSlot, footer);
    stage.appendChild(box);
    modal.classList.remove('hidden');

    $('modal-prev-btn').addEventListener('click', () => {
      if (this.activeVideoCtrl) { this.activeVideoCtrl.destroy(); this.activeVideoCtrl = null; }
      const nextIdx = (idx - 1 + this.mediaList.length) % this.mediaList.length;
      this.openMediaModal(this.mediaList[nextIdx]);
    });
    $('modal-next-btn').addEventListener('click', () => {
      if (this.activeVideoCtrl) { this.activeVideoCtrl.destroy(); this.activeVideoCtrl = null; }
      const nextIdx = (idx + 1) % this.mediaList.length;
      this.openMediaModal(this.mediaList[nextIdx]);
    });
  }

  closeModal() {
    if (this.activeVideoCtrl) {
      this.activeVideoCtrl.destroy();
      this.activeVideoCtrl = null;
    }
    $('media-modal').classList.add('hidden');
    $('modal-stage').replaceChildren();
    // Re-sync HUD if on hub
    const hudCount = $('archive-progress-count');
    if (hudCount) this.updateHudDom();
  }

  /* ---------------- SCENE 00: DIGITAL ADMISSION TERMINAL ---------------- */
  renderAdmissionTerminal() {
    this.clearScene();
    this.setChromeVisible(false);

    $('app').innerHTML = `
      <section class="tech-shell scene-terminal">
        <div class="terminal-topbar">
          <span class="mono-tag">SCENE 00 // DIGITAL ADMISSION TERMINAL</span>
          <button type="button" class="btn-tech-sm" id="skip-terminal-btn">Skip Intro</button>
        </div>

        <div class="g9-terminal-stage" id="g9-terminal-stage">
          <div class="g9-terminal-chassis">
            <div class="chassis-bevel-bar">
              <span>TITANIUM TERMINAL // REV-2026</span>
              <span class="status-led" id="term-led"></span>
            </div>

            <div class="terminal-glass-screen">
              <div class="holo-scanline"></div>
              <pre class="terminal-log" id="terminal-log">&gt; Awaiting link...</pre>
              <div class="terminal-meter"><span id="terminal-meter-fill"></span></div>
            </div>

            <div class="terminal-seam"></div>

            <div class="terminal-slot-bay">
              <div class="terminal-slot-lip"></div>
              <div class="pass-extrude-mask">
                <div class="tech-pass-ticket" id="tech-pass-ticket" role="button" tabindex="0" aria-label="Swipe up or click to collect G9 access pass">
                  <div class="tech-pass-scan"></div>
                  <div class="pass-head-row">
                    <span>G9 // THE LAST SAVE</span>
                    <span>2024 — 2026</span>
                  </div>
                  <div class="pass-main">
                    <span class="mono-tag">WELCOME TO THE GRADUATION ARCHIVE</span>
                    <h2>Software Engineering</h2>
                    <div class="pass-specs">
                      <span>ENTRY TYPE: SHARED ACCESS</span>
                      <span>SYSTEM: GRADUATION ARCHIVE</span>
                      <span>ACCESS: GRANTED</span>
                    </div>
                  </div>
                  <div class="pass-perf"></div>
                  <div class="pass-foot">Some memories never log out.</div>
                </div>
              </div>
            </div>

            <div class="terminal-contact-shadow"></div>
          </div>

          <div class="pass-collect-controls is-waiting" id="pass-collect-controls">
            <p class="muted">Swipe up on the access pass or select below</p>
            <button type="button" class="btn-tech-primary" id="collect-pass-btn">Collect Access Pass</button>
          </div>
        </div>
      </section>
    `;

    const stage = $('g9-terminal-stage');
    const logEl = $('terminal-log');
    const fillEl = $('terminal-meter-fill');
    const passEl = $('tech-pass-ticket');
    const controls = $('pass-collect-controls');
    const reduced = isReducedMotion();
    let ready = false;
    let collected = false;
    const timers = [];

    const lines = [
      '> Establishing connection...',
      '> Graduation archive connected.',
      '> Generating admission pass...',
      '> Printing ticket...',
      '> Access granted.'
    ];

    const setStep = (count, pct) => {
      if (logEl) logEl.textContent = lines.slice(0, count).join('\n');
      if (fillEl) fillEl.style.width = `${pct}%`;
    };

    if (reduced) {
      stage.classList.add('is-linked', 'is-printing', 'is-printed');
      setStep(5, 100);
      controls.classList.remove('is-waiting');
      ready = true;
    } else {
      timers.push(setTimeout(() => {
        stage.classList.add('is-linked');
        this.audio.playScan(540, 0.18);
        setStep(1, 20);
      }, 450));

      timers.push(setTimeout(() => {
        this.audio.playPrintTick(1);
        setStep(2, 42);
      }, 1300));

      timers.push(setTimeout(() => {
        stage.classList.add('is-printing');
        this.audio.playPrintTick(2);
        setStep(3, 68);
      }, 2200));

      timers.push(setTimeout(() => {
        this.audio.playPrintTick(3);
        setStep(4, 88);
      }, 3300));

      timers.push(setTimeout(() => {
        stage.classList.add('is-printed');
        this.audio.playDataUnlock();
        setStep(5, 100);
        controls.classList.remove('is-waiting');
        ready = true;
      }, 4700));
    }

    const collectPass = () => {
      if (collected) return;
      collected = true;
      this.audio.playBootPulse();
      stage.classList.add('is-collecting');
      setTimeout(() => {
        this.state.admitted = true;
        this.saveState();
        this.renderSystemBoot();
      }, reduced ? 100 : 950);
    };

    let sy = 0;
    passEl.addEventListener('pointerdown', (e) => { sy = e.clientY; });
    passEl.addEventListener('pointerup', (e) => {
      if (!ready) return;
      if (sy - e.clientY > 28 || Math.abs(sy - e.clientY) < 10) collectPass();
    });
    passEl.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && ready) {
        e.preventDefault();
        collectPass();
      }
    });
    $('collect-pass-btn').addEventListener('click', collectPass);
    $('skip-terminal-btn').addEventListener('click', () => {
      this.state.admitted = true;
      this.saveState();
      this.renderSystemBoot();
    });

    this.activeCleanup.push(() => timers.forEach(clearTimeout));
  }

  /* ---------------- SCENE 01: SYSTEM BOOT (3D G9 PROCESSOR) ---------------- */
  renderSystemBoot() {
    this.clearScene();
    this.setChromeVisible(false);

    $('app').innerHTML = `
      <section class="tech-shell scene-boot">
        <div class="terminal-topbar">
          <span class="mono-tag">SYSTEM BOOT // G9 PROCESSOR</span>
          <button type="button" class="btn-tech-sm" id="skip-boot-btn">Skip Boot</button>
        </div>

        <div id="boot-core-mount"></div>

        <pre class="boot-console-log" id="boot-console-log">&gt; Initializing graduation.exe</pre>

        <div class="boot-title-lockup">
          <span class="mono-tag">Software Engineering · 2024–2026</span>
          <h1>G9<br>THE LAST SAVE</h1>
          <p class="subtitle">Some memories never log out.</p>
          <button type="button" class="btn-tech-primary" id="start-game-btn">START GAME</button>
        </div>
      </section>
    `;

    const coreCtrl = mountProcessorCore($('boot-core-mount'), { interactive: true });
    this.activeCleanup.push(() => coreCtrl.destroy());

    const bootLines = [
      '> Initializing graduation.exe',
      '> Loading shared memories...',
      '> Compiling our final chapter...',
      '> Recovering archive...',
      '> All memories recovered.'
    ];

    const logEl = $('boot-console-log');
    let lineIdx = 1;
    let bootInt = 0;
    if (isReducedMotion()) {
      logEl.textContent = bootLines.join('\n');
    } else {
      bootInt = setInterval(() => {
        lineIdx++;
        logEl.textContent = bootLines.slice(0, lineIdx).join('\n');
        this.audio.playKeyClick();
        if (lineIdx >= bootLines.length) clearInterval(bootInt);
      }, 650);
    }

    const enterArchive = () => {
      clearInterval(bootInt);
      this.audio.playDataUnlock();
      this.state.booted = true;
      this.saveState();
      this.renderHub('core');
    };

    $('start-game-btn').addEventListener('click', enterArchive);
    $('skip-boot-btn').addEventListener('click', enterArchive);
    this.activeCleanup.push(() => clearInterval(bootInt));
  }

  /* ---------------- MAIN ARCHIVE HUB (4 EXPLORATION MODES + MODULES) ---------------- */
  updateHudDom() {
    const explored = this.state.seenIds.length;
    const total = this.mediaList.length;
    const pct = total ? Math.round((explored / total) * 100) : 0;
    if ($('archive-progress-count')) {
      $('archive-progress-count').textContent = `${explored} / ${total} EXPLORED`;
    }
    if ($('archive-progress-bar')) {
      $('archive-progress-bar').style.width = `${pct}%`;
    }
    if ($('archive-complete-tag')) {
      $('archive-complete-tag').textContent = explored >= total && total > 0
        ? 'ARCHIVE COMPLETE · ALL MEMORIES RECOVERED'
        : `${total - explored} memories awaiting discovery`;
    }
    this.syncControls();
  }

  renderHub() {
    this.clearScene(); this.setChromeVisible(true); this.syncControls();
    $('app').innerHTML = `<section class="tech-shell final-hub"><div class="hub-hero"><span class="mono-tag">G9 // GRADUATION BUILD 2026</span><h1>THE LAST SAVE<span class="accent-dot">.</span></h1><p class="subtitle">Software Engineering · 2024–2026</p></div><div class="hud-progress-panel"><div class="hud-row"><span class="mono-tag">ARCHIVE RECOVERY</span><strong id="archive-progress-count" class="mono-tag">${this.state.seenIds.length} / ${this.mediaList.length} EXPLORED</strong></div><div class="hud-track"><span id="archive-progress-bar" style="width:${100*this.state.seenIds.length/Math.max(1,this.mediaList.length)}%"></span></div><span id="archive-complete-tag" class="muted">Some memories never log out.</span></div><div class="g9-node-map"><svg viewBox="0 0 360 350" preserveAspectRatio="none" aria-hidden="true"><path d="M88 80L180 175L272 80M180 175L88 280M180 175L272 280" stroke="#8078df" stroke-width="2" fill="none"/><g fill="none"><path class="data-pulse" d="M180 175L88 80"/><path class="data-pulse" d="M180 175L272 80"/><path class="data-pulse" d="M180 175L88 280"/><path class="data-pulse" d="M180 175L272 280"/></g><circle class="g9-orbit inner" cx="180" cy="175" r="51" stroke="#8ca9db" stroke-dasharray="4 9" fill="none"/><circle class="g9-orbit" cx="180" cy="175" r="63" stroke="#9d88ed" stroke-dasharray="28 8 4 12" fill="none"/></svg><div class="map-core">G9<small>ONLINE</small></div><button class="map-node n1" id="mod-archive"><i>01</i><strong>Memory Archive</strong><small>RECOVER DATA</small></button><button class="map-node n2" id="mod-destiny"><i>02</i><strong>毕业牛马命运分配局</strong><small>DESTINY PROTOCOL</small></button><button class="map-node n3" id="mod-console"><i>03</i><strong>Secret Terminal</strong><small>EXECUTE COMMAND</small></button><button class="map-node n4" id="mod-final-commit"><i>04</i><strong>The Final Save</strong><small>FINAL COMMIT</small></button></div><button class="btn-tech-sm" id="g9-signal-btn">G9 SIGNAL // <span id="signal-counter-txt">${Math.min(this.state.signalTaps,9)}</span></button></section>`;
    let switching=false, transitionTimer=null;
    this.activeCleanup.push(()=>clearTimeout(transitionTimer));
    const openModule=(id,fn)=>{$(id).onclick=()=>{if(switching)return;switching=true;$(id).classList.add('is-transmitting');document.querySelector('.g9-node-map').classList.add('is-transmitting');transitionTimer=setTimeout(()=>{fn();const section=$('app').firstElementChild;if(section)section.classList.add('g9-scene-enter')},isReducedMotion()?0:320)}};
    openModule('mod-archive',()=>this.renderFreeArchive());
    openModule('mod-destiny',()=>this.renderDestinyProtocol());
    openModule('mod-console',()=>this.renderDeveloperConsole());
    openModule('mod-final-commit',()=>this.renderFinalCommit());
    $('g9-signal-btn').onclick=()=>{this.state.signalTaps++;this.saveState();$('signal-counter-txt').textContent=Math.min(this.state.signalTaps,9);if(this.state.signalTaps>=9)this.triggerEgg('signal-9','SIGNAL DECODED','ERROR 404: Exams not found. Connection remains active.')};
  }
  renderFreeArchive() {
    this.clearScene();this.setChromeVisible(true);
    const list=this.mediaList;let selected=0;
    $('app').innerHTML=`<section class="tech-shell stream-shell"><div class="stream-heading"><span class="mono-tag">G9 DATABASE // MEDIA STREAM</span><h1>Memory Archive</h1><p class="muted">24 records · One shared timeline</p></div><div class="stream-console"><div class="stream-status"><span>◈ SIGNAL ACQUIRED</span><span id="stream-index"></span></div><div class="stream-screen" id="stream-screen"></div><div class="stream-info"><div><strong id="stream-label"></strong><small id="stream-type"></small></div><button class="btn-tech-primary" id="stream-open">Open record</button></div><div class="stream-nav"><button class="btn-tech-outline" id="stream-prev">← Previous</button><span id="stream-count"></span><button class="btn-tech-outline" id="stream-next">Next →</button></div></div><div class="stream-rail-heading"><span>DATA CHANNEL // 01–24</span><span>SWIPE TO EXPLORE</span></div><div class="stream-rail" id="stream-rail"></div><div class="action-row"><button class="btn-tech-outline" id="all-data">View all records</button><button class="btn-tech-outline" id="back-data">Return to hub</button></div><div id="all-data-grid" class="all-data-grid hidden"></div></section>`;
    const rail=$('stream-rail'),screen=$('stream-screen');
    const cards=list.map((m,i)=>{let el=document.createElement('button');el.className='stream-card';el.innerHTML=`<img src="${resolveMediaThumb(m)}" alt="${m.label}" loading="lazy"><span>${m.label} ${m.type==='video'?'▶':'◇'}</span>`;el.onclick=()=>select(i);rail.append(el);return el});
    const select=(i,scroll=true)=>{selected=(i+list.length)%list.length;const m=list[selected];screen.innerHTML=`<img src="${m.type==='video'?(m.poster||resolveMediaThumb(m)):resolveMediaFull(m)}" alt="${m.label}"><div class="stream-scan"></div><span class="stream-corner tl"></span><span class="stream-corner tr"></span><span class="stream-corner bl"></span><span class="stream-corner br"></span>${m.type==='video'?'<span class="stream-play">▶</span>':''}`;screen.classList.remove('scanning');void screen.offsetWidth;screen.classList.add('scanning');$('stream-index').textContent='REC // '+String(selected+1).padStart(2,'0');$('stream-label').textContent=m.label;$('stream-type').textContent=m.type==='video'?'MP4 · VIDEO RECORD':'WEBP · IMAGE RECORD';$('stream-count').textContent=(selected+1)+' / '+list.length;cards.forEach((c,j)=>{c.classList.toggle('active',j===selected);c.setAttribute('aria-pressed',String(j===selected))});if(scroll)rail.scrollTo({left:cards[selected].offsetLeft-rail.offsetLeft-(rail.clientWidth-cards[selected].clientWidth)/2,behavior:isReducedMotion()?'auto':'smooth'})};
    $('stream-prev').onclick=()=>select(selected-1);$('stream-next').onclick=()=>select(selected+1);$('stream-open').onclick=()=>this.openMediaModal(list[selected]);screen.onclick=()=>this.openMediaModal(list[selected]);screen.tabIndex=0;screen.setAttribute('role','button');screen.setAttribute('aria-label','Open selected memory');screen.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();this.openMediaModal(list[selected])}};
    let startX=0;screen.ontouchstart=e=>startX=e.changedTouches[0].clientX;screen.ontouchend=e=>{let dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45){e.preventDefault();select(selected+(dx<0?1:-1))}};
    $('all-data').onclick=()=>{let grid=$('all-data-grid');grid.classList.toggle('hidden');if(!grid.children.length)list.forEach((m,i)=>{let el=document.createElement('button');el.className='data-grid-card';el.innerHTML=`<img loading="lazy" src="${resolveMediaThumb(m)}" alt="${m.label}"><span>${m.label} ${m.type==='video'?'▶':'◇'}</span>`;el.onclick=()=>{select(i);this.openMediaModal(m)};grid.append(el)});if(!grid.classList.contains('hidden'))grid.scrollIntoView({behavior:'smooth'})};$('back-data').onclick=()=>this.renderHub();select(0,false);
  }
  /* ---------------- SPATIAL MEMORY FIELD (3D PERSPECTIVE CAROUSEL) ---------------- */
  mountSpatialField(container) {
    container.innerHTML = `
      <div class="spatial-field-wrap">
        <div class="spatial-stage" id="spatial-stage"></div>
        <div class="action-row">
          <button type="button" class="btn-tech-outline" id="sf-prev">← Previous</button>
          <button type="button" class="btn-tech-outline" id="sf-shuffle">Shuffle</button>
          <button type="button" class="btn-tech-outline" id="sf-random">Random Memory</button>
          <button type="button" class="btn-tech-outline" id="sf-next">Next →</button>
        </div>
      </div>
    `;

    const stage = $('spatial-stage');
    const seenSet = new Set(this.state.seenIds);
    const total = this.fieldOrder.length;

    const renderCards = () => {
      stage.replaceChildren();
      for (let offset = -2; offset <= 2; offset++) {
        const orderPos = (this.fieldIndex + offset + total) % total;
        const item = this.mediaList[this.fieldOrder[orderPos]];
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `spatial-card ${offset === 0 ? 'is-center' : ''} ${seenSet.has(item.id) ? 'is-seen' : ''}`;
        const tx = offset * 135;
        const tz = -Math.abs(offset) * 140;
        const ry = offset * -22;
        const sc = offset === 0 ? 1 : Math.max(0.68, 1 - Math.abs(offset) * 0.14);
        card.style.zIndex = String(20 - Math.abs(offset));
        card.style.opacity = String(1 - Math.abs(offset) * 0.22);
        card.style.transform = `translate(-50%, -50%) translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg) scale(${sc})`;
        card.innerHTML = `
          <img loading="lazy" src="${resolveMediaThumb(item)}" alt="${item.label}">
          <span class="spatial-card-foot">
            <strong>${item.label}</strong>
            <span>${item.type === 'video' ? 'VIDEO' : 'PHOTO'}</span>
          </span>
        `;
        card.addEventListener('click', () => {
          if (offset === 0) this.openMediaModal(item);
          else {
            this.fieldIndex = orderPos;
            this.audio.playScan(620, 0.1);
            renderCards();
          }
        });
        stage.appendChild(card);
      }
    };

    renderCards();

    let sx = 0;
    stage.addEventListener('pointerdown', (e) => { sx = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
      const dx = e.clientX - sx;
      if (dx < -40) {
        this.fieldIndex = (this.fieldIndex + 1) % total;
        renderCards();
      } else if (dx > 40) {
        this.fieldIndex = (this.fieldIndex - 1 + total) % total;
        renderCards();
      }
    });

    $('sf-prev').addEventListener('click', () => {
      this.fieldIndex = (this.fieldIndex - 1 + total) % total;
      renderCards();
    });
    $('sf-next').addEventListener('click', () => {
      this.fieldIndex = (this.fieldIndex + 1) % total;
      renderCards();
    });
    $('sf-shuffle').addEventListener('click', () => {
      for (let i = this.fieldOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.fieldOrder[i], this.fieldOrder[j]] = [this.fieldOrder[j], this.fieldOrder[i]];
      }
      this.fieldIndex = 0;
      this.audio.playDataUnlock();
      renderCards();
    });
    $('sf-random').addEventListener('click', () => {
      this.fieldIndex = Math.floor(Math.random() * total);
      const item = this.mediaList[this.fieldOrder[this.fieldIndex]];
      this.openMediaModal(item);
    });
  }

  /* ---------------- MEMORY CASCADE (UNIFIED IRREGULAR MASONRY WALL) ---------------- */
  mountMemoryCascade(container) {
    const seenSet = new Set(this.state.seenIds);
    const itemsHtml = this.mediaList.map((m, idx) => `
      <button type="button" class="cascade-tile ${seenSet.has(m.id) ? 'is-seen' : ''} ${idx % 5 === 0 ? 'tile-tall' : idx % 3 === 0 ? 'tile-wide' : ''}" data-mid="${m.id}">
        <img loading="lazy" src="${resolveMediaThumb(m)}" alt="${m.label}">
        <span class="cascade-meta">
          <strong>${m.label}</strong>
          <span>${m.type === 'video' ? `▶ ${m.duration || 'VIDEO'}` : 'PHOTO'}</span>
        </span>
      </button>
    `).join('');

    container.innerHTML = `<div class="cascade-masonry">${itemsHtml}</div>`;
    container.querySelectorAll('[data-mid]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = this.mediaList.find((m) => m.id === btn.dataset.mid);
        if (item) this.openMediaModal(item);
      });
    });
  }

  /* ---------------- GRADUATE DESTINY PROTOCOL (毕业牛马命运分配局) ---------------- */
  renderDestinyProtocol() {
    this.clearScene();
    this.setChromeVisible(true);
    const wishes = this.config.blessings;
    const remaining = wishes.filter((w) => !this.state.drawnBlessings.includes(w));
    const last = this.state.blessingHistory[this.state.blessingHistory.length - 1] || null;

    $('app').innerHTML = `
      <section class="tech-shell scene-destiny">
        <div class="world-topbar">
          <button type="button" class="btn-tech-sm back-hub-btn">← Return to Archive</button>
          <span class="mono-tag">PROTOCOL 01 // GRADUATE DESTINY</span>
        </div>

        <h1>毕业牛马命运分配局</h1>
        <p class="subtitle">30 curated Software Engineering graduate allocations · Zero repeats per round.</p>

        <div class="loot-cube-stage" id="loot-cube-stage">
          <div class="loot-cube" id="loot-cube">
            <div class="lc-face lc-front">G9</div>
            <div class="lc-face lc-back">2026</div>
            <div class="lc-face lc-right">DROP</div>
            <div class="lc-face lc-left">LUCK</div>
            <div class="lc-face lc-top">SYS</div>
            <div class="lc-face lc-bottom">RNG</div>
          </div>
          <div class="loot-scan-beam"></div>
        </div>

        <div class="loot-result-card">
          <span class="mono-tag">ALLOCATED DESTINY (${remaining.length} / ${wishes.length} REMAINING)</span>
          <h2 id="loot-output">${last || '学历已到账，财富尚在配送中。'}</h2>
          <div class="action-row">
            <button type="button" class="btn-tech-primary" id="draw-loot-btn">${remaining.length ? '开启命运盲盒' : '本轮已全部抽取'}</button>
            <button type="button" class="btn-tech-outline" id="reset-loot-btn">重置抽签池</button>
            <button type="button" class="btn-tech-outline ${last ? '' : 'hidden'}" id="export-loot-png">Save Blessing PNG</button>
          </div>
        </div>

        ${this.state.blessingHistory.length ? `
          <div class="loot-history-panel">
            <span class="mono-tag">EXTRACTED LOG (${this.state.blessingHistory.length})</span>
            <ol>${this.state.blessingHistory.map((b) => `<li>${b}</li>`).join('')}</ol>
          </div>
        ` : ''}
      </section>
    `;

    document.querySelector('.back-hub-btn').addEventListener('click', () => this.renderHub('core'));

    let drawing = false;
    let drawTimer = null;
    this.activeCleanup.push(() => clearTimeout(drawTimer));
    $('draw-loot-btn').addEventListener('click', () => {
      if (drawing) return;
      const pool = wishes.filter((w) => !this.state.drawnBlessings.includes(w));
      if (!pool.length) {
        $('loot-output').textContent = '30条命运已全部解锁，点击“重置抽签池”开启新一轮。';
        return;
      }

      drawing = true;
      $('draw-loot-btn').disabled = true;
      $('loot-cube-stage').classList.add('is-spinning');
      $('loot-output').textContent = '正在解密命运数据包...';
      this.audio.playScan(780, 0.3);

      const rand = new Uint32Array(1);
      crypto.getRandomValues(rand);
      const picked = pool[rand[0] % pool.length];

      drawTimer = setTimeout(() => {
        this.state.drawnBlessings.push(picked);
        this.state.blessingHistory.push(picked);
        this.saveState();
        this.audio.playLootResolve();
        drawing = false;
        this.renderDestinyProtocol();
      }, isReducedMotion() ? 180 : 1250);
    });

    $('reset-loot-btn').addEventListener('click', () => {
      clearTimeout(drawTimer);
      drawing = false;
      this.state.drawnBlessings = [];
      this.state.blessingHistory = [];
      this.saveState();
      this.audio.playScan(520, 0.16);
      this.renderDestinyProtocol();
      $('loot-output').textContent = '抽奖池已重置，30条命运等待解锁。';
    });

    $('export-loot-png').addEventListener('click', () => {
      const target = this.state.blessingHistory[this.state.blessingHistory.length - 1];
      if (target) {
        this.audio.playDataUnlock();
        exportG9BlessingPNG(target, this.state.blessingHistory.length, wishes.length);
      }
    });
  }

  /* ---------------- DEVELOPER CONSOLE (ALL 11 COMMANDS) ---------------- */
  renderDeveloperConsole() {
    this.clearScene();
    this.setChromeVisible(true);

    const quickCmds = ['help', 'g9', 'debug', 'salary', 'exam', 'mamak', 'goodbye', 'sudo', 'bug', 'commit', 'clear'];

    $('app').innerHTML = `
      <section class="tech-shell scene-console">
        <div class="world-topbar">
          <button type="button" class="btn-tech-sm back-hub-btn">← Return to Archive</button>
          <span class="mono-tag">CLI // G9 DEVELOPER CONSOLE</span>
        </div>

        <h1>Developer Console</h1>
        <p class="subtitle">Type any command or tap a quick command chip below.</p>

        <div class="console-window" id="console-window">
          <div class="console-titlebar">
            <span>g9@last-save:~/graduation</span>
            <span>BASH · SANDBOXED</span>
          </div>
          <div class="console-output" id="console-output" aria-live="polite">
            <div class="console-line system">G9 Archive Terminal v2026.9 initialized. Type "help" for available commands.</div>
          </div>
          <form class="console-input-row" id="console-form">
            <span class="prompt-glyph">$</span>
            <input type="text" id="console-input" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Enter command (e.g. debug, salary, sudo)..." aria-label="Developer console command input">
            <button type="submit" class="btn-tech-sm">Run</button>
          </form>
        </div>

        <div class="quick-chips">
          ${quickCmds.map((c) => `<button type="button" class="cmd-chip" data-cmd="${c}">${c}</button>`).join('')}
        </div>
      </section>
    `;

    document.querySelector('.back-hub-btn').addEventListener('click', () => this.renderHub('core'));

    const output = $('console-output');
    const input = $('console-input');
    const win = $('console-window');

    const appendLine = (text, cls = 'reply') => {
      const div = document.createElement('div');
      div.className = `console-line ${cls}`;
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    };

    const runCommand = (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      this.cmdHistory.push(cmd);
      this.cmdHistoryIdx = this.cmdHistory.length;
      this.audio.playKeyClick();
      appendLine(`$ ${cmd}`, 'cmd');

      const responses = {
        help: [
          'Available commands:',
          '  help     - show command index',
          '  g9       - inspect cohort graduation status',
          '  debug    - scan remaining student life',
          '  salary   - query expected graduate salary',
          '  exam     - check upcoming exam schedule',
          '  mamak    - activate reunion protocol',
          '  goodbye  - attempt session termination',
          '  sudo     - elevate alumni privileges',
          '  bug      - inspect unresolved campus bugs',
          '  commit   - commit final memories',
          '  clear    - clear terminal buffer'
        ],
        g9: ['STATUS: GRADUATED', 'COHORT: Software Engineering (2024–2026)', 'FRIENDSHIP: INFINITY'],
        debug: ['Scanning life...', '0 assignments found.', '1,024 adult responsibilities detected.'],
        salary: ['Expected salary: RM 20,000', 'Reality: Permission denied.'],
        exam: ['ERROR 404: Exams not found.', 'You are finally free.'],
        mamak: ['MAMAK_PROTOCOL activated.', 'Next reunion: Pending group chat confirmation.'],
        goodbye: ['ERROR 403: Goodbye is not permitted.', 'Connection remains active.'],
        sudo: ['Administrator access granted.', '牛马身份已解除。'],
        bug: ['0 syntax errors detected.', '1 permanent memory leak: nostalgia remains in heap.'],
        commit: ['[main g9f2026] feat: graduate together', '24 memories staged · 0 regrets · Build successful.']
      };

      if (cmd === 'clear') {
        output.replaceChildren();
        appendLine('Terminal cleared. Type "help" for commands.', 'system');
        return;
      }

      if (cmd === 'sudo') {
        win.classList.add('sudo-flash');
        setTimeout(() => win.classList.remove('sudo-flash'), 900);
        this.triggerEgg('sudo-console', 'ROOT PRIVILEGE GRANTED', 'Administrator mode verified via Developer Console: 牛马身份已解除。');
      } else if (cmd === 'commit') {
        this.audio.playDataUnlock();
      }

      const lines = responses[cmd] || [`Unknown command: "${cmd}". Type "help" to list valid commands.`];
      lines.forEach((ln, i) => {
        setTimeout(() => {
          appendLine(ln, responses[cmd] ? 'reply' : 'warn');
        }, isReducedMotion() ? 0 : i * 65);
      });
    };

    $('console-form').addEventListener('submit', (e) => {
      e.preventDefault();
      runCommand(input.value);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && this.cmdHistory.length) {
        e.preventDefault();
        this.cmdHistoryIdx = Math.max(0, this.cmdHistoryIdx - 1);
        input.value = this.cmdHistory[this.cmdHistoryIdx] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.cmdHistoryIdx = Math.min(this.cmdHistory.length, this.cmdHistoryIdx + 1);
        input.value = this.cmdHistory[this.cmdHistoryIdx] || '';
      }
    });

    document.querySelectorAll('.cmd-chip').forEach((btn) => {
      btn.addEventListener('click', () => runCommand(btn.dataset.cmd));
    });
  }

  /* ---------------- GRADUATION PASS ---------------- */
  renderGraduationPass() {
    this.clearScene();
    this.setChromeVisible(true);
    const explored = this.state.seenIds.length;
    const total = this.mediaList.length;

    $('app').innerHTML = `
      <section class="tech-shell scene-pass">
        <div class="world-topbar">
          <button type="button" class="btn-tech-sm back-hub-btn">← Return to Archive</button>
          <span class="mono-tag">CREDENTIAL // GRADUATION PASS</span>
        </div>
        <h1>Graduation Pass</h1>
        <p class="subtitle">Move your finger or pointer across the titanium pass for holographic reflection.</p>

        <div class="pass-3d-stage">
          <div class="titanium-pass-card" id="titanium-pass">
            <div class="pass-holo-sheen" id="pass-holo-sheen"></div>
            <div class="pass-border-inner">
              <div class="pass-top-meta">
                <span>G9 // THE LAST SAVE</span>
                <span>PASS ID: ${this.state.passId}</span>
              </div>
              <div class="pass-center-block">
                ${SVG_ICONS.chip}
                <h2>Software Engineering</h2>
                <span class="mono-tag">2024 — 2026</span>
              </div>
              <div class="pass-bottom-meta">
                <span>Graduation Status: Completed</span>
                <span>Archive: ${explored} / ${total}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="action-row">
          <button type="button" class="btn-tech-primary" id="save-pass-png-btn">Save Pass PNG</button>
        </div>
      </section>
    `;

    document.querySelector('.back-hub-btn').addEventListener('click', () => this.renderHub('core'));

    const card = $('titanium-pass');
    const sheen = $('pass-holo-sheen');
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      card.style.transform = `rotateX(${(0.5 - py) * 18}deg) rotateY(${(px - 0.5) * 22}deg)`;
      sheen.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(220,232,244,0.3), rgba(146,120,237,0.2) 38%, transparent 72%)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    $('save-pass-png-btn').addEventListener('click', () => {
      this.audio.playDataUnlock();
      exportG9PassPNG(this.state.passId, explored, total);
    });
  }

  /* ---------------- CINEMATIC MEMORY MODE ---------------- */
  renderCinematicMode() {
    this.clearScene();
    this.setChromeVisible(false);
    const photos = this.mediaList.filter((m) => m.type === 'photo');
    let idx = 0;
    let paused = false;

    $('app').innerHTML = `
      <section class="g9-cinematic-overlay">
        <div class="g9-cine-frame">
          <img id="g9-cine-img" class="cine-ken-burns" src="" alt="G9 memory">
          <div class="g9-cine-caption">
            <span class="mono-tag">G9 // CINEMATIC MEMORY MODE</span>
            <h2 id="g9-cine-label"></h2>
          </div>
        </div>
        <div class="action-row">
          <button type="button" class="btn-tech-outline" id="g9-cine-prev">← Previous</button>
          <button type="button" class="btn-tech-outline" id="g9-cine-toggle">Pause</button>
          <button type="button" class="btn-tech-outline" id="g9-cine-next">Next →</button>
          <button type="button" class="btn-tech-primary" id="g9-cine-exit">Exit Mode</button>
        </div>
      </section>
    `;

    const show = (i) => {
      idx = ((i % photos.length) + photos.length) % photos.length;
      const item = photos[idx];
      this.markSeen(item);
      const img = $('g9-cine-img');
      img.classList.remove('cine-ken-burns');
      void img.offsetWidth;
      img.src = resolveMediaFull(item);
      if (!isReducedMotion()) img.classList.add('cine-ken-burns');
      $('g9-cine-label').textContent = `${item.label} (${idx + 1} / ${photos.length})`;
    };

    show(0);
    this.cineTimer = setInterval(() => {
      if (!paused) show(idx + 1);
    }, 4500);

    $('g9-cine-prev').addEventListener('click', () => show(idx - 1));
    $('g9-cine-next').addEventListener('click', () => show(idx + 1));
    $('g9-cine-toggle').addEventListener('click', () => {
      paused = !paused;
      $('g9-cine-toggle').textContent = paused ? 'Resume' : 'Pause';
    });
    $('g9-cine-exit').addEventListener('click', () => this.renderHub('core'));
  }

  /* ---------------- END CREDITS ---------------- */
  renderEndCredits() {
    this.clearScene();
    this.setChromeVisible(true);
    const photos = this.mediaList.filter((m) => m.type === 'photo').slice(0, 6);

    $('app').innerHTML = `
      <section class="tech-shell scene-credits">
        <div class="world-topbar">
          <button type="button" class="btn-tech-sm back-hub-btn">← Return to Archive</button>
          <span class="mono-tag">CREDITS // G9 ROLL</span>
        </div>

        <div class="credits-viewport" id="credits-viewport">
          <div class="credits-roll" id="credits-roll">
            <span class="mono-tag">G9 — THE LAST SAVE</span>
            <h1>Software Engineering</h1>
            <p class="mono-tag">2024 — 2026</p>
            <div class="credits-divider"></div>
            <h3>ARCHIVE ROSTER</h3>
            ${this.config.editableRoster.map((r) => `<p>${r}</p>`).join('')}
            <p class="muted">${this.config.rosterNote}</p>
            <div class="credits-divider"></div>
            <h3>SHARED FRAMES</h3>
            <div class="credits-frames-grid">
              ${photos.map((p) => `<figure><img src="${resolveMediaThumb(p)}" alt="${p.label}"><figcaption>${p.label}</figcaption></figure>`).join('')}
            </div>
            <div class="credits-divider"></div>
            <h2>Some memories never log out.</h2>
            <p class="muted">END OF TRANSMISSION</p>
          </div>
        </div>

        <div class="action-row">
          <button type="button" class="btn-tech-outline" id="cred-toggle">Pause Roll</button>
          <button type="button" class="btn-tech-outline" id="cred-replay">Replay</button>
          <button type="button" class="btn-tech-primary" id="cred-skip">Proceed to Final Commit →</button>
        </div>
      </section>
    `;

    document.querySelector('.back-hub-btn').addEventListener('click', () => this.renderHub('core'));
    const roll = $('credits-roll');
    let paused = false;

    $('cred-toggle').addEventListener('click', () => {
      paused = !paused;
      roll.style.animationPlayState = paused ? 'paused' : 'running';
      $('cred-toggle').textContent = paused ? 'Resume Roll' : 'Pause Roll';
    });
    $('cred-replay').addEventListener('click', () => {
      roll.classList.remove('is-rolling');
      void roll.offsetWidth;
      roll.classList.add('is-rolling');
      paused = false;
      roll.style.animationPlayState = 'running';
      $('cred-toggle').textContent = 'Pause Roll';
    });
    $('cred-skip').addEventListener('click', () => this.renderFinalCommit());

    roll.classList.add('is-rolling');
  }

  /* ---------------- FINAL COMMIT ---------------- */
  renderFinalCommit() {
    this.clearScene();
    this.setChromeVisible(true);
    const fc = this.config.finalCommit;

    $('app').innerHTML = `
      <section class="tech-shell scene-final-commit">
        <div class="world-topbar">
          <button type="button" class="btn-tech-sm back-hub-btn">← Return to Archive</button>
          <span class="mono-tag">PROTOCOL // FINAL COMMIT</span>
        </div>

        <div id="final-core-mount"></div>

        <pre class="boot-console-log" id="final-commit-log">&gt; Ready to commit G9 archive...</pre>

        <div class="action-row" id="final-commit-trigger-row">
          <button type="button" class="btn-tech-primary" id="execute-commit-btn">Execute Final Commit</button>
        </div>

        <div class="final-epilogue hidden" id="final-epilogue">
          <span class="mono-tag">BUILD SUCCESSFUL · ARCHIVE SECURED</span>
          <h1>${fc.headline}</h1>
          <p class="subtitle">${fc.epilogue1}<br>${fc.epilogue2}</p>
          <div class="action-row">
            <button type="button" class="btn-tech-primary" id="export-final-png">Save Graduation Keepsake PNG</button>
            <button type="button" class="btn-tech-outline" id="return-archive-btn">Return to Memories</button>
          </div>
        </div>
      </section>
    `;

    document.querySelector('.back-hub-btn').addEventListener('click', () => this.renderHub('core'));
    const coreCtrl = mountProcessorCore($('final-core-mount'), { interactive: true });
    this.activeCleanup.push(() => coreCtrl.destroy());

    let running = false;
    $('execute-commit-btn').addEventListener('click', () => {
      if (running) return;
      running = true;
      $('execute-commit-btn').disabled = true;
      const logEl = $('final-commit-log');
      const logs = fc.logs;

      if (isReducedMotion()) {
        logEl.textContent = logs.join('\n');
        $('final-epilogue').classList.remove('hidden');
        this.audio.playLootResolve();
        return;
      }

      let idx = 0;
      const iv = setInterval(() => {
        idx++;
        logEl.textContent = logs.slice(0, idx).join('\n');
        this.audio.playScan(500 + idx * 90, 0.16);
        if (idx >= logs.length) {
          clearInterval(iv);
          this.audio.playLootResolve();
          $('final-epilogue').classList.remove('hidden');
        }
      }, 520);
      this.activeCleanup.push(() => clearInterval(iv));
    });

    $('export-final-png').addEventListener('click', () => {
      this.audio.playDataUnlock();
      exportFinalCommitPNG(this.state.seenIds.length, this.mediaList.length);
    });
    $('return-archive-btn').addEventListener('click', () => this.renderHub('core'));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new G9ArchiveApp();
  app.init();
});
