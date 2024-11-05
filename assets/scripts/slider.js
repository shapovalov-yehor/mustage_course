const sliderWrapper = document.querySelector(".slider-wrapper");
const sliderContent = document.querySelector(".slider-2");
const slides = document.querySelectorAll(".slide");
let currentIndex = 7;

for (let i = 0; i < 5; i++) {
  const firstSlideClone = slides[i].cloneNode(true);
  const lastSlideClone = slides[slides.length - (5 - i)].cloneNode(true);

  sliderWrapper.appendChild(firstSlideClone);
  sliderWrapper.insertBefore(lastSlideClone, slides[0]);
}

const updatedSlides = document.querySelectorAll(".slide");

moveToSlide(currentIndex);

function moveToSlide(index) {
  const windowWidth = window.innerWidth;
  const isSmallDimension = windowWidth > 320 && windowWidth < 1024;

  updatedSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    const img = slide.querySelector("img");
    img.classList.remove("active");

    if (isSmallDimension) {
      if (i === index) {
        img.classList.add("active");
        slide.classList.add("active");
      }
    } else {
      if (i === index || i === index + 1 || i === index - 1) {
        img.classList.add("active");
        slide.classList.add("active");
      }
    }
  });

  const widthContainer = isSmallDimension ? windowWidth / 2 : sliderContent.clientWidth / 2;
  const widthActiveSlide = isSmallDimension ? 260 : 320;
  const widthUnActiveSlide = isSmallDimension ? 165 : 240;
  const countLeftSlide = isSmallDimension ? index : index - 1;

  const translateX = isSmallDimension
    ? widthContainer - (widthActiveSlide / 2 + widthUnActiveSlide * countLeftSlide)
    : widthContainer - (widthActiveSlide + widthActiveSlide / 2 + widthUnActiveSlide * countLeftSlide);

  sliderWrapper.style.transform = `translateX(${translateX}px)`;

  currentIndex = index;

  if (index === updatedSlides.length - 3) {
    setTimeout(() => {
      disableTransition(updatedSlides);
      sliderWrapper.style.transition = "none";
      moveToSlide(7);
    }, 500);
  }

  if (index === 2) {
    setTimeout(() => {
      disableTransition(updatedSlides);
      sliderWrapper.style.transition = "none";
      moveToSlide(updatedSlides.length - 8);
    }, 500);
  }

  setTimeout(() => {
    sliderWrapper.style.transition = "transform 0.5s ease-in-out";
    updatedSlides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      img.style.transition = "";
      slide.style.transition = "";
    });
  }, 100);

  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("dot--active");
  }

  const i = index < 5 ? dots.length - (5 - index) : index > 11 ? index - 12 : index - 5;
  dots[i].classList.add("dot--active");
}

function disableTransition(list) {
  list.forEach((slide, i) => {
    const img = slide.querySelector("img");
    img.style.transition = "none";
    slide.style.transition = "none";
  });
}

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal__close");
const slideImages = document.querySelectorAll(".slide img");

slideImages.forEach((img) => {
  img.addEventListener("click", function () {
    if (!img.classList.contains("active")) {
      return;
    }

    modal.style.display = "flex";
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
