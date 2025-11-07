// === Locomotive Scroll ===
const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    lerp: 0.08,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });
  
// === Category Filter ===
const filterButtons = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll(".portfolio-thumb");

filterButtons.forEach((btn) => {
btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // toggle active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // show/hide with animation
    items.forEach((item) => {
    const match = filter === "all" || item.dataset.category === filter;
    if (match) {
        item.classList.remove("hidden-item");
        item.classList.add("visible-item");
    } else {
        item.classList.add("hidden-item");
        item.classList.remove("visible-item");
    }
    });

    // reflow after transition for footer visibility
    setTimeout(() => {
    scroll.update();
    }, 600);
});
});

// === Hover Motion Parallax ===
document.querySelectorAll(".portfolio-thumb").forEach((thumb) => {
thumb.addEventListener("mousemove", (e) => {
    const rect = thumb.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    thumb.style.transform = `scale(1.04) translate(${x * 8}px, ${y * 8}px)`;
});

thumb.addEventListener("mouseleave", () => {
    thumb.style.transform = "scale(1) translate(0,0)";
});
});

// === Keep LocomotiveScroll in sync with dynamic layout ===
const container = document.querySelector("[data-scroll-container]");

// Update scroll height after DOM or layout changes
const observer = new MutationObserver(() => scroll.update());
observer.observe(container, { childList: true, subtree: true });

// Update on window resize (Bootstrap grid wraps)
window.addEventListener("resize", () => scroll.update());

// Update again once images or videos finish loading
window.addEventListener("load", () => {
  scroll.update();
  setTimeout(() => scroll.update(), 500); // second pass for videos
});

// Disable Locomotive scroll when Bootstrap modal is open
document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('show.bs.modal', () => scroll.stop());
    modal.addEventListener('hidden.bs.modal', () => scroll.start());
  });


  document.addEventListener("DOMContentLoaded", () => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    if (!scrollEl) return;
  
    const scroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      lerp: 0.1,
      tablet: { smooth: true },
      smartphone: { smooth: false },
    });
  
    // ⚡️ Recalculate scroll height once images/videos are loaded
    window.addEventListener("load", () => {
      setTimeout(() => scroll.update(), 500);
    });
  });
  
