const DEFAULT_GRID_SIZE = 16;
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

// Removes the grid from the page
function clearGrid() {
  const grid = document.querySelector("#container");
  grid.innerHTML = "";
}

// Changes the background color of a cell
function changeBackground(e) {  
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
      colorArr[i] -= 25; // ~10% darker
      if (colorArr[i] < 0) colorArr[i] = 0;
    }

    e.target.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
  }
}

// Resets grid and gives option to change grid size
function changeGrid(e) {
  const newGridSize = prompt("Please enter new grid size (max: 100)", currentGridSize);
  
  if (newGridSize >= 1 && newGridSize <= 100) {
    currentGridSize = newGridSize;
  }
  else {
    currentGridSize = DEFAULT_GRID_SIZE;
  }

  clearGrid();
  main();
}

function main() {
  generateGrid(currentGridSize);

  const clearBtn = document.querySelector("#clear-btn");
  clearBtn.addEventListener("click", changeGrid);
  
  const squares = [...document.querySelectorAll(".square")];
  squares.forEach(function(square) {
    square.addEventListener("mouseover", changeBackground)
  });
}

main();