const container = document.querySelector(".container");
const button = document.querySelector(".button");

let squares = [];
let userInput = 0;

//Generate the initial 16x16 grid
generateGrid(16);

//Change the background color when the mouse hovers over the square
for (let i = 0; i < 256; i++) {
    squares[i].addEventListener("mouseenter", function(){
        squares[i].style.backgroundColor = "black";
    });
}

//Clears the grid when the button is clicked
button.addEventListener("click", function(){
    for (let i = 0; i < 256; i++) {
        squares[i].style.backgroundColor = "aquamarine";;
    }
    userInput = prompt("What is the size of the new grid?", 16);
})

//FUNCTIONS
function generateGrid(userInput) {
    for (let i = 0; i < Math.pow(userInput, 2); i++) {
        squares[i] = document.createElement("div");
        squares[i].classList.add("square");
        container.appendChild(squares[i]);
    }
}