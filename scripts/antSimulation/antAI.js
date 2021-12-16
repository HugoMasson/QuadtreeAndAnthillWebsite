class Ant {
    
    constructor(x, y, idAnthill) {
        this.x = x;
        this.y = y;
        this.w = 2;
        this.h = 2;
        this.idAnthill = idAnthill;
        this.full = false;
        this.speed = 4;
        this.hasClearObjective = false;
        this.dir = [];
        this.dir.push(this.x);
        this.dir.push(this.y);
        this.dir.push(Math.atan2(0, 0));
        this.hasMoved = true;
    }

    isNear(target, d=target.r) {
        return (this.dist(this.x, this.y, target.x, target.y) < d);
    }

    isFull() {
        return (this.full);
    }

    setFull(value) {
        this.full = value;
    }

    setTarget(target) {
        this.dir[0] = target.x;
        this.dir[1] = target.y;
        this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
    }

    setRandomTarget(cWidth, cHeight) {
        this.dir[0] = Math.floor(Math.random() * (cWidth));
        this.dir[1] = Math.floor(Math.random() * (cHeight));
        this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
    }

    move(cWidth, cHeight) {
        if(Math.abs(this.dir[0] - this.x) >= 3 && Math.abs(this.dir[0] - this.x) >= 3){
            let angle = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            this.x += this.speed * Math.sin( angle );
            this.y += this.speed * Math.cos( angle );
        } else {
            this.dir[0] = Math.floor(Math.random() * (cWidth));
            this.dir[1] = Math.floor(Math.random() * (cHeight));
            this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
        }
    }

    dist(a, b, c, d) {
        return Math.sqrt((a-c)*(a-c) + (b-d)*(b-d));
    }
       
}


