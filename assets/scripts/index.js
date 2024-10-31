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

const prizes = [
  {
    title: "Підписка на місяць безкоштовно",
    color: "#1F1F1F",
    i18nKey: "spinner.spins.subscribe",
  },
  {
    title: "Проксі в подарунок",
    color: "#6732D9",
    i18nKey: "spinner.spins.proxy",
  },
  {
    title: "Інтерв'ю з Вусатим",
    color: "#1F1F1F",
    i18nKey: "spinner.spins.interview",
  },
  {
    title: "Знижка 15% на розхідники",
    color: "#6732D9",
    i18nKey: "spinner.spins.sale",
  },
  {
    title: "1 крео в подарунок",
    color: "#1F1F1F",
    i18nKey: "spinner.spins.creo",
  },
  {
    title: "Доступ до приватного чату",
    color: "#6732D9",
    i18nKey: "spinner.spins.chat",
  },
  {
    title: "+1 зідзвон з наставником",
    color: "#1F1F1F",
    i18nKey: "spinner.spins.call",
  },
  {
    title: "Акаунт 7-денного фарму в подарунок",
    color: "#6732D9",
    i18nKey: "spinner.spins.account",
  },
];

/**
 * From: https://thecode.media/fortune/
 */
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");

const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);

let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
  prizes.forEach(({ title, color, i18nKey, reaction }, i) => {
    const rotation = prizeSlice * i * -1 - prizeOffset;
    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text" data-i18n="${i18nKey}">${title}</span>
      </li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from 0deg,
      ${prizes.map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`).reverse()}
    );`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll(".prize");
};

setupWheel();

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) {
    rad += 2 * Math.PI;
  }

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  if (currentSlice !== slice) {
    currentSlice = slice;
  }
};

const selectPrize = () => {
  const selected = Math.floor(Math.abs(rotation + 270) / prizeSlice) % prizes.length;
  prizeNodes[selected].classList.add(selectedClass);
};

trigger.addEventListener("click", () => {
  trigger.disabled = true;
  // For random sector win
  // rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // For current sector win (8 - sector)
  rotation = prizes.length * 360 + (8 - 1) * prizeSlice + Math.floor(Math.random() * 40);
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  runTickerAnimation();
});

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  rotation %= 360;

  selectPrize();

  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  trigger.disabled = false;
});
