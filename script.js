const container = document.querySelector(".container");

let squares = [];

//Generate the 16x16 grid
for (let i = 0; i < 256; i++) {
    squares[i] = document.createElement("div");
    squares[i].classList.add("square");
    container.appendChild(squares[i]);
}

//Change the background color when the mouse hovers over the square
for (let i = 0; i < 256; i++) {
    squares[i].addEventListener("mouseenter", function(){
        squares[i].style.backgroundColor = "black";
    });
}