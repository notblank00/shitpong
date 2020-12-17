var canvas = document.getElementById("pongCanvas");   // E
var ctx = canvas.getContext("2d");
const bleep = new Audio('bleep.mp3');
const bloop = new Audio('bloop.mp3');
let rand = Math.random();
const ballspeed = 15
var vct = {x : 10, y : -10};
var gameStarted = false;
var flag = 'none';
var ly = canvas.height / 2;
var ry = ly;
const len = 120;
const w = 10;
const spd = 60;
const errFac = 10;
const reactionSpeed = 20;
const r = 20;
var pos = {x : 40, y : 20 + Math.random() * (canvas.height - 40)};
var key;
var aiInterval, drawInterval;
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
    else if(e.code == "Space" && !gameStarted) {
        drawInterval = setInterval(draw, 20);
        aiInterval = setInterval(ai, reactionSpeed);
        gameStarted = true;
        bleep.play();
    }
}

var xtext = canvas.width / 2 - ctx.measureText('Shitpong!').width / 2;
ctx.font = '24px serif';
var xsub = canvas.width / 2 - ctx.measureText('Why am I here?').width / 2;

function draw() {
    ctx.font = '48px serif'
    if(flag == 'lose') {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("You are shit!", 100, 100);
        ctx.closePath();
        clearInterval(drawInterval);
    }
    else if(flag == 'win') {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Well, I am shit...", 100, 100);
        ctx.closePath();
        clearInterval(drawInterval);
    }
    else {
        pos.x += vct.x;
        pos.y += vct.y;
        if(pos.x - r < w) {
            if(ly + len / 2 < pos.y || ly - len / 2 > pos.y) {
                flag = 'lose';
                bloop.play();
            }
            else {
                vct.x *= -1;
                aiInterval = setInterval(ai, reactionSpeed);
                bleep.play();
            }
        }
        if(pos.x + r > canvas.width - w) {
            if(ry + len / 2 < pos.y || ry - len / 2 > pos.y) {
                flag = 'win';
                bloop.play();
            }
            else {
                vct.x *= -1;
                clearInterval(aiInterval);
                bleep.play();
            }
        }
        if(pos.y - r < 0 || pos.y + r > canvas.height) {
            vct.y *= -1;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillText("Shitpong!", xtext, 100);
        ctx.font = '24px serif'
        ctx.fillText("Why am I here?", xsub, 130);
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
    err = (Math.random() - 0.5) * errFac;
    if(pos.y > ry + len / 2 + err)
        ry += spd;
    else if(pos.y < ry - len / 2 - err)
        ry -= spd;
}


ctx.fillText("Press space", 200, 200)
ctx.fillText("Also control yourself with W/S keys", 200, 250)