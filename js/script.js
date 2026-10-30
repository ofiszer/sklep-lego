const carousel = document.getElementById("product-carousel");

const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

nextButton.addEventListener("click", function () {
  carousel.scrollBy({
    left: 270,
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", function () {
  carousel.scrollBy({
    left: -270,
    behavior: "smooth",
  });
});
