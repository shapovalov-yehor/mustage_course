const slides = document.querySelectorAll(".slide");
let currentIndex = 2;

moveToSlide(currentIndex);

function moveToSlide(index) {
  if (index < 0 || index > slides.length - 1) {
    return;
  }

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    const img = slide.querySelector("img");
    img.classList.remove("active");

    if (i === index || i === index + 1 || i === index - 1) {
      img.classList.add("active");
      slide.classList.add("active");
    }
  });

  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("dot--active");
  }

  dots[index].classList.add("dot--active");

  const widthContainer = 705;
  const widthActiveSlide = 320;
  const widthUnActiveSlide = 240;
  const countLeftSlide = index - 1;
  const translateX = widthContainer - (widthActiveSlide + widthActiveSlide / 2 + widthUnActiveSlide * countLeftSlide);

  const sliderWrapper = document.querySelector(".slider-wrapper");
  sliderWrapper.style.transform = `translateX(${translateX}px)`;
  currentIndex = index;
}
