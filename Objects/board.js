class Board{
    constructor(rows = 10, collumns = 10, char = '.'){
        this.rows = rows;
        this.collumns = collumns;
        this.char = char;
        this.board = null;
        this.make();
    }

    // make board
    make(){
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

        // print the updated board
        this.print();
        
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

        this.print();
    }
    

    // print the updated board
    print(){
        console.clear();
        const { rows, collumns, board } = this;
        let boardStr = '';

        for(let i = 0; i < rows; i++){
            let line = '';
            for(let j = 0; j < collumns; j++){
                line += board[i][j];
            }
            boardStr += line + '\n';
        }
        console.log(boardStr);
    }

    
}

export default Board;