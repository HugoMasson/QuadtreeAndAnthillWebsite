const colorForElem = ["red", "blue", "grey", "black"];

class DrawHandler {
    constructor(canvas, ctx, width, height){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
    }

    draw(toD) { //only draw things user can see !!!!!!! NOT DONE YET DRAW EVERYTHING !!!!!!!
        
        for(let i = 0; i < toD.length; i++) {
            ctx.fillStyle = colorForElem[i];
            for(let j = 0; j < toD[i].length; j++) {
                ctx.fillStyle = colorForElem[i];
                if(i != 0){
                   ctx.fillRect(toD[i][j].x-toD[i][j].w/2, toD[i][j].y-toD[i][j].h/2, toD[i][j].w, toD[i][j].h); 
                }
                if(i == 3){
                    if(toD[i][j].full){
                        ctx.fillStyle = "pink";
                        ctx.fillRect(toD[i][j].x-toD[i][j].w/2 -1, toD[i][j].y-toD[i][j].h/2 -1, toD[i][j].w+2, toD[i][j].h+2);
                    }
                } else if(i == 1) {
                    if(toD[i][j].isAttacked){
                        ctx.strokeStyle = "red";
                        toD[i][j].isAttacked = false;
                    } else {
                        ctx.strokeStyle = "blue";
                    }
                    ctx.beginPath();
                    ctx.arc(toD[i][j].x, toD[i][j].y, toD[i][j].r, 0, 2*Math.PI);
                    ctx.stroke();
                } else if(i == 0) {
                    ctx.strokeStyle = "red";
                    ctx.beginPath();
                    ctx.arc(toD[i][j].x, toD[i][j].y, toD[i][j].r, 0, 2*Math.PI);
                    ctx.stroke();
                    ctx.lineWidth = 15;
                    ctx.beginPath();
                    ctx.arc(toD[i][j].x, toD[i][j].y, toD[i][j].maxDistForAnt, 0, 2*Math.PI);
                    ctx.stroke(); 
                    ctx.lineWidth = 2;
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(toD[i][j].foodAmount, toD[i][j].x, toD[i][j].y);
                }
            }
        }
    }
}

//refactor draw to only draw things that the user can see