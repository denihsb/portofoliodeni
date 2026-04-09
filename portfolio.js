/* portfolio.js — shared across all pages */

/* ── Navbar scroll effect ── */
const navbar = document.querySelector(".navbar-wrapper");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

/* ── Hamburger menu ── */
const hamburger = document.querySelector(".hamburger");
const navList   = document.querySelector(".nav-list");

if (hamburger && navList) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navList.classList.toggle("open");
  });

  // Close nav when a link is clicked
  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navList.classList.remove("open");
    });
  });

  // Close nav on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove("open");
      navList.classList.remove("open");
    }
  });
}

/* ── Scroll-triggered card animations (IntersectionObserver) ── */
const animatedCards = document.querySelectorAll(
  ".skill-card, .project-card, .contact-card, .certificate-card"
);

if (animatedCards.length) {
  // Set stagger index per parent group
  const groups = new Map();
  animatedCards.forEach(card => {
    const parent = card.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    const i = groups.get(parent);
    card.style.setProperty("--i", i);
    groups.set(parent, i + 1);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedCards.forEach(card => observer.observe(card));
}
