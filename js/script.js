
const score = document.getElementById('score-result')
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
if (score.textContent == '') score.textContent = 1;

let snake = [{
    x: Math.floor(Math.random() * cols) * scale,
    y: Math.floor(Math.random() * rows) * scale
}];

let direction = 'RIGHT';
let food = {};

function placeFood() {
    food = {
        x: Math.floor(Math.random() * cols) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

placeFood(); // Initialize food placement

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeStyle = 'darkred';
    ctx.lineWidth = 2;
    ctx.strokeRect(food.x, food.y, scale, scale);

    // Draw snake
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'darkgreen';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 6;
    for (let segment of snake) {
        
        ctx.fillRect(segment.x, segment.y, scale, scale);
        ctx.strokeRect(segment.x, segment.y, scale, scale);
    }
}

function update() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'LEFT':
            head.x -= scale;
            break;
        case 'RIGHT':
            head.x += scale;
            break;
        case 'UP':
            head.y -= scale;
            break;
        case 'DOWN':
            head.y += scale;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood(); // Correct function name
        let scoreResult = snake.length;
        score.textContent = scoreResult;
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0) {
        snake[0].x = canvas.width;
        direction = 'LEFT';
    } 
    if (head.x > canvas.width) {
        snake[0].x = 0;
        direction = 'RIGHT';
    } 
    if (head.y < 0) {
        snake[0].y = canvas.height;
        direction = 'UP';
    } 
    if (head.y > canvas.height) {
        snake[0].y = 0;
        direction = 'DOWN';
    } 

}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    draw();
    update();
    setTimeout(gameLoop, 100);
}

gameLoop();
