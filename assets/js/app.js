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
} from './cards.js';
import {
  TechStarfield,
  mountProcessorCore,
  mountMemoryTunnel,
  isReducedMotion
} from './scenes3d.js';

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
      this.renderAdmissionTerminal();
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

  renderHub(activeMode = 'core') {
    this.clearScene();
    this.setChromeVisible(true);
    this.syncControls();

    const explored = this.state.seenIds.length;
    const total = this.mediaList.length;
    const pct = total ? Math.round((explored / total) * 100) : 0;
    const passUnlocked = explored >= Math.min(3, total);

    $('app').innerHTML = `
      <section class="tech-shell scene-hub">
        <div class="hub-hero">
          <span class="mono-tag">G9 // AN INTERACTIVE DIGITAL TIME CAPSULE</span>
          <h1>THE LAST SAVE<span class="accent-dot">.</span></h1>
          <p class="subtitle">Software Engineering · 2024–2026 · Our story is not a game over.</p>
        </div>

        <div class="hud-progress-panel">
          <div class="hud-row">
            <span class="mono-tag">MEMORY EXPLORATION PROGRESS</span>
            <strong class="mono-tag" id="archive-progress-count">${explored} / ${total} EXPLORED</strong>
          </div>
          <div class="hud-track"><span id="archive-progress-bar" style="width:${pct}%"></span></div>
          <div class="hud-foot-row">
            <span class="muted" id="archive-complete-tag">${explored >= total ? 'ARCHIVE COMPLETE · ALL MEMORIES RECOVERED' : `${total - explored} memories awaiting discovery`}</span>
            <button type="button" class="btn-tech-sm" id="random-unseen-btn">Random Unexplored Memory</button>
          </div>
        </div>

        <div class="archive-mode-tabs" role="tablist" aria-label="Archive exploration modes">
          <button type="button" class="mode-tab ${activeMode === 'core' ? 'is-active' : ''}" data-mode="core">Memory Core</button>
          <button type="button" class="mode-tab ${activeMode === 'tunnel' ? 'is-active' : ''}" data-mode="tunnel">Memory Tunnel</button>
          <button type="button" class="mode-tab ${activeMode === 'field' ? 'is-active' : ''}" data-mode="field">Spatial Field</button>
          <button type="button" class="mode-tab ${activeMode === 'cascade' ? 'is-active' : ''}" data-mode="cascade">Memory Cascade</button>
        </div>

        <div class="archive-viewport" id="archive-viewport"></div>

        <div class="se-language-strip">
          <pre class="code-card"><code>const G9 = {
  status: "Graduated",
  memories: "Permanent",
  assignments: "Completed",
  friendship: Infinity
};
save(G9);</code></pre>
          <div class="commit-timeline-card">
            <span class="mono-tag">GIT COMMIT TIMELINE // 2024–2026</span>
            <ul>
              ${this.config.commitTimeline.map((c) => `<li><code>${c.hash}</code> <span>${c.message}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="modules-grid">
          <button type="button" class="module-tile" id="mod-destiny">
            <span class="mono-tag">01 // PROTOCOL</span>
            <h3>毕业牛马命运分配局</h3>
            <p class="muted">3D Loot Cube · 30 non-repeating graduate blessings + PNG card.</p>
          </button>
          <button type="button" class="module-tile" id="mod-console">
            <span class="mono-tag">02 // TERMINAL</span>
            <h3>Developer Console</h3>
            <p class="muted">Interactive G9 CLI supporting debug, salary, exam, mamak, sudo & more.</p>
          </button>
          <button type="button" class="module-tile" id="mod-pass">
            <span class="mono-tag">03 // CREDENTIAL</span>
            <h3>Graduation Pass</h3>
            <p class="muted">${passUnlocked ? 'Unlocked · Titanium holographic pass + PNG export.' : `Explore ${Math.max(0, 3 - explored)} more memories to unlock.`}</p>
          </button>
          <button type="button" class="module-tile" id="mod-cinema">
            <span class="mono-tag">04 // PLAYBACK</span>
            <h3>Cinematic Memory Mode</h3>
            <p class="muted">Fullscreen Ken Burns memory reel across the unified G9 archive.</p>
          </button>
          <button type="button" class="module-tile" id="mod-credits">
            <span class="mono-tag">05 // CREDITS</span>
            <h3>End Credits</h3>
            <p class="muted">Software Engineering 2024–2026 rolling credits with memory plates.</p>
          </button>
          <button type="button" class="module-tile module-highlight" id="mod-final-commit">
            <span class="mono-tag">06 // FINAL SAVE</span>
            <h3>Final Commit</h3>
            <p class="muted">Execute the final graduation commit ritual & export keepsake PNG.</p>
          </button>
        </div>

        <div class="signal-easter-panel">
          <span class="mono-tag">HIDDEN SIGNAL NODE</span>
          <p class="muted">Tap the G9 signal nine times to decode the hidden transmission.</p>
          <button type="button" class="signal-btn" id="g9-signal-btn" aria-label="G9 Signal node">
            ${SVG_ICONS.signal}
            <span id="signal-counter-txt">${this.state.signalTaps} / 9</span>
          </button>
        </div>
      </section>
    `;

    const openRandomUnseen = () => {
      const seenSet = new Set(this.state.seenIds);
      const unseen = this.mediaList.filter((m) => !seenSet.has(m.id));
      const pool = unseen.length ? unseen : this.mediaList;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      this.audio.playDataUnlock();
      this.openMediaModal(pick);
    };

    $('random-unseen-btn').addEventListener('click', openRandomUnseen);

    document.querySelectorAll('.mode-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.playScan(660, 0.14);
        this.renderHub(btn.dataset.mode);
      });
    });

    const viewport = $('archive-viewport');
    const seenSet = new Set(this.state.seenIds);

    if (activeMode === 'core') {
      viewport.innerHTML = `
        <div class="core-mode-box">
          <div id="hub-core-mount"></div>
          <p class="muted">Drag to rotate the G9 Processor Cube · Tap core to release an unexplored memory · Long-press for system override</p>
        </div>
      `;
      const ctrl = mountProcessorCore($('hub-core-mount'), {
        interactive: true,
        onTapCore: openRandomUnseen,
        onLongPressCore: () => {
          this.triggerEgg(
            'core-hold',
            'CORE OVERRIDE // 0xG9',
            'Deep diagnostic confirmed: Zero regrets, infinite late-night debugging memories preserved.'
          );
        }
      });
      this.activeCleanup.push(() => ctrl.destroy());
    } else if (activeMode === 'tunnel') {
      const ctrl = mountMemoryTunnel(viewport, this.mediaList, seenSet, {
        onSelectMedia: (item) => {
          this.audio.playScan(780, 0.15);
          this.openMediaModal(item);
        }
      });
      this.activeCleanup.push(() => ctrl.destroy());
    } else if (activeMode === 'field') {
      this.mountSpatialField(viewport);
    } else {
      this.mountMemoryCascade(viewport);
    }

    // Modules
    $('mod-destiny').addEventListener('click', () => this.renderDestinyProtocol());
    $('mod-console').addEventListener('click', () => this.renderDeveloperConsole());
    $('mod-pass').addEventListener('click', () => this.renderGraduationPass());
    $('mod-cinema').addEventListener('click', () => this.renderCinematicMode());
    $('mod-credits').addEventListener('click', () => this.renderEndCredits());
    $('mod-final-commit').addEventListener('click', () => this.renderFinalCommit());

    // 9-Tap Signal Easter Egg
    $('g9-signal-btn').addEventListener('click', () => {
      this.state.signalTaps++;
      this.saveState();
      this.audio.playTone(440 + this.state.signalTaps * 55, 0.12, 'triangle', 0.025);
      $('signal-counter-txt').textContent = `${Math.min(this.state.signalTaps, 9)} / 9`;
      if (this.state.signalTaps >= 9) {
        this.triggerEgg(
          'signal-9',
          'SIGNAL DECODED // G9 FOREVER',
          'Nine harmonic pulses received: "ERROR 404: Exams not found. Connection remains active."'
        );
      }
    });
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

      setTimeout(() => {
        this.state.drawnBlessings.push(picked);
        this.state.blessingHistory.push(picked);
        this.saveState();
        this.audio.playLootResolve();
        drawing = false;
        this.renderDestinyProtocol();
      }, isReducedMotion() ? 180 : 1250);
    });

    $('reset-loot-btn').addEventListener('click', () => {
      this.state.drawnBlessings = [];
      this.saveState();
      this.audio.playScan(520, 0.16);
      this.renderDestinyProtocol();
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
