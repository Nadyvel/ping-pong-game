const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


let x = 40; // the ball
let y = 40; // the ball
let vx = +2; // speed of the ball
let vy = +2; // speed of the ball
let plx = 10; // space from the wall for the left paddle
let ply = 10; // space from the wall for the left paddle
let vply = 0; // movement on one axis 
let bx = plx + 20; // 
let by = ply + 80; // limit for the left paddle 

let prx = 570; // space from the wall to the right paddle
let pry = 510; // space from the wall to the right paddle
let vpry = 0; // movement on one axis
let brx = prx + 20;
let bry = pry + 80; // limit for the right paddle


function renderField(){  // shapes colors the board of the game
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 600);
}

function renderLeftPaddle(x = 10, y = 10) { // shapes and colors the left paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 20, 80);
}
function renderRightPaddle(x = 580, y = 510) { // shapes and colors the right paddle
    ctx.fillStyle = 'white';  
    ctx.fillRect(x, y, 20, 80);
}


function renderBall(x=10, y=10){  // shapes and colors the ball
ctx.beginPath();
ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
ctx.fillStyle = 'fuchsia';
ctx.fill();
}

function renderScore(leftPaddle, rightPaddle,ctx){  // shapes and colors the score line
    console.log(leftPaddle, rightPaddle, ctx)
ctx.fillStyle = "white";
ctx.font = "30px Tahoma";
ctx.fillText(leftPaddle.points, ctx.canvas.width / 4, 30);
ctx.fillText(rightPaddle.points, ctx.canvas.width / 4 * 3, 30);
}

function renderWinner(winner){                      // shapes and colors and prints the text for winner
    ctx.fillStyle = 'yellow';
    ctx.font = "50px Tahoma";
    ctx.fillText(`${winner} you won`, 40, 260);
}
   
class Paddle {                                     // checks the side collision of the paddles and adds the score to the needed one
    constructor (side){
        this.side = side;
        this.points = 0;
    }
    addPoint(){
        this.points+=1;
    }
}

const leftPaddle = new Paddle ('Left');
const rightPaddle = new Paddle ('Right');

const interval = setInterval(() => {              // wraps the interval, which makes the ball move and bounce
    renderField();
    renderLeftPaddle(plx, ply);
    renderRightPaddle(prx, pry);
    renderBall(x,y);
    renderScore(leftPaddle, rightPaddle, ctx);
    x += vx;                                      // converts this to a direction
    y += vy;
    ply += vply;
    by = ply + 80;
    pry += vpry;
    bry = pry + 80;
    

    if (leftPaddle.points === 10 || rightPaddle.points === 10){  // checks who is the winner
        let winner; 
          if (leftPaddle.points === 10){
              winner = 'Left Paddle';
          } else {
              winner = 'Right Paddle';
          }
        renderWinner(winner);
        clearInterval(interval);                                // stops the game
    }
    if ((x-10) <= bx && (y-10) >= ply && (y+10) <= by){  // left paddle move and stop
        vx = -vx;
    }
    if ((x+10) >= prx && (y-10) >= pry && (y+10) <= bry){   // right paddle move and stop
        vx = -vx;
    }
    if (y <= 0 || y >= 600) {
       vy = -vy;
    }
    if (ply <=0 ){
        ply = 0;
    } 
    if (ply >= 520 ){
        ply = 520;
    }
    if (pry <=0 ){
        pry = 0;
    } 
    if (pry >= 520 ){
        pry = 520;
    }
    if (x<=0){                    // resets the ball position to the middle after one of the paddles scores
       rightPaddle.addPoint();
       x = 300;  y = 300;
    }
    if (x>=600){                  // resets the ball position to the middle after one of the paddles scores
        leftPaddle.addPoint();
        x = 300; y = 300; 
    } 
    
}, 17);                          // 17 because 60 frames per second for the smooth movement 


const ArrowUpKeyCode = 16;      // check this numbers in the DevTools in console
const ArrowDownKeyCode = 17;
const ArrowUpKeyCode2 = 38; // shift
const ArrowDownKeyCode2 = 40; // ctrl


// Player 1 
document.addEventListener('keydown', (event) => {   // sets user interaction for the first player
    if (event.keyCode === ArrowDownKeyCode){
       vply = 10;
    }
    if (event.keyCode === ArrowUpKeyCode){
        vply -= 10;
     }
});

document.addEventListener('keyup', (event) => {
    if (event.keyCode === ArrowDownKeyCode){
       vply = 0;
    }
    if (event.keyCode === ArrowUpKeyCode){
        vply = 0;
    }

});

// Player 2
document.addEventListener('keydown', (event) => {  // sets user interaction for the second player
    if (event.keyCode === ArrowDownKeyCode2){
       vpry = 10;
    }
    if (event.keyCode === ArrowUpKeyCode2){
        vpry -= 10;
     }
});
document.addEventListener('keyup', (event) => {
    if (event.keyCode === ArrowDownKeyCode2){
        vpry = 0;
    }
    if (event.keyCode === ArrowUpKeyCode2){
        vpry = 0;
    }

});

// when x === frame rightest side, then decrease
