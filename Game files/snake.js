let inputDir = {x:0 , y:0} ;
const foodSound = new Audio("../necessities/food.mp3") ;
const gameSound = new Audio("../necessities/gameover(1).mp3") ;
const moveSound = new Audio("../necessities/move.mp3") ;
const Music = new Audio("../necessities/music.mp3") ;
let speed = 7 ; 
let lastPaintTime = 0 ;
let snakeArray = [{x:13 , y:15}] ;
food = {x:6 , y:7} ;
let score = 0 ;

// game functions :

function main(current_time)
{
    window.requestAnimationFrame(main);
    //  request anaimation frame is used instead of set interval as it is more preferred for high quality animations and fps control in game . 

    // console.log(current_time)
    if((current_time - lastPaintTime)/1000 < 1/speed)
    {
    return ;
    }
    lastPaintTime = current_time ;
    gameEngine() ;
}

function isCollide(snake)
{
    // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false ;
}

// main logic for the gameplay :

function gameEngine()
{
    // part1 : updating the snake array 
    // part2 : render the snake and food 
    if (isCollide(snakeArray))
    {
        gameSound.play() ;
        Music.pause() ;
        inputDir = {x:0 , y:0} ;
        alert("Game Over . Press any key to play again ! ") ;
        snakeArray = [{x:13 , y:15}] ;
        Music.play() ;
        score = 0 ;
        scorebox.innerHTML = "Score : " + score ;
    }

    //  when snake ate the food , regenerate the food and locate it at other position .
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x )
    {   foodSound.play()
        score += 1 ;
        if (score > high_score_val)
        {
            high_score_val = score ;
            localStorage.setItem("high_score",JSON.stringify(high_score_val))
            highscore.innerHTML = "High Score : " + high_score_val
        }
        scorebox.innerHTML = "Score : " + score ;
        snakeArray.unshift({x : snakeArray[0].x + inputDir.x , y : snakeArray[0].y + inputDir.y})
        let a = 2 ;
        let b = 16 ;
        food = { x : 1 + Math.round(a + (b-a)* Math.random()) , y : 1 + Math.round(a + (b-a)* Math.random()) }} ;
    

    //  Moving the Snake :
    for (let i = snakeArray.length - 2 ; i >= 0  ; i--)
        {
            snakeArray[i+1] = {...snakeArray[i]} ;
        } 

        snakeArray[0].x += inputDir.x ;
        snakeArray[0].y += inputDir.y ;

    
    gamearea.innerHTML = "" ;
    snakeArray.forEach((e ,index)=> {
        snake = document.createElement("div");
        snake.style.gridRowStart = e.y ;
        snake.style.gridColumnStart = e.x ;

        if (index === 0)
        {snake.classList.add("head")}
        else 
        { snake.classList.add("snake") }
        gamearea.appendChild(snake) ;
    }) ;

        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y ;
        foodElement.style.gridColumnStart = food.x ;
        foodElement.classList.add("food")
        gamearea.appendChild(foodElement) ;
} 

Music.play() ;
let high_score = localStorage.getItem("high_score") ;

if (high_score === null)
{   high_score_val = 0 ;
    localStorage.setItem("high_score",JSON.stringify(high_score_val))}
else { high_score_val = JSON.parse(high_score)
    highscore.innerHTML = "High Score : " + high_score }

window.requestAnimationFrame(main);
window.addEventListener("keydown" , (e)=> {
     inputDir = {x:0 , y:1} 
    moveSound.play()

    switch(e.key)
    {
    case "ArrowUp" : inputDir.x = 0;
    inputDir.y = -1 ;
    break ;

    case "ArrowDown" : inputDir.x = 0 ;
    inputDir.y = 1;
    break ;

    case "ArrowLeft" : inputDir.x = -1 ;
    inputDir.y = 0;
    break ;

    case "ArrowRight" : inputDir.x = 1 ;
    inputDir.y = 0 ;
    break ;

    default : break ;

    }
 })
