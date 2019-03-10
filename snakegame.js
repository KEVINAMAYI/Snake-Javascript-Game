//variables
const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
let box=32;


//load images
const foodImage=new Image();
foodImage.src="img/food.png";

const groundImage=new Image();
groundImage.src="img/ground.png";

//load audio
let dead=new Audio();
dead.src="audio/dead.mp3";

let down=new Audio();
down.src="audio/down.mp3";

let eat=new Audio();
eat.src="audio/eat.mp3";

let left=new Audio();
left.src="audio/left.mp3";

let right=new Audio();
right.src="audio/right.mp3";

let up=new Audio();
up.src="audio/up.mp3";

//create a snake
let snake=[];
snake[0]={

	x:9*box,
	y:10*box

};

//create food
let food={
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
}

//create score var
let score=0;

//control the snake
let d;
document.addEventListener("keydown",direction);

function direction(event)
{ 
	let key=event.keyCode;

	if (key == 37 && d!= "RIGHT")
	{
		left.play();
		d="LEFT";

	}
    else if(key == 38 && d!= "DOWN") 
    {
        up.play();
		d="UP";
    }
    else if(key == 39 && d!= "LEFT") 
    {   
        right.play();
		d="RIGHT";
    }
    else if(key == 40 && d!= "UP") 
    {
        down.play();
		d="DOWN";
    }

}

//detect snake collision
function collision(head,array)
{
   for (let i = 0; i < array.length; i++)
   {
      if(head.x==array[i].x && head.y==array[i].y)
      return true;
   }

   return false;
}


//draw everything
function draw()
{

	context.drawImage(groundImage,0,0);
	for (let i=0;i<snake.length;i++) {
		context.fillStyle=(i==0)?"green":"white";
		context.fillRect(snake[i].x,snake[i].y,box,box);

		context.strokeStyle="red";
		context.strokeRect(snake[i].x,snake[i].y,box,box);
		
	}


  //snake old position
  let snakeX=snake[0].x;
  let snakeY=snake[0].y;

  //check direction
  if (d=="LEFT")snakeX-=box;
  if (d=="UP")snakeY-=box;
  if (d=="RIGHT")snakeX+=box;
  if (d=="DOWN")snakeY+=box;


  //if the snake eats the food
  if (snakeX == food.x && snakeY == food.y)
  {
  	score++;
  	eat.play();

  	food={
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
  }

  }
  else{

  //remove the tail
  snake.pop();

  }
  

  //add a new head
  let newHead={
  	x:snakeX,
  	y:snakeY  }

 //game over
 if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
 {
 	clearInterval(game);
    dead.play();
 }

  snake.unshift(newHead);


  context.drawImage(foodImage,food.x,food.y);

  //paint the score
  context.fillStyle="white";
  context.font="45px Changa one";
  context.fillText(score,2*box,1.6*box);

}

let game=setInterval(draw,100);




