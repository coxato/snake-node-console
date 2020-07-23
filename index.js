import Snake from './Objects/snake.js';
import Board from './Objects/board.js';

const c = console.log;

// init
const rows = 7;
const collumns = 10;

const board = new Board(rows, collumns);
const snake = new Snake(0, 0, 'right');


board.firstPrint(snake);

setTimeout(() => {
    snake.update(0, 1)
    board.update(snake);
    
    // c(board.board)
}, 2000)