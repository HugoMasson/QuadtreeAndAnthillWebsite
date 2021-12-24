class ZoomHandler {
    constructor(canvas, ctx, width, height, minZoom=0.1, maxZoom=20) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.zoomFactor = 1;    //  [0.25, 10]
        this.xOffSet = -(width/2)+this.canvas.width/2;
        this.yOffSet = -(height/2)+this.canvas.height/2;
    }

    setOffset(va, vb) {
        this.xOffSet = va;
        this.yOffSet = vb;
    }

    setZoom(value){
        this.zoomFactor = value;
        this.update();
    }

    zoomBy(value=2) {
        if(this.zoomFactor * value >= this.minZoom && this.zoomFactor * value < this.maxZoom){
           this.zoomFactor *= value;
            this.update(value);   
        }
    }

    moveOffset(incX, incY){
        if(this.xOffSet+incX-2*this.canvas.width <= 0 && this.xOffSet+incX+2*this.canvas.width >= -width){
            this.xOffSet += incX; 
        }
        if(this.yOffSet+incY-2*this.canvas.height <= 0 && this.yOffSet+incY+2*this.canvas.height >= -height) {
            this.yOffSet += incY; 
        }
    }

    update(value) {
        this.ctx.clearRect(0,0,canvas.width,canvas.height);
        this.ctx.translate((canvas.width/2)-((canvas.width/2)*value), (canvas.height/2)-((canvas.height/2)*value));
        this.ctx.scale(value,value);

    }
}