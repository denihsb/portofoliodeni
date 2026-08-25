/* portfolio.js — shared across all pages */

const navbar = document.querySelector(".site-header");
const hamburger = document.querySelector(".hamburger");
const navWrap = document.querySelector(".nav-wrap");
const themeToggle = document.querySelector(".theme-toggle");

if (navbar) {
  const setHeaderState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState);
}

if (hamburger && navWrap) {
  hamburger.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navWrap.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrap.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navbar || !navbar.contains(event.target)) {
      navWrap.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

const savedTheme = localStorage.getItem("deni-theme");
if (savedTheme === "dark") {
  document.body.dataset.theme = "dark";
}

if (themeToggle) {
  const icon = themeToggle.querySelector(".icon");

  const syncThemeLabel = () => {
    const isDark = document.body.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.classList.toggle("is-dark", isDark);
    if (icon) {
      icon.textContent = isDark ? "☾" : "☀";
    }
  };

  syncThemeLabel();

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("deni-theme", nextTheme);
    syncThemeLabel();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const modal = document.getElementById("certificateModal");
const modalImg = document.getElementById("modalImage");
const previewBtns = document.querySelectorAll(".preview-btn");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

if (modal && modalImg && previewBtns.length) {
  previewBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      modalImg.src = btn.getAttribute("href");
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}

const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.getAttribute("data-page") === currentPage;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const yearEl = document.querySelector("[data-current-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
