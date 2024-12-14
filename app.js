// vars
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');

// pixels per cell
let cellSize = 32;
let width = canvas.width / cellSize;
let height = canvas.height / cellSize;
let defeated = false;

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.segments = [];
        this.direction = { x: 0, y: -1 };
    }

    Move() {
        if (defeated) {
            return;
        }
        for (let i = 0; i < this.segments.length - 1; i++) {
            this.segments[i] = this.segments[i + 1];
        }
        this.segments[this.segments.length - 1] = [this.x, this.y];

        this.x += this.direction.x;
        this.y += this.direction.y;
    }
    Draw() {
        ctx.fillStyle = '#9f2';
        ctx.fillRect((snake.x * cellSize) + 2, (snake.y * cellSize) + 2, cellSize - 4, cellSize - 4);
        for (let i = 0; i < this.segments.length; i++) {
            ctx.fillStyle = i == 0 ? '#c92' : '#9f2'
            ctx.fillRect((this.segments[i][0] * cellSize) + 4, (this.segments[i][1] * cellSize) + 4, cellSize - 8, cellSize - 8);
        }
    }
    CheckDefeat() {
        let nextPos = [this.x + this.direction.x, this.y + this.direction.y];
        if (this.segments.includes(nextPos)) {
            defeated = true;
        }
    }
}
class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const spawnApple = () => {
    let newX = Math.floor(Math.random() * width);
    let newY = Math.floor(Math.random() * height);
    apple.x = newX;
    apple.y = newY;
}

const snake = new Snake(this.x = width / 2, this.y = height / 2)
let apple = new Apple(Math.round(Math.random() * (width)), Math.round(Math.random() * height))

// listen to movement keys
document.addEventListener('keydown', k => {
    switch (k.code) {
        case 'KeyW': snake.direction = { x: 0, y: -1 }; break;   // up
        case 'KeyS': snake.direction = { x: 0, y: 1 }; break;  // down
        case 'KeyA': snake.direction = { x: -1, y: 0 }; break;  // left
        case 'KeyD': snake.direction = { x: 1, y: 0 }; break;   // right
    }
})
setInterval(() => {
    // if snake eats apple
    if (snake.x == apple.x && snake.y == apple.y) {
        snake.segments.push([snake.x, snake.y]);
        spawnApple();
    }

    // draw snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.Draw();
    snake.Move();
    snake.CheckDefeat();
    ctx.fillStyle = '#f33';
    ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
    score.innerText = ('000' + snake.segments.length).slice(-3);

}, 1000 / 8);