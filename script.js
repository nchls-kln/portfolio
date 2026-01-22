const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// Lightbox
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

closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
backdrop.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", e => { if(e.key==="Escape") lightbox.classList.remove("open"); });
