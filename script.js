/**
 * King David — Cinematic Animation Engine
 * Handles scene transitions, narration, canvas effects, and Psalm recitation.
 */

// ─── Psalm Data (inlined for single-file deployability) ──────────────────────

const PSALM_91 = [
  { verse: 1,  text: "He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty." },
  { verse: 2,  text: "I will say of the Lord, \"He is my refuge and my fortress; my God, in Him I will trust.\"" },
  { verse: 3,  text: "Surely He shall deliver you from the snare of the fowler and from the perilous pestilence." },
  { verse: 4,  text: "He shall cover you with His feathers, and under His wings you shall take refuge; His truth shall be your shield and buckler." },
  { verse: 5,  text: "You shall not be afraid of the terror by night, nor of the arrow that flies by day," },
  { verse: 6,  text: "nor of the pestilence that walks in darkness, nor of the destruction that lays waste at noonday." },
  { verse: 7,  text: "A thousand may fall at your side, and ten thousand at your right hand; but it shall not come near you." },
  { verse: 8,  text: "Only with your eyes shall you look, and see the reward of the wicked." },
  { verse: 9,  text: "Because you have made the Lord, who is my refuge, even the Most High, your dwelling place," },
  { verse: 10, text: "no evil shall befall you, nor shall any plague come near your dwelling;" },
  { verse: 11, text: "for He shall give His angels charge over you, to keep you in all your ways." },
  { verse: 12, text: "In their hands they shall bear you up, lest you dash your foot against a stone." },
  { verse: 13, text: "You shall tread upon the lion and the cobra, the young lion and the serpent you shall trample underfoot." },
  { verse: 14, text: "\"Because he has set his love upon Me, therefore I will deliver him; I will set him on high, because he has known My name.\"" },
  { verse: 15, text: "\"He shall call upon Me, and I will answer him; I will be with him in trouble; I will deliver him and honor him.\"" },
  { verse: 16, text: "\"With long life I will satisfy him, and show him My salvation.\"" },
];

