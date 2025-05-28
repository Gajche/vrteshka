// parallax depth - To Whom section
document.addEventListener("DOMContentLoaded", function () {
  const artistsSection = document.querySelector(".artists");
  let ticking = false;
  let lastScrollY = 0;

  // Match SCSS base background positions
  function getBasePosition() {
    const width = window.innerWidth;

    if (width <= 425) return { x: "28%", y: 85 }; // Mobile
    if (width <= 768) return { x: "50%", y: 77 }; // Tablet
    if (width <= 1024) return { x: "45%", y: 72 }; // Laptop
    return { x: "50%", y: 72 }; // Desktop
  }

  const speed = 0.0065;

  function updateParallax() {
    const offset = lastScrollY * speed;
    const { x, y } = getBasePosition();
    const position = `${x} calc(${y}% + ${offset.toFixed(2)}px)`;

    artistsSection.style.backgroundPosition = position;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  window.addEventListener("resize", updateParallax);

  updateParallax();
});

// swipe grabber - did not succeed to make it work
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("artistCarousel");

  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse events
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("dragging");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("dragging");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("dragging");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = x - startX; // Adjust sensitivity if needed
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Touch events
  let isTouching = false;
  let touchStartX;
  let touchScrollLeft;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      isTouching = true;
      touchStartX = e.touches[0].pageX - carousel.offsetLeft;
      touchScrollLeft = carousel.scrollLeft;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    () => {
      isTouching = false;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouching) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = x - touchStartX;
      carousel.scrollLeft = touchScrollLeft - walk;
    },
    { passive: true }
  );
});
