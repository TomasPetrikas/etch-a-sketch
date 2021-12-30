grid = document.querySelector("#container");

for (let i = 0; i < 16; i++) {
  let col = document.createElement("div");
  col.classList = "column";

  for (let j = 0; j < 16; j++) {
    let row = document.createElement("div");
    row.classList = "square";
    col.appendChild(row);
  }
  grid.appendChild(col);
}