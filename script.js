document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.play().catch(() => {});
    else entry.target.pause();
  });
}, { threshold: 0.25 });
document.querySelectorAll(".video-item video").forEach((v) => videoObserver.observe(v));

document.querySelectorAll(".video-item").forEach((item) => {
  const video = item.querySelector("video");
  const hint = item.querySelector(".sound-hint");
  if (!video) return;
  item.addEventListener("click", () => {
    video.muted = !video.muted;
    hint.textContent = video.muted ? "Tap for sound" : "Sound on";
  });
});

document.querySelectorAll(".film-player").forEach((btn) => {
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.youtube}?autoplay=1&rel=0`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    btn.replaceChildren(iframe);
  }, { once: true });
});

const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".media-item");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const type = btn.dataset.filter;
    items.forEach((item) => {
      item.classList.toggle("hidden", type !== "all" && !item.dataset.type.split(" ").includes(type));
    });
  });
});
