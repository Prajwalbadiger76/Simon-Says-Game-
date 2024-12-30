let gameSeq = [];                                             //Initially Game Sequence will be empty
let userSeq = [];                                             //Initially User Sequence will be empty

let btns = ["yellow", "red", "purple", "green"];              //Buttons we have for the game

let started = false;                                          //Initially Started value will be false because, game not yet started
let level = 0;
let h2 = document.querySelector("h2");                        //Accessing the h2 using Query Selector

  document.addEventListener("keypress", function() {          //To start game, we have to press any key 
        if(started == false) { 
            console.log("Game started");
            started = true;                                   //Updating Started value to true because, game has been started
    
            levelUp();                                        //Calling the levelUp function
        }
    });

function gameFlash(btn) {                                     //To get flash, buttongameFlash function receiving the btn 
    btn.classList.add("flash");                               //Adding flash to the Class List of btn
    setTimeout(function() {                                   //To set timeout for the flash in white color
        btn.classList.remove("flash");                        //To remove the class from btn after flashing
    }, 350);
}

function userFlash(btn) {                                     //Function userflash to indicate the user selected button in green color
    btn.classList.add("userFlash");                           //Adding userflash to the Class List of btn
    setTimeout(function() {                                   //To set timeout for the flash in white color
        btn.classList.remove("userFlash");                    //To remove the class from btn after flashing
    }, 350);
}
 
function levelUp() {                                          //levelUp function to increase the game level 
    userSeq = [];                                             //For every level User Sequence will be empty to get new sequence for every level
    level++;                                                  //Incrementing the level, if the current level is correct
    h2.innerText = `Level ${level}`;                          //Test of h2 is changed to level number after starting the game

    let randIdx = Math.floor(Math.random()*3);                //To create random number from every flash to continue game
    let randColor = btns[randIdx];                            //Passing the random number to get random color
    let randBtn = document.querySelector(`.${randColor}`);    //Selecting random color and storing in randBtn
    gameSeq.push(randColor);                                  //Pushing value into Game Sequence
    console.log(gameSeq);                                     //Dsplay the Sequence on the console
    gameFlash(randBtn);                                       //Passing value to gameFlash function
}

function checkAns(idx) {                                      //checkAns function to check the answers from the  
    if(userSeq[idx] === gameSeq[idx]){                        //Check if User Sequence and Game Sequence are eual
        if(userSeq.length == gameSeq.length) {                //Check if User Sequence length and Game Sequence length are equal
            setTimeout(levelUp, 1000);                        //If true, the Level up for the next level
        }
    } else {
        h2.innerHTML = `Game over!  Your score is :  ${level} <br> Press Any Key to Restart`;   //Else the Game was Ended!! 
        document.querySelector("body").style.backgroundColor = "red";                           //Flashing the red color in the background 
        setTimeout( function(){                                                                 //To set timeout for the flash in white color
            document.querySelector("body").style.backgroundColor = "white";                     //Back to white color in the background
        }, 150);
        reset();                                              //Calling the reset function
    }
}


function btnPress() {                                         //Function btnPress to get the user entered button
    let btn = this;                                           //Button pressed was stored in btn
    userFlash(btn);                                           //Passing the btn we got to userFlash to indicate

    userColor = btn.getAttribute("id");                       //Accessing the id from userColor     
    console.log(userColor);        
    userSeq.push(userColor);                                  //Pushing the userColor to User Sequence

    checkAns(userSeq.length-1);                               //Calling checkAns function by passing value of User Sequence length minus one
}

let allBtns = document.querySelectorAll(".btn");              //Selecting All the btn and Storing them in allBtns
for(btn of allBtns) {                                         //For Of Loop to iterate allBtns
    btn.addEventListener("click", btnPress);          
}

function reset() {                                            //Function reset to get restart the game
    started = false;                                          //started Value is set to false to restart game
    gameSeq = [];                                             //Game Sequence Value is set to empty to restart game
    userSeq = [];                                             //User Sequence Value is set to empty to restart game
    level = 0;                                                //Level Value is set to zero to restart game
}