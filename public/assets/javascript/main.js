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

buildCalendar();

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
