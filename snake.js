// Get the canvas element and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
console.log(
    localStorage.getItem('score')
);
let gameState = 'notStarted'
let moveIntervalTime = 200; // Initial interval in milliseconds
const speedIncreaseFactor = 0.94; // Speed increase factor (less than 1 to increase speed)
const growthScoreThreshold = 10; // Score interval at which the snake grows
const minIntervalTime = 50; // Minimum interval time in milliseconds

let apples = [
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    },
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    },
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    },
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    }
    ,
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    },
    {
        x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
        y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
    }
];


// states:'playing','gameover','notStarted'
let menuState = false
let highestScore; //readHighestScore
function readHighestScore() {
    highestScore = localStorage.getItem('score') || 0
    document.getElementById('highestScore').textContent = highestScore
    if (score > highestScore) {
        localStorage.setItem('score', score)
    }
}

function setGameState(state) {
    gameState = state
}
// set the fill color for the canvas context
ctx.fillStyle = 'black'

// This function will clear the canvas

function clearCanvas() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
// snake representation

const initialSnake = [{ x: 200, y: 200 }, // Head of the snake
{ x: 190, y: 200 }, // Body segment
{ x: 180, y: 200 }, // Body segment
{ x: 170, y: 200 }, // Body segment
{ x: 160, y: 200 }, // Body segment
{ x: 150, y: 200 }, // Body segment
{ x: 140, y: 200 }, // Body segment
]
let snake;
let direction = 'right'
let score = 0; // Initialize score at the beginning of your script

function drawSnake(snakes) {
    snakes.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen'; //color of snake
        ctx.strokeStyle = 'darkgreen'; //border color of snake
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10)// Draws the snake part
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)// Draws the border of snake part
    })
}
function drawApple() {
    ctx.font = '40px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    apples.forEach(apple => {
        ctx.fillText('❤️', apple.x + 5, apple.y + 8);
    });
}



function gameover() {
    console.log('game over');
    setGameState('gameover');
    if (score > highestScore) {
        localStorage.setItem('score', score);
        highestScore = score; // Update the highestScore variable to reflect this change
    }
    setMenuState(true);
    clearInterval(moveInterval);
}

function accidentChecker(head, snakeBody) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) { return true }

    }
    return false
}

function resetGame() {
    clearInterval(moveInterval); // Clear any existing game loop intervals

    // Reset difficulty
    moveIntervalTime = 300; // Reset to initial speed
    snake = JSON.parse(JSON.stringify(initialSnake)); // Deep copy initialSnake
    direction = 'right'; // Reset direction
    score = 0; // Reset score
    document.getElementById('score').textContent = score; // Update score display

    clearCanvas();
    drawSnake(snake); // Draw the reset snake
    drawApple()
    setMenuState(false);
    readHighestScore()
    setGameState('playing');
    timePassing();
}
function checkBoundries(head) {
    if (head.x >= canvas.width || head.x <= 0 || head.y >= canvas.height || head.y <= 0) {
        console.log(canvas.width);
        gameover()
        return true
    }
    return false
}

function setMenuState(state) {
    menuState = state
    if (menuState === true) {
        document.getElementById('gameMenu').classList.remove('hidden')
    }
    if (menuState === false) {
        document.getElementById('gameMenu').classList.add('hidden')
    }
}
function increaseDifficulty() {
    // Only decrease interval time if it won't go below the minimum interval time
    const potentialNewIntervalTime = moveIntervalTime * speedIncreaseFactor;
    if (potentialNewIntervalTime > minIntervalTime) {
        moveIntervalTime = potentialNewIntervalTime;
    } else {
        moveIntervalTime = minIntervalTime;
    }

    clearInterval(moveInterval); // Clear the existing interval
    moveInterval = setInterval(moveSnake, moveIntervalTime); // Set a new interval with the updated time
}

function growSnake() {
    // Calculate the growth segment based on the current direction
    let tail = snake[snake.length - 1];
    let newSegment = { x: tail.x, y: tail.y }; // Initialize as the same as the tail

    // Depending on the current direction, adjust the new segment position
    if (direction === 'right') {
        newSegment.x -= 10;
    } else if (direction === 'left') {
        newSegment.x += 10;
    } else if (direction === 'up') {
        newSegment.y += 10;
    } else if (direction === 'down') {
        newSegment.y -= 10;
    }

    // Add the new segment to the snake (the actual growth)
    snake.push(newSegment);
}

function setScore(addedPoint) {
    score += addedPoint;
    document.getElementById('score').textContent = score;

    // Increase difficulty every 10 points
    if (score % 10 === 0) {
        increaseDifficulty();
    }
    if (score % growthScoreThreshold === 0) {
        growSnake();
    }
}
function moveApple(index) {
    let newApplePosition;
    do {
        newApplePosition = {
            x: Math.floor((Math.random() * (canvas.width - 20)) / 10) * 10,
            y: Math.floor((Math.random() * (canvas.height - 20)) / 10) * 10,
        };
    } while (snake.some(segment => segment.x === newApplePosition.x && segment.y === newApplePosition.y));

    apples[index] = newApplePosition;
}



function moveSnake() {
    if (gameState !== 'playing') {
        return
    }
    if (score === 0) { snake = JSON.parse(JSON.stringify(initialSnake)); }

    const head = { ...snake[0] }

    switch (direction) {
        case 'right':
            head.x += 10
            break;
        case 'left':
            head.x -= 10
            break;
        case 'up':
            head.y -= 10
            break;
        case 'down':
            head.y += 10
            break;

        default:
            break;
    }
    if (accidentChecker(head, snake)) {
        gameover()
        return;
    }
    snake.unshift(head) //add the new head to beginning of the snake body
    snake.pop() //remove the last element of array
    // Check collision with the apple
    apples.forEach((apple, index) => {
        if (snake[0].x >= apple.x - 20 && snake[0].x <= apple.x + 20 && snake[0].y >= apple.y - 20 && snake[0].y <= apple.y + 20) {
            score += 200; // Increase score
            document.getElementById('score').textContent = score; // Update score display
            moveApple(index); // Move this apple to a new location
            growSnake(); // Grow the snake
        }
    });
    clearCanvas()
    drawApple()
    drawSnake(snake)
    setScore(1)
    if (checkBoundries(head)) {
        gameover()
    }
}

// Function to handle touch events
function handleTouch(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Get the touch position relative to the canvas
    const touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;

    // Determine the direction based on touch position
    const headX = snake[0].x;
    const headY = snake[0].y;

    // Calculate the horizontal and vertical distances between touch position and snake head
    const deltaX = touchX - headX;
    const deltaY = touchY - headY;

    // Determine the absolute value of deltaX and deltaY to determine the dominant direction
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Set the snake direction based on the dominant touch direction
    if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && direction !== 'left') {
            direction = 'right';
        } else if (deltaX < 0 && direction !== 'right') {
            direction = 'left';
        }
    } else {
        // Vertical swipe
        if (deltaY > 0 && direction !== 'up') {
            direction = 'down';
        } else if (deltaY < 0 && direction !== 'down') {
            direction = 'up';
        }
    }
}


function changeDirection(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
                console.log(direction);
            }
            break;

        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
                console.log(direction);
            }
            break;

        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
                console.log(direction);
            }
            break;

        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
                console.log(direction);
            }
            break;
    }
}
function timePassing() {
    moveInterval = setInterval(() => { moveSnake() }, moveIntervalTime * speedIncreaseFactor)
}

document.addEventListener('keydown', changeDirection)

// Initial setup function
const setup = () => {
    // clear the canvas at the beginning
    console.log('setup working perfect');
    clearCanvas()
    drawSnake(initialSnake)
    drawApple()
    setMenuState(false)
    readHighestScore()
    setGameState('playing')
    timePassing()
    console.log('menuState:', menuState);
    console.log('gameState:', gameState);
    //more setups
}
function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.8;

    // After resizing, you may need to redraw any graphics or UI elements
}

// Initial resize
resizeCanvas();
//resetGame
// Add an event listener to resize the canvas when the window is resized
// Add event listener for touch events
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);

window.addEventListener('resize', resizeCanvas);
// call the setup function
document.getElementById('resetGameButton').addEventListener('click', resetGame)
window.onload = setup