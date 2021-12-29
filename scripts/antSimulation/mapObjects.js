
class FoodSource {
    constructor(x, y, amount) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
        this.r = 30;
        this.isAttacked = false;
        this.amount = this.randNum(70, 150);

        this.menuOpen = false;
    }

    takeFood(value){
        if(this.amount >= value){
            this.amount -= value;
            return true;
        }return false;
    }

    randNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    openMenu() {
        this.menuOpen = true;
    }
}

class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.menuOpen = false;
    }

    openMenu() {
        this.menuOpen = true;
    }
}

class Anthill {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 15;
        this.h = 15;
        this.r = 50;
        this.maxDistForAnt = 1000;
        this.foodAmount = 100;
        this.nbAnts = 0;
        this.menuOpen = false;
    }

    addFood(value=1) {
        this.foodAmount += value;
    }
    supprFood(value=1) {
        if(this.foodAmount - value >= 0){
            this.foodAmount -= value;
        } else {
            this.foodAmount = 0;
        }
    }

    openMenu() {
        this.menuOpen = true;
    }
}

class Pheromone {
    constructor(owner, x, y, strengh, timeLeft) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.strengh = strengh;
        this.timeLeft = timeLeft;

        this.menuOpen = false;
    }

    openMenu() {
        this.menuOpen = true;
    }
}

class PheromonePath {
    constructor(id, antId, pheroArr) {
        this.pheroArr = pheroArr;
        this.id = id;
        this.antId = antId;
    }

    placePheromone(x, y, strengh, timeLeft) {
        this.pheroArr.push(new Pheromone(this.pheroArr.length, x, y, strengh, timeLeft));
    }
}

//never really refactored
