/* particles.js bootstrapper (inline config, works from file://) */
(function () {
  const i18n = {
    de: {
      "head.title": "Jonas Merkle · jjm.one",
      "head.description":
        "Kurzvorstellung und Links von Jonas Merkle (jjm.one).",
      "bio.text": "Hi! Ich bin's Jonas und hier sind ein paar Links zu mir.",
      "legal.powered": "Powered by",
      "legal.and": "und",
      "legal.and2": "und",
      "legal.icons": "Icons von",
      "legal.via": "über",
    },
    en: {
      "head.title": "Jonas Merkle · jjm.one",
      "head.description": "Short intro and links by Jonas Merkle (jjm.one).",
      "bio.text": "Hi! I'm Jonas, and here are a few links about me.",
      "legal.powered": "Powered by",
      "legal.and": "and",
      "legal.and2": "and",
      "legal.icons": "Icons by",
      "legal.via": "at",
    },
  };

  function detectLang() {
    const saved = localStorage.getItem("jjm.lang");
    if (saved) return saved;
    const nav = (
      navigator.language ||
      navigator.userLanguage ||
      "en"
    ).toLowerCase();
    return nav.startsWith("de") ? "de" : "en";
  }

  function applyI18n(lang) {
    const dict = i18n[lang] || i18n.de;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-app-lang", lang);

    // Update elements with data-i18n keys
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.tagName === "META" && el.name === "description"
          ? el.setAttribute("content", dict[key])
          : (el.textContent = dict[key]);
      }
    });

    // Update document title if needed (for good measure)
    if (dict["head.title"]) document.title = dict["head.title"];
  }

  function setupLangToggle() {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-app-lang") || "de";
      const next = current === "de" ? "en" : "de";
      localStorage.setItem("jjm.lang", next);
      applyI18n(next);
    });
  }

  function initParticles() {
    const particlesConfig = {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.35,
          width: 1,
        },
        move: { enable: true, speed: 2, direction: "none", out_mode: "out" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" }, // change to "grab" if you want lines to follow the cursor
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          grab: { distance: 140, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    };

    if (window.particlesJS) {
      window.particlesJS("particles-js", particlesConfig);
      console.log("particles.js initialized (inline config)");
    } else {
      console.warn(
        "particles.js library not found. Check /js/particles.js path."
      );
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyI18n(detectLang());
    setupLangToggle();
    initParticles();
  });
})();
