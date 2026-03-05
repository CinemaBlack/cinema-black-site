// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Reel behavior: click overlay to play/pause.
// Autoplay is blocked on many browsers unless muted (we keep muted).
const reels = document.querySelectorAll(".reel");

reels.forEach((reel) => {
  const video = reel.querySelector("video");
  const overlay = reel.querySelector(".reel__overlay");

  if (!video || !overlay) return;

  // Ensure compatibility
  video.muted = true;
  video.playsInline = true;
  video.loop = true;

  const hideOverlay = () => overlay.classList.add("isHidden");
  const showOverlay = () => overlay.classList.remove("isHidden");

  // Try to preload a frame without playing
  video.addEventListener("loadeddata", () => {
    // keep overlay visible until user interacts
  });

  overlay.addEventListener("click", async () => {
    try {
      if (video.paused) {
        await video.play();
        hideOverlay();
      } else {
        video.pause();
        showOverlay();
      }
    } catch (err) {
      // If play fails, keep overlay visible.
      showOverlay();
      console.warn("Video play blocked:", err);
    }
  });

  // If the user taps the video itself, toggle.
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play().then(hideOverlay).catch(() => showOverlay());
    } else {
      video.pause();
      showOverlay();
    }
  });
});

// Demo contact form message
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "Thanks — message received. I’ll reply soon.";
  contactForm.reset();
});
