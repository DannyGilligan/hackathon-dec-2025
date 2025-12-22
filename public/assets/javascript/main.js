// assets/javascript/main.js

const DOOR_COUNT = 25;

// Same endpoint the Svelte playground uses:
const JOKE_API = "https://v2.jokeapi.dev/joke/Christmas?safe-mode"; // :contentReference[oaicite:1]{index=1}

// --- DOM
const grid = document.querySelector("#calendar-grid");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const modalAction = document.querySelector("#modal-action");
const modalClose = document.querySelector("#modal-close");

// --- State
let currentJoke = null; // { type, setup, delivery, joke }

function todayDayNumber() {
  // "Real" unlock in December:
  // return new Date().getMonth() === 11 ? new Date().getDate() : 0;

  // Hackathon mode: unlock all
  return 25;
}

function storageKey(day) {
  return `advent-joke-day-${day}`;
}

function markDoorOpened(day) {
  const door = grid.querySelector(`button[data-day="${day}"]`);
  if (door) door.classList.add("opened");
}

async function fetchJoke() {
  const url = `${JOKE_API}&type=single,twopart&blacklistFlags=nsfw,racist,sexist,explicit`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Joke fetch failed");

  const data = await res.json();
  if (data.error) throw new Error(data.message || "Joke API error");

  if (data.type === "single") {
    return { type: "single", joke: data.joke };
  }

  return { type: "twopart", setup: data.setup, delivery: data.delivery };
}

function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
  currentJoke = null;
  modalAction.textContent = "Tell me!";
  modalAction.style.display = "none";
}

// Only set up modal listeners if modal exists (calendar page)
if (modal && modalClose && modalAction) {
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  modalAction.addEventListener("click", () => {
    if (!currentJoke) return;

    // Reveal punchline for twopart
    if (currentJoke.type === "twopart") {
      modalBody.textContent = currentJoke.delivery;
      modalAction.style.display = "none";
    }
  });
}

function showJokeInModal(day, jokeObj) {
  currentJoke = jokeObj;
  openModal(`Day ${day}`);

  if (jokeObj.type === "single") {
    modalBody.textContent = jokeObj.joke;
    modalAction.style.display = "none";
  } else {
    modalBody.textContent = jokeObj.setup;
    modalAction.textContent = "Tell me!";
    modalAction.style.display = "inline-flex";
  }
}

function buildCalendar() {
  grid.innerHTML = "";
  const unlockedThrough = todayDayNumber();

  for (let day = 1; day <= DOOR_COUNT; day++) {
    const door = document.createElement("button");
    door.className = "door";
    door.type = "button";
    door.dataset.day = String(day);

    const isLocked = day > unlockedThrough;
    if (isLocked) {
      door.classList.add("locked");
      door.disabled = true;
      door.title = "Locked";
    }

    const saved = localStorage.getItem(storageKey(day));
    if (saved) door.classList.add("opened");

    door.innerHTML = `
      <span class="door-number">${day}</span>
      <span class="door-icon" aria-hidden="true">🎁</span>
    `;

    door.addEventListener("click", async () => {
      // If already opened, show saved joke instantly
      const cached = localStorage.getItem(storageKey(day));
      if (cached) {
        showJokeInModal(day, JSON.parse(cached));
        return;
      }

      door.classList.add("loading");
      try {
        const jokeObj = await fetchJoke();
        localStorage.setItem(storageKey(day), JSON.stringify(jokeObj));
        markDoorOpened(day);
        showJokeInModal(day, jokeObj);
      } catch {
        openModal(`Day ${day}`);
        modalBody.textContent = "Couldn’t load a joke. Try again.";
        modalAction.style.display = "none";
      } finally {
        door.classList.remove("loading");
      }
    });

    grid.appendChild(door);
  }
}

// Only build calendar if grid exists (calendar page)
if (grid) {
  buildCalendar();
}

// --------------------
// Snowfall (tuned)
// --------------------
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const isSmallScreen = window.matchMedia("(max-width: 520px)").matches;

if (!prefersReducedMotion) {
  const densityMs = isSmallScreen ? 320 : 220;

  function createSnowflake() {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.textContent = Math.random() < 0.12 ? "✦" : "❄";

    const size = 8 + Math.random() * 16;
    const duration = 9 + Math.random() * 16;
    const drift = (Math.random() * 2 - 1) * 50;

    snow.style.left = `${Math.random() * 100}vw`;
    snow.style.fontSize = `${size}px`;
    snow.style.opacity = `${0.25 + Math.random() * 0.6}`;
    snow.style.animationDuration = `${duration}s`;
    snow.style.setProperty("--drift", `${drift}px`);

    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), (duration + 2) * 1000);
  }

  setInterval(createSnowflake, densityMs);
}

