/* G9 — The Last Save — Procedural Tech Web Audio SFX Engine */
export class TechAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try {
      this.muted = localStorage.getItem('g9-sound-muted') === '1';
    } catch (_) {}
  }

  _ensure() {
    if (this.muted) return null;
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('g9-sound-muted', this.muted ? '1' : '0');
    } catch (_) {}
    if (!this.muted) this.playScan(740, 0.12);
    return this.muted;
  }

  playTone(freq = 440, dur = 0.14, type = 'sine', gainVal = 0.035, delay = 0) {
    const ctx = this._ensure();
    if (!ctx) return;
    try {
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch (_) {}
  }

  playScan(freq = 620, dur = 0.22) {
    this.playTone(freq, dur, 'triangle', 0.024);
    this.playTone(freq * 1.45, dur * 0.7, 'sine', 0.018, 0.04);
  }

  playPrintTick(step = 0) {
    this.playTone(260 + (step % 5) * 45, 0.04, 'square', 0.012);
    this.playTone(1180, 0.02, 'sine', 0.008, 0.012);
  }

  playBootPulse() {
    [220, 330, 440, 660, 880].forEach((f, i) => {
      this.playTone(f, 0.35, 'sine', 0.026, i * 0.07);
    });
  }

  playDataUnlock() {
    this.playTone(587.33, 0.18, 'triangle', 0.028, 0);
    this.playTone(880, 0.25, 'sine', 0.03, 0.07);
    this.playTone(1174.66, 0.35, 'sine', 0.022, 0.14);
  }

  playLootResolve() {
    [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      this.playTone(f, 0.55, 'triangle', 0.026, i * 0.06);
    });
  }

  playKeyClick() {
    this.playTone(920, 0.025, 'triangle', 0.012);
  }
}
