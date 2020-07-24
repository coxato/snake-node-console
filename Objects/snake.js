import SnakePart from './snakePart.js';

class Snake{
    constructor(initiPosI = 0, initiPosJ = 0, moveTo = 'right'){
        this.snakeBodyParts = [];
        this.moveTo = moveTo;
        // old position in board, before update
        this.lastBodyPartOldPosition = {
            iPos: initiPosJ,
            jPos: initiPosJ
        }
        this.initHead(initiPosI, initiPosJ);
    }

    
    initHead(iPos, jPos){
        !this.snakeBodyParts.length && this.snakeBodyParts.push( new SnakePart(iPos, jPos) )
    }


    // add body part
    addPart(iPos, jPos){
        this.snakeBodyParts.push( new SnakePart(iPos, jPos) )
    }


    // remove last body part
    removePart(){
        this.snakeBodyParts.pop();
    }


    // save the snake queue in his old position, to delete of board later 
    saveOldQueuePosition(){
        const { snakeBodyParts, length} = this;
        const lastBodyPart = snakeBodyParts[ length -1 ];
        
        this.lastBodyPartOldPosition = {
            ...lastBodyPart
        }
    }


    // update the snake body positions
    update(newIpos, newJpos){
        const { snakeBodyParts, length} = this;
        
        this.saveOldQueuePosition();

        // first update rest of parts from queue, except head
        if(length >= 2){
            for(let i = length - 1; i > 0; i--){
                // prev body part position
                let { iPos, jPos } = snakeBodyParts[i-1];
                snakeBodyParts[i].updatePos(iPos, jPos);
            }
        }

        // then update head
        snakeBodyParts[0].updatePos(newIpos, newJpos);
        
    }

    // getters and setters
    get length(){
        return this.snakeBodyParts.length;
    }

    get headPosition(){
        return {
            iPos: this.snakeBodyParts[0].iPos,
            jPos: this.snakeBodyParts[0].jPos,
        }
    }


}

export default Snake;