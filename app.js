// --GLOBALS--
 

// grab our elements from the html
const gameBoard = document.getElementById("game-board")
console.log(gameBoard)
const innerBoard = gameBoard.getContext('2d')
let reload = document.getElementById("reset")
let up = document.getElementById("up-button")
let left = document.getElementById("left-button")
let right = document.getElementById("right-button")
let down = document.getElementById("down-button")


                //https://www.w3schools.com/js/js_classes.asp  
                    /*JavaScript Class
                    1.use the keyword class to create a class, always add 
                    a constructor() method
                        ex. class Car {
                        constructor(name, year){
                            this.name = name; //intialize
                            this.year = year; //intialize
                        }
                    }
                    2.when you have a class you can use the class to crate objects
                            ex. let myCar1 = new Car("ford", 2014)*/ 
                    /*THE CONSTRUCTOR METHOD 
                    1. IT HAS THO HAVE THE EXACT NAME "CONSTRUCTOR"
                    2. IT IS EXECUTED AUTOMATICALLY WHEN A NEW OBJECT IS CREATED
                    3. IT IS USED TO INTIALIZE OBJECT PROPERTIES 
                    4. IF NOT DEFINED JAVASCRIPT WILL ADD AN EMPTY CONSTRUCTOR METHOD*/



// game global conditions

//track length of snake
class AddToSnake{           
    constructor(x, y){             
       this.x = x;
       this.y = y; 
    }
}


let grid = 20; //number of squares in our grid
let gridSize = gameBoard.width / grid - 2;
console.log(gridSize)



//snake and food globals
let speed = 7;  // speed of snake gets dated
let snakeHeadX = 10; //position of snake x head start
console.log(snakeHeadX)
let snakeHeadY = 10; //position of snake y head start
let appleX = 5;
let appleY = 5;
let poisonedFoodX = 16;
let poisonedFoodY = 16;
// let poisonedFoodX1 = 4;
// let poisonedFoodY1 = 4;
// let poisonedFoodX2 = 8;  // look  way to spawn mutiple foods at once 
// let poisonedFoodY2 = 8;
const snakeAdd = []; 
const gulpSound = new Audio("Gulp-sound-effect.mp3")
const yuckSound = new Audio("yuck.mp3")
const loser = new Audio("youSuck.mp3.mp3")

let snakeTail = 2;
// set x and y axis of grid 
let xDirection = 0;
let yDirection = 0;

//name and score display

let score = 0;
let playerName = prompt("what is you name?");
currentPlayerName = playerName;
console.log(currentPlayerName)
// --GAME STATES--

//our game looping with our set timeout
function makeGame() {
    moveSnakeDirection();
    
    let result = playerLost()
    if(result) {
        return ""
    }

    clearBoard();
    
    checkAteFood()
    myFood();
    mySnake();
    displayScore()
    displayPlayerName()
    
    
    setTimeout(makeGame, 1000 / speed)
}



function playerLost () {
    let lost = false; // make default false so we dont trigger an automatic lose


    //return false if we havent started game so we arent breaking lower equation
    //starting position of or snake
    if(yDirection === 0 && xDirection === 0) {
        return false;
    }

    
    // if we a hit wall
    // lose going left    lose going right      lose going       lose going down
    if(snakeHeadX < 0 || snakeHeadX >= grid || snakeHeadY < 0 || snakeHeadY >= grid ) {
        lost = true;
    }

    if(snakeTail < 1) {
        lost = true;
    }
    
    //check if snake runs into itself
    //loop thorugh our snake
    for(i = 0; i < snakeAdd.length; i++) {
        let snakeBody = snakeAdd[i]
        if(snakeBody.x === snakeHeadX && snakeBody.y === snakeHeadY ){ //breaking because i need to find a way to have it take this after it start moving
            lost = true;
            break; // break out of the for loop
        }

    }

    if(lost) {
        loser.play()
        innerBoard.fillStyle = "white"
        innerBoard.font = "50px Verdana"

        innerBoard.fillText("Game Over!", gameBoard.width / 6.5, gameBoard.height / 2)
    }
    return lost
}


function displayScore () {
    innerBoard.fillStyle = "white";
    innerBoard.font = "10px Verdana"
    innerBoard.fillText("Score: " + score, gameBoard.width-50, 10) //set x and y position of score display
}

function displayPlayerName() {
    innerBoard.fillStyle = "white";
    innerBoard.font = "10px Verdana"
    innerBoard.fillText("Player: " + playerName, gameBoard.width -395, 10)
}



function clearBoard () {
    innerBoard.fillStyle = 'black'       //selects fill color as black                //https://www.w3schools.com/tags/canvas_fillstyle.asp
    innerBoard.fillRect(0,0,gameBoard.width,gameBoard.height); // sets the rectangle grid to be 0,0 and then takes  the same height and width of our canvas // https://www.w3schools.com/tags/canvas_fillrect.asp
}



