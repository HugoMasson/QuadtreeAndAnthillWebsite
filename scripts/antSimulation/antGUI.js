/*
    Author:     Hugo Masson alias Kaze
    SDate:      15/12/2021
    EDate:      ?/?/?
    
    Do NOT use / modify without the author knowledge and approval
    
    Sources:
        https://fr.wikipedia.org/wiki/Ph%C3%A9romone#:~:text=leur%20%C2%AB%20territoire%20%C2%BB.-,Ph%C3%A9romones%20de%20trace,occurrence%2C%20des%20hydrocarbures%20non%20volatils.
*/

var fpsTarget = 60;
var iteration = 1;
var toP = true;

let nbAnt = document.getElementById("nbAnt").value;
let nbFood = document.getElementById("nbFood").value;
let nbAnthills = document.getElementById("nbAnthills").value;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = innerHeight/1.2;
canvas.height = innerHeight/1.2;
let width  = canvas.width*10;
let height = canvas.height*10;
let focusAnthill = null;
let zh = new ZoomHandler(canvas, ctx, width, height, 0.02, 32);
let dh = new DrawHandler(canvas, ctx);
let gl = new Game(nbAnt, nbAnthills, nbFood, width, height);
let pTime = 0, mTime = 0, x = 0;

function changeValues() {   //form
    nbAnt = document.getElementById("nbAnt").value;
    nbFood = document.getElementById("nbFood").value;
    nbAnthills = document.getElementById("nbAnthills").value;
    gl = new Game(nbAnt, nbAnthills, nbFood, width, height);
    gl.init();
}

function FpsCtrl(fps, callback) {                         //StackOverFlow code
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

function pauseGame()  { toP = false; }
function resumeGame() { toP = true; }

function drawSeen() {
    let toD = gl.toDraw();
    let xOffSet = zh.xOffSet;
    let yOffSet = zh.yOffSet;
    if(focusAnthill != null && focusAnthill >= 0 && focusAnthill < toD[0].length){
        xOffSet = -toD[0][focusAnthill].x+canvas.width/2;
        yOffSet = -toD[0][focusAnthill].y+canvas.height/2;
        zh.xOffSet = xOffSet;
        zh.yOffSet = yOffSet;
    }
    ctx.translate(xOffSet, yOffSet);
    ctx.fillStyle = "grey";
    ctx.fillRect(-width,-height,width*3,height*3);
    dh.draw(toD,xOffSet,yOffSet,zh.zoomFactor, toP);
    ctx.translate(-xOffSet, -yOffSet);
    
}

function focusOnAnthill(id) { focusAnthill = id; }

var fps = new FpsCtrl(fpsTarget, function(e) {
    if(iteration >= 50000) {iteration = 1;}
    if(toP) {
       gl.nextTurn(iteration, fpsTarget); 
    }
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > canvas.width) mTime = pTime;
    drawSeen();
    iteration++;
});

gl.init();
fps.start();
canvas.onwheel = zoom;


//Events and controllers
function zoom(event) {
    event.preventDefault();
    if(event.deltaY < 0){
        zh.zoomBy(2);
    } else if(event.deltaY > 0) {
        zh.zoomBy(0.5);
    }
}

window.addEventListener('keydown', function(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch(e.code) {
        case 'Digit1':case 'Digit2':case 'Digit3':case 'Digit4':case 'Digit5':case 'Digit6':case 'Digit7':case 'Digit8':case 'Digit9':
            focusOnAnthill((e.code[e.code.length-1])-1);
            break;
        case 'Semicolon':
            dh.closeAllMenus(gl.toDraw());
        default:
            return;
    }
    e.preventDefault();
}, true);

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

function plusZoom() { zh.zoomBy(2); }
function minusZoom() { zh.zoomBy(0.5); }

canvas.addEventListener('touchmove', processTouchmove);

function processTouchmove(e) {
    e.preventDefault();
    var touch = e.touches[0];
    zh.moveOffset((canvas.width-touch.pageX)*(0.5), (canvas.height-touch.pageY)*(0.5));
}

//menu event (click on object to reveal a menu)
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(e)
})
function getCursorPosition(event) {
    let xOSet = -zh.xOffSet-(canvas.width/2)/zh.zoomFactor + canvas.width/2;
    let yOSet = -zh.yOffSet-(canvas.height/2)/zh.zoomFactor + canvas.height/2;
    const rect = canvas.getBoundingClientRect();
    let x = xOSet+((event.clientX-rect.x)/zh.zoomFactor);
    let y = yOSet+((event.clientY-rect.y)/zh.zoomFactor);
    dh.addMenu(x, y, gl.toDraw());  //add a menu if needed on clicked object
    
}

//last refactor done 28/12/2021 16:30



//DO A FILE WITH ALL VALUES AND FUNCTION FOR FOOD REPROD / ANTH REPORD ...

// ++++++++++++++++++++

//INSTEAD OF ADDING PHEROMONE IN EVERY CASE IF PHERO NEAR ADD STRENGH AND CHOSE STRONGEST PHERO (fps friendly)

/*

!!!!!!!!!!!!--||

< BUG THE FOOD DISAPEAR WITHOUT REASON IT'S 
REALLY VISIBLE WHEN THERE IS A REALLY GREAT 
AMOUNT OF FOOD >

||--!!!!!!!!!!!!

*/

// GL ! u will do it I know
