import "./style.scss";
import ColorThief from "colorthief";
import confetti from "canvas-confetti";

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const fireConfetti = (colors) => {
  for (let index = 0; index < 5; index++) {
    const confettiOptions = {
      particleCount: randomInRange(50, 100),
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 },
      colors,
    };

    confetti(confettiOptions);
  }
};

const image = document.querySelector("#img");
const imageUrl = document.querySelector("#image-input");
const fileUpload = document.querySelector("#file-upload");
const clearUpload = document.querySelector("#clear-upload");

let file;

const handleFileInput = (event) => {
  event.preventDefault();
  file = event.target.files[0];
  const url = URL.createObjectURL(file);
  image.src = url;
};

const handleUrlInput = (event) => {
  console.log(event.target.value);
  image.src = event.target.value;
};

const handleClearUpload = () => {
  console.log("hello");
  fileUpload.value = null;
};

const colorThief = new ColorThief();

const onImageLoad = () => {
  const [red, green, blue] = colorThief.getColor(image);
  const colorPalette = colorThief.getPalette(image);

  // set body to dominant color
  const body = document.querySelector("body");
  body.style.backgroundColor = `rgb(${red},${green},${blue})`;

  // fire confetti with color palette
  console.log("%cTHIS IS THE COLOR", `color: rgb(${red},${green},${blue});`);
  fireConfetti(colorPalette);
};

// starting logic
fileUpload.addEventListener("input", handleFileInput);
imageUrl.addEventListener("input", handleUrlInput);
clearUpload.addEventListener("click", handleClearUpload);
image.addEventListener("load", onImageLoad);