// --------------------
// Festive Twinkling Lights Overlay
// --------------------
(function initTwinkleLayer() {
  const layer = document.querySelector("#twinkle-layer");
  if (!layer) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // More bulbs on wide screens, fewer on small laptops
  const width = window.innerWidth;
  const bulbCount = width < 700 ? 18 : width < 1100 ? 26 : 34;
  const sparkleCount = width < 700 ? 6 : 10;

  const colors = [
    { c: "rgba(255, 74, 74, 0.95)", g: "rgba(255, 120, 120, 0.9)" },  // red
    { c: "rgba(62, 220, 255, 0.95)", g: "rgba(140, 235, 255, 0.9)" }, // blue
    { c: "rgba(255, 214, 66, 0.95)", g: "rgba(255, 234, 140, 0.9)" }, // yellow
    { c: "rgba(120, 255, 160, 0.95)", g: "rgba(170, 255, 200, 0.9)" },// green
    { c: "rgba(255, 120, 210, 0.95)", g: "rgba(255, 180, 235, 0.9)" } // pink
  ];

  // Clear old bulbs on hot reload
  layer.innerHTML = "";

  // Place bulbs along a gentle curve (like a hanging string)
  for (let i = 0; i < bulbCount; i++) {
    const t = i / (bulbCount - 1);

    // x across the screen with a bit of randomness
    const x = (6 + t * 88) + (Math.random() * 2 - 1) * 1.5;

    // curve: lower in the middle
    const curve = Math.sin(t * Math.PI) * 26; // sag
    const y = 26 + curve + (Math.random() * 2 - 1) * 4;

    const size = 8 + Math.random() * 10; // px
    const dur = 1.6 + Math.random() * 2.8; // seconds
    const delay = (-Math.random() * 4).toFixed(2) + "s";

    const pick = colors[Math.floor(Math.random() * colors.length)];

    const bulb = document.createElement("div");
    bulb.className = "twinkle-bulb";
    bulb.style.setProperty("--x", `${x}vw`);
    bulb.style.setProperty("--y", `${y}px`);
    bulb.style.setProperty("--size", `${size}px`);
    bulb.style.setProperty("--dur", `${dur.toFixed(2)}s`);
    bulb.style.setProperty("--delay", delay);
    bulb.style.setProperty("--color", pick.c);
    bulb.style.setProperty("--glow", pick.g);

    layer.appendChild(bulb);
  }

  // Add a few sparkles for “festive”
  const sparkleChars = ["✦", "✧", "✨"];
  for (let i = 0; i < sparkleCount; i++) {
    const x = 10 + Math.random() * 80;
    const y = 20 + Math.random() * 70;
    const size = 12 + Math.random() * 10;
    const delay = (-Math.random() * 6).toFixed(2) + "s";

    const sp = document.createElement("div");
    sp.className = "twinkle-sparkle";
    sp.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    sp.style.setProperty("--x", `${x}vw`);
    sp.style.setProperty("--y", `${y}px`);
    sp.style.setProperty("--size", `${size}px`);
    sp.style.setProperty("--delay", delay);

    layer.appendChild(sp);
  }
})();

// --------------------
// Festive Music Toggle
// --------------------
(function initMusic() {
  const audio = document.querySelector("#bg-music");
  const btn = document.querySelector("#music-toggle");
  if (!audio || !btn) return;

  const KEY = "advent-music-enabled";

  function setUI(enabled) {
    btn.setAttribute("aria-pressed", String(enabled));
    btn.textContent = enabled ? "🔊 Music" : "🔇 Music";
  }

  async function enableMusic() {
    try {
      audio.volume = 0.25; // nice background level
      await audio.play();  // must be triggered by user click
      localStorage.setItem(KEY, "1");
      setUI(true);
    } catch {
      // If play fails, keep it off
      localStorage.setItem(KEY, "0");
      setUI(false);
    }
  }

  function disableMusic() {
    audio.pause();
    localStorage.setItem(KEY, "0");
    setUI(false);
  }

  btn.addEventListener("click", async () => {
    if (audio.paused) await enableMusic();
    else disableMusic();
  });

  // Remember preference (but don't autoplay if browser blocks it)
  const saved = localStorage.getItem(KEY);
  if (saved === "1") {
    setUI(true);
    // Try to resume only after first user interaction
    const resumeOnce = async () => {
      window.removeEventListener("pointerdown", resumeOnce);
      await enableMusic();
    };
    window.addEventListener("pointerdown", resumeOnce, { once: true });
  } else {
    setUI(false);
  }
})();
