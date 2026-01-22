const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
});

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");
const backdrop = document.getElementById("lightbox-backdrop");

document.querySelectorAll(".achievement-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.img;
    lightbox.classList.add("open");
  });
});

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    window.open(card.dataset.href, "_blank");
  });
});

closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
backdrop.addEventListener("click", () => lightbox.classList.remove("open"));
