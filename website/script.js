const PIXEL = 32;
const CANVAS_WIDTH = 16 * PIXEL;
const CANVAS_HEIGHT = CANVAS_WIDTH;
const PRIMARY_COLOR = "rgba(22, 21, 21, 0.932)";
const SECONDARY_COLOR = "green";
const TRASPARENCY = "rgba(0, 0, 10, 0.700)";
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const TIME_FRAME_DURATION = 100


class Direction {
    static Up = new Direction('Up');
    static Down = new Direction('Down');
    static Left = new Direction('Left');
    static Right = new Direction('Right');
  
    constructor(name) {
      this.name = name;
    }
}

class Food {

    constructor() {
        this.x = Math.floor(Math.random() * 15 + 1) * PIXEL;
        this.y = Math.floor(Math.random() * 15 + 1) * PIXEL;
    }  
}

class SnakeCell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static newHead(oldHead, direction) {
        
        if (direction === Direction.Up) {
            const newX = oldHead.x;
            const newY = oldHead.y - PIXEL >= 0 ? oldHead.y - PIXEL : CANVAS_HEIGHT - PIXEL;
            return new SnakeCell(newX, newY); 
        } else if (direction === Direction.Down) {
            const newX = oldHead.x;
            const newY = oldHead.y + PIXEL < CANVAS_HEIGHT ? oldHead.y + PIXEL : 0;
            return new SnakeCell(newX, newY); 
        } else if (direction === Direction.Left) {
            const newX = oldHead.x - PIXEL >= 0 ? oldHead.x - PIXEL : CANVAS_HEIGHT - PIXEL;
            const newY = oldHead.y 
            return new SnakeCell(newX, newY);
        } else if (direction === Direction.Right) {
            const newX = oldHead.x + PIXEL < CANVAS_HEIGHT ? oldHead.x + PIXEL : 0;
            const newY = oldHead.y; 
            return new SnakeCell(newX, newY); 
        }
    }
}


class SnakeGame {
   
    constructor() {
        this.canvas = document.getElementById("snake");
        this.context = this.canvas.getContext("2d");
        this.snake = [new SnakeCell(8 * PIXEL, 8 * PIXEL)]
        this.direction = Direction.Right;
        this.food = new Food();
        document.addEventListener('keydown', (event) => this.updateDirection(event, this));
        this.gameLoop = setInterval(() => this.gameTimeFrame(this), TIME_FRAME_DURATION)
    }


    paintBackground() {
        this.context.fillStyle = PRIMARY_COLOR;
        this.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    paintSnake() {
        this.snake.forEach(body => {
            this.context.fillStyle = SECONDARY_COLOR;
            this.context.fillRect(body.x, body.y, PIXEL, PIXEL);
        })
    }

    paintFood() { 
        this.context.fillStyle = SECONDARY_COLOR;
        this.context.fillRect(this.food.x, this.food.y, PIXEL, PIXEL);    
    }

    paintTransparency() {
        this.context.fillStyle = TRASPARENCY;
        this.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    paintFrame() {
        this.paintBackground();
        this.paintSnake();
        this.paintFood();
        this.paintTransparency();
    }

    

    hasEatenFood() {
        return this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
    }

    isOver() {
        if(this.snake.length < 2) {
            return false;
        }
        
        const body = this.snake.slice(1);
        const head = this.snake[0];
        const isItOver = body.some(cell => cell.x === head.x && cell.y === head.y)

        return isItOver;
    }

    gameOver() {
        clearInterval(this.gameLoop)
        alert('Game Over :(');
        location.reload();
    }

    updateDirection(event, snakeGame) {
         
        switch(event.keyCode){
            case KEY_LEFT:
                snakeGame.direction = snakeGame.direction !== Direction.Right ? Direction.Left : Direction.Right;
                break;
            case KEY_RIGHT:
                snakeGame.direction = snakeGame.direction !== Direction.Left ? Direction.Right : Direction.Left;
                break;
            case KEY_UP:
                snakeGame.direction = snakeGame.direction !== Direction.Down ? Direction.Up : Direction.Down;
                break;
            case KEY_DOWN:
                snakeGame.direction = snakeGame.direction !== Direction.Up ? Direction.Down : Direction.Up;
                break;
            default:
                break;
        }

    }

    gameTimeFrame(snakeGame) {
        
        if(snakeGame.isOver()) {
            snakeGame.gameOver();
        }
        
        snakeGame.paintFrame();

        const newHead = SnakeCell.newHead(snakeGame.snake[0], snakeGame.direction)
        snakeGame.snake.unshift(newHead);

        if(snakeGame.hasEatenFood()) {
            snakeGame.food = new Food();
        } else {
            snakeGame.snake.pop();
        }

    }

    
}

const game = new SnakeGame();