function mySnake() {
    //our added snake body
    innerBoard.fillStyle ='green' //selects fill color as green
    for(let i = 0; i < snakeAdd.length; i++){ // loop through our global snakeAdd array
        let add = snakeAdd[i]; // set add to equal our array cycle
        innerBoard.fillRect(add.x * grid, add.y * grid, gridSize, gridSize) // make our body pieces
    }
    

    /*!!IMPORTANT!! new operator allows us to create an instance of a user-defined 
    object type or of one the built-in object types that has a constructor function*/
     snakeAdd.push(new AddToSnake (snakeHeadX, snakeHeadY)); //adds our vars to the arguments of AddToSnake obj and puts our snake body next to the head in the array list
     //console.log(snakeAdd)
    while (snakeAdd.length > snakeTail) { // if array is greater than our snakeTail size
        snakeAdd.shift() //remove the furthest items from our snakeTail while moving so if we moved left one it shifts the array over 1
        //console.log(snakeAdd)
    }
   //snake head (display last in function order so it dosent disappear)
    innerBoard.fillStyle = 'red'       //selects fill color as red
    innerBoard.fillRect(snakeHeadX * grid, snakeHeadY * grid, gridSize, gridSize) /*(snakeHeadX(10) * grid(20)) will move us 10 over(right) in our grid, (snakeHeadY * grid) 
                                                                            will move us 10 down in our grid. X is our vert axis y is our horizontal*/

}


function moveSnakeDirection() {
    snakeHeadX = snakeHeadX + xDirection
    snakeHeadY = snakeHeadY + yDirection
}



function myFood() {
    innerBoard.fillStyle = "green"
    innerBoard.fillRect(appleX * grid, appleY * grid, gridSize, gridSize)  /*(appleX(5) * grid(20)) will move us 5 over(right) in our grid, (appleY * grid) 
                                                                    will move us 5 down in our grid. X is our vert axis y is our horizontal*/
    // innerBoard.fillStyle = purple;
    // let gradient = innerBoard.createLinearGradient(0, 0, width.width, 0) // How to create a linear gradient with javascript on canvas method https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
    // gradient.addColorStop("0", "purple")
    // gradient.addColorStop("0.5", "green") //figure // need to work a little more with this
    // gradient.addColorStop("1.0", "yellow") 
    innerBoard.fillStyle = "purple";
    innerBoard.fillRect(poisonedFoodX * grid, poisonedFoodY * grid, gridSize, gridSize)
}



function checkAteFood() {
    if(poisonedFoodX === snakeHeadX && poisonedFoodY === snakeHeadY) {
        speed = speed + 2
        poisonedFoodX = Math.floor(Math.random() * grid)   //creates a randomly generated spot on the x axis to move the poisonfood
        poisonedFoodY = Math.floor(Math.random() * grid)   //creates a randomly generated spot on the y axis to move the poisonfood
        appleX = Math.floor(Math.random() * grid)  
        appleY = Math.floor(Math.random() * grid)
        // appleX = Math.floor(Math.random() * grid)  
        // appleY = Math.floor(Math.random() * grid)

        snakeTail--
        score--
        yuckSound.play();
        }
   
    if(appleX === snakeHeadX && appleY === snakeHeadY) { /*if the x axis of snakeHead and apple is truly equal to the same number 
                                                            or the same spot on or grid and the same is true for the y axis, we change the variables below to a 
                                                            randomly generated spot on the grid*/
        appleX = Math.floor(Math.random() * grid)  //creates a randomly generated spot on the x axis to move the food
        appleY = Math.floor(Math.random() * grid)
        poisonedFoodX = Math.floor(Math.random() * grid)  
        poisonedFoodY = Math.floor(Math.random() * grid)                    
        snakeTail++ // if we hit food increase the length of our tail by 1
        score++ // if we hit food increase score by 1
        gulpSound.play();
    }
}

// --EVENT LISTENERS--

document.body.addEventListener('keydown', keyEntered)

// IMPORTANT FIND BUTTONS USING .keyCode method which associates keyboard keys 
//with a certain numerical value 
//ex. (the arrows numerical value == 38) 
//website to find the numerical values of the keyboard keys (https://keycode.info/)
function keyEntered(event) { //event listener for arrow keys
    // arrow press
    if(event.keyCode == 38 ) {
        // if key is pressed
        if(yDirection == 1)
        return; //if already moving  you cant move down
        yDirection = -1 //moves one tile at a time on y axis ()
        xDirection = 0; //if moving horizontal stop moving left or ight and only go 
    }
    //down arrow press
    if(event.keyCode == 40) {
        if(yDirection == -1)//if already moving down you cant move 
        return; 
        yDirection = 1;
        xDirection = 0;
    }
    //left arrow press
    if(event.keyCode == 37) {
        if(xDirection == 1) //if already moving left cant move right
        return;
        yDirection = 0;
        xDirection = -1;
    }
    //right arrow press
    if(event.keyCode == 39) {
        if(xDirection == -1) //if already moving right cant move left
        return;
        yDirection = 0;
        xDirection = 1;
    }
    //cant move  or down we need to do something about that *fixed
}

reload.addEventListener('click', function(){ //reset button listening
    // document.onbeforeunload = null
    document.location.reload(true)

})

//mobile functionality
// let mobileView;

// function checkInMobileMode() {
//     if ($(window).width() <= 766) {
//         mobileView = true;
//     }else {
//         mobileView = false;
//     }
//     if(mobileView === true) {
//         $('.mobile-buttons').show();
//     }else {
        
//     }
// }


up.addEventListener('click', function() {
    if(yDirection == 1)
        return;
        yDirection = -1 //moves one tile at a time on y axis ()
        xDirection = 0; 
})
down.addEventListener('click', function() {
    if(yDirection == -1)//if already moving down you cant move 
        return; 
        yDirection = 1;
        xDirection = 0;
})
 left.addEventListener('click', function() {
    if(xDirection == 1) //if already moving left cant move right
        return;
        yDirection = 0;
        xDirection = -1;
 })
 right.addEventListener('click', function() {
    if(xDirection == -1) //if already moving right cant move left
        return;
        yDirection = 0;
        xDirection = 1;
})




makeGame();

















