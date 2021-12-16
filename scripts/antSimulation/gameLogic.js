

class Game {
    constructor(antsNb, foodSourceNb, cWidth, cHeight) {

        this.antsNb = antsNb;
        this.foodSourceNb = foodSourceNb;
        this.cWidth = cWidth;
        this.cHeight = cHeight;

        this.debugger = 0;
        //arrays of objects (fun stuff incoming ?:'( )
        this.anthills       = [];
        this.foodSources    = [];
        this.obstacles      = [];
        this.ants           = [];

    }

    nextTurn() {
        for(let i = 0; i < this.ants.length; i++) { 
            let foodSourceToDel = [];
            for(let j = 0; j < this.foodSources.length; j++) {
                if(this.ants[i].full == false && this.ants[i].isNear(this.foodSources[j])){
                    this.ants[i].setFull(true);
                    this.foodSources[j].amount = this.foodSources[j].amount-1;
                    this.foodSources[j].isAttacked = true;
                    if(this.foodSources[j].amount <= 0){
                        foodSourceToDel.push(j);
                    }
                    this.ants[i].setTarget(this.anthills[this.ants[i].idAnthill]);
                } else if(this.ants[i].full == true && this.ants[i].isNear(this.anthills[this.ants[i].idAnthill])) {
                    this.ants[i].setFull(false);
                    this.anthills[this.ants[i].idAnthill].foodAmount = this.anthills[this.ants[i].idAnthill].foodAmount+1;
                    this.ants[i].setRandomTarget(this.cWidth, this.cHeight);
                }
            }
            if(this.ants[i].full){  
                //lost the food this thing is due to a unresolved bug that 'freeze' some ants near (<100 px for anthill)
                //the bug freeze about 3% to 5% of the total ants tested with 1000 ants and 1000 food
                //the call of the function move seems to be the cause but I have no clue why
                //or maybe it's because the cpu can't handle the load and my frame cap leak on other threads or something
                //  |b-_-b|
                if(this.debugger > 10) {
                    let angle = Math.atan2(this.ants[i].dir[0] - this.ants[i].x, this.ants[i].dir[1] - this.ants[i].y);
                    this.ants[i].x += this.ants[i].speed * Math.sin( angle );
                    this.ants[i].y += this.ants[i].speed * Math.cos( angle );
                    this.debugger = 0;
                } else {
                    this.ants[i].setTarget(this.anthills[this.ants[i].idAnthill]);
                    if(this.ants[i].isNear(this.anthills[this.ants[i].idAnthill])){
                        this.ants[i].setFull(false);
                        this.anthills[this.ants[i].idAnthill].foodAmount = this.anthills[this.ants[i].idAnthill].foodAmount+1;
                        this.ants[i].setRandomTarget(this.cWidth, this.cHeight);
                    }
                }
                
                this.debugger += 1;
            }





            for(let k = 0; k < foodSourceToDel.length; k++) {
                this.foodSources.splice(foodSourceToDel[k], 1);
            }
            this.ants[i].move(this.cWidth, this.cHeight);
        }
        
    }

    init() {
        this.anthills.push(new Anthill(this.cWidth/2, this.cHeight/2, 0));
        for(let i = 0; i < this.antsNb; i++) {  //create ants in the first anthill at anthill pos
            this.ants.push(new Ant(this.anthills[0].x, this.anthills[0].y, 0));
        }
        for(let i = 0; i < this.foodSourceNb; i++) {
            this.foodSources.push(new FoodSource(this.randNum(this.cWidth/4, (3/4)*this.cWidth), this.randNum(this.cHeight/4, (3/4)*this.cHeight), 10));
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


