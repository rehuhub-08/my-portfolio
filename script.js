/* ============================================
   KAJI REHAN — PORTFOLIO SCRIPTS
   GSAP + ScrollTrigger Animations
   GREEN THEME — BLANK FIX
   ============================================ */

(() => {
  "use strict";

  // ==========================================
  // LOADER ANIMATION
  // ==========================================
  function initLoader() {
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loader-bar");
    const loaderLogo = loader.querySelector(".loader-logo");
    const loaderText = loader.querySelector(".loader-text");

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            loader.style.display = "none";
            initHeroAnimations();
            // Small delay then init scroll-triggered animations
            setTimeout(() => {
              initScrollAnimations();
              ScrollTrigger.refresh();
            }, 200);
          },
        });
      },
    });

    tl.to(loaderLogo, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(loaderText, { opacity: 1, duration: 0.3 }, "-=0.2")
      .to(loaderBar, { width: "100%", duration: 1.5, ease: "power2.inOut" }, "-=0.1")
      .to(loaderLogo, { scale: 1.15, duration: 0.3, ease: "power2.in" })
      .to(loaderLogo, { scale: 1, duration: 0.2 });
  }

  // ==========================================
  // TYPING ANIMATION
  // ==========================================
  function initTypingAnimation() {
    const typingEl = document.getElementById("typing-text");
    const words = [
      "beautiful interfaces.",
      "smooth animations.",
      "modern web apps.",
      "interactive experiences.",
      "pixel-perfect UIs.",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  }

  // ==========================================
  // NAVBAR
  // ==========================================
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    // Scroll class
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Mobile toggle
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });

    // Active link highlight on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY + 200;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = navLinks.querySelector(`a[href="#${id}"]`);
        if (link) {
          link.classList.toggle("active", scrollY >= top && scrollY < top + height);
        }
      });
    });
  }

  // ==========================================
  // HERO ANIMATIONS (play immediately)
  // ==========================================
  function initHeroAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const heroElements = [
      ".hero-badge",
      ".hero-greeting",
      ".hero-name",
      ".hero-title-line",
      ".hero-description",
      ".hero-cta",
    ];

    // Set initial states
    gsap.set(heroElements, { opacity: 0, y: 30 });
    gsap.set(".hero-visual", { opacity: 0, x: 60 });
    gsap.set(".hero-stats", { opacity: 0, y: 30 });

    // Create hero timeline
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6 })
      .to(".hero-greeting", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(".hero-name", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .to(".hero-title-line", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(".hero-description", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(".hero-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(".hero-visual", { opacity: 1, x: 0, duration: 0.8 }, "-=0.4")
      .to(".hero-stats", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

    // Floating orbs animation
    gsap.to(".orb-1", {
      x: 40, y: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".orb-2", {
      x: -30, y: -40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".orb-3", {
      x: 20, y: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Code block line-by-line reveal
    gsap.from(".code-line", {
      opacity: 0,
      x: -20,
      stagger: 0.12,
      duration: 0.5,
      delay: 0.8,
      ease: "power2.out",
    });

    // Counter animation
    document.querySelectorAll(".stat-number[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          delay: 1.2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            el.textContent = Math.ceil(parseFloat(el.textContent)) + "+";
          },
        }
      );
    });

    // Start typing
    initTypingAnimation();
  }

  // ==========================================
  // SCROLL-TRIGGERED ANIMATIONS
  // Uses gsap.fromTo() for reliability — no blank sections
  // ==========================================
  function initScrollAnimations() {

    // --- Helper: animate elements on scroll ---
    function scrollReveal(target, triggerEl, fromVars, toVars, staggerVal) {
      const config = {
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        ...toVars,
      };
      if (staggerVal) config.stagger = staggerVal;

      gsap.fromTo(target, { opacity: 0, ...fromVars }, { opacity: 1, ...config });
    }

    // --- ABOUT SECTION ---
    scrollReveal(
      ".about .section-header > *",
      ".about",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".about-image-card",
      ".about-grid",
      { x: -60, rotation: -3 },
      { x: 0, rotation: 0, duration: 0.9, ease: "power3.out" }
    );

    scrollReveal(
      ".about-floating-badge",
      ".about-grid",
      { scale: 0 },
      { scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.7)" }
    );

    scrollReveal(
      ".about-content > *",
      ".about-content",
      { y: 30 },
      { y: 0, duration: 0.6, ease: "power3.out" },
      0.1
    );

    scrollReveal(
      ".about-detail-item",
      ".about-details",
      { y: 20, scale: 0.95 },
      { y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      0.1
    );

    scrollReveal(
      ".timeline-item",
      ".about-timeline",
      { x: -30 },
      { x: 0, duration: 0.6, ease: "power3.out" },
      0.2
    );

    // --- SKILLS SECTION ---
    scrollReveal(
      ".skills .section-header > *",
      ".skills",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: { each: 0.1, grid: "auto", from: "start" },
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          // Animate skill bars after cards appear
          document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
            const width = bar.dataset.width;
            bar.style.width = width + "%";
          });
        },
      }
    );

    // --- PROJECTS SECTION ---
    scrollReveal(
      ".projects .section-header > *",
      ".projects",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".project-card",
      ".projects-grid",
      { y: 60 },
      { y: 0, duration: 0.8, ease: "power3.out" },
      0.2
    );

    // Project card tilt effect
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });

    // --- UPLOAD SECTION ---
    scrollReveal(
      ".upload .section-header > *",
      ".upload",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".upload-zone",
      ".upload-area-wrapper",
      { y: 40, scale: 0.95 },
      { y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    );

    // --- RESUME SECTION ---
    scrollReveal(
      ".resume .section-header > *",
      ".resume",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".resume-card",
      ".resume-card",
      { y: 50, scale: 0.95 },
      { y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    scrollReveal(
      ".resume-highlight",
      ".resume-highlights",
      { x: -20 },
      { x: 0, duration: 0.5, ease: "power3.out" },
      0.12
    );

    // --- CONTACT SECTION ---
    scrollReveal(
      ".contact .section-header > *",
      ".contact",
      { y: 40 },
      { y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".contact-info > *",
      ".contact-grid",
      { x: -40 },
      { x: 0, duration: 0.6, ease: "power3.out" },
      0.12
    );

    scrollReveal(
      ".contact-link",
      ".contact-links",
      { x: -30 },
      { x: 0, duration: 0.5, ease: "power3.out" },
      0.15
    );

    scrollReveal(
      ".contact-form",
      ".contact-form",
      { x: 40 },
      { x: 0, duration: 0.7, ease: "power3.out" }
    );

    // --- FOOTER ---
    scrollReveal(
      ".footer .container > *",
      ".footer",
      { y: 20 },
      { y: 0, duration: 0.5, ease: "power3.out" },
      0.15
    );

    gsap.fromTo(
      ".footer-social",
      { opacity: 0, y: 15, scale: 0.8 },
      {
        scrollTrigger: {
          trigger: ".footer-socials",
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(1.7)",
      }
    );
  }

  // ==========================================
  // FILE UPLOAD FUNCTIONALITY
  // ==========================================
  function initUpload() {
    const zone = document.getElementById("upload-zone");
    const input = document.getElementById("upload-input");
    const btnTrigger = document.getElementById("upload-btn-trigger");
    const feedback = document.getElementById("upload-feedback");

    // Trigger file input
    btnTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      input.click();
    });

    zone.addEventListener("click", () => input.click());

    // Drag events
    ["dragenter", "dragover"].forEach((event) => {
      zone.addEventListener(event, (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach((event) => {
      zone.addEventListener(event, (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
      });
    });

    zone.addEventListener("drop", (e) => {
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    input.addEventListener("change", () => {
      handleFiles(input.files);
      input.value = "";
    });

    function handleFiles(files) {
      if (!files.length) return;
      feedback.classList.add("active");

      Array.from(files).forEach((file) => {
        const item = document.createElement("div");
        item.className = "upload-file-item";

        const ext = file.name.split(".").pop().toUpperCase();
        const size = (file.size / 1024).toFixed(1);

        item.innerHTML = `
          <div class="file-icon"><i class="fa-solid fa-file"></i></div>
          <div class="file-details">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${size} KB · ${ext}</div>
            <div class="file-progress"><div class="file-progress-fill"></div></div>
          </div>
          <div class="file-status"><i class="fa-solid fa-spinner fa-spin"></i></div>
        `;

        feedback.appendChild(item);

        // Animate progress bar
        const progressFill = item.querySelector(".file-progress-fill");
        const statusIcon = item.querySelector(".file-status");

        setTimeout(() => {
          progressFill.style.width = "100%";
        }, 100);

        setTimeout(() => {
          statusIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
          gsap.from(statusIcon, { scale: 0, duration: 0.4, ease: "back.out(2)" });
        }, 1800);
      });
    }
  }

  // ==========================================
  // CONTACT FORM
  // ==========================================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const btn = document.getElementById("btn-submit");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      btn.classList.add("sent");

      // Animate button
      gsap.fromTo(
        btn,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      );

      // Collect form data
      const formData = new FormData(form);

      // Submit via fetch to FormSubmit's AJAX endpoint
      fetch("https://formsubmit.co/ajax/rehuu7899@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Form submitted successfully!
        setTimeout(() => {
          btn.classList.remove("sent");
          form.reset();
        }, 3000);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        // Reset button even if there's an error
        btn.classList.remove("sent");
        alert("There was a problem sending your message.");
      });
    });
  }

  // ==========================================
  // SMOOTH SCROLL for anchor links
  // ==========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const y = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    initScrollProgress();
    initNavbar();
    initUpload();
    initContactForm();
    initSmoothScroll();

    // Start loader when GSAP is ready
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      initLoader();
    } else {
      // Fallback: wait for GSAP to load
      window.addEventListener("load", () => {
        if (typeof gsap !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          initLoader();
        } else {
          // No GSAP — just hide loader and show content
          document.getElementById("loader").style.display = "none";
        }
      });
    }
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
