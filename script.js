/* =========================================================
   ADHARSH TU — PORTFOLIO
   INTERACTIVE JAVASCRIPT
   ========================================================= */


/* =========================
   DOM READY
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOADING SCREEN
     ========================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });


  /* =========================
     TYPING EFFECT
     ========================= */

  const typingText = document.getElementById("typingText");

  const words = [
    "BCA Student",
    "Technology Enthusiast",
    "Minecraft Lover",
    "Nature Enthusiast",
    "Agriculture Curious",
    "Creative Explorer"
  ];

  let wordIndex = 0;
  let characterIndex = 0;

  let isDeleting = false;

  function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

      characterIndex++;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === currentWord.length) {

        isDeleting = true;

        setTimeout(typeEffect, 1800);

        return;
      }

    } else {

      characterIndex--;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === 0) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {
          wordIndex = 0;
        }
      }
    }

    const speed = isDeleting ? 45 : 85;

    setTimeout(typeEffect, speed);
  }

  typeEffect();


  /* =========================
     MOBILE NAVIGATION
     ========================= */

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

      navMenu.classList.toggle("open");

      document.body.classList.toggle(
        "no-scroll",
        navMenu.classList.contains("open")
      );

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        document.body.classList.remove("no-scroll");

      });

    });

  }


  /* =========================
     SCROLL REVEAL
     ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =========================
     BACK TO TOP
     ========================= */

  const topBtn =
    document.getElementById("topBtn");

  function updateTopButton() {

    if (window.scrollY > 600) {

      topBtn.classList.add("visible");

    } else {

      topBtn.classList.remove("visible");

    }

  }

  window.addEventListener(
    "scroll",
    updateTopButton,
    { passive: true }
  );

  topBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================
     DYNAMIC YEAR
     ========================= */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* =========================
     INTEREST CARD INTERACTION
     ========================= */

  const interestCards =
    document.querySelectorAll(".interest-card");

  interestCards.forEach(card => {

    card.addEventListener("click", () => {

      card.classList.toggle("selected");

    });

  });


  /* =========================
     DESKTOP CARD TILT
     ========================= */

  const canHover =
    window.matchMedia("(hover: hover)").matches;

  if (canHover) {

    const cards =
      document.querySelectorAll(
        ".interest-card, .info-card"
      );

    cards.forEach(card => {

      card.addEventListener("mousemove", event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -2.5;

        const rotateY =
          ((x - centerX) / centerX) * 2.5;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-6px)`;

      });


      card.addEventListener("mouseleave", () => {

        card.style.transform = "";

      });

    });

  }


  /* =========================
     MOUSE GLOW EFFECT
     ========================= */

  if (canHover) {

    const background =
      document.querySelector(".background");

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener("mousemove", event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    });


    function animateGlow() {

      currentX +=
        (mouseX - currentX) * 0.08;

      currentY +=
        (mouseY - currentY) * 0.08;

      if (background) {

        background.style.setProperty(
          "--mouse-x",
          `${currentX}px`
        );

        background.style.setProperty(
          "--mouse-y",
          `${currentY}px`
        );

      }

      requestAnimationFrame(animateGlow);

    }

    animateGlow();

  }


  /* =========================
     HERO ORB MOUSE MOVEMENT
     ========================= */

  if (canHover) {

    const heroVisual =
      document.querySelector(".hero-visual");

    const profileOrb =
      document.querySelector(".profile-orb");

    if (heroVisual && profileOrb) {

      heroVisual.addEventListener(
        "mousemove",
        event => {

          const rect =
            heroVisual.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const moveX =
            (x - rect.width / 2) * 0.018;

          const moveY =
            (y - rect.height / 2) * 0.018;

          profileOrb.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

        }
      );


      heroVisual.addEventListener(
        "mouseleave",
        () => {

          profileOrb.style.transform = "";

        }
      );

    }

  }


  /* =========================
     ACTIVE NAVIGATION
     ========================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      ".navbar nav a"
    );


  function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 150;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (href === `#${currentSection}`) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  updateActiveNavigation();


  /* =========================
     SMOOTH NAVIGATION
     ========================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const targetId =
          anchor.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =========================
     CONTACT BUTTON SAFETY
     ========================= */

  document.querySelectorAll(
    '.contact-btn[href="#"]'
  ).forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      alert(
        "Add your social media or contact link in index.html."
      );

    });

  });


  /* =========================
     ESCAPE KEY
     ========================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        if (navMenu) {

          navMenu.classList.remove("open");

          document.body.classList.remove(
            "no-scroll"
          );

        }

      }

    }
  );


  /* =========================
     HANDLE RESIZE
     ========================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 650 &&
        navMenu
      ) {

        navMenu.classList.remove("open");

        document.body.classList.remove(
          "no-scroll"
        );

      }

    }
  );


  /* =========================
     PAGE READY
     ========================= */

  document.body.classList.add("page-ready");

});