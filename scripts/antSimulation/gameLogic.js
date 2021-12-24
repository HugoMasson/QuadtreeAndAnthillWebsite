

class Game {
    constructor(antsNb, nbAnthills, foodSourceNb, cWidth, cHeight) {

        this.antsNb = antsNb;
        this.nbAnthills = nbAnthills;
        this.foodSourceNb = foodSourceNb;
        this.cWidth = cWidth;
        this.cHeight = cHeight;


        //HAVE to refactor this these var are arbitrary should replace by function
        //and provide a choice before & in simulation
        this.antReproductionFactor = 1;
        this.antDeathFactor = 1;
        this.foodDepletionRate = 1/100;
        this.foodReproductionFactor = 10;

        this.anthills       = [];
        this.foodSources    = [];
        this.obstacles      = [];
        this.ants           = [];

    }

    nextTurnAnthills(iteration, fpsTarget) {
        let vToSuppr = 0;
        for(let i = this.anthills.length-1; i >= 0; i--) {
            if(iteration % (fpsTarget*2) == 0) {    //every 2 second if fpsTarget is reached
                vToSuppr = Math.floor(this.ants.length/5);
                if(vToSuppr == 0){
                    vToSuppr = 1;
                }
                this.anthills[i].supprFood(vToSuppr);
            }
        }
    }

    nextTurnFood(iteration, fpsTarget) {        //TO REFACTOR don't generate food has to generate food is few food in some range ...
        let posFood = [];
        for(let i = 0; i < this.foodSources.length; i++) {
            posFood.push([this.foodSources[i].x, this.foodSources[i].y]);
        }

        if(Math.random()*100 < this.foodReproductionFactor/this.foodSources.length){  //yumi yumi Oo
            let tempX = this.randNum(0, this.cWidth);
            let tempY = this.randNum(0, this.cHeight);
            while(this.foodContains(posFood, tempX, tempY)){
                tempX = this.randNum(0, this.cWidth);
                tempY = this.randNum(0, this.cHeight);
            }
            this.foodSources.push(new FoodSource(tempX, tempY));
            posFood.push([tempX, tempY]);  
        }
    }

    nextTurnAnts(iteration, fpsTarget) {                //TO REFACTOR
        for(let i = this.ants.length-1; i >= 0; i--) {  //reverse because this func use splice()
            let cAnt = this.ants[i];
            if(iteration % fpsTarget == 0) {
                let rSpeed = cAnt.speed + this.randNum(-2, 2);
                while(rSpeed > 8 || rSpeed < 4) {
                    rSpeed = cAnt.speed + this.randNum(-2, 2);
                }
                cAnt.setSpeed(rSpeed);
            }
            let foodSourceToDel = [];
            if(!cAnt.full){     //can grab food
                for(let j = 0; j < this.foodSources.length; j++) {
                    if(cAnt.isNear(this.foodSources[j])) {
                        if(this.foodSources[j].takeFood(1)){
                            cAnt.setFull(true);
                        }
                        if(this.foodSources[j].amount == 0) { foodSourceToDel.push(j); }
                    }
                }   
            } else {        //wants to go home
                if(!cAnt.isTarget(this.anthills[cAnt.idAnthill])) {
                    cAnt.setTarget(this.anthills[cAnt.idAnthill]);
                } else if(cAnt.isNear(this.anthills[cAnt.idAnthill])) {
                    cAnt.setFull(false);
                    cAnt.setRandomTarget(this.anthills[cAnt.idAnthill]);
                    this.anthills[cAnt.idAnthill].addFood();   
                }
            }
            for(let k = 0; k < foodSourceToDel.length; k++) {
                this.foodSources.splice(foodSourceToDel[k], 1);
            }
            this.ants[i].move(this.anthills[cAnt.idAnthill]);
            /*
            if(Math.random()*100 < this.antDeathFactor*(1/(this.anthills[cAnt.idAnthill].foodAmount+1))){  //death RIP
                this.ants.splice(i, 1);
            }*/
            
        }
    }

    nextTurn(iteration, fpsTarget) { 
        this.nextTurnAnthills(iteration, fpsTarget);
        this.nextTurnAnts(iteration, fpsTarget);
        this.nextTurnFood(iteration, fpsTarget);
    }

    foodContains(arr, xa, ya) {
        for(let i = 0; i < arr.length; i++){ 
            if(arr[i][0] >= xa-20 && arr[i][0] <= xa+20 && arr[i][1] >= ya-20 && arr[i][1] <= ya+20){
                return true;
            }
        }
        for(let j = 0; j < this.anthills.length; j++){
            if(this.anthills[j].x >= xa-this.anthills[j].r*2 && this.anthills[j].x <= xa+this.anthills[j].r*2 && this.anthills[j].y >= ya-this.anthills[j].r*2 && this.anthills[j].y <= ya+this.anthills[j].r*2) {
                return true;
            }
        }
        return false;
    }

    init() {
        let posFood = [];
        for(let i = 0; i < this.nbAnthills; i++) {  //create ants in the first anthill at anthill pos
            this.anthills.push(new Anthill(this.randNum(0,this.cWidth), this.randNum(0,this.cHeight)));
            for(let j = 0; j < this.antsNb; j++) {  //create ants in the first anthill at anthill pos
                this.ants.push(new Ant(this.anthills[i].x, this.anthills[i].y, i));
            }
        }
        for(let i = 0; i < this.foodSourceNb; i++) {
            let tempX = this.randNum(0, this.cWidth);
            let tempY = this.randNum(0, this.cHeight);
            while(this.foodContains(posFood, tempX, tempY)){
                tempX = this.randNum(0, this.cWidth);
                tempY = this.randNum(0, this.cHeight);
            }
            this.foodSources.push(new FoodSource(tempX, tempY));
            posFood.push([tempX, tempY]);
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

/*
0) option use quadtree at some point (ik it's hard but it's rlly usefull in the end)
1) clean code for next turn
2) add spawn random food / birth ant linked to a var
3) add zoom unzoom on the canvas and change cwidth / width ... by something relative
4) add click listener for every element (create a id card fr every elem) and func in gui to draw it
5) add walls and then modify the movement (will have to do an algo)
6) add pheromones and follow phero
7) add classes of ants (worker fighter ...)
8) add enemmies entities / fight / defend / call for help ...
9) add genes for new born ants inheritance (and so place cond on birth not just random)
10) types of food
11) -


*/
