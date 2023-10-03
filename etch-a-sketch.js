// Imports
import { renderLeafAnimation,renderSnowAnimation } from "./leaf-falling-animator.js";

// Default Variables
const DEFAULT_MODE = "paint";
const DEFAULT_SIZE = 16;
const DEFAULT_DARK_MODE = "light"

// Default Elements
const body = document.querySelector("body");
const root = document.documentElement;
const gridContainer = document.querySelector(".grid-container");
const colorPicker = document.querySelector("#color-picker");
const gridSizePicker = document.querySelector("#grid-size-picker");
const gridSizeText = document.querySelector(".grid-size-value");
const paintModeButton = document.querySelector("#paint-mode-button");
const rainbowModeButton = document.querySelector("#rainbow-mode-button");
const eraserModeButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");
const darkModeToggleButton = document.querySelector(".dark-mode-toggle-container");
const pelaImg = document.querySelector('.pela-img');
// const downloadButton = document.querySelector("#download-button");

let currentColor = colorPicker.value;
let currentGridSize = gridSizePicker.value;
let currentMode = DEFAULT_MODE;
let currentDarkMode = DEFAULT_DARK_MODE;
let isMouseDown = false;

// Default Event Listeners
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

colorPicker.addEventListener("input", (event) => {
  currentColor = event.target.value;
  setMode("paint");
});

gridSizePicker.addEventListener("input", (event) => {
  currentGridSize = event.target.value;
  setGridElementsOnContainer(currentGridSize);
  gridSizeText.textContent = `${currentGridSize} x ${currentGridSize}`;
});

paintModeButton.addEventListener("click", () => {
  setMode("paint");
});

rainbowModeButton.addEventListener("click", () => {
  setMode("rainbow");
});

eraserModeButton.addEventListener("click", () => {
  setMode("eraser");
});

clearButton.addEventListener("click", () => {
  clearCanvas();
});

darkModeToggleButton.addEventListener("click", (event) => {
  if (event.target.checked) {
    currentDarkMode="dark";
  }
  else {
    currentDarkMode="light";
  }
  toggleDarkModeDisplay();
});

// downloadButton.addEventListener("click", () => {
//   downloadCanvasAsJPEG();
// });

// Grid Setter and Size Setter
function setGridElementsOnContainer(gridSize) {
  clearGridContainer();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const newGridElement = createDefaultGridElement();
    gridContainer.appendChild(newGridElement);
  }

  // Set Grid Size globally
  let containerWidth = gridContainer.getBoundingClientRect().width;
  root.style.setProperty("--grid-size", (1 / gridSize) * containerWidth + "px");
}

function createDefaultGridElement() {
  // Create a single Div element that represents a grid element
  const gridElement = document.createElement("div");
  gridElement.classList.add("grid-element");

  // Assign event listeners for color changing to each grid element
  gridElement.addEventListener("mouseover", (event) => {
    if (isMouseDown) {
      changeElementColor(event.target);
    }
  });
  gridElement.addEventListener("mousedown", (event) => {
    changeElementColor(event.target);
  });

  return gridElement;
}

function createGridElement(gridSize) {
  // Slow, original method
  // Create a single Div element that represents a grid element
  const gridElement = document.createElement("div");
  gridElement.classList.add("grid-element");

  // Assign event listeners for color changing to each grid element
  gridElement.addEventListener("mouseover", (event) => {
    if (isMouseDown) {
      changeElementColor(event.target);
    }
  });
  gridElement.addEventListener("mousedown", (event) => {
    changeElementColor(event.target);
  });

  // Set Grid Size
  let containerWidth = gridContainer.getBoundingClientRect().width;
  gridElement.style.setProperty(
    "--grid-size",
    (1 / gridSize) * containerWidth + "px"
  );

  return gridElement;
}

function changeElementColor(element) {
  if (currentMode === "paint") {
    element.style.setProperty("--grid-color", currentColor); // Setting the value locally to the style of each element so that each element can have different colors, if --grid-color is set to the root, changing the custom variable will change the color of all element that uses --grid-color
  } else if (currentMode === "rainbow") {
    let randomColor = generateRandomColor();
    element.style.setProperty("--grid-color", `#${randomColor}`);
  } else if (currentMode === "eraser") {
    element.style.removeProperty("--grid-color");
  }
}

function generateRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16); // randomize a string color in HEX
}

// Mode-related Functions
function setMode(newMode) {
  currentMode = newMode;
  setButtonActive();
}

// Clearing-related Functions
function clearGridContainer() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function clearCanvas() {
  let gridElements = gridContainer.querySelectorAll("*");
  gridElements.forEach((gridElement) => {
    gridElement.style.removeProperty("--grid-color");
  });
}

// Style-related functions
function setButtonActive() {
  deactivateAllButton();
    if (currentMode === "paint") {
      paintModeButton.classList.add("button-active");
    } else if (currentMode === "rainbow") {
      rainbowModeButton.classList.add("button-active");
    } else if (currentMode === "eraser") {
      eraserModeButton.classList.add("button-active");
    }
}

function deactivateAllButton() {
  paintModeButton.classList.remove("button-active");
  rainbowModeButton.classList.remove("button-active");
  eraserModeButton.classList.remove("button-active");
}

function toggleDarkModeDisplay() {
  body.classList.toggle("dark-mode-bg");
  body.classList.toggle("dark-mode-font");

  paintModeButton.classList.toggle("dark-mode-button");
  rainbowModeButton.classList.toggle("dark-mode-button");
  eraserModeButton.classList.toggle("dark-mode-button");
  clearButton.classList.toggle("dark-mode-button");

  gridContainer.classList.toggle("dark-mode-shadow");
  colorPicker.classList.toggle("dark-mode-shadow");

  if (currentDarkMode==="dark")
  {
    pelaImg.src = 'media/img/pela-gnsw.png';
    renderSnowAnimation();
  }
  else
  {
    pelaImg.src = 'media/img/pela-light-mode-img.png';
    renderLeafAnimation();
  }
  
  setButtonActive();
}

// Download Function
// function downloadCanvasAsJPEG() {
//   domtoimage.toJpeg(gridContainer).then(function (dataUrl) {
//     let link = document.createElement("a");
//     link.download = "sketch.jpeg";
//     link.href = dataUrl;
//     link.click();
//   });
// }

// Run the function
window.addEventListener("load", () => {
  setGridElementsOnContainer(DEFAULT_SIZE);
  setButtonActive();
  renderLeafAnimation();
});
