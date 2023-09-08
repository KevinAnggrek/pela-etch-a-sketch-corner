// Default Variables
const DEFAULT_MODE = "paint";

let currentColor = colorPicker.value;
let currentGridSize = gridSizePicker.value;
let currentMode = DEFAULT_MODE;
let isMouseDown = false;

// Default Elements
const gridContainer = document.querySelector(".grid-container");
const colorPicker = document.querySelector("#color-picker");
const gridSizePicker = document.querySelector("#grid-size-picker");
const paintModeButton = document.querySelector("#paint-mode-button");
const rainbowModeButton = document.querySelector("#rainbow-mode-button");
const eraserButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");

// Default Event Listeners
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

colorPicker.addEventListener("input", (event) => {
  currentColor = event.target.value;
});

// Grid Setter and Size Setter
function setGridElementsOnContainer(gridSize) {
  clearGridContainer();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const newGridElement = createGridElement(gridSize);
    gridContainer.appendChild(newGridElement);
  }
}

function createGridElement(gridSize) {
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
  gridElement.style.setProperty("--grid-size", 1 / gridSize);

  return gridElement;
}

function changeElementColor(element) {
  if (currentMode === "paint") {
    element.style.setProperty("--grid-color", currentColor);
  }
}

// Mode-related Functions
function setMode(newMode) {
  currentMode = newMode;
}

// Clearing-related Functions
function clearGridContainer() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function getAllGridElements() {}
