

class Game {
    constructor(antsNb, foodSourceNb, cWidth, cHeight) {

        this.antsNb = antsNb;
        this.foodSourceNb = foodSourceNb;
        this.cWidth = cWidth;
        this.cHeight = cHeight;

        //arrays of objects (fun stuff incoming ?:'( )
        this.anthills       = [];
        this.foodSources    = [];
        this.obstacles      = [];
        this.ants           = [];

    }

    nextTurn() {
        for(let i = 0; i < this.ants.length; i++) {
            this.ants[i].move(this.cWidth, this.cHeight);
        }
    }

    init() {
        this.anthills.push(new Anthill(this.randNum(0,this.cWidth), this.randNum(0, this.cHeight), 0));
        for(let i = 0; i < this.antsNb; i++) {  //create ants in the first anthill at anthill pos
            this.ants.push(new Ant(this.anthills[0].x, this.anthills[0].y));
        }
    }

    toDraw() {
        //return every object that antGUI has to draw -> arrays of food / obstacles for ex
        return [this.anthills, this.foodSources, this.obstacles, this.ants];
    }

    randNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


