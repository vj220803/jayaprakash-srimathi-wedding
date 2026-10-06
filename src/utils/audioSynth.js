// Ambient soundscape synthesizer using Web Audio API
// Generates a meditative, sacred temple tanpura drone & gentle wind chime resonance

let audioCtx = null;
let masterGain = null;
let oscillators = [];
let isPlaying = false;

export const toggleDivineAudio = (onStateChange) => {
  if (isPlaying) {
    stopDivineAudio();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startDivineAudio();
    if (onStateChange) onStateChange(true);
    return true;
  }
};

export const startDivineAudio = () => {
  try {
    // 1. Check if external wedding audio track exists and can be played
    const audioEl = document.getElementById("wedding-bg-audio");
    if (audioEl) {
      audioEl.volume = 0.75;
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            stopOscillators();
          })
          .catch(() => {
            // If audio file is missing (404) or blocked, fallback to synthesized temple drone
            playSynthDrone();
          });
        return;
      }
    }

    // Fallback if no audio element found
    playSynthDrone();
  } catch (err) {
    console.warn("Audio initialisation note:", err);
    playSynthDrone();
  }
};

const playSynthDrone = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    stopOscillators();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);
    masterGain.connect(audioCtx.destination);

    // Sacred Tanpura chord frequencies (Pa - Sa - Sa - Sa in C#3)
    const freqs = [103.83, 138.59, 138.59 * 1.002, 277.18, 415.3];

    oscillators = freqs.map((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.05, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
      lfo.connect(osc.detune);
      lfo.start();

      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();

      return { osc, lfo };
    });

    isPlaying = true;
  } catch (err) {
    console.warn("Synth drone note:", err);
  }
};

export const stopDivineAudio = () => {
  try {
    const audioEl = document.getElementById("wedding-bg-audio");
    if (audioEl) {
      audioEl.pause();
    }

    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        stopOscillators();
        isPlaying = false;
      }, 1300);
    } else {
      stopOscillators();
      isPlaying = false;
    }
  } catch (err) {
    console.warn("Audio stop note:", err);
    isPlaying = false;
  }
};

const stopOscillators = () => {
  oscillators.forEach(({ osc, lfo }) => {
    try {
      osc.stop();
      osc.disconnect();
      lfo.stop();
      lfo.disconnect();
    } catch {
      // ignore
    }
  });
  oscillators = [];
};

// Gentle sacred temple chime for the date reveal moment
export const playSacredChime = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const chimeFreqs = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6 harmonics
    chimeFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.035 / (idx + 1), now + idx * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.04 + 2.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 2.3);
    });
  } catch (err) {
    console.warn("Chime synth note:", err);
  }
};

