let canvas = document.getElementById("canvas");;
let ctx = canvas.getContext("2d");
let width  = innerHeight/1.5;           //square
let height = innerHeight/1.5;
canvas.width = width;
canvas.height = height;

let pTime = 0, mTime = 0, x = 0;
let nbAnt = 500;
let nbFood = 10;

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

function draw() {
    ctx.strokeRect(width/2,height/2,100,50);
}

function zoom(event) {
    event.preventDefault();
    scale += event.deltaY * -0.001;
    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);
    // Apply scale transform
    canvas.style.transform = `scale(${scale})`;
}

var fpsTarget = 60;
var oneS = false;
var tenS = false;
var fps = new FpsCtrl(fpsTarget, function(e) {
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > canvas.width) mTime = pTime;
    draw();

    
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("FPS: " + fps.frameRate(), ctx.canvas.width-50, 15);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,width-1,height-1);
});

fps.start();

let scale = 1;
canvas.onwheel = zoom;

