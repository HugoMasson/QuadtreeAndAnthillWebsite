class Ant {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 2;
        this.h = 2;
        this.speed = 4;
        this.dir = [];
        this.dir.push(this.x);
        this.dir.push(this.y);
        this.dir.push(Math.atan2(0, 0));
    }

    move(cWidth, cHeight) {
        if(Math.abs(this.dir[0] - this.x) > 5 && Math.abs(this.dir[0] - this.x) > 5){
            let angle = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            this.x += this.speed * Math.sin( angle );
            this.y += this.speed * Math.cos( angle );
        } else {
            this.dir[0] = Math.floor(Math.random() * (cWidth));
            this.dir[1] = Math.floor(Math.random() * (cHeight));
            this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
        }
    }
       
}


