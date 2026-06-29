"use strict";

/* =========================
   🧠 NEON OS CORE (CLEAN)
========================= */

const NeonOS = {
  z: 10,

  /* =========================
     🚀 INIT
  ========================= */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.cache();
      this.lockScreen();
      this.loadWallpaper();
      this.loadEffects();
      console.log("NeonOS Core (Clean) loaded 💜");
    });
  },

  /* =========================
     📦 CACHE
  ========================= */
  cache() {
    this.lock = document.getElementById("lockscreen");
    this.desktop = document.getElementById("desktop");
  },

  /* =========================
     🔒 LOCK SCREEN (SAFE)
  ========================= */
  lockScreen() {
    if (!this.lock || !this.desktop) return;

    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;

      this.lock.style.opacity = "0";
      this.lock.style.pointerEvents = "none";

      setTimeout(() => {
        this.lock.style.display = "none";
        this.desktop.style.display = "block";
      }, 250);
    };

    this.lock.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock, { once: true });
  },

  /* =========================
     🪟 WINDOW SYSTEM (STABLE)
  ========================= */
  createWindow(title, content) {
    const win = document.createElement("div");

    win.className = "window";
    win.style.position = "absolute";
    win.style.top = "120px";
    win.style.left = "120px";
    win.style.zIndex = this.z++;

    win.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <button class="close-btn">✖</button>
      </div>
      <div class="window-body">
        ${content}
      </div>
    `;

    document.body.appendChild(win);

    // close button
    win.querySelector(".close-btn").onclick = () => win.remove();

    this.makeDraggable(win);

    return win;
  },

  bringToFront(win) {
    win.style.zIndex = this.z++;
  },

  /* =========================
     🖱 DRAG (FIXED)
  ========================= */
  makeDraggable(win) {
    const header = win.querySelector(".window-header");
    if (!header) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {
      dragging = true;

      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;

      this.bringToFront(win);
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      dragging = false;
    });
  },

  /* =========================
     🎮 APPS
  ========================= */
  openLibrary() {
    this.createWindow("🎮 Library", `
      <button onclick="NeonOS.openGame('clicker')">🖱 Clicker</button>
      <button onclick="NeonOS.openGame('guess')">🎲 Guess</button>
      <button onclick="NeonOS.openGame('reaction')">⚡ Reaction</button>
    `);
  },

  openSettings() {
    this.createWindow("⚙ Settings", `
      <h3>🌌 Wallpapers</h3>

      <button onclick="NeonOS.setWallpaper('wallpapers/purple.jpg')">💜 Purple</button>
      <button onclick="NeonOS.setWallpaper('wallpapers/blue.jpg')">💙 Blue</button>
      <button onclick="NeonOS.setWallpaper('wallpapers/galaxy.jpg')">🌌 Galaxy</button>

      <h3>✨ Effects</h3>

      <button onclick="NeonOS.setEffect('stars')">⭐ Stars</button>
      <button onclick="NeonOS.setEffect('rain')">🌧 Rain</button>
      <button onclick="NeonOS.setEffect('particles')">✨ Particles</button>
      <button onclick="NeonOS.setEffect('none')">🚫 None</button>
    `);
  },

  /* =========================
     🎮 GAMES
  ========================= */
  openGame(type) {

    if (type === "clicker") {
      let count = 0;

      const win = this.createWindow("🖱 Clicker", `
        <p id="c">0</p>
        <button id="b">Click</button>
      `);

      const c = win.querySelector("#c");
      const b = win.querySelector("#b");

      b.onclick = () => {
        count++;
        c.textContent = count;
      };
    }

    if (type === "guess") {
      const secret = Math.floor(Math.random() * 5) + 1;

      const win = this.createWindow("🎲 Guess", `
        <input id="g" placeholder="1-5">
        <button id="b">Check</button>
        <p id="o"></p>
      `);

      win.querySelector("#b").onclick = () => {
        const val = +win.querySelector("#g").value;
        win.querySelector("#o").textContent =
          val === secret ? "Correct 🎉" : "Nope 💀";
      };
    }

    if (type === "reaction") {

      let start = Date.now();

      const win = this.createWindow("⚡ Reaction", `
        <button id="b">Click</button>
        <p id="o"></p>
      `);

      win.querySelector("#b").onclick = () => {
        const time = Date.now() - start;
        win.querySelector("#o").textContent = time + "ms";
        start = Date.now();
      };
    }
  },

  /* =========================
     🌌 WALLPAPER
  ========================= */
  setWallpaper(path) {
    const d = document.getElementById("desktop");
    if (!d) return;

    d.style.backgroundImage = `url('${path}')`;
    localStorage.setItem("wallpaper", path);
  },

  loadWallpaper() {
    const saved = localStorage.getItem("wallpaper");
    if (saved) this.setWallpaper(saved);
  },

  /* =========================
     ✨ EFFECTS (SIMPLE HOOK)
  ========================= */
  setEffect(effect) {
    localStorage.setItem("effect", effect);
    this.loadEffects();
  },

  loadEffects() {
    const fx = localStorage.getItem("effect");

    const layer = document.getElementById("desktopEffects");
    if (!layer) return;

    layer.innerHTML = "";

    if (fx === "stars") this.spawnStars(layer);
    if (fx === "rain") this.spawnRain(layer);
    if (fx === "particles") this.spawnParticles(layer);
  },

  spawnStars(layer) {
    for (let i = 0; i < 50; i++) {
      const s = document.createElement("div");
      s.className = "star";
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = Math.random() * 100 + "vh";
      layer.appendChild(s);
    }
  },

  spawnRain(layer) {
    for (let i = 0; i < 60; i++) {
      const r = document.createElement("div");
      r.className = "rain-drop";
      r.style.left = Math.random() * 100 + "vw";
      layer.appendChild(r);
    }
  },

  spawnParticles(layer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "vw";
      layer.appendChild(p);
    }
  }
};

NeonOS.init();