const PSALM_23 = [
  { verse: 1, text: "The Lord is my shepherd; I shall not want." },
  { verse: 2, text: "He makes me to lie down in green pastures; He leads me beside the still waters." },
  { verse: 3, text: "He restores my soul; He leads me in the paths of righteousness for His name's sake." },
  { verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me." },
  { verse: 5, text: "You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over." },
  { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life; and I will dwell in the house of the Lord forever." },
];

// ─── Scene Definitions ────────────────────────────────────────────────────────

const SCENES = [
  {
    id: "prologue",
    title: "The Fields of Bethlehem",
    subtitle: "A story of a boy forgotten by the world — but not by God.",
    scripture: "Psalm 91:1",
    palette: { sky: "#1a0a2e", ground: "#2d1a0a", accent: "#c8860a" },
    elements: ["stars", "hills", "moon"],
    narration: "In the rolling hills outside Bethlehem, while his older brothers feasted in Jesse's house, a young boy named David watched over his father's flock beneath a vast, indifferent sky.",
    psalm91verse: 1,
  },
  {
    id: "wilderness",
    title: "Life in the Wilderness",
    subtitle: "Forgotten by family. Found by God.",
    scripture: "1 Samuel 16:11",
    palette: { sky: "#0d1a0d", ground: "#1a2e0a", accent: "#4a7a1a" },
    elements: ["stars", "hills", "flock", "david"],
    narration: "Jesse had eight sons. When the prophet came, he presented seven — never thinking to call the youngest. David was out in the fields: hungry, cold, overlooked. His brothers wore fine linen while he wore dust and wool.",
    psalm91verse: 3,
  },
  {
    id: "lion",
    title: "The Lion & The Bear",
    subtitle: "God trained His champion in secret.",
    scripture: "1 Samuel 17:34–35",
    palette: { sky: "#0a0a0a", ground: "#1a0d00", accent: "#cc3300" },
    elements: ["stars", "hills", "fire", "beast"],
    narration: "Alone in the wilderness, David faced terrors no one witnessed. A lion seized a lamb. With bare hands and the power of God, David seized the lion by its beard and struck it down. Then came the bear — and it too fell.",
    psalm91verse: 13,
  },
  {
    id: "cold-nights",
    title: "Cold Nights — Hunger & Thirst",
    subtitle: "The making of a king.",
    scripture: "Psalm 91:5–6",
    palette: { sky: "#050510", ground: "#0a0a1a", accent: "#3a3a8a" },
    elements: ["stars", "snow", "david-fire", "moon"],
    narration: "Winter nights on the Judean hills are bitter. David huddled beside embers, stomach empty, lips cracked from thirst. No crown. No comfort. Only God — and the stars He painted.",
    psalm91verse: 5,
  },
  {
    id: "samuel-visit",
    title: "The Prophet Comes to Jesse's House",
    subtitle: "God sees what man overlooks.",
    scripture: "1 Samuel 16:1",
    palette: { sky: "#1a0a00", ground: "#2e1a00", accent: "#d4a017" },
    elements: ["house", "crowd", "light"],
    narration: "The aged prophet Samuel arrived in Bethlehem bearing a horn of oil. God's voice was clear: the next king of Israel lives in Jesse's house. Jesse proudly lined up seven strong, handsome sons.",
    psalm91verse: 9,
  },
  {
    id: "jesse-forgets",
    title: "Jesse Forgets David",
    subtitle: "The rejected stone becomes the cornerstone.",
    scripture: "1 Samuel 16:11 — \"There remains yet the youngest…\"",
    palette: { sky: "#0a0505", ground: "#1a0a0a", accent: "#8b0000" },
    elements: ["house", "brothers", "samuel-stands"],
    narration: "One by one, Samuel looked at Jesse's sons — and God said no. Seven times. Samuel asked: \"Are all your children here?\" Jesse had forgotten entirely. \"There remains yet the youngest, but he is out tending the sheep.\"",
    psalm91verse: 10,
  },
  {
    id: "anointed",
    title: "David Is Anointed",
    subtitle: "From the field to destiny.",
    scripture: "1 Samuel 16:13",
    palette: { sky: "#1a1000", ground: "#2a1800", accent: "#ffd700" },
    elements: ["house", "david-kneels", "oil", "light-beam"],
    narration: "They sent for him. David came in — ruddy, bright-eyed, handsome. God said: \"Arise, anoint him; for this is the one!\" Samuel poured the oil. The Spirit of the Lord came upon David from that day forward.",
    psalm91verse: 14,
  },
  {
    id: "goliath-challenge",
    title: "Goliath's Challenge",
    subtitle: "Nine feet of bronze-clad blasphemy.",
    scripture: "1 Samuel 17:10",
    palette: { sky: "#0d0000", ground: "#1a0000", accent: "#8b0000" },
    elements: ["valley", "armies", "goliath"],
    narration: "For forty days, the Philistine giant Goliath strode into the Valley of Elah. His voice shook the earth: \"I defy the armies of Israel! Give me a man that we may fight!\" He cursed Israel's God. Every soldier trembled.",
    psalm91verse: 7,
  },
  {
    id: "david-vs-goliath",
    title: "David vs. Goliath",
    subtitle: "Five smooth stones. One God. No giant stands.",
    scripture: "1 Samuel 17:45–47",
    palette: { sky: "#1a0a00", ground: "#2a1000", accent: "#ffa500" },
    elements: ["valley", "david-runs", "sling", "goliath-falls"],
    narration: "\"You come to me with sword and spear,\" David cried, \"but I come to you in the name of the LORD of hosts!\" The stone flew. The ground shook. Goliath fell face down — and all the earth knew there is a God in Israel.",
    psalm91verse: 13,
  },
  {
    id: "saul-hunts",
    title: "King Saul Hunts David",
    subtitle: "Chased through deserts and caves.",
    scripture: "1 Samuel 23:14",
    palette: { sky: "#050510", ground: "#0a0a15", accent: "#4444cc" },
    elements: ["caves", "soldiers", "david-hides"],
    narration: "The king who once loved David now hurled spears at him. For years David fled — through the wilderness of Ziph, the desert of Maon, the caves of En Gedi. A thousand soldiers hunted one man. Yet God's hand held him.",
    psalm91verse: 7,
  },
  {
    id: "throne",
    title: "Ascending the Golden Throne of Israel",
    subtitle: "From muddy waters to a golden throne.",
    scripture: "2 Samuel 5:3–4",
    palette: { sky: "#1a1000", ground: "#2e1c00", accent: "#ffd700" },
    elements: ["palace", "throne", "crown", "light-rays"],
    narration: "All the elders of Israel came to Hebron and anointed David king over all Israel. The boy the world forgot had become the shepherd-king of God's nation. The wilderness was His school. The throne was His graduation.",
    psalm91verse: 16,
    showPsalm23: true,
  },
  {
    id: "psalm23-scene",
    title: "Psalm 23 — The Shepherd King Speaks",
    subtitle: "How God raises a nobody from the muddy waters to the golden throne.",
    scripture: "Psalm 23 (Full)",
    palette: { sky: "#0a0a1a", ground: "#0a1a0a", accent: "#ffd700" },
    elements: ["throne", "stars", "light"],
    narration: "",
    psalm91verse: 16,
    recitePsalm23: true,
  },
  {
    id: "epilogue",
    title: "The Story Is Never About the Giant",
    subtitle: "It is always about the God who stands behind the shepherd boy.",
    scripture: "Psalm 91 (Full)",
    palette: { sky: "#000010", ground: "#000a00", accent: "#aaaaff" },
    elements: ["stars", "throne-silhouette", "flock"],
    narration: "From shepherd to king. From forgotten to anointed. From hunted to honoured. The God of Psalm 91 never changed. He was there in the wilderness. He was there against the lion. He was there in the cave. He is here now.",
    psalm91verse: 1,
    recitePsalm91: true,
  },
];

// ─── Canvas Particle System ───────────────────────────────────────────────────

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  seed(type, palette) {
    this.particles = [];
    this.type = type;
    this.palette = palette;
    const count = type === "stars" ? 180 : type === "embers" ? 60 : type === "snow" ? 90 : 40;
    for (let i = 0; i < count; i++) {
      this.particles.push(this._make(type, true));
    }
  }

  _make(type, spread = false) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    if (type === "stars") {
      return {
        x: Math.random() * w, y: spread ? Math.random() * h * 0.65 : -2,
        r: Math.random() * 1.8 + 0.3, speed: 0, twinkle: Math.random() * Math.PI * 2,
        color: `hsl(${200 + Math.random() * 80}, 60%, ${70 + Math.random() * 30}%)`,
      };
    }
    if (type === "embers") {
      return {
        x: w * 0.5 + (Math.random() - 0.5) * 60,
        y: spread ? Math.random() * h : h * 0.7,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        drift: (Math.random() - 0.5) * 0.8,
        alpha: Math.random(),
        color: `hsl(${20 + Math.random() * 30}, 100%, ${50 + Math.random() * 30}%)`,
      };
    }
    if (type === "snow") {
      return {
        x: Math.random() * w, y: spread ? Math.random() * h : -5,
        r: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.8 + 0.3,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.8 + 0.2,
      };
    }
    // gold dust
    return {
      x: Math.random() * w, y: spread ? Math.random() * h : h + 5,
      r: Math.random() * 2 + 0.5,
      speed: -(Math.random() * 0.6 + 0.2),
      alpha: Math.random(),
      color: `hsl(${40 + Math.random() * 20}, 100%, ${60 + Math.random() * 30}%)`,
    };
  }

  _update() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.particles.forEach((p, i) => {
      const t = this.type;
      if (t === "stars") {
        p.twinkle += 0.03;
      } else if (t === "embers") {
        p.y -= p.speed;
        p.x += p.drift;
        p.alpha -= 0.005;
        if (p.y < 0 || p.alpha <= 0) this.particles[i] = this._make(t);
      } else if (t === "snow") {
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > h) this.particles[i] = this._make(t);
      } else {
        p.y += p.speed;
        p.alpha -= 0.004;
        if (p.y < 0 || p.alpha <= 0) this.particles[i] = this._make(t);
      }
    });
  }

  _draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = this.type === "stars"
        ? 0.5 + 0.5 * Math.sin(p.twinkle)
        : (p.alpha !== undefined ? Math.max(0, p.alpha) : 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color || "white";
      ctx.fill();
      ctx.restore();
    });
  }

  start(type, palette) {
    this.stop();
    this.seed(type, palette);
    const loop = () => {
      this._update();
      this._draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}

// ─── Scene Renderer ───────────────────────────────────────────────────────────

class SceneRenderer {
  constructor() {
    this.current = 0;
    this.psalm91Index = 0;
    this.psalm23Index = 0;
    this.autoTimer = null;
    this.psalm91Timer = null;

    this.canvas = document.getElementById("particle-canvas");
    this.particles = new ParticleSystem(this.canvas);

    this.titleEl = document.getElementById("scene-title");
    this.subtitleEl = document.getElementById("scene-subtitle");
    this.scriptureEl = document.getElementById("scene-scripture");
    this.narrationEl = document.getElementById("scene-narration");
    this.sceneEl = document.getElementById("scene");
    this.psalm91El = document.getElementById("psalm91-strip");
    this.psalm23ContainerEl = document.getElementById("psalm23-container");
    this.psalm23TextEl = document.getElementById("psalm23-text");
    this.progressEl = document.getElementById("progress-bar");
    this.sceneCounterEl = document.getElementById("scene-counter");
    this.prevBtn = document.getElementById("btn-prev");
    this.nextBtn = document.getElementById("btn-next");
    this.playBtn = document.getElementById("btn-play");

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
    this.playBtn.addEventListener("click", () => this.toggleAuto());

    this.renderScene(0);
    this.startPsalm91Ticker();
  }

  // ── Psalm 91 rolling strip ────────────────────────────────────────────────

  startPsalm91Ticker() {
    let idx = 0;
    const tick = () => {
      const v = PSALM_91[idx % PSALM_91.length];
      this.psalm91El.innerHTML =
        `<span class="p91-label">Psalm 91:${v.verse}</span> ${this._escape(v.text)}`;
      this.psalm91El.classList.remove("p91-fade");
      void this.psalm91El.offsetWidth; // reflow
      this.psalm91El.classList.add("p91-fade");
      idx++;
    };
    tick();
    this.psalm91Timer = setInterval(tick, 7000);
  }

  // ── Scene Navigation ──────────────────────────────────────────────────────

  renderScene(index) {
    const scene = SCENES[index];
    const prev = SCENES[this.current];

    // Fade out
    this.sceneEl.classList.add("scene-exit");

    setTimeout(() => {
      this.current = index;

      // Update background gradient
      document.body.style.setProperty("--sky", scene.palette.sky);
      document.body.style.setProperty("--ground", scene.palette.ground);
      document.body.style.setProperty("--accent", scene.palette.accent);

      // Update text
      this.titleEl.textContent = scene.title;
      this.subtitleEl.textContent = scene.subtitle;
      this.scriptureEl.textContent = scene.scripture;
      this.narrationEl.textContent = scene.narration;

      // Counter & progress
      this.sceneCounterEl.textContent = `${index + 1} / ${SCENES.length}`;
      this.progressEl.style.width = `${((index + 1) / SCENES.length) * 100}%`;

      // Particles
      const pType = scene.elements.includes("snow") ? "snow"
        : scene.elements.includes("fire") || scene.elements.includes("embers") ? "embers"
        : scene.elements.includes("stars") ? "stars"
        : "gold";
      this.particles.start(pType, scene.palette);

      // Psalm 23 recitation
      if (scene.recitePsalm23) {
        this.showPsalm23();
      } else {
        this.hidePsalm23();
        if (scene.narration) {
          this.narrationEl.textContent = scene.narration;
        }
      }

      // SVG illustration
      this._drawIllustration(scene);

      // Fade in
      this.sceneEl.classList.remove("scene-exit");
      this.sceneEl.classList.add("scene-enter");
      setTimeout(() => this.sceneEl.classList.remove("scene-enter"), 800);

      // Navigation state
      this.prevBtn.disabled = index === 0;
      this.nextBtn.disabled = index === SCENES.length - 1;
    }, 400);
  }

  next() {
    if (this.current < SCENES.length - 1) this.renderScene(this.current + 1);
  }

  prev() {
    if (this.current > 0) this.renderScene(this.current - 1);
  }

  toggleAuto() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
      this.playBtn.textContent = "▶ Auto-Play";
      this.playBtn.classList.remove("playing");
    } else {
      this.playBtn.textContent = "⏸ Pause";
      this.playBtn.classList.add("playing");
      this.autoTimer = setInterval(() => {
        if (this.current < SCENES.length - 1) {
          this.next();
        } else {
          this.renderScene(0);
        }
      }, 12000);
    }
  }

  // ── Psalm 23 Recitation ───────────────────────────────────────────────────

  showPsalm23() {
    this.narrationEl.textContent = "";
    this.psalm23ContainerEl.style.display = "block";
    this.psalm23ContainerEl.classList.add("psalm-fade-in");
    let idx = 0;
    this.psalm23TextEl.innerHTML = "";
    const tick = () => {
      if (idx >= PSALM_23.length) return;
      const v = PSALM_23[idx];
      const span = document.createElement("p");
      span.className = "psalm23-verse";
      span.innerHTML = `<sup>${v.verse}</sup> ${this._escape(v.text)}`;
      this.psalm23TextEl.appendChild(span);
      span.classList.add("verse-appear");
      idx++;
      if (idx < PSALM_23.length) setTimeout(tick, 3200);
    };
    tick();
  }

  hidePsalm23() {
    this.psalm23ContainerEl.style.display = "none";
    this.psalm23ContainerEl.classList.remove("psalm-fade-in");
    this.psalm23TextEl.innerHTML = "";
  }

  // ── SVG Illustrations ────────────────────────────────────────────────────

  _drawIllustration(scene) {
    const svg = document.getElementById("scene-svg");
    svg.innerHTML = "";

    const w = 900, h = 420;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const sky = scene.palette.sky;
    const ground = scene.palette.ground;
    const accent = scene.palette.accent;

    const draw = (tag, attrs, text) => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (text !== undefined) el.textContent = text;
      svg.appendChild(el);
      return el;
    };

    // Sky gradient background
    const defs = draw("defs", {});
    const skyGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    skyGrad.setAttribute("id", "skyGrad");
    skyGrad.setAttribute("x1", "0"); skyGrad.setAttribute("y1", "0");
    skyGrad.setAttribute("x2", "0"); skyGrad.setAttribute("y2", "1");
    const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s1.setAttribute("offset", "0%"); s1.setAttribute("stop-color", sky);
    const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s2.setAttribute("offset", "100%"); s2.setAttribute("stop-color", this._lighten(sky, 20));
    skyGrad.appendChild(s1); skyGrad.appendChild(s2);
    defs.appendChild(skyGrad);
    draw("rect", { x: 0, y: 0, width: w, height: h, fill: "url(#skyGrad)" });

    // Ground
    draw("rect", { x: 0, y: h * 0.68, width: w, height: h * 0.32, fill: ground, rx: 0 });

    // Scene-specific illustrations
    switch (scene.id) {
      case "prologue":
      case "wilderness":
      case "cold-nights":
        this._drawWilderness(draw, w, h, accent, scene.id);
        break;
      case "lion":
        this._drawLionScene(draw, w, h, accent);
        break;
      case "samuel-visit":
      case "jesse-forgets":
        this._drawHouseScene(draw, w, h, accent, scene.id === "jesse-forgets");
        break;
      case "anointed":
        this._drawAnointingScene(draw, w, h, accent);
        break;
      case "goliath-challenge":
        this._drawGoliathScene(draw, w, h, accent, false);
        break;
      case "david-vs-goliath":
        this._drawGoliathScene(draw, w, h, accent, true);
        break;
      case "saul-hunts":
        this._drawCaveScene(draw, w, h, accent);
        break;
      case "throne":
      case "psalm23-scene":
        this._drawThroneScene(draw, w, h, accent);
        break;
      case "epilogue":
        this._drawEpilogueScene(draw, w, h, accent);
        break;
    }
  }

  _drawWilderness(draw, w, h, accent, variant) {
    // Hills silhouette
    draw("ellipse", { cx: 150, cy: h * 0.68, rx: 220, ry: 80, fill: "#1a3a0a", opacity: 0.7 });
    draw("ellipse", { cx: 750, cy: h * 0.68, rx: 200, ry: 70, fill: "#1a3a0a", opacity: 0.6 });
    // Moon
    draw("circle", { cx: 750, cy: 80, r: 45, fill: "#fffff0", opacity: 0.85 });
    draw("circle", { cx: 770, cy: 68, r: 40, fill: this._lighten("#1a0a2e", 10), opacity: 0.95 });

    // Sheep flock
    const sheepPositions = [[320, h * 0.64], [370, h * 0.66], [290, h * 0.67], [420, h * 0.65], [460, h * 0.67]];
    sheepPositions.forEach(([x, y]) => this._drawSheep(draw, x, y));

    // David silhouette (shepherd boy)
    this._drawDavidSilhouette(draw, 200, h * 0.55, accent, variant === "cold-nights");

    if (variant === "cold-nights") {
      // Camp fire
      draw("ellipse", { cx: 230, cy: h * 0.74, rx: 18, ry: 6, fill: "#cc4400", opacity: 0.8 });
      draw("polygon", { points: `222,${h * 0.74} 230,${h * 0.65} 238,${h * 0.74}`, fill: "#ff6600", opacity: 0.9 });
      draw("polygon", { points: `226,${h * 0.74} 230,${h * 0.68} 234,${h * 0.74}`, fill: "#ffaa00", opacity: 0.9 });
    }
  }

  _drawLionScene(draw, w, h, accent) {
    // Rocks
    draw("ellipse", { cx: 500, cy: h * 0.72, rx: 120, ry: 35, fill: "#3a2a10", opacity: 0.9 });
    draw("ellipse", { cx: 300, cy: h * 0.74, rx: 90, ry: 28, fill: "#2a1a08", opacity: 0.8 });

    // Lion silhouette
    this._drawLion(draw, 550, h * 0.6, accent);

    // David with staff raised
    this._drawDavidFighting(draw, 380, h * 0.56, accent);

    // Moon / dramatic sky
    draw("circle", { cx: 450, cy: 70, r: 30, fill: "#cc3300", opacity: 0.6 });

    // Dramatic glow
    draw("circle", { cx: 450, cy: 70, r: 60, fill: "none", stroke: "#cc3300", "stroke-width": "2", opacity: 0.3 });
  }

  _drawHouseScene(draw, w, h, accent, forgottenVariant) {
    // House
    draw("rect", { x: 350, y: h * 0.3, width: 250, height: h * 0.38, fill: "#5a3a10", rx: 4 });
    draw("polygon", { points: `340,${h * 0.3} 475,${h * 0.1} 610,${h * 0.3}`, fill: "#4a2a08" });
    // Door
    draw("rect", { x: 450, y: h * 0.5, width: 50, height: h * 0.18, fill: "#2a1a00", rx: 3 });
    // Windows with light
    draw("rect", { x: 370, y: h * 0.37, width: 50, height: 40, fill: "#ffcc44", rx: 3, opacity: 0.9 });
    draw("rect", { x: 540, y: h * 0.37, width: 50, height: 40, fill: "#ffcc44", rx: 3, opacity: 0.9 });
    // Samuel figure
    this._drawSamuel(draw, 290, h * 0.45, accent);
    // Brothers silhouettes inside
    [410, 450, 490, 530, 570].forEach(x => {
      draw("ellipse", { cx: x, cy: h * 0.42, rx: 12, ry: 30, fill: "#2a1a00", opacity: 0.8 });
      draw("circle", { cx: x, cy: h * 0.35, r: 12, fill: "#3a2a10", opacity: 0.8 });
    });

    if (forgottenVariant) {
      // Question mark / empty space
      draw("text", { x: 150, y: h * 0.55, fill: "#ffaa00", "font-size": "48", opacity: 0.9, "font-family": "serif" }, "?");
      draw("text", { x: 80, y: h * 0.7, fill: "#cccccc", "font-size": "14", opacity: 0.8, "font-family": "serif" }, "Where is David…?");
    }
  }

  _drawAnointingScene(draw, w, h, accent) {
    // Beam of light from above
    draw("polygon", { points: `420,0 480,0 540,${h * 0.7} 360,${h * 0.7}`, fill: "#ffd700", opacity: 0.15 });
    draw("polygon", { points: `440,0 460,0 500,${h * 0.7} 400,${h * 0.7}`, fill: "#ffd700", opacity: 0.15 });

    // Samuel and David
    this._drawSamuel(draw, 350, h * 0.45, accent);
    this._drawDavidKneeling(draw, 500, h * 0.5, accent);

    // Oil drip
    draw("path", { d: `M 390 ${h * 0.35} Q 430 ${h * 0.42} 500 ${h * 0.48}`, stroke: "#ffd700", "stroke-width": "3", fill: "none", opacity: 0.9 });
    draw("circle", { cx: 500, cy: h * 0.48, r: 8, fill: "#ffd700", opacity: 0.9 });

    // Glow around David
    draw("circle", { cx: 500, cy: h * 0.45, r: 80, fill: "none", stroke: "#ffd700", "stroke-width": "2", opacity: 0.5 });
  }

  _drawGoliathScene(draw, w, h, accent, battle) {
    // Valley
    draw("ellipse", { cx: 450, cy: h * 0.82, rx: 380, ry: 60, fill: "#2a1500", opacity: 0.6 });

    // Army banners left
    [60, 100, 140].forEach(x => {
      draw("line", { x1: x, y1: h * 0.7, x2: x, y2: h * 0.4, stroke: "#884400", "stroke-width": "3" });
      draw("rect", { x: x, y: h * 0.4, width: 30, height: 20, fill: "#cc6600" });
    });

    // Goliath — enormous silhouette
    const gx = battle ? 600 : 620;
    const gy = battle ? h * 0.62 : h * 0.6;
    this._drawGoliath(draw, gx, gy, accent, battle);

    // David — small but bold
    if (battle) {
      this._drawDavidFighting(draw, 280, h * 0.64, accent);
      // Stone trajectory
      draw("path", { d: `M 310 ${h * 0.6} Q 450 ${h * 0.25} ${gx - 20} ${gy - 60}`, stroke: "#ffd700", "stroke-width": "2", "stroke-dasharray": "6 4", fill: "none", opacity: 0.8 });
    } else {
      // David watching
      this._drawDavidSilhouette(draw, 270, h * 0.64, accent, false);
    }
  }

  _drawCaveScene(draw, w, h, accent) {
    // Cave mouth
    draw("ellipse", { cx: 220, cy: h * 0.65, rx: 130, ry: 80, fill: "#050510", opacity: 0.95 });
    draw("ellipse", { cx: 220, cy: h * 0.65, rx: 100, ry: 60, fill: "#02020a" });

    // Rock formations
    draw("polygon", { points: `90,${h * 0.68} 150,${h * 0.45} 210,${h * 0.68}`, fill: "#2a2a3a" });
    draw("polygon", { points: `200,${h * 0.68} 280,${h * 0.38} 350,${h * 0.68}`, fill: "#252535" });

    // David hiding inside cave — tiny silhouette
    draw("ellipse", { cx: 195, cy: h * 0.68, rx: 10, ry: 22, fill: "#8888cc", opacity: 0.7 });
    draw("circle", { cx: 195, cy: h * 0.63, r: 9, fill: "#9999cc", opacity: 0.7 });

    // Soldiers with torches outside (right side)
    [580, 640, 700].forEach((x, i) => {
      draw("ellipse", { cx: x, cy: h * 0.66, rx: 12, ry: 28, fill: "#3a3a5a" });
      draw("circle", { cx: x, cy: h * 0.59, r: 10, fill: "#3a3a5a" });
      // Torch
      draw("line", { x1: x + 12, y1: h * 0.68, x2: x + 22, y2: h * 0.52, stroke: "#996633", "stroke-width": "3" });
      draw("circle", { cx: x + 22, cy: h * 0.52, r: 7, fill: "#ff6600", opacity: 0.9 });
    });

    draw("text", { x: 520, y: h * 0.3, fill: "#6666aa", "font-size": "13", "font-family": "serif", opacity: 0.8 }, "Saul's soldiers search…");
  }

  _drawThroneScene(draw, w, h, accent) {
    // Rays of glory
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x2 = 450 + Math.cos(angle) * 350;
      const y2 = h * 0.4 + Math.sin(angle) * 350;
      draw("line", { x1: 450, y1: h * 0.4, x2, y2, stroke: "#ffd700", "stroke-width": "1.5", opacity: 0.2 });
    }

    // Throne base
    draw("rect", { x: 360, y: h * 0.4, width: 180, height: h * 0.28, fill: "#7a5a00", rx: 8 });
    draw("rect", { x: 340, y: h * 0.34, width: 220, height: 28, fill: "#9a7a10", rx: 4 });

    // Throne back
    draw("rect", { x: 380, y: h * 0.18, width: 140, height: h * 0.22, fill: "#8a6a00", rx: 6 });

    // Crown
    draw("polygon", { points: `410,${h * 0.18} 420,${h * 0.1} 450,${h * 0.16} 480,${h * 0.1} 490,${h * 0.18}`, fill: "#ffd700" });

    // Jewels on crown
    [[420, h * 0.15], [450, h * 0.13], [480, h * 0.15]].forEach(([x, y]) => {
      draw("circle", { cx: x, cy: y, r: 5, fill: "#cc0000" });
    });

    // David on throne
    draw("ellipse", { cx: 450, cy: h * 0.52, rx: 30, ry: 55, fill: "#5a3a8a" });
    draw("circle", { cx: 450, cy: h * 0.44, r: 20, fill: "#6a4a9a" });

    // Scepter
    draw("line", { x1: 480, y1: h * 0.42, x2: 530, y2: h * 0.35, stroke: "#ffd700", "stroke-width": "4" });
    draw("circle", { cx: 530, cy: h * 0.35, r: 8, fill: "#ffd700" });

    // Glow
    draw("circle", { cx: 450, cy: h * 0.4, r: 120, fill: "none", stroke: "#ffd700", "stroke-width": "3", opacity: 0.4 });
    draw("circle", { cx: 450, cy: h * 0.4, r: 160, fill: "none", stroke: "#ffd700", "stroke-width": "1", opacity: 0.2 });
  }

  _drawEpilogueScene(draw, w, h, accent) {
    // Starfield background (static)
    for (let i = 0; i < 60; i++) {
      draw("circle", { cx: Math.random() * w, cy: Math.random() * h * 0.65, r: Math.random() * 2 + 0.3, fill: "white", opacity: Math.random() * 0.8 + 0.2 });
    }
    // Hills silhouette
    draw("ellipse", { cx: 200, cy: h * 0.68, rx: 250, ry: 80, fill: "#0a2a0a", opacity: 0.8 });
    draw("ellipse", { cx: 700, cy: h * 0.68, rx: 220, ry: 70, fill: "#0a2a0a", opacity: 0.7 });

    // Throne silhouette in centre (far)
    draw("rect", { x: 410, y: h * 0.42, width: 80, height: h * 0.26, fill: "#3a2a00", opacity: 0.8, rx: 3 });
    draw("polygon", { points: `400,${h * 0.42} 450,${h * 0.28} 500,${h * 0.42}`, fill: "#4a3800", opacity: 0.8 });

    // Sheep far left
    [100, 140, 175].forEach(x => this._drawSheep(draw, x, h * 0.72));

    // Glow from throne
    draw("circle", { cx: 450, cy: h * 0.42, r: 90, fill: "none", stroke: accent, "stroke-width": "2", opacity: 0.35 });

    // Text
    draw("text", { x: 450, y: h * 0.92, fill: accent, "font-size": "16", "font-family": "serif", "text-anchor": "middle", opacity: 0.9 }, "\"From the field to the throne — by the grace of God.\"");
  }

  // ── Character Helpers ─────────────────────────────────────────────────────

  _drawDavidSilhouette(draw, x, y, accent, cold) {
    // Staff
    draw("line", { x1: x + 20, y1: y, x2: x + 22, y2: y + 80, stroke: "#8a5a20", "stroke-width": "4" });
    // Body
    draw("ellipse", { cx: x, cy: y + 40, rx: 16, ry: 35, fill: cold ? "#3a3a6a" : "#5a3a0a" });
    // Head
    draw("circle", { cx: x, cy: y + 8, r: 14, fill: cold ? "#4a4a7a" : "#6a4a1a" });
  }

  _drawDavidFighting(draw, x, y, accent) {
    draw("ellipse", { cx: x, cy: y + 40, rx: 16, ry: 35, fill: "#5a3a0a" });
    draw("circle", { cx: x, cy: y + 8, r: 14, fill: "#6a4a1a" });
    // Raised arm with sling
    draw("line", { x1: x + 14, y1: y + 22, x2: x + 50, y2: y - 10, stroke: "#8a5a20", "stroke-width": "3" });
    draw("circle", { cx: x + 52, cy: y - 12, r: 5, fill: "#aaaaaa" });
  }

  _drawDavidKneeling(draw, x, y, accent) {
    draw("ellipse", { cx: x, cy: y + 30, rx: 16, ry: 25, fill: "#5a3a0a" });
    draw("circle", { cx: x, cy: y + 8, r: 14, fill: "#6a4a1a" });
    // Bowed head indicator
    draw("ellipse", { cx: x, cy: y + 18, rx: 14, ry: 8, fill: "#6a4a1a", opacity: 0.8 });
  }

  _drawSamuel(draw, x, y, accent) {
    // Robe
    draw("ellipse", { cx: x, cy: y + 40, rx: 20, ry: 42, fill: "#4a3a1a" });
    // Head with long hair/beard
    draw("circle", { cx: x, cy: y + 6, r: 16, fill: "#5a4a2a" });
    // Beard
    draw("ellipse", { cx: x, cy: y + 20, rx: 12, ry: 15, fill: "#6a5a3a", opacity: 0.8 });
    // Staff/horn
    draw("line", { x1: x - 20, y1: y, x2: x - 22, y2: y + 80, stroke: "#8a5a20", "stroke-width": "4" });
    draw("ellipse", { cx: x - 22, cy: y, rx: 8, ry: 12, fill: "#cc9900", opacity: 0.9 });
  }

  _drawLion(draw, x, y, accent) {
    // Body
    draw("ellipse", { cx: x, cy: y + 20, rx: 55, ry: 28, fill: "#8a5a00" });
    // Head
    draw("circle", { cx: x - 30, cy: y + 5, r: 28, fill: "#8a5a00" });
    // Mane
    draw("circle", { cx: x - 30, cy: y + 5, r: 35, fill: "#6a3a00", opacity: 0.7 });
    // Eyes
    draw("circle", { cx: x - 40, cy: y, r: 5, fill: "#ffcc00" });
    draw("circle", { cx: x - 18, cy: y, r: 5, fill: "#ffcc00" });
    // Open mouth
    draw("path", { d: `M ${x - 45} ${y + 12} Q ${x - 30} ${y + 24} ${x - 14} ${y + 12}`, stroke: "#cc0000", "stroke-width": "2", fill: "none" });
  }

  _drawGoliath(draw, x, y, accent, fallen) {
    if (fallen) {
      // Fallen Goliath
      draw("ellipse", { cx: x - 30, cy: y + 60, rx: 70, ry: 25, fill: "#5a3a1a" });
      draw("circle", { cx: x + 30, cy: y + 48, r: 25, fill: "#5a3a1a" });
      draw("circle", { cx: x + 30, cy: y + 40, r: 8, fill: "#cc0000", opacity: 0.8 }); // wound
    } else {
      // Standing Goliath — very tall
      draw("ellipse", { cx: x, cy: y + 20, rx: 32, ry: 70, fill: "#4a4a4a" }); // armor
      draw("circle", { cx: x, cy: y - 30, r: 30, fill: "#5a4a3a" }); // head
      draw("ellipse", { cx: x, cy: y - 35, rx: 32, ry: 20, fill: "#5a5a5a" }); // helmet
      // Spear
      draw("line", { x1: x + 30, y1: y - 60, x2: x + 35, y2: y + 80, stroke: "#aaaaaa", "stroke-width": "5" });
      draw("polygon", { points: `${x + 30},${y - 60} ${x + 40},${y - 80} ${x + 20},${y - 80}`, fill: "#cccccc" });
    }
  }

  _drawSheep(draw, x, y) {
    draw("ellipse", { cx: x, cy: y, rx: 18, ry: 12, fill: "#eeeeee", opacity: 0.85 });
    draw("circle", { cx: x - 14, cy: y - 4, r: 9, fill: "#eeeeee", opacity: 0.85 });
    draw("circle", { cx: x - 16, cy: y - 1, r: 4, fill: "#333" }); // face
    // Legs
    [[x - 8, y + 12], [x, y + 12], [x + 8, y + 12]].forEach(([lx, ly]) => {
      draw("line", { x1: lx, y1: y + 4, x2: lx, y2: ly, stroke: "#aaaaaa", "stroke-width": "2" });
    });
  }

  // ── Utility ────────────────────────────────────────────────────────────────

  _lighten(hex, amount) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b = Math.min(255, (num & 0xff) + amount);
    return `rgb(${r},${g},${b})`;
  }

  _escape(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  new SceneRenderer();
});
