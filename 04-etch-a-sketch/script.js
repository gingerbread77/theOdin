const container = document.querySelector(".container");
const clearBtn = document.getElementById("clear");
const eraseBtn = document.getElementById("erase");
const drawBtn = document.getElementById("draw");
const colorPicker = document.getElementById("color-picker");

// create 16x16 grid
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const item = document.createElement("div");
    item.className = "item";
    container.appendChild(item);
  }
}

// get random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function startDrawing() {
  const gridItems = document.querySelectorAll(".container .item");
  gridItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = getRandomColor();
    });
  });
}

function eraseDrawing() {
  const gridItems = document.querySelectorAll(".container .item");
  gridItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "";
    });
  });
}

function clearGrid() {
  const gridItems = document.querySelectorAll(".container .item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "";
  });
}

startDrawing();

drawBtn.addEventListener("click", startDrawing);
eraseBtn.addEventListener("click", eraseDrawing);
clearBtn.addEventListener("click", clearGrid);
