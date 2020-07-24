// libs
import keypress from 'keypress';
// game entitys
import Board from './board.js';
import Snake from './snake.js';
// utils
import { randomPositions } from '../utils/utils.js';



class GameController{

    constructor(){
        this.board = null;
        this.snake = null;
        this.direction = 'right';
        this.intervalTime = 100;
        this.intervalFunc = null;
        this._makeGame();
    }


    // make board and snake, then print first time
    _makeGame(){
        const board = new Board(20, 45, '.');
        const { iPos, jPos } = randomPositions(20, 45);
        const snake = new Snake(iPos, jPos, this.direction);
        // const snake = new Snake(0, 0, this.direction);
        
        this.board = board;
        this.snake = snake;
        
        // print board first time
        this.board.firstPrint(this.snake);

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
            const { direction } = this;

            // ctrl+c = quit game
            if (key && key.ctrl && key.name == 'c') {process.stdin.pause(); this.quitGame(); return }
            
            // set direction 
            switch (key.name) {
                // basically don't walk to himself 
                case 'right': if(direction !== 'left')  this.direction = 'right'; break;
                case 'left':  if(direction !== 'right') this.direction = 'left';  break;
                case 'up':    if(direction !== 'down')  this.direction = 'up';    break;
                case 'down':  if(direction !== 'up')    this.direction = 'down';  break;
                default: break;
            }
        });
        // continue listen data
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }


    // run the game with intervals
    update(){
        const { snake, board } = this;
        const { canContinue, positions } = this.calculateNextHeadPlace()
        
        // update snake position
        if(canContinue){
            const { iPos, jPos } = positions;
            snake.update(iPos, jPos);
            // update board
            board.update(snake);
        }

        else return;
    }


    /**
     * calculate the next movement and determine if canContinue or not depends the collition type
     * @type {Object}
     * @property {bool} canContinue
     * @property {object} positions
     * @returns {object} { canContinue, positions } 
     */
    calculateNextHeadPlace(){
        const { board, snake } = this;
        // next posible position from actual head position
        const { iPos, jPos } = this.nextPosition;
        let collitionChar;

        // get the next char in the board
        try {
            collitionChar = board.board[iPos][jPos];
        } 
        // out of board matrix, is a border board collition
        catch (err) {
            this.manageBoardBorderCollition();
        }


        // manage colition depends the next char
        let canContinue = true;

        // food
        if(collitionChar && collitionChar.char === board.boardItems.food.char) {this.manageFoodCollition()}

        // border
        else if(typeof collitionChar === 'undefined'){
            this.manageBoardBorderCollition();
            canContinue = false;
        }

        // self collition
        else if(collitionChar === '#'){ // snake char hardcoded
            this.manageSelfCollition(); 
            canContinue = false;
        }


        return {
            canContinue,
            positions: {
                iPos,
                jPos
            }
        }
        
    }


    manageFoodCollition(){
        const {snake, board} = this;
        const { iPos, jPos} = snake.lastBodyPartOldPosition;
        snake.addPart(iPos, jPos);
        board.useItem('food');
    }


    manageBoardBorderCollition(){
        console.log("you hit the wall, sorry you loose");
        this.quitGame();
    }


    manageSelfCollition(){
        console.log("you ate yourself, sorry you loose");
        this.quitGame();
    }


    // non collition, just walk in the board
    // manageNonCollition(){

    // }


    // play the game, with the interval
    play(){
        const { intervalTime } = this;
        this.intervalFunc = setInterval( () => {
            this.update()
        }, intervalTime);
    }


    // stop game
    quitGame(){
        clearInterval( this.intervalFunc );
        console.log("thanks for play :)");
        process.exit();
    }


    // ===== getters and setters =====
    get nextPosition(){
        const { direction, snake } = this;
        // actual head position
        const { iPos, jPos } = snake.headPosition;

        // next places
        const places = {
            right: { iPos, jPos: jPos + 1},
            left:  { iPos, jPos: jPos - 1},
            up:    { iPos: iPos - 1, jPos},
            down:  { iPos: iPos + 1, jPos},
        }
        
        return places[direction];
    }


}

export default GameController;