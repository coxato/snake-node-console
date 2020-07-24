// board items like food, etc

class Food{
    constructor(points = 3, char = '$'){
        this.points = points;
        this.char = char;
        this.name = 'food';
        this.isUsed = false;
        this.isVisible = false;
    }

    use(){ this.isUsed = true }
    
    visible(){ this.isVisible = true }

}


const items = { 
    food: Food
}

export default items;
