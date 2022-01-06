class Ant {
    
    constructor(x, y, idAnthill) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 5;
        this.idAnthill = idAnthill;
        this.full = false;
        this.speed = 5;
        this.dir = [];
        this.dir.push(this.x);
        this.dir.push(this.y);
        this.dir.push(Math.atan2(0, 0));
        this.maxLinearDist = 75;
        this.maxVisionDist = 15;
        this.followPheroP = false;
        this.receptiveToPheroIn = 0;
        this.pheroFoodTime = 150;
        this.attackCdMax = 20;
        this.attackCd = 0;
        this.ennemySpotted = false;
        this.toReduce = false;
        this.menuOpen = false;

        this.movingTarget = null;
        this.toDel = false;
    }

    isNear(target, d=target.r) {
        return (this.dist(this.x, this.y, target.x, target.y) <= d);
    }

    isFull() {
        return (this.full);
    }

    followPheroPath(path){ 
        //really bad for now the ant with go directly to the first pheromone (where the food is)
        //that's cheating but I can't figure out something working well
        //this.pheroPath = path;      //useless with this 'cheat' but needed for when I solve the problem
        this.setTarget(path.pheroArr[0]);
        this.followPheroP = true;
    }

    setFull(value) {
        this.full = value;
    }

    setTarget(target) {
        this.dir[0] = target.x;
        this.dir[1] = target.y;
        this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
    }

    setRandomTarget(anthill) {
        let rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
        let ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2 
        while(this.dist(rx, ry, anthill.x, anthill.y) > anthill.maxDistForAnt) {        //check if move is in anthill boundary
            rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
            ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
        }
        this.dir[0] = rx;
        this.dir[1] = ry;
        this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    ennemyAtt() {
        if(Math.random() * (10) <= 1){
            this.toDel = true;
        }
    }

    isTarget(target) {
        return (target.x == this.dir[0] && target.y == this.dir[1]);
    }

    move(anthill) {
        
        if(this.movingTarget != null) {
            //console.log(this.x, this.y, this.movingTarget.y,this.movingTarget.x, anthill.x, anthill.y);
            //console.log(this.dist(this.movingTarget.x, this.movingTarget.y, this.y,this.x));
            if(this.dist(this.movingTarget.x, this.movingTarget.y, this.y,this.x) > 50) {
                //console.log("zaeaze");
                this.movingTarget = null;
                this.ennemySpotted = false;
                this.setRandomTarget(anthill);
                
            } else {
                this.setTarget(this.movingTarget);      
            }
        }
        if(Math.abs(this.dir[0] - this.x) >= 4 || Math.abs(this.dir[1] - this.y) >= 4){
            let angle = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            this.x += this.speed * Math.sin( angle );
            this.y += this.speed * Math.cos( angle );
        } else {
            let rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2;
            let ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2;
            while(this.dist(rx, ry, anthill.x, anthill.y) > anthill.maxDistForAnt) {    //check if move is in anthill boundary
                rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2;
                ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2;
            }
            this.dir[0] = rx;
            this.dir[1] = ry;
            this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            if(this.followPheroP == true) {     //see quadTreeAlgoHandler at nextTurn after let points = this.qtree.query ...
                this.receptiveToPheroIn = 20;
                this.followPheroP = false;
                this.toReduce = true;
            }
        }
    }

    followMovingTarget(target) {
        this.movingTarget = target;
    } 

    isClickedOn(posx, posy) {     //useless i believe
        if(posx >= this.x-this.w/2 && posx <= this.x+this.x/2 && posy >= this.y-this.h/2 && posy <= this.y+this.h/2) {
            return true;
        }return false;
    }

    openMenu() {
        this.menuOpen = true;
    }

    dist(a, b, c, d) {
        return Math.sqrt((c-a)*(c-a) + (d-b)*(d-b));
    }
       
}


//last Cleaning done 28/12/2021 17h20