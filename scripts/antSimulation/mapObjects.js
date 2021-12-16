
class FoodSource {
    constructor(x, y, amount) {
        this.x = x;
        this.y = y;
        this.w = 4;
        this.h = 4;
        this.r = 20;
        this.isAttacked = false;
        this.amount = amount;
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
    constructor(x, y, foodAmount) {
        this.x = x;
        this.y = y;
        this.w = 15;
        this.h = 15;
        this.r = 20;
        this.foodAmount = foodAmount;
    }
}