/* ==========
=============
Snake Game JS
=============
=========== */

const playMusicFile = new Audio('Blazer Rail 2.wav');
playMusicFile.play();

const grid = document.querySelector('.grid');
const startButton = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.95;
let timerId = 0;

timerId = setInterval(move, intervalTime); 

function createGrid() { 

    for (let i = 0; i < 100; i++) { // create 100 elements to place into grid with for loop
        const square = document.createElement('div'); // console.log(square);
        square.classList.add('square'); // add styling to these elements
        grid.appendChild(square);  // save squares to go into new array;
        squares.push(square); // console.log(squares);
    }

}

createGrid();

currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.add('snake'));

function startGame() {
    currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.remove('snake')); // remove the snake
    squares[appleIndex].classList.remove('apple'); // remove the apple
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    scoreDisplay.textContent = score; // readd new score to browser
    direction = 1;
    intervalTime = 1000;
    generateApples();
    currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.add('snake')); // readd class of snake to currentSnake
    timerId = setInterval(move, intervalTime); 
    playMusicFile.play();
}

/* ==========
=============
Snakes Movement Behavior
=============
=========== */

function move() { 

    if (
        (currentSnake[0] + width >= 100 && direction === 10) || // if snake hits the bottom
        (currentSnake[0] % width === 9 && direction === 1) || // if snake hits the right
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits the left
        (currentSnake[0] - width < 0 && direction === -10) || // if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') 
    ) return clearInterval(timerId);


    const tail = currentSnake.pop() // remove last element from currentSnake array --- .pop()
    squares[tail].classList.remove('snake');  // remove the styling from last element
    currentSnake.unshift(currentSnake[0] + direction);  // add a square in direction we're heading 
   
   
    if (squares[currentSnake[0]].classList.contains('apple')) {  // if snake head collides with apple 
        squares[currentSnake[0]].classList.remove('apple'); // remove the class of apple
        squares[tail].classList.add('snake'); // grow our currentSnake by adding class of snake to the square
        currentSnake.push(tail); // grow our currentSnake array
        generateApples(); // generate a new apple
        score ++; // add one to the score
        scoreDisplay.textContent = score; // display the score
        intervalTime = intervalTime * speed; // speed up our snake
        timerId = setInterval(move, intervalTime); // reset the timerId with the new variables
    }
    
    squares[currentSnake[0]].classList.add('snake'); // & add some styling to it
}

move();

/* ==========
=============
Generating Random Apples
=============
=========== */

function generateApples() { // creates randomly placed apples during the game
    do { 
        appleIndex = Math.floor( Math.random() * squares.length ) // generate a random number
    } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
}

generateApples();

/* ==========
=============
Keyboard Controls
=============
=========== */

function control(e) { 
    switch(e.keyCode) {
        case 40: 
        console.log('down is pressed');
        direction = +width;
        break;

        case 39: 
        console.log('right is pressed');
        direction = 1;
        break;

        case 38:
        console.log('up is pressed');
        direction = -width;
        break;

        case 37:
        console.log('left is pressed');
        direction = -1;
        break;

        case 74: 
        score++;
        scoreDisplay.textContent = score;
        break;

        case 72:
        score--;
        scoreDisplay.textContent = score;
        break;
    }
}

document.addEventListener('keydown', control);
startButton.addEventListener('click', startGame);