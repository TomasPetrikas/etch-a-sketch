const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 64;
let currentGridSize = DEFAULT_GRID_SIZE;

// Generates a square grid of a given size
function generateGrid(size) {
  const grid = document.querySelector("#container");

  for (let i = 0; i < size; i++) {
    const col = document.createElement("div");
    col.classList = "column";
  
    for (let j = 0; j < size; j++) {
      const row = document.createElement("div");
      row.classList = "square";
      col.appendChild(row);
    }
    grid.appendChild(col);
  }
}

// Clears the grid and regenerates it
function clearGrid() {
  const grid = document.querySelector("#container");
  grid.innerHTML = "";
  generateGrid(currentGridSize);

  // On clearing the grid, the gridlines come back automatically, so we need
  // to do this
  const gridlineBtn = document.querySelector("#gridline-btn");
  gridlineBtn.classList.add("active-btn");

  main();
}

// Changes the background color of a cell
function changeBackground(e) {
  const activeBtn = document.querySelector(".draw-btn.active-btn");

  switch (activeBtn.id) {
    case "black-btn":
      if (e.target.style.backgroundColor == "") {
        e.target.style.backgroundColor = `rgb(0, 0, 0)`;
      }
      break;
    case "greyscale-btn":
      // Check if background is not already colored
      if (e.target.style.backgroundColor == "") {
        e.target.style.backgroundColor = `rgb(224, 224, 224)`;
      }
      // If it is, darken it
      else {
        // "rgb(xxx, yyy, zzz)"  =>  [xxx, yyy, zzz]
        let colorStr = e.target.style.backgroundColor;
        colorStr = colorStr.slice(4, colorStr.length - 1);
        let colorArr = colorStr.split(", ");

        for (let i = 0; i < colorArr.length; i++) {
          colorArr[i] = +colorArr[i];
          colorArr[i] -= 32; // 12.5% darker
          if (colorArr[i] < 0) colorArr[i] = 0;
        }

        e.target.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
      }
      break;
    case "rainbow-btn":
      // Check if background is not already colored
      if (e.target.style.backgroundColor == "") {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      }
      // If it is, darken it
      else {
        // "rgb(xxx, yyy, zzz)"  =>  [xxx, yyy, zzz]
        let colorStr = e.target.style.backgroundColor;
        colorStr = colorStr.slice(4, colorStr.length - 1);
        let colorArr = colorStr.split(", ");

        for (let i = 0; i < colorArr.length; i++) {
          colorArr[i] = +colorArr[i];
          colorArr[i] -= 32; // 12.5% darker
          if (colorArr[i] < 0) colorArr[i] = 0;
        }

        e.target.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
      }
      break;
    case "eraser-btn":
      e.target.style.backgroundColor = ``;
      break;
    default:
      console.log("Something wrong in changeBackground");
  }
}

// Changes grid size depending on the value of the slider
function changeGrid(e) {
  if (e.target.value >= 1 && e.target.value <= MAX_GRID_SIZE) {
    currentGridSize = e.target.value;
    clearGrid();
  }

  // Update text below slider
  const sizeValue = [...document.querySelectorAll(".size-value")];
  sizeValue.forEach(val => val.textContent = e.target.value);
}

// Changes the drawing mode and visually updates buttons
function changeMode(e) {
  const drawBtns = [...document.querySelectorAll(".draw-btn")];
  drawBtns.forEach(function(button) {
    button.classList.remove("active-btn");
  });

  e.target.classList.add("active-btn");
}

// Toggles gridlines between squares on and off
function toggleGridlines(e) {
  const squares = [...document.querySelectorAll("#container .square")];
  squares.forEach(function(square) {
    if (square.style.borderColor == "" || square.style.borderColor == "grey") {
      square.style.borderColor = "white";
      square.style.borderWidth = "0px";
    }
    else {
      square.style.borderColor = "grey"; 
      square.style.borderWidth = "1px";
    }
  });

  // Update button state
  if (squares[0].style.borderColor == "grey") {
    e.target.classList.add("active-btn");
  }
  else {
    e.target.classList.remove("active-btn");
  }
}

function main() {
  const blackBtn = document.querySelector("#black-btn");
  const greyscaleBtn = document.querySelector("#greyscale-btn");
  const rainbowBtn = document.querySelector("#rainbow-btn");
  const eraserBtn = document.querySelector("#eraser-btn");
  const clearBtn = document.querySelector("#clear-btn");
  const gridlineBtn = document.querySelector("#gridline-btn");
  const sizeSlider = document.querySelector("#size-slider");

  blackBtn.addEventListener("click", changeMode);
  greyscaleBtn.addEventListener("click", changeMode);
  rainbowBtn.addEventListener("click", changeMode);
  eraserBtn.addEventListener("click", changeMode);
  clearBtn.addEventListener("click", clearGrid);
  gridlineBtn.addEventListener("click", toggleGridlines);
  sizeSlider.addEventListener("input", changeGrid);
  
  const squares = [...document.querySelectorAll(".square")];
  squares.forEach(function(square) {
    square.addEventListener("mouseover", changeBackground);
  });
}

generateGrid(currentGridSize);
main();