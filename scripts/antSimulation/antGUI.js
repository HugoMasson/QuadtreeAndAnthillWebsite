/*
    Author:     Hugo Masson alias Kaze
    SDate:      15/12/2021
    EDate:      ?/?/?
    
    Do NOT use / modify without the author knowledge and approval
    
    Sources:
        https://fr.wikipedia.org/wiki/Ph%C3%A9romone#:~:text=leur%20%C2%AB%20territoire%20%C2%BB.-,Ph%C3%A9romones%20de%20trace,occurrence%2C%20des%20hydrocarbures%20non%20volatils.
*/

let pTime = 0, mTime = 0, x = 0;
let nbAnt = 500;    //per anthill
let nbFood = 2000;
let nbAnthills = 4;

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



let canvas = document.getElementById("canvas");;
let ctx = canvas.getContext("2d");
canvas.width = innerHeight/1.2;
canvas.height = innerHeight/1.2;
let width  = canvas.width*10;           //square
let height = canvas.height*10;
let focusAnthill = null;

let gl = new Game(nbAnt, nbAnthills, nbFood, width, height);
gl.init();


const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
}, {});

function pauseGame()  { fps.pause(); }
function resumeGame() { fps.start(); }

function drawSeen() {
    let toD = gl.toDraw();
    
    let xOffSet = zh.xOffSet;
    let yOffSet = zh.yOffSet;
    //console.log("a: ",xOffSet, yOffSet);
    if(focusAnthill != null && focusAnthill >= 0 && focusAnthill < toD[0].length){
        xOffSet = -toD[0][focusAnthill].x+canvas.width/2;
        yOffSet = -toD[0][focusAnthill].y+canvas.height/2;
        zh.xOffSet = xOffSet;
        zh.yOffSet = yOffSet;
        //console.log("b: ",xOffSet, yOffSet);
    }
    
    ctx.translate(xOffSet, yOffSet);
    ctx.fillStyle = "grey";
    ctx.fillRect(-width,-height,width*3,height*3);
    dh.draw(toD);
    ctx.translate(-xOffSet, -yOffSet);
}

function focusOnAnthill(id) { focusAnthill = id; }

var fpsTarget = 60;
var iteration = 1;

var fps = new FpsCtrl(fpsTarget, function(e) {
    if(iteration >= 50000) {iteration = 1;}
    gl.nextTurn(iteration, fpsTarget);
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > canvas.width) mTime = pTime;
    drawSeen();
    iteration++;
});

fps.start();
canvas.onwheel = zoom;

let zh = new ZoomHandler(canvas, ctx, width, height, 0.02, 32);  //from 10x smaller to 10x bigger zoom
let dh = new DrawHandler(canvas, ctx, width, height);
function zoom(event) {
    event.preventDefault();
    if(event.deltaY < 0){
        zh.zoomBy(2);
    } else if(event.deltaY > 0) {
        zh.zoomBy(0.5);
    } 
}

document.addEventListener('keydown', logKey);

function logKey(e) {
    e.preventDefault();
    switch(e.code) {
        case 'Digit1':case 'Digit2':case 'Digit3':case 'Digit4':case 'Digit5':case 'Digit6':case 'Digit7':case 'Digit8':case 'Digit9':
            focusOnAnthill((e.code[e.code.length-1])-1);

    }
}

function left(){
    zh.moveOffset(100*(1/zh.zoomFactor), 0);
    focusAnthill = null;
}
function right(){
    zh.moveOffset(-100*(1/zh.zoomFactor), 0);
    focusAnthill = null;
}
function up(){
    zh.moveOffset(0, 100*(1/zh.zoomFactor));
    focusAnthill = null;
}
function down(){
    zh.moveOffset(0, -100*(1/zh.zoomFactor));
    focusAnthill = null;
}

// refactor draw omg ! |not ok|
// need function to translate scales |ok for now i guess|

//DO A FILE WITH ALL VALUES AND FUNCTION FOR FOOD REPROD / ANTH REPORD ...
// GL ! u will do it I know
