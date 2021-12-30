// Generates a square grid of a given size
function generateGrid(size) {
  let grid = document.querySelector("#container");

  for (let i = 0; i < size; i++) {
    let col = document.createElement("div");
    col.classList = "column";
  
    for (let j = 0; j < size; j++) {
      let row = document.createElement("div");
      row.classList = "square";
      col.appendChild(row);
    }
    grid.appendChild(col);
  }
}

function changeBackground(e) {
  const red = Math.random() * 255;
  const green = Math.random() * 255;
  const blue = Math.random() * 255;
  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

generateGrid(16);

const squares = [...document.querySelectorAll(".square")];
squares.forEach(function(square) {
  square.addEventListener("mouseover", changeBackground)
});