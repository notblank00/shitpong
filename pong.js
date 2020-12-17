var canvas = document.getElementById("pongCanvas");   // E
var ctx = canvas.getContext("2d");
var pos = {x : canvas.width / 2, y : 3 * canvas.height / 4};
let rand = Math.random();
const ballspeed = 15
var vct = {x : 0, y : -14 * rand};
vct.x = - Math.sqrt(ballspeed ** 2 - vct.y ** 2);
var flag = 'none';
var ly = canvas.height / 2;
var ry = ly;
const len = 120;
const w = 10;
const spd = 60;
const r = 20;
var key;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
document.addEventListener('keypress', keyPress);
ctx.font = '48px serif'
ctx.fillStyle = "#000000"

function keyPress(e) {
    if(e.code == "KeyW") {
        ly -= spd;
        if(ly - len / 2 < 0)
            ly = len / 2;
    }
    else if(e.code == "KeyS") {
        ly += spd;
        if(ly + len / 2 > 720)
            ly = 720 - len / 2;
    }
}

var xtext = canvas.width / 2 - ctx.measureText('Shitpong!').width / 2;

function draw() {
    if(flag == 'lose') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillText("Fuck you!", 100, 100);
        ctx.closePath();
    }
    else if(flag == 'win') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillText("Fuck me!", 100, 100);
        ctx.closePath();
    }
    else {
        pos.x += vct.x;
        pos.y += vct.y;
        if(pos.x - r < w) {
            if(ly + len / 2 < pos.y || ly - len / 2 > pos.y)
                flag = 'lose';
            else
                vct.x *= -1;
        }
        if(pos.x + r > canvas.width - w) {
            if(ry + len / 2 < pos.y || ry - len / 2 > pos.y)
                flag = 'win';
            else
                vct.x *= -1;
        }
        if(pos.y - r < 0 || pos.y + r > canvas.height) {
            vct.y *= -1;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillText("Shitpong!", xtext, 100);
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(0, ly - len / 2, w, len);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(canvas.width - w, ry - len / 2, w, len);
        ctx.fill();
        ctx.closePath();      
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function ai() {
    if(pos.y > ry)
        ry += spd;
    if(pos.y < ry)
        ry -= spd;
    if(ry + len / 2 > 720)
        ry = 720 - len / 2;
    if(ry - len / 2 < 0)
        ry = len / 2;
}

setInterval(draw, 20)
setInterval(ai, 100);