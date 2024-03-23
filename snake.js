// Get the canvas element and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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
]
let direction = 'right'

function drawSnake(snakes) {
    snakes.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen'; //color of snake
        ctx.strokeStyle = 'darkgreen'; //border color of snake
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10)// Draws the snake part
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)// Draws the border of snake part
    })
}

function checkBoundries(head) {
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        console.log('game over');
        return true
    }
    return false
}
function moveSnake() {
    let snake = initialSnake;
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
    console.log('new snake', ...snake);
    snake.unshift(head) //add the new head to beginning of the snake body
    snake.pop() //remove the last element of array
    if (checkBoundries(head)) {
        console.log('game is over');
        setTimeout(() => window.location.reload()
            , 2000)

    }
    clearCanvas()
    drawSnake(snake)
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
    setInterval(() => { moveSnake() }, 300)
}

document.addEventListener('keydown', changeDirection)

// Initial setup function
const setup = () => {
    // clear the canvas at the beginning
    console.log('setup working perfect');
    clearCanvas()
    drawSnake(initialSnake)
    timePassing()
    //more setups
}
// call the setup function

window.onload = setup
