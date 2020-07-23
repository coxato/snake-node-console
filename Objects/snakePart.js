class SnakePart{
    constructor(iPos, jPos, char = '#'){
        this.iPos = iPos;
        this.jPos = jPos;
        this.char = char;
    }

    // update iPosition and jPosition
    updatePos(newIPos, newJpos){
        this.iPos = newIPos;
        this.jPos = newJpos;
    }
}

export default SnakePart;