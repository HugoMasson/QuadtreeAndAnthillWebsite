

class Point {
    constructor(x, y, id, obj, indexInArray) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.obj = obj;
        this.indexInArray = indexInArray;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
                range.x + range.w < this.x - this.w ||
                range.y - range.h > this.y + this.h ||
                range.y + range.h < this.y - this.h);
    }

}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);

        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;
    }

    insert(point) {
        if(!this.boundary.contains(point)){
            return false;
        }
        if(this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if(!this.divided){
                this.subdivide();
            }
            this.northeast.insert(point);
            this.northwest.insert(point);
            this.southeast.insert(point);
            this.southwest.insert(point);
        }
    }

    query(range, found) {
        if (!found){
            found = [];
        }
        if(!this.boundary.intersects(range)){
            return found;
        } else {
            for(let p of this.points) {
                if(range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided ) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
        }
        //console.log(found);
        return found;
    }    

    show(dWidth, dHeight) {

        ctx.strokeRect(this.boundary.x-dWidth, this.boundary.y-dHeight, this.boundary.w * 2, this.boundary.h * 2);
        if(this.divided){
            if(this.northeast.show(dWidth/2, dHeight/2)){return true;}
            else if(this.northwest.show(dWidth/2, dHeight/2)){return true;}
            else if(this.southeast.show(dWidth/2, dHeight/2)){return true;}
            else if(this.southwest.show(dWidth/2, dHeight/2)){return true;}
        }

        ctx.fillStyle = "black";
        for(let p of this.points) {
            ctx.fillRect(p.x-1, p.y-1, 2, 2);
        }
    }
}
