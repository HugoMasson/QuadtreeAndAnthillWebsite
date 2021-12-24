class Ant {
    
    constructor(x, y, idAnthill) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 5;
        this.idAnthill = idAnthill;
        this.full = false;
        this.speed = 5;
        this.hasClearObjective = false;
        this.dir = [];
        this.dir.push(this.x);
        this.dir.push(this.y);
        this.dir.push(Math.atan2(0, 0));
        this.maxLinearDist = 75;
        this.hasMoved = true;
    }

    isNear(target, d=target.r) {
        return (this.dist(this.x, this.y, target.x, target.y) <= d);
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

    setRandomTarget(anthill) {
        let rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
        let ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2 
        while(this.dist(rx, ry, anthill.x, anthill.y) > anthill.maxDistForAnt) {
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

    isTarget(target) {
        return (target.x == this.dir[0] && target.y == this.dir[1]);
    }

    move(anthill) {
        if(Math.abs(this.dir[0] - this.x) >= 4 || Math.abs(this.dir[1] - this.y) >= 4){
            let angle = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            this.x += this.speed * Math.sin( angle );
            this.y += this.speed * Math.cos( angle );
        } else {
            let rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
            let ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2 
            while(this.dist(rx, ry, anthill.x, anthill.y) > anthill.maxDistForAnt) {
                rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
                ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
            }
            this.dir[0] = rx;
            this.dir[1] = ry;
            this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
        }
    }

    dist(a, b, c, d) {
        return Math.sqrt((c-a)*(c-a) + (d-b)*(d-b));
    }
       
}


