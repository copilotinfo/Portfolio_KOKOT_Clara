const cursorGlow = document.querySelector(".cursor-glow");
const progressBar = document.querySelector(".progress-bar");
const reveals = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const scene = document.getElementById("scene");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const cvModal = document.getElementById("cvModal");
const cvModalOpenButtons = document.querySelectorAll("[data-cv-modal-open]");
const cvModalCloseButtons = document.querySelectorAll("[data-cv-modal-close]");
const reportModal = document.getElementById("reportModal");
const reportModalOpenButtons = document.querySelectorAll("[data-report-modal-open]");
const reportModalCloseButtons = document.querySelectorAll("[data-report-modal-close]");

// Effet glow qui suit la souris
window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  if (cursorGlow) {
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;
  }

});

// Barre de progression du scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
});

// Apparition des éléments au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => observer.observe(el));

// Effet tilt 3D sur les cartes de compétences
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

// Menu mobile
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

// ====================================
// Effet texte décollé / suivi souris
// pour les cartes BTS SIO
// ====================================

function openCvModal() {
  if (!cvModal) return;
  cvModal.classList.add("active");
  cvModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCvModal() {
  if (!cvModal) return;
  cvModal.classList.remove("active");
  cvModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

cvModalOpenButtons.forEach((button) => {
  button.addEventListener("click", openCvModal);
});

cvModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCvModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cvModal && cvModal.classList.contains("active")) {
    closeCvModal();
  }
});

function openReportModal() {
  if (!reportModal) return;
  reportModal.classList.add("active");
  reportModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReportModal() {
  if (!reportModal) return;
  reportModal.classList.remove("active");
  reportModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

reportModalOpenButtons.forEach((button) => {
  button.addEventListener("click", openReportModal);
});

reportModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeReportModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && reportModal && reportModal.classList.contains("active")) {
    closeReportModal();
  }
});

const btsCards = document.querySelectorAll(".mouse-tilt-card");

btsCards.forEach((card) => {
  const badge = card.querySelector(".bts-option-badge");
  const title = card.querySelector(".bts-option-title");
  const text = card.querySelector(".bts-option-text");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // rotation plus forte de la carte
    const rotateY = percentX * 16;
    const rotateX = -percentY * 16;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    // lumière qui suit
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    // effet texte vraiment décollé
    if (badge) {
      badge.style.transform = `translateZ(70px) translate(${percentX * 10}px, ${percentY * 10}px)`;
    }

    if (title) {
      title.style.transform = `translateZ(125px) translate(${percentX * 22}px, ${percentY * 22}px)`;
    }

    if (text) {
      text.style.transform = `translateZ(95px) translate(${percentX * 14}px, ${percentY * 14}px)`;
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.setProperty("--mx", `50%`);
    card.style.setProperty("--my", `50%`);

    if (badge) {
      badge.style.transform = "translateZ(70px) translate(0px, 0px)";
    }

    if (title) {
      title.style.transform = "translateZ(110px) translate(0px, 0px)";
    }

    if (text) {
      text.style.transform = "translateZ(85px) translate(0px, 0px)";
    }
  });
});





/* ======================================== */
/* PROJET 1 - MODALE PDF + LEGER MOUVEMENT */
/* ======================================== */

const infraScene = document.getElementById("infraScene");
const stageScene = document.getElementById("stageScene");
const pdfModal = document.getElementById("pdfModal");
const pdfClose = document.getElementById("pdfClose");
const pdfBackdrop = document.getElementById("pdfBackdrop");
const openPdfButtons = document.querySelectorAll(".open-pdf-btn");

function openPdfModal() {
  if (!pdfModal) return;
  pdfModal.classList.add("active");
  pdfModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePdfModal() {
  if (!pdfModal) return;
  pdfModal.classList.remove("active");
  pdfModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openPdfButtons.forEach((button) => {
  button.addEventListener("click", openPdfModal);
});

if (pdfClose) {
  pdfClose.addEventListener("click", closePdfModal);
}

if (pdfBackdrop) {
  pdfBackdrop.addEventListener("click", closePdfModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pdfModal && pdfModal.classList.contains("active")) {
    closePdfModal();
  }
});

if (infraScene) {
  infraScene.addEventListener("mousemove", (e) => {
    const rect = infraScene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 2.8;
    const rotateX = ((centerY - y) / centerY) * 2.2;

    infraScene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  infraScene.addEventListener("mouseleave", () => {
    infraScene.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

if (stageScene) {
  stageScene.addEventListener("mousemove", (e) => {
    const rect = stageScene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 4;

    stageScene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    stageScene.style.setProperty("--mx", `${x}px`);
    stageScene.style.setProperty("--my", `${y}px`);
  });

  stageScene.addEventListener("mouseleave", () => {
    stageScene.style.transform = "rotateX(0deg) rotateY(0deg)";
    stageScene.style.setProperty("--mx", "50%");
    stageScene.style.setProperty("--my", "50%");
  });
}
