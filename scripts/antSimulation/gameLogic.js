

class Game {
    constructor(antsNb, nbAnthills, foodSourceNb, cWidth, cHeight) {
        this.antsNb = antsNb;
        this.nbAnthills = nbAnthills;
        this.foodSourceNb = foodSourceNb;
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.algo = document.getElementById("algo").value;
        this.subDiviseQtreeAt = document.getElementById("qtreeN").value;

        //HAVE to refactor this: these var are arbitrary should 
        //ADD A FKING file for these const and funct to alter them !!!!
        this.antReproductionFactor = 1;
        this.antDeathFactor = 1;
        this.foodDepletionRate = 1/100;
        this.foodReproductionFactor = 10;

        this.anthills       = [];
        this.foodSources    = [];
        this.obstacles      = [];
        this.ants           = [];
        this.paths          = [];

        this.qth;

    }

    nextTurnAnthillsClassic(iteration, fpsTarget) {
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

    nextTurnFoodClassic(iteration, fpsTarget) {
        //...
    }

    nextTurnAntsClassic(iteration, fpsTarget) {                //TO REFACTOR
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
            this.ants[i].move(this.anthills[cAnt.idAnthill]);
        }
    }

    nextTurn(iteration, fpsTarget) {
        if(this.algo == "Classic (n*n)"){
            this.nextTurnAnthillsClassic(iteration, fpsTarget);
            this.nextTurnAntsClassic(iteration, fpsTarget);
            this.nextTurnFoodClassic(iteration, fpsTarget);
        } else if(this.algo == "Quadtree nlog(n)") {
            this.qth.nextTurn(iteration, fpsTarget, this.anthills, this.foodSources, this.obstacles, this.ants, this.paths,  this.subDiviseQtreeAt);
        }
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

    resetVals() {
        this.anthills       = [];
        this.foodSources    = [];
        this.obstacles      = [];
        this.ants           = [];
        this.paths          = [];
    }

    init() {
        let posFood = [];
        for(let i = 0; i < this.nbAnthills; i++) {  //create anthills at random pos
            //this.anthills.push(new Anthill(this.randNum(0,this.cWidth), this.randNum(0,this.cHeight)));
            this.anthills.push(new Anthill(5000, 5000));
            for(let j = 0; j < this.antsNb; j++) {  //create ants in the anthill at THEIR anthill pos
                this.ants.push(new Ant(this.anthills[i].x, this.anthills[i].y, i));
                this.anthills[i].addAnt(1);
            }
        }
        for(let i = 0; i < this.foodSourceNb; i++) {
            let tempX = this.randNum(0, this.cWidth);
            let tempY = this.randNum(0, this.cHeight);

            /*  was to space out the food
            while(this.foodContains(posFood, tempX, tempY)){tempX = this.randNum(0, this.cWidth);tempY = this.randNum(0, this.cHeight);}
            */
            this.foodSources.push(new FoodSource(tempX, tempY));
            posFood.push([tempX, tempY]);
        }
        if(this.algo == "Quadtree nlog(n)") {
            this.qth = new quadTreeHandler(this.cWidth, this.cHeight);
            this.qth.init();
        }
    }

    toDraw() {
        //return every object that antGUI has to draw -> arrays of food / obstacles for ex
        //doesn't excude anything 
        //(upgrade can be made by having a var for every ant to draw / every foodsource to draw)
        //and change them only when moving or zoom si we won't have to if every object in drawHandler
        return [this.anthills, this.foodSources, this.obstacles, this.ants, this.paths];
    }

    randNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

/*
0) REFACTOR PRETTY MUCH EVERYTHING
1) clean code for next turn
2) add spawn random food / birth ant linked to a var
3) OK
4) add click listener for every element (create a id card fr every elem) and func in gui to draw it
5) add walls and then modify the movement (will have to do an algo)
6) add pheromones and follow phero
7) add classes of ants (worker fighter ...)
8) add enemmies entities / fight / defend / call for help ...
9) add genes for new born ants inheritance (and so place cond on birth not just random)
10) types of food
*/


//last refactor done 28/12/2021 17h03