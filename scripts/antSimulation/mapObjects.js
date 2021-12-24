
class FoodSource {
    constructor(x, y, amount) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.r = 20;
        this.isAttacked = false;
        this.amount = this.randNum(50, 100);
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
}

class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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
}