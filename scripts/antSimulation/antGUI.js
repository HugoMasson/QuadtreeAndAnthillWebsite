/*
    Author:     Hugo Masson alias Kaze
    SDate:      15/12/2021
    EDate:      ?/?/?
    
    Do NOT use / modify without the author knowledge and approval
    
    Sources:
        https://fr.wikipedia.org/wiki/Ph%C3%A9romone#:~:text=leur%20%C2%AB%20territoire%20%C2%BB.-,Ph%C3%A9romones%20de%20trace,occurrence%2C%20des%20hydrocarbures%20non%20volatils.
*/

let pTime = 0, mTime = 0, x = 0;
let nbAnt = 1000;
let nbFood = 1000;

function FpsCtrl(fps, callback) {
    var delay = 1000 / fps,                               // calc. time per frame
        time = null,                                      // start time
        frame = -1,                                       // frame count
        tref;                                             // rAF time reference
    function loop(timestamp) {
        if (time === null) time = timestamp;              // init start time
        var seg = Math.floor((timestamp - time) / delay); // calc frame no.
        if (seg > frame) {                                // moved to next frame?
            frame = seg;                                  // update
            callback({                                    // callback function
                time: timestamp,
                frame: frame
            })
        }
        tref = requestAnimationFrame(loop)
    }
    this.isPlaying = false;
    this.frameRate = function(newfps) {
        if (!arguments.length) return fps;
        fps = newfps;
        delay = 1000 / fps;
        frame = -1;
        time = null;
    };
    this.start = function() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            tref = requestAnimationFrame(loop);
        }
    };
    this.pause = function() {
        if (this.isPlaying) {
            cancelAnimationFrame(tref);
            this.isPlaying = false;
            time = null;
            frame = -1;
        }
    };
}

const colorForElem = ["red", "blue", "grey", "black"];

let canvas = document.getElementById("canvas");;
let ctx = canvas.getContext("2d");
let width  = innerHeight/1.5;           //square
let height = innerHeight/1.5;
canvas.width = width;
canvas.height = height;
let gl = new Game(nbAnt, nbFood, width, height);
gl.init();

let stats = [];

const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
}, {});

function pauseGame()  { fps.pause(); }
function resumeGame() { fps.start(); }

function draw() {
    let toD = gl.toDraw();
    
    for(let i = 0; i < toD.length; i++) {
        ctx.fillStyle = colorForElem[i];
        for(let j = 0; j < toD[i].length; j++) {
            stats.push(toD[i][j].dir);
            ctx.fillRect(toD[i][j].x-toD[i][j].w/2, toD[i][j].y-toD[i][j].h/2, toD[i][j].w, toD[i][j].h);
            if(i == 3){
                ctx.strokeStyle = "green";
                ctx.strokeRect(toD[i][j].dir[0], toD[i][j].dir[1], 1, 1);
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
                ctx.fillStyle = "black";
                ctx.fillText(toD[i][j].foodAmount, toD[i][j].x, toD[i][j].y);
            }
        }
    }
}


var fps = new FpsCtrl(1000, function(e) {
    gl.nextTurn();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > canvas.width) mTime = pTime;
    draw();
    
    ctx.fillStyle = "black";
    ctx.fillText("FPS: " + fps.frameRate(), ctx.canvas.width-50, 15);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,width-1,height-1);
});

fps.start();
