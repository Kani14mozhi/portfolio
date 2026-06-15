/* ==========================================================================
   PORTFOLIO SCRIPT
   - Typing animation for the hero role text
   - Scroll-triggered reveal animations
   - Sticky navbar + scroll progress bar
   - Mobile menu toggle
   - Dark / light theme toggle
   - Mascot eyes that follow the cursor
   - Back-to-top button
   - Copy email + cute confetti burst
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- 1. Typing animation ---------------- */
  // CUSTOMIZE ME: change these roles to match what you want recruiters to see.
  const roles = [
    "Frontend Developer",
    "UI/UX Designer",
    "Python Developer",
    "Problem Solver"
  ];

  const typedEl = document.getElementById("typedText");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400); // pause at full word
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = deleting ? 50 : 90;
    setTimeout(typeLoop, speed);
  }

  if (typedEl) typeLoop();


  /* ---------------- 2. Scroll reveal animations ---------------- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ---------------- 3. Navbar + scroll progress ---------------- */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = progress + "%";

    if (scrollTop > 40) {
      navbar.classList.add("scrolled");
      backToTop.classList.add("visible");
    } else {
      navbar.classList.remove("scrolled");
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ---------------- 4. Mobile menu toggle ---------------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  // Close mobile menu after clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const icon = menuToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });


  /* ---------------- 5. Theme toggle ---------------- */
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  themeToggle.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");

    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });


  /* ---------------- 6. Mascot eyes follow cursor ---------------- */
  const pupils = document.querySelectorAll(".pupil");
  const maxOffset = 3; // how far the pupil can move, in px

  window.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
      const eye = pupil.parentElement.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);

      const offsetX = Math.cos(angle) * maxOffset;
      const offsetY = Math.sin(angle) * maxOffset;

      pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });


  /* ---------------- 7. Copy email + confetti ---------------- */
  const copyBtn = document.getElementById("copyEmail");
  const copyHint = document.getElementById("copyHint");
  const confettiLayer = document.getElementById("confettiLayer");
  const emoji = ["✨", "🎉", "💜", "⭐", "💫"];

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.textContent.trim();

    // Copy to clipboard (works on https / localhost)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }

    copyHint.textContent = "Copied to clipboard! 🎉";
    setTimeout(() => {
      copyHint.textContent = "Click the email to copy it ✨";
    }, 2000);

    // Confetti burst
    for (let i = 0; i < 14; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = emoji[Math.floor(Math.random() * emoji.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 80;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = (Math.random() * 360) + "deg";

      piece.style.left = "50%";
      piece.style.setProperty("--dx", `${dx}px`);
      piece.style.setProperty("--dy", `${dy}px`);
      piece.style.setProperty("--rot", rot);

      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 1000);
    }
  });

});