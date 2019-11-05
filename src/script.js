var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var score=document.getElementById('score');
var grid = 16;
var count = 0;
var move;
var lastMove='right';
var snake = 
{
  x : 160,
  y : 160 ,
  cells : [{x:160 , y:160} , {x:144 , y:160}] ,
  die:false,
};

var apple = {
  x: 320,
  y: 320
};

// draw apple
function drawApple()
{
  context.fillStyle = 'cyan';
  context.fillRect(apple.x, apple.y, grid-1, grid-1); 
}
drawApple();

// draw snake
function drawSnake()
{   
  for(let i=0 ; i<snake.cells.length ; i++)
      {
         if(i==0)
          {
              context.fillStyle = 'white';
          }
          else
          {
              context.fillStyle = 'cyan';
          }
          context.fillRect(snake.cells[i].x, snake.cells[i].y, grid, grid);
      }
}
drawSnake();  

function moveSnake( dx , dy)
{
    snake.x += dx ;
    snake.y += dy ;
    if(snake.x==apple.x && snake.y==apple.y)
        {
            refreshScore();
            snake.cells.unshift({x: snake.x , y: snake.y});
            var ran=Math.floor(Math.random()*(25-1)+1);
            apple.x=ran*16;
            apple.y=ran*16;
            drawApple();
        }
    else
        {
            snake.cells.unshift({x: snake.x , y: snake.y}) ; // Insert at 0th position
            snake.cells.pop();// remove the last element
            drawSnake();
        }
    drawSnake();
}

function checkBoundaries()
{
    if(snake.x<0 || snake.x>=canvas.width || snake.y<0 || snake.y>=canvas.height)
        {
            snake.die=true;
        }
}

function checkIfSnakeBitesItself()
{
    console.log(snake.cells.length);
    for(let i=4;i<snake.cells.length;i++)
        {
            if(snake.x==snake.cells[i].x && snake.y==snake.cells[i].y)
                {
                    snake.die=true;
                }
        }
}
// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) 
{
  let dx , dy ;
  // left arrow key
  if (e.keyCode == 37 && lastMove!='right') 
  {  
    clearInterval(move);
    move=setInterval(function(){
            dx = -grid;
            dy = 0;
            context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
            moveSnake(dx,dy);
            checkBoundaries();
            checkIfSnakeBitesItself();
            if(snake.die==true)
                {
                    clearInterval(move);
                    gameOver();
                }
            else
            drawApple();
            lastMove='left';
        },100); 
  }
   // up arrow key
  else if (e.keyCode == 38 && lastMove!='down') 
  {
    clearInterval(move);  
    move=setInterval(function(){
            dy = -grid;
            dx = 0;
            context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
            moveSnake(dx,dy);
            checkBoundaries();
            checkIfSnakeBitesItself();
            if(snake.die==true)
                {
                    clearInterval(move);
                    gameOver();
                }
            else
            drawApple();
            lastMove='up';
        },100);
  }
   // right arrow key
  else if (e.keyCode == 39 && lastMove!='left') 
  {
     clearInterval(move); 
     move=setInterval(function(){
            dx = grid;
            dy = 0;
            context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
            moveSnake(dx,dy);
            checkBoundaries();
            checkIfSnakeBitesItself();
            if(snake.die==true)
                {
                    clearInterval(move);
                    gameOver();
                }
            else
            drawApple();
            lastMove='right';
        },100);
  }
   // down arrow key
  else if (e.keyCode == 40 && lastMove!='up') 
  {
        clearInterval(move)
        move=setInterval(function(){
            dy = grid;
            dx = 0;
            context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
            moveSnake(dx,dy);
            checkBoundaries();
            checkIfSnakeBitesItself();
            if(snake.die==true)
                {
                    clearInterval(move);
                    gameOver();
                }
            else
            drawApple();
            lastMove='down';
        },100);
  }
  
});
function refreshScore()
{
    score.innerHTML=Number(score.innerHTML)+5;
}

function gameOver(){
    context.clearRect(0,0,400,400);
    snake.cells=[];
    context.fillStyle="cyan";
    context.textAlign="center";
    context.fillText("Game Over!!!",canvas.width/2,canvas.height/2);
}
