const container = document.querySelector(".container");

let squares = [];

for (i = 0; i < 256; i++) {
    squares[i] = document.createElement("div");
    squares[i].classList.add("square");
    container.appendChild(squares[i]);
}