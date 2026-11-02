"use client";

// Small rewards (sound, confetti, vibration) and on-device storage for Dad's voice notes.

let audioContext;

function chime(big) {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const notes = big ? [523.25, 659.25, 783.99, 1046.5] : [659.25, 987.77];
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = audioContext.currentTime + index * 0.09;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.4);
    });
  } catch { /* Sound is optional. */ }
}

function confetti(count) {
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  const colors = ["#8b5cf6", "#22d3ee", "#a3e635", "#f472b6", "#fbbf24"];
  const pieces = Array.from({ length: count }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.3,
    y: canvas.height * 0.35,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 12 - 4,
    size: Math.random() * 6 + 4,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  const started = performance.now();
  const frame = (now) => {
    const elapsed = now - started;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const piece of pieces) {
      piece.vy += 0.35;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.spin;
      context.save();
      context.globalAlpha = Math.max(0, 1 - elapsed / 1700);
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.fillStyle = piece.color;
      context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
      context.restore();
    }
    if (elapsed < 1700) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

export function celebrate(settings = {}, big = false) {
  if (typeof window === "undefined") return;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (settings.haptics !== false && navigator.vibrate) navigator.vibrate(big ? [30, 40, 60] : 25);
  if (settings.sound !== false) chime(big);
  if (settings.confetti !== false && !reduceMotion) confetti(big ? 140 : 45);
}

// ----- Voice notes (IndexedDB, this device only) -----

function openStore() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("accounting-0452-voice", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("notes");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, action) {
  const db = await openStore();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("notes", mode);
    const request = action(transaction.objectStore("notes"));
    transaction.oncomplete = () => resolve(request?.result);
    transaction.onerror = () => reject(transaction.error);
  });
}

export const saveVoiceNote = (id, blob) => withStore("readwrite", (store) => store.put(blob, id));
export const loadVoiceNote = (id) => withStore("readonly", (store) => store.get(id));
export const deleteVoiceNote = (id) => withStore("readwrite", (store) => store.delete(id));
