/*
    Author:     Hugo Masson alias Kaze
    SDate:      13/12/2021
    EDate:      ?/?/?
    
    Do NOT use / modify without the author knowledge and approval
    
    Sources:
        https://fr.wikipedia.org/wiki/Quadtree#:~:text=Un%20quadtree%20ou%20arbre%20quaternaire,subdivisant%20r%C3%A9cursivement%20en%20quatre%20n%C5%93uds.
        https://www.youtube.com/watch?v=OJxEcs0w_kE (idea)
*/

"use strict";

let canvas = document.getElementById("canvas");;
let ctx = canvas.getContext("2d");
let mx, my;
let isDrawing = false;
let isPressed = false;
let pTime = 0, mTime = 0, x = 0;
ctx.font = "20px sans-serif";
canvas.width = innerHeight/1.5;
canvas.height = innerHeight/1.5;

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
    // play status
    this.isPlaying = false;

    // set frame-rate
    this.frameRate = function(newfps) {
        if (!arguments.length) return fps;
        fps = newfps;
        delay = 1000 / fps;
        frame = -1;
        time = null;
    };

    // enable starting/pausing of the object
    this.start = function() {
        if (!this.isPlaying) {

            qt = new QuadTree(boundary, 4)
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


var width = ctx.canvas.width;
var height = ctx.canvas.height;
var boundary = new Rectangle(width/2,height/2,width/2,height/2);
var qt = new QuadTree(boundary, 4);

var wGreenRect = Math.random() * (width/1.2);
var hGreenRect = Math.random() * (height/1.2);
var xGreenRectOffset = Math.random() * (width/2)+width/4;
var yGreenRectOffset = Math.random() * (height/2)+height/4;

//let boundary = new Rectangle(0, 0, width, height);


function draw(){
    //let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    //ctx.fillStyle = randomColor;
    //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle ="green";

    let range = new Rectangle(xGreenRectOffset, yGreenRectOffset, wGreenRect/2, hGreenRect/2)
    ctx.lineWidth = 4;
    ctx.strokeRect(range.x-range.w, range.y-range.h, range.w*2, range.h*2);
    ctx.lineWidth = 1;
    let points = [];
    points = qt.query(range);
    

    //console.log(points);
    ctx.strokeStyle ="black";
    
    ctx.fillStyle ="black";
    qt.show(width/2, height/2);

    ctx.fillStyle = "green";
    for(let p of points) {
        ctx.fillRect(p.x-2, p.y-2, 4, 4);
    }
}



var fps = new FpsCtrl(60, function(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > canvas.width) mTime = pTime;
    draw()
    ctx.fillStyle = "black"
    ctx.fillText("FPS: " + fps.frameRate(), ctx.canvas.width-50, 15);
});




fps.start();

canvas.addEventListener('mousedown', e =>   {isPressed = true;});
canvas.addEventListener('mouseup', e =>     {isPressed = false;});
canvas.addEventListener('mousemove', e => {
    if(isPressed){
        let rect = e.target.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
        isDrawing = true;
        for(let i = 0; i < 1; i++) {
            let m = new Point(mx + Math.random() * (20) -10, my + Math.random() * (20) -10); 
            qt.insert(m);
        }
    }
});

