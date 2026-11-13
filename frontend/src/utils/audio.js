// Web Audio API synthesizer for Nepali festive chimes and game sounds
// 100% client-side, zero network dependencies

class FestiveAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambientOscillators = [];
    this.ambientGain = null;
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(m) {
    this.muted = m;
    if (m && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!m && this.ambientGain && this.ctx && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    }
  }

  // Play a soft temple bell / singing bowl chime (for lighting diya)
  playDiyaChime() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Pentatonic sparkle arpeggio: C5, E5, G5, B5, C6
      const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0, t + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, t + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 1.8);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  // Card slide sound
  playCardPlay() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.1);
    } catch {}
  }

  // Trick won or good card play chime
  playTrickWon() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [659.25, 880].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.1);
        gain.gain.setValueAtTime(0.1, t + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + i * 0.1);
        osc.stop(t + i * 0.1 + 0.45);
      });
    } catch {}
  }

  // Fanfare for Dhumbal/Callbreak victory
  playWinFanfare() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + i * 0.12);
        gain.gain.setValueAtTime(0.15, t + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + i * 0.12);
        osc.stop(t + i * 0.12 + 0.7);
      });
    } catch {}
  }

  // Toggle ambient festival melody (gentle bansuri-like flute drone in Raag Bhupali / Tihar melody)
  toggleAmbient(start = true) {
    if (!start || this.muted) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.isAmbientPlaying = false;
      return false;
    }

    try {
      this.init();
      if (!this.ctx) return false;

      if (!this.ambientGain) {
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        this.ambientGain.connect(this.ctx.destination);
      } else {
        this.ambientGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      }

      // Gentle Tanpura / flute harmonic root notes (D3 + A3 + D4)
      const droneNotes = [146.83, 220.0, 293.66];
      this.ambientOscillators.forEach(o => {
        try { o.stop(); } catch {}
      });
      this.ambientOscillators = [];

      droneNotes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const filt = this.ctx.createBiquadFilter();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filt.type = 'lowpass';
        filt.frequency.setValueAtTime(420, this.ctx.currentTime);

        osc.connect(filt);
        filt.connect(this.ambientGain);
        osc.start();
        this.ambientOscillators.push(osc);
      });

      this.isAmbientPlaying = true;
      return true;
    } catch {
      return false;
    }
  }
}

export const soundManager = new FestiveAudio();
