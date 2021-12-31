const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 64;
const DEFAULT_MODE = "black";
let currentGridSize = DEFAULT_GRID_SIZE;
let currentMode = DEFAULT_MODE;

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

// Removes the grid from the page
function clearGrid() {
  const grid = document.querySelector("#container");
  grid.innerHTML = "";
}

// Changes the background color of a cell
function changeBackground(e) {
  switch (currentMode) {
    case "black":
      if (e.target.style.backgroundColor == "") {
        e.target.style.backgroundColor = `rgb(0, 0, 0)`;
      }
      break;
    case "greyscale":
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
    case "rainbow":
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
    case "eraser":
      e.target.style.backgroundColor = ``;
      break;
    default:
      console.log("Something wrong in changeBackground");
  }
}

// Resets grid and gives option to change grid size
// TODO: make cancel not reset grid to default
function changeGrid(e) {
  const newGridSize = prompt(`Please enter new grid size (max: ${MAX_GRID_SIZE})`, currentGridSize);
  console.log(newGridSize);
  
  if (newGridSize >= 1 && newGridSize <= MAX_GRID_SIZE) {
    currentGridSize = newGridSize;
    clearGrid();
    generateGrid(currentGridSize);
  }

  main();
}

// Changes the drawing mode
function changeMode(e) {
  switch (e.target.id) {
    case "black-btn":
      currentMode = "black";
      break;
    case "greyscale-btn":
      currentMode = "greyscale";
      break;
    case "rainbow-btn":
      currentMode = "rainbow";
      break;
    case "eraser-btn":
      currentMode = "eraser";
      break;
    default:
      // Failsafe
      currentMode = DEFAULT_MODE;
  }

  main();
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
}

function main() {
  const blackBtn = document.querySelector("#black-btn");
  const greyscaleBtn = document.querySelector("#greyscale-btn");
  const rainbowBtn = document.querySelector("#rainbow-btn");
  const eraserBtn = document.querySelector("#eraser-btn");
  const clearBtn = document.querySelector("#clear-btn");
  const gridlineBtn = document.querySelector("#gridline-btn");

  blackBtn.addEventListener("click", changeMode);
  greyscaleBtn.addEventListener("click", changeMode);
  rainbowBtn.addEventListener("click", changeMode);
  eraserBtn.addEventListener("click", changeMode);
  clearBtn.addEventListener("click", changeGrid);
  gridlineBtn.addEventListener("click", toggleGridlines);
  
  const squares = [...document.querySelectorAll(".square")];
  squares.forEach(function(square) {
    square.addEventListener("mouseover", changeBackground);
  });
}

generateGrid(currentGridSize);
main();