import items from './boardItems.js';
import { randomPositions } from '../utils/utils.js';


class Board{
    constructor(rows = 10, collumns = 10, char = '.'){
        this.rows = rows;
        this.collumns = collumns;
        this.char = char;
        this.board = null;
        this.boardItems = this._initBoardItems();
        this._make();
    }


    // make board
    _make(){
        const { rows, collumns, char } = this;
        const board = [];
        let i = 0, j = 0;

        // fill matrix with the char
        while(i++ < rows){
            let collumn = [];

            while(j++ < collumns){
                collumn.push(char);
            }
            
            board.push(collumn);
            j = 0;
        }        

        this.board = board;
    }


    // init food, bombs, timers, extra points, etc
    _initBoardItems(){
        return { 
            food: new items.food()
         }
    }

    
    // print and update board with the snake
    update(snake){
        const { snakeBodyParts } = snake;
        const { board, char } = this;

        // put the snake in the board
        for(let bodyPart of snakeBodyParts){
            const {iPos, jPos, char} = bodyPart;
            board[iPos][jPos] = char;
        }

        // clean old snake position
        const {iPos, jPos} = snake.lastBodyPartOldPosition;
        board[iPos][jPos] = char;

        // put items in board
        this._putBoardItems();
        // _print the updated board
        this._print();
        
    }


    // print the first snake momevent
    firstPrint(snake){
        const { snakeBodyParts } = snake;
        const { board } = this;

        // put the snake in the board
        for(let bodyPart of snakeBodyParts){
            const {iPos, jPos, char} = bodyPart;
            board[iPos][jPos] = char;
        }

        this._putBoardItems();
        this._print();
    }


    // use in gameController.js
    useItem(itemName){
        this.boardItems[itemName].use();
    }

    // put board items like food, bombs, timers, etc
    _putBoardItems(){
        const { board, char, rows, collumns, boardItems } = this;

        const putInBoard = item => {
            // put in a white space
            while(true){
                const { iPos, jPos } = randomPositions(rows, collumns);
                if( board[iPos][jPos] === char ){
                    // set visibility
                    item.visible();
                    board[iPos][jPos] = item;
                    // board[0][1] = item;
                    break;
                }
            }
        }

        // put each item in board
        for(let key in boardItems){
            
            if( !boardItems[key].isVisible ){
                putInBoard(boardItems[key]);
            }
            // create new item
            else if(boardItems[key].isUsed && boardItems[key].isVisible){
                // console.log("");
                this.boardItems = {
                    ...this.boardItems,
                    [key]: new items[key]()
                }
                putInBoard(this.boardItems[key]);
            }
        }

    }

    

    // print the updated board
    _print(){
        console.clear();
        const { rows, collumns, board } = this;
        let boardStr = '';

        for(let i = 0; i < rows; i++){
            let line = '';
            for(let j = 0; j < collumns; j++){
                // ==========
                // TODO:
                // make each element in the matrix an object, not a string
                line += board[i][j].char || board[i][j];
                // ==========
            }
            boardStr += line + '\n';
        }
        console.log(boardStr);
    }

    
}

export default Board;