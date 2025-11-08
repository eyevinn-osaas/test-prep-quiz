import React, { useState } from "react";

// Programmatic sound generation using Web Audio API
class SoundPlayer {
  constructor() {
    this.audioContext = null;
    this.muted = localStorage.getItem('soundMuted') === 'true';
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playCorrect() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  }

  playWrong() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.setValueAtTime(100, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  playCelebration() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);

      oscillator.start(ctx.currentTime + i * 0.1);
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
  }

  playClick() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }

  // Theme-specific ambient sounds
  playHalloweenAmbient() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;

    // Spooky low rumble
    const rumble = ctx.createOscillator();
    const rumbleGain = ctx.createGain();
    rumble.type = 'sawtooth';
    rumble.frequency.setValueAtTime(40, ctx.currentTime);
    rumble.connect(rumbleGain);
    rumbleGain.connect(ctx.destination);
    rumbleGain.gain.setValueAtTime(0.05, ctx.currentTime);
    rumble.start(ctx.currentTime);
    rumble.stop(ctx.currentTime + 2);

    // Ghost wail
    setTimeout(() => {
      if (this.muted) return;
      const wail = ctx.createOscillator();
      const wailGain = ctx.createGain();
      wail.type = 'sine';
      wail.frequency.setValueAtTime(200, ctx.currentTime);
      wail.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1);
      wail.connect(wailGain);
      wailGain.connect(ctx.destination);
      wailGain.gain.setValueAtTime(0.1, ctx.currentTime);
      wailGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      wail.start(ctx.currentTime);
      wail.stop(ctx.currentTime + 1);
    }, 500);
  }

  playSpiderDrop() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }

  playOceanWaves() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;

    // Create wave-like sound with noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(i / 1000);
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    source.start(ctx.currentTime);
  }

  playMagicSparkle() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const notes = [800, 1000, 1200, 1400, 1600];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.2);

      osc.start(ctx.currentTime + i * 0.05);
      osc.stop(ctx.currentTime + i * 0.05 + 0.2);
    });
  }

  playRocketLaunch() {
    if (this.muted) return;
    this.init();

    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('soundMuted', muted.toString());
  }

  isMuted() {
    return this.muted;
  }
}

// Global instance
export const soundPlayer = new SoundPlayer();

// Mute toggle button component
export function SoundMuteToggle() {
  const [muted, setMuted] = useState(soundPlayer.isMuted());

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    soundPlayer.setMuted(newMuted);
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: "var(--panel, #1a1e3e)",
        color: "var(--ink, #e8ebff)",
        border: "1px solid var(--muted, #4a5568)",
        borderRadius: "8px",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
