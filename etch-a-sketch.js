const gridContainer = document.querySelector(".grid-container");
const colorPicker = document.querySelector("#color-picker");
const gridSizePicker = document.querySelector("#grid-size-picker");

let currentColor = colorPicker.value;
let currentGridSize = gridSizePicker.value;

let isMouseDown = false;
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

function setGridElementsOnContainer(gridSize) {
  clearGridContainer();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const newPlainGrid = createPlainGridElement();
    newPlainGrid.style.setProperty("--grid-size", 1 / gridSize);
    gridContainer.appendChild(newPlainGrid);
  }
}

function activatePaintMode() {
  const gridElements = document.querySelector(".grid-element");

  gridElements.ForEach(function (gridElement) {
    gridElement.addEventListener("mouseover", function (e) {
      if (isMouseDown) {
        changeElementColor(e.target);
      }
    });
  });
}

function createPlainGridElement() {
  const plainGrid = document.createElement("div");
  plainGrid.classList.add("grid-element");

  return plainGrid;
}

function clearGridContainer() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function changeElementColor(element) {
  element.style.setProperty(--grid - colorPicker, currentColor);
}

function getAllGridElements() {}
