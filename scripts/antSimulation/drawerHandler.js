const colorForElem = ["red", "blue", "grey", "black", "orange"];

class DrawHandler {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.menus = new MenuHandler();
        this.hasToDisplayTerritories = false;
    }

    draw(toD, xos, yos, z, onlyDraw) {    //only draw things user can see with zoom + anthills range circle
        let len = toD.length-1;
        let menusToDraw = [];
        ctx.fillStyle = colorForElem[colorForElem.length-1];
        
        //pheromones drawer + decrease time left (and make them dispawn)
        for(let j = 0; j < toD[4].length; j++) {    //loop paths
            if(toD[4][j].pheroArr.length != 0) {
                for(let p = toD[4][j].pheroArr.length-1; p >= 0; p--) {     //loop pheromones inside paths
                    ctx.fillRect(toD[4][j].pheroArr[p].x, toD[4][j].pheroArr[p].y, 2, 2);
                    if(onlyDraw) {
                        toD[4][j].pheroArr[p].timeLeft--;
                        if(toD[4][j].pheroArr[p].timeLeft <= 0){
                            toD[4][j].pheroArr.splice(p, 1);
                        }
                    }
                }
            } else {
                toD[4].splice(j, 1);
            }
        }
        for(let i = 0; i < len; i++) {  //0:anthills 1:foodSources 2:obstacles 3:ants
            //ctx.fillStyle = colorForElem[i];   
            for(let j = 0; j < toD[i].length; j++) {
                ctx.lineWidth = 2;
                if(i == 0) {
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 15;
                    this.drawCircle(toD[i][j].x, toD[i][j].y, toD[i][j].maxDistForAnt);
                    if(this.hasToDisplayTerritories){
                       this.drawCircle(toD[i][j].x, toD[i][j].y, toD[i][j].maxDistForAnt-7, true, "green", 0.2);
                    }
                }
                //is it on vision
                if((toD[i][j].x >= (-xos+canvas.width/2)-canvas.width/(2*z) && toD[i][j].x <= (-xos+canvas.width/2)-canvas.width/(2*z)+canvas.width/z && toD[i][j].y >= (-yos+canvas.height/2)-canvas.height/(2*z) && toD[i][j].y <= (-yos+canvas.height/2)-canvas.height/(2*z)+canvas.height/z)){
                    if(toD[i][j].menuOpen) {  
                        menusToDraw.push([toD[i][j], i, j, toD[i].length]);
                        //this.drawMenu(toD[i][j], i, j, toD[i].length);  
                    }
                    ctx.fillStyle = colorForElem[i];
                    if(i == 0) {
                        this.changeFont("100px Arial");
                        this.drawCircle(toD[i][j].x, toD[i][j].y, toD[i][j].r, false, "red");
                        ctx.fillStyle = "black";
                        ctx.fillText("id:"+(j+1), toD[i][j].x-50, toD[i][j].y-toD[i][j].maxDistForAnt);
                        ctx.fillText(toD[i][j].foodAmount, toD[i][j].x, toD[i][j].y);
                    } else if(i == 3){
                        if(toD[i][j].full){
                            ctx.fillStyle = "pink";
                            ctx.fillRect(toD[i][j].x-toD[i][j].w/2 -1, toD[i][j].y-toD[i][j].h/2 -1, toD[i][j].w+2, toD[i][j].h+2);
                        }
                    } else if(i == 1) {
                        if(toD[i][j].isAttacked){
                            this.drawCircle(toD[i][j].x, toD[i][j].y, toD[i][j].r, false, "red");
                        } else {
                            this.drawCircle(toD[i][j].x, toD[i][j].y, toD[i][j].r, false, "blue");
                        }
                    }
                    ctx.fillRect(toD[i][j].x-toD[i][j].w/2, toD[i][j].y-toD[i][j].h/2, toD[i][j].w, toD[i][j].h); 
                }
            }
        }
        for(let m = 0; m < menusToDraw.length; m++) {
            this.drawMenu(menusToDraw[m][0], menusToDraw[m][1], menusToDraw[m][2], menusToDraw[m][3]); 
        }
    }

    drawCircle(x, y, r, isFilled=false, color=null, alpha=1, sAngle=0, eAngle=2*Math.PI) {
        //console.log(color);

        ctx.beginPath();
        ctx.arc(x, y, r, sAngle, eAngle, false);
        if(isFilled) { if(color != null) {ctx.fillStyle = color; ctx.globalAlpha = alpha; } ctx.fill(); } else { if(color != null) {ctx.strokeStyle = color; ctx.globalAlpha = alpha; } ctx.stroke(); }
        ctx.globalAlpha = 1;
    }

    changeFont(strFont) {
        ctx.font = strFont;
    }

    addMenu(posX, posY, elems) {
        this.menus.addMenu(posX, posY, elems);
    }

    drawMenu(entity, type, number, numberMax) {
        ctx.fillStyle = "green";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(entity.x, entity.y, 250, 150);
        ctx.globalAlpha = 1;
        this.changeFont("20px Arial");
        ctx.fillStyle = "black";
        switch(type) {
            case 0:
                ctx.fillText("--Anthill--", entity.x+30, entity.y+25);
                ctx.fillText("Nb ants: "+entity.nbAnts, entity.x+20, entity.y+75);
                ctx.fillText("Radius: "+entity.maxDistForAnt, entity.x+20, entity.y+100);
                ctx.fillText("Food: "+entity.foodAmount, entity.x+20, entity.y+125);
                break;
            case 1:
                ctx.fillText("--Food Source--", entity.x+30, entity.y+25);
                ctx.fillText("Food Amount: "+entity.amount, entity.x+20, entity.y+75);
                ctx.fillText("Is Attacked: "+entity.isAttacked, entity.x+20, entity.y+100);
                break;
            case 2:
                ctx.fillText("--Obstacle--", entity.x+30, entity.y+25);
                break;
            case 3:
                ctx.fillText("--Ant--", entity.x+30, entity.y+25);
                ctx.fillText("Id Anthill: "+(entity.idAnthill+1), entity.x+20, entity.y+75);
                ctx.fillText("Following Phero: "+entity.followPheroP, entity.x+20, entity.y+100);
                break;
            case 4:
                ctx.fillText("--Pheromone--", entity.x+30, entity.y+25);
                break;
            default:
                ctx.fillText("--?Unknown?--", entity.x+30, entity.y+25);
        }
        ctx.fillText("[id: "+(number+1)+" / "+numberMax+"]", entity.x+20, entity.y+50)
    }

    closeAllMenus(entities) {
        for(let i = 0; i < entities.length; i++) {
            for(let j = 0; j < entities[i].length; j++) {
                entities[i][j].menuOpen = false;
            }
        }
    }

    displayTerritories() {
        this.hasToDisplayTerritories = !this.hasToDisplayTerritories;
    }
}

//last refactor done 28/12/2021 17h00