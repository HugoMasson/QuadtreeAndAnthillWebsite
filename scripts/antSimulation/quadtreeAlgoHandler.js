class quadTreeHandler {
    constructor(width, height){
        this.qtree;
        this.boundary = new Rectangle(width/2, height/2, width, height);
        this.width = width;
        this.height = height;
    }

    init() {
        //nothing needed here for now
    }

    nextTurn(iteration, fpsTarget, anthills, foodSources, obstacles, ants, ennemies, pheroPaths, qtSubDivideNumber) {
        let foodSourceToDel = [];
        this.qtree = new QuadTree(this.boundary, qtSubDivideNumber);
        //anthills[0].addAnt(1);
        //build quadtree with antills / foodSources / pheroPath (with phero in it)
        for(let i = 0; i < anthills.length; i++) {
            let point = new Point(anthills[i].x, anthills[i].y, "anthill", anthills[i], i);
            this.qtree.insert(point);
        }
        for(let i = 0; i < foodSources.length; i++) {
            let point = new Point(foodSources[i].x, foodSources[i].y, "foodSource", foodSources[i], i);
            this.qtree.insert(point);
        }
        
        for(let i = 0; i < ennemies.length; i++) {
            ennemies[i].move(this.width, this.height);
            let point = new Point(ennemies[i].x, ennemies[i].y, "ennemy", ennemies[i], i);
            this.qtree.insert(point);
        }
        for(let i = 0; i < pheroPaths.length; i++) {
            //console.log(ennemies)
            for(let j = 0; j < pheroPaths[i].pheroArr.length; j++) {
                let point = new Point(pheroPaths[i].pheroArr[j].x, pheroPaths[i].pheroArr[j].y, "phero", pheroPaths[i].pheroArr[j], i);
                this.qtree.insert(point);
            }
        }
        
        for(let i = ants.length-1; i >= 0; i--) {          //loop for every ant
            ants[i].move(anthills[ants[i].idAnthill]);
            let a = ants[i];
            if(a.attackCd > 0){
                a.attackCd--;
            }
            //get every entity ant can interact with (in the ant vision range)
            let points = this.qtree.query(new Rectangle(a.x-a.maxVisionDist, a.y-a.maxVisionDist, a.maxVisionDist*2, a.maxVisionDist*2));
            if(a.toReduce == true) {    
                //to counter the "bug" where an ant is stuck to the last phero after following the pheropath
                //so need to disable interaction with phero for a little bit
                a.receptiveToPheroIn--;
                if(a.receptiveToPheroIn == 0){
                    a.toReduce = false;
                }
            }
            if(a.isFull() == true && iteration % 20 == 0) {     //drop phero
                for(let ph = 0; ph < pheroPaths.length; ph++){  //not opti this loop should not exist have to change when I have time
                    if(i == pheroPaths[ph].antId) {
                        pheroPaths[ph].placePheromone(a.x, a.y, 1, a.pheroFoodTime);
                    }
                }
            }
            for(let k = 0; k < points.length; k++) {    //loop every objects the current ant can ineract with
                if(a.isFull() == false) {
                    if(points[k].id == "foodSource") {
                        points[k].obj.takeFood(1);
                        if(pheroPaths.length > 0){
                            pheroPaths.push(new PheromonePath(pheroPaths.length-1, i, []));
                            pheroPaths[pheroPaths.length-1].placePheromone(a.x, a.y, 1, a.pheroFoodTime);
                        } else {
                            pheroPaths.push(new PheromonePath(0, i, []));
                            pheroPaths[pheroPaths.length-1].placePheromone(a.x, a.y, 1, a.pheroFoodTime);
                        }
                        if(points[k].obj.amount == 0 && !foodSourceToDel.includes(points[k].indexInArray)) { foodSourceToDel.push(points[k].indexInArray); }
                        a.setFull(true);
                        a.setTarget(anthills[a.idAnthill]);  
                        break; 
                    } else if(points[k].id == "phero") {
                        if(a.followPheroP == false && a.receptiveToPheroIn == 0) {
                            a.receptiveToPheroIn = 20;
                            a.followPheroPath(pheroPaths[points[k].indexInArray]);
                        }
                        break;
                    } else if(points[k].id == "ennemy") {
                        a.ennemySpotted = true;
                        a.followMovingTarget(points[k].obj);
                        if(a.attackCd == 0) {
                            points[k].obj.takeDmg(1);
                            a.attackCd = a.attackCdMax;
                            a.ennemyAtt()
                        }   
                    }
                } else {
                    if(points[k].id == "anthill") {
                        a.setFull(false);
                        anthills[a.idAnthill].addFood();
                        break;
                    }
                } 
            }
            if(a.toDel == true) {
            ants.splice(i, 1);
            }
        }
        for(let k = foodSourceToDel.length-1; k >= 0; k--) {   //delete foodSources with 0 food =_= 
            foodSources.splice(foodSourceToDel[k], 1);
        }
        for(let k = ennemies.length-1; k >= 0; k--) {   //delete foodSources with 0 food =_=
            if(ennemies[k].toDel == true) {
                ennemies.splice(k, 1);
            }
        }
        
    }

}

//last Cleaning done 28/12/2021 17h13

// OPTIMISATION IDEAS :
// 
//
//