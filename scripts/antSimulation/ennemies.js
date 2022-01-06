class Ennemy {

    constructor(x, y, hp) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.hp = hp;
        this.maxLinearDist = 200;
        this.speed = 2;
        this.dir = [];
        this.dir.push(this.x);
        this.dir.push(this.y);
        this.dir.push(Math.atan2(0, 0));
        this.menuOpen = false;
        this.toDel = false;
    }

    openMenu() {
        this.menuOpen = true;
    }

    takeDmg(value) {
        //console.log(this.hp)
        this.hp -= value;
        
        if(this.hp <= 0) {
            this.hp = 0;
            this.toDel = true;
            
        }
    }

    move(width, height) {
        if(Math.abs(this.dir[0] - this.x) >= 4 || Math.abs(this.dir[1] - this.y) >= 4){
            let angle = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            this.x += this.speed * Math.sin( angle );
            this.y += this.speed * Math.cos( angle );
            //console.log(x, y);
        } else {
            let rx = this.x + Math.random() * (this.maxLinearDist*2)-this.maxLinearDist;
            let ry = this.y + Math.random() * (this.maxLinearDist*2)-this.maxLinearDist;
            while(!(rx >= 0 && rx <= width && ry >= 0 && ry <= height)) {    //check if move is in world boundary
                rx = this.x + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
                ry = this.y + Math.random() * (this.maxLinearDist)-this.maxLinearDist/2
            }
            this.dir[0] = rx;
            this.dir[1] = ry;
            this.dir[2] = Math.atan2(this.dir[0] - this.x, this.dir[1] - this.y);
            
        }
    }
}