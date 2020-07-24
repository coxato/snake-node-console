// libs
import keypress from 'keypress';
// game entitys
import Board from './board.js';
import Snake from './snake.js';



class GameController{

    constructor(){
        this.board = null;
        this.snake = null;
        this.direction = 'right';
        this.intervalTime = 1000;
        this.intervalFunc = null;
        this._makeGame();
    }


    // make board and snake, then print first time
    _makeGame(){
        const board = new Board(10, 15, '.');
        const snake = new Snake(0, 4, this.direction);
        
        snake.addPart(0,3)
        snake.addPart(0,2)
        snake.addPart(0,1)
        
        this.board = board;
        this.snake = snake;
        
        
        // print board first time
        this.board.firstPrint(this.snake);
        // console.log(snake.snakeBodyParts);
        // snake.update(0,5)
        // console.log(snake.snakeBodyParts);

        // listen for keypress
        this.getKeyboardKey();
        // for play game 
        // <<GameControllerInstance>>.play();
    }


    // get the arrow key
    getKeyboardKey(){
        // make `process.stdin` begin emitting "keypress" events
        keypress(process.stdin);
        
        // listen for the "keypress" event
        process.stdin.on('keypress', (ch, key) => {
            // quit game
            if (key && key.ctrl && key.name == 'c') {process.stdin.pause(); this.quitGame(); return }
            
            // set direction
            switch (key.name) {
                case 'right': this.direction = 'right'; break;
                case 'left':  this.direction = 'left';  break;
                case 'up':    this.direction = 'up';    break;
                case 'down':  this.direction = 'down';  break;
                default: break;
            }
        });
        // continue listen data
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }


    // run the game with intervals
    update(){
        const { direction, snake, board } = this;
        const { iPos, jPos } = snake.headPosition;
        console.log("direction: ", direction);
        
        // update snake position
        switch (direction) {
            case 'right': snake.update(iPos, jPos + 1); break;
            case 'left':  snake.update(iPos, jPos - 1); break;
            case 'up':    snake.update(iPos - 1, jPos); break;
            case 'down':  snake.update(iPos + 1, jPos); break;
            default: break;
        }

        // console.log('\n ipos y jpos', iPos, jPos)

        // update board
        board.update(snake);
    }


    // play the game, with the interval
    play(){
        const { intervalTime } = this;

        this.intervalFunc = setInterval( () => this.update(), intervalTime);
        // this.update()
    }


    // stop game
    quitGame(){
        clearInterval( this.intervalFunc );
        console.log("thanks for play :)");
    }

}

export default GameController;