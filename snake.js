// Get the canvas element and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// set the fill color for the canvas context
ctx.fillStyle = 'black'

// This function will clear the canvas

function clearCanvas() {
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
// Initial setup function
const setup = () => {
    // clear the canvas at the beginning
    console.log('setup working perfect');
    clearCanvas()
    //more setups
}
// call the setup function

window.onload = setup
