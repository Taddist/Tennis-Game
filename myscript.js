var canvas;
var canvasContext;
var ballX=50;
var ballY=50;
var ballSpeedX=10;
var ballSpeedY=4;


var palayer1Score=0;
var palayer2Score=0;

var paddle1Y=250;
var paddle2Y=250;

var showingWinScreen=false;

const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;
const WINNING_SCORE=3;

function calculateMousePos(evt) {
	
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt) {
		if(showingWinScreen){
			palayer1Score=0;
			palayer2Score=0;
			showingWinScreen=false;
		}
}
window.onload=function(){

	canvas=document.getElementById('gameCanvas');
	canvasContext=canvas.getContext('2d');

	var framesPerSecond=30
	// Every one second after the page is loaded , it is gonna call drawEverything
	setInterval(function(){
		moveEverything();
		drawEverything();
		},1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(evt){
			var mousePos=calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			
	});


	anvas.addEventListener('mousedown',handleMouseClick);



}

function ballReset() {

	if(palayer1Score>=WINNING_SCORE || palayer2Score>=WINNING_SCORE){
		showingWinScreen=true;
	}


	ballSpeedX=-ballSpeedX;
	ballX=canvas.width/2;
	ballY=canvas.height/2;
}

function computerMouvement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y -= 6;
	}
}
function moveEverything(){

	if(showingWinScreen){
		return ;
	}

	computerMouvement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX>canvas.width){
		if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT){
			ballSpeedX=-ballSpeedX;

			var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);

			ballSpeedY=deltaY *0.35;
		}
		else {
			palayer1Score++; //must be before ballReset()
			ballReset();
			
		}
	}
	if(ballX<0){
		
		if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
			ballSpeedX=-ballSpeedX;


			var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);

			ballSpeedY=deltaY *0.35;
		}
		else {
			palayer2Score++;  //must be before ballReset()
			ballReset();
			
		}
		
	}

	if(ballY>canvas.height){
		ballSpeedY=-ballSpeedY;
	}
	if(ballY<0){
		ballSpeedY=-ballSpeedY;
	}
}
function drawNet() {
	for (var i=0;i<canvas.height;i+=40){
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}
function drawEverything(){
	// next line blanks out the screen with black 
	colorRect(0,0,canvas.width,canvas.height,'black');

	if(showingWinScreen){
		canvasContext.fillStyle='white';
		if(palayer1Score>=WINNING_SCORE){
			canvasContext.fillText("Left player won ", 350, 200);

		}

		else if(palayer2Score>=WINNING_SCORE) {
			canvasContext.fillText("Right player won ", 350, 200);
		}

		
		canvasContext.fillText("Click to continue", 350, 500);
		return ;
	}

	drawNet();

	//This is left player paddle
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	//This is right player paddle
	colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	//Next line draws the ball
	colorCircle(ballX,ballY,10,'white') ;

	canvasContext.fillText(palayer1Score, 100, 100);
	canvasContext.fillText(palayer2Score, canvas.width-100, 100);
	
}
function colorCircle(centerX,centerY,radius,drawColor) {

	canvasContext.fillStyle=drawColor;
	canvasContext.beginPath();
	//x,y,radius,    pi ==>180  so 2*pi ==> 360 circle  
	// if we had false it will draw the opposite 
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
	
}
function colorRect(leftX,topY,width,height,drawColor){

	canvasContext.fillStyle=drawColor;
	canvasContext.fillRect(leftX,topY,width,height);

}