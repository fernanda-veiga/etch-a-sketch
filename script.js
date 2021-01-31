//---------- CREATE GRID ----------//

//VARIABLES
const container = document.querySelector(".container");
const newGrid = document.querySelector("#grid-button");

//INITIALIZATION
let squares = [];
let userInput = 16;
let containerWidth = getComputedStyle(container).width;
containerWidth = Number(containerWidth.slice(0, -2));

createGrid();
toggleBlack();

//EVENT LISTENER
newGrid.addEventListener("click", getUserInput);

//FUNCTIONS
//Shows a prompt on the screen to get a number of pixels from the user
function getUserInput() {
    userInput = Number(prompt("What is the size of the new grid?"));
    verifyUserInput(userInput);
    createGrid();
}

//Verifies if the user input is a number from 1 to 50
function verifyUserInput() {
    if (Number.isNaN(userInput) || userInput < 1 || userInput > 50) {
        alert("The input is not valid. Pick a number from 1 to 50.");
        userInput = 16;
        return;
    }
    return;
}

//Creates a grid from the user input
function createGrid() {
    removeOldSquares();

    //Calculates the width of the square from the user input
    let squareWidth = containerWidth / userInput;

    for (let i = 0; i < Math.pow(userInput, 2); i++) {
        squares[i] = document.createElement("div");
        squares[i].classList.add("square");
        squares[i].style.width = `${squareWidth}px`;
        squares[i].style.height = `${squareWidth}px`;
        container.appendChild(squares[i]);
    }
    toggleBlack();
}

//Deletes the last grid for the new grid to show
function removeOldSquares() {
    squares.forEach(item => {
        container.removeChild(item);
    })
    squares = [];
}

//---------- CLEAR THE GRID ----------//
const clearButton = document.querySelector("#clear-button");

clearButton.addEventListener("click", clearGrid);

function clearGrid() {
    squares.forEach(item => {
        item.style.backgroundColor = "white";
    })
}

//---------- BLACK INK ----------//
const blackButton = document.querySelector("#black-button");

blackButton.addEventListener("click", toggleBlack);

function toggleBlack() {
    squares.forEach(item => {
        item.removeEventListener("mouseenter", changeColorToRGB);
        item.removeEventListener("mouseenter", changeColorToGray);
        item.addEventListener("mouseenter", changeColorToBlack);
    })
    return;
}

function changeColorToBlack() {
    this.style.backgroundColor = "black";
}

//---------- RGB INK ----------//
const rgbButton = document.querySelector("#rgb-button");

rgbButton.addEventListener("click", toggleRGB);

function toggleRGB() {
    squares.forEach(item => {
        item.removeEventListener("mouseenter", changeColorToBlack);
        item.removeEventListener("mouseenter", changeColorToGray);
        item.addEventListener("mouseenter", changeColorToRGB);
    })
    return;
}

function changeColorToRGB() {
    this.style.backgroundColor = createRGB();
}

//Make a random rgb string
function createRGB() {
    let redValue = Math.floor(Math.random() * 255);
    let greenValue = Math.floor(Math.random() * 255);
    let blueValue = Math.floor(Math.random() * 255);
    let rgb = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    return rgb;
}

//---------- GRAYSCALE INK ----------//
const grayButton = document.querySelector("#grayscale-button");

grayButton.addEventListener("click", toggleGray);

function toggleGray() {
    squares.forEach(item => {
        item.removeEventListener("mouseenter", changeColorToBlack);
        item.removeEventListener("mouseenter", changeColorToRGB);
        item.addEventListener("mouseenter", changeColorToGray);
    })
    return;
}

function changeColorToGray() {
    this.style.backgroundColor = createGray(this);
}

//Make a gray color 10% darker than the current color
function createGray(element) {
    let currentColor = getComputedStyle(element).backgroundColor;
    let newColor = "";

    //Pick the first rgb value inside the string and turn it into a number
    for (let i = 4; i < currentColor.length; i++) {
        if (isNaN(currentColor[i])) {
            currentColor = Number(currentColor.slice(4, i));
            break;
        }
    }
    //Checks if the color is black
    if (currentColor == 0) {
        newColor = `hsl(0, 0%, 0%)`
    }
    //Creates an hsl lightness value and subtracts it by 10 to make the new color 10% darker than the current color
    else {
        let newLightness = Math.floor(getLightnessHSL(currentColor) - 10);
        newColor = `hsl(0, 0%, ${newLightness}%)`
    }
    return newColor;
}

//Converts an rgb value to an hsl lightness
function getLightnessHSL(value) {
    let convertedValue = value/255;
    let lightness = convertedValue * 100;
    return lightness;
}