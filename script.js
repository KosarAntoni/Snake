let snake = [];
let autoMove;
let endGame = true;
let tmpDirection = "right";
let lastDirection = "right";
let crntDirection = "right";
let fieldSizeX = Math.floor(document.documentElement.clientWidth / 20) - 3;
let fieldSizeY = Math.floor(document.documentElement.clientHeight / 20) - 3;

document.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "ArrowUp" : {
            if (crntDirection != "down") {
                tmpDirection = "up";
            }
            break;
        };
        case "ArrowDown" : {
            if (crntDirection != "up") {
                tmpDirection = "down";
            }
            break;
        };
        case "ArrowLeft" : {
            if (crntDirection != "right") {
                tmpDirection = "left";
            }
            break;
        };
        case "ArrowRight" : {
            if (crntDirection != "left") {
                tmpDirection = "right";
            }
            break;
        }
    }
})

// function getTime() {
//     return new Date().getTime();
// };

//     document.addEventListener('touchstart', function(e) {
//         xTouch = parseInt(e.touches[0].clientX);
//         yTouch = parseInt(e.touches[0].clientY);
//         stTime = getTime()
//         e.preventDefault();
//     }, false);
//     document.addEventListener('touchmove', function(e) {
//         if(!xTouch || !yTouch) return;
//         xDiff = xTouch - parseInt(e.touches[0].clientX);
//         yDiff = yTouch - parseInt(e.touches[0].clientY);
//         mvTime = getTime();
//         if(Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
//             stTime = 0;
//             if(xDiff > 0 && crntDirection != "right") {
//                 tmpDirection = "left";
//             }
//             else if(xDiff < 0 && crntDirection != "left") {
//                 tmpDirection = "right";
//             }
//         }
//         if(Math.abs(yDiff) > 15 && Math.abs(yDiff) > Math.abs(xDiff) && mvTime - stTime < 75) {
//             stTime = 0;
//             if(yDiff < 0 && crntDirection != "up") {
//                 tmpDirection = "down";
//             }
//             else if(yDiff > 0 && crntDirection != "down") {
//                 tmpDirection = "up";
//             }
//         }
//     }, false)

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;                                                        
function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};   

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if(xDiff > 0 && crntDirection != "right") {
                tmpDirection = "left";
            }
            else if(xDiff < 0 && crntDirection != "left") {
                tmpDirection = "right";
            }                      
    } else {
            if(yDiff < 0 && crntDirection != "up") {
                tmpDirection = "down";
            }
            else if(yDiff > 0 && crntDirection != "down") {
                tmpDirection = "up";
            }                                                               
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

document.getElementById("btnStart").addEventListener("click", function() {
    tmpDirection = "right";
    lastDirection = "right";
    crntDirection = "right";
    endGame = false;
    createSnake();
    clearTimeout(autoMove);
    launchSnake();
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function launchSnake() {
    autoMove = setInterval(function step() {
        snakeMove(crntDirection);
        crntDirection = tmpDirection;
    }, 150);
}

function eatItself(pos) {
    if (pos.classList.contains("snake")) {  
        clearInterval(autoMove);   
        autoMove = null;  
        for(let part of snake) {
            part.classList.remove("snake", 
                                  "snake__head",
                                  "snake__tail", 
                                  "snake__part--rotate_up", 
                                  "snake__part--rotate_down", 
                                  "snake__part--rotate_left",
                                  "snake__part--rotate_right",
                                  "snake__twist--right",
                                  "snake__twist--left");
        }
        endGame = true;
        snake = [];
    }    
}

function addApple() {
    let appleField = document.getElementById(`${getRandom(0, fieldSizeY)}_${getRandom(0, fieldSizeX)}`);
    if (appleField.classList.contains("snake")) {
        appleField = addApple(); 
    }
    appleField.classList.add("apple");
    return appleField;
}

function eatApple(pos) {
    if (pos.classList.contains("apple")) {
        pos.classList.remove("apple");
        addApple();
        return "nomnom"
    }
}

function createField(fieldSizeX) {
    let gameField = document.querySelector(".game__field");
    gameField.style.width = `${fieldSizeX * 20}px`;
    gameField.style.height = `${fieldSizeY * 20}px`;
    
    for (let y = 0; y < fieldSizeY; y++) {
        let tmpId = y + "_";
        for (let x = 0; x < fieldSizeX; x++) {
            let id = tmpId + x;
            let fieldBox = document.createElement("div");
            fieldBox.classList.add("square");
            fieldBox.setAttribute("id", id);
            gameField.append(fieldBox);
        }
    }
}

function createSnake() {
    if (snake.length == 0) {
        crntDirection = "right";
        snake = [
            document.getElementById("3_5"),
            document.getElementById("3_4"),
            document.getElementById("3_3"),
            document.getElementById("3_2"),
            document.getElementById("3_1")
        ];
    }
    for (let snakePart of snake) {
        snakePart.classList.add("snake"); 
    }
    snake[0].classList.add("snake__head");
    if (crntDirection == "up") snake[0].classList.add("snake__part--rotate_up");
    if (crntDirection == "down") snake[0].classList.add("snake__part--rotate_down");
    if (crntDirection == "left") snake[0].classList.add("snake__part--rotate_left");
    if (crntDirection == "right") snake[0].classList.add("snake__part--rotate_right");
    snake[1].classList.remove("snake__head");

    if (lastDirection == "right" && crntDirection == "down" || 
        lastDirection == "down" && crntDirection == "left" ||
        lastDirection == "left" && crntDirection == "up" ||
        lastDirection == "up" && crntDirection == "right") snake[1].classList.add("snake__twist--right");

    if (lastDirection == "right" && crntDirection == "up" || 
        lastDirection == "up" && crntDirection == "left" ||
        lastDirection == "left" && crntDirection == "down" ||
        lastDirection == "down" && crntDirection == "right") snake[1].classList.add("snake__twist--left");

    if (snake[snake.length - 2].classList.contains("snake__part--rotate_up")) {
        snake[snake.length - 1].classList.remove("snake__part--rotate_up", 
                                                 "snake__part--rotate_down", 
                                                 "snake__part--rotate_left");
        snake[snake.length - 1].classList.add("snake__part--rotate_up");
    }
    if (snake[snake.length - 2].classList.contains("snake__part--rotate_down")) {
        snake[snake.length - 1].classList.remove("snake__part--rotate_up", 
                                                 "snake__part--rotate_down", 
                                                 "snake__part--rotate_left");
        snake[snake.length - 1].classList.add("snake__part--rotate_down");
    }
    if (snake[snake.length - 2].classList.contains("snake__part--rotate_left")) {
        snake[snake.length - 1].classList.remove("snake__part--rotate_up", 
                                                 "snake__part--rotate_down", 
                                                 "snake__part--rotate_left");
        snake[snake.length - 1].classList.add("snake__part--rotate_left");
    }
    if (snake[snake.length - 2].classList.contains("snake__part--rotate_right")) {
        snake[snake.length - 1].classList.remove("snake__part--rotate_up", 
                                                 "snake__part--rotate_down", 
                                                 "snake__part--rotate_left");
        snake[snake.length - 1].classList.add("snake__part--rotate_right");
    }

    snake[snake.length - 1].classList.add("snake__tail");
    lastDirection = crntDirection;
}

function posCheckX(step) {
    if (step > fieldSizeX - 1) {
        return 0; 
    } else if (step < 0) {
        return fieldSizeX - 1; 
    } else {
        return step;
    }
}

function posCheckY(step) {
    if (step > fieldSizeY - 1) {
        return 0; 
    } else if (step < 0) {
        return fieldSizeY - 1; 
    } else {
        return step;
    }
}

function snakeMove(direction) {
    if (snake.length == 0) createSnake();

    let crntHeadPos = snake[0].id.split("_");
    let posY = crntHeadPos[0];
    let posX = crntHeadPos[1];
    let snakeStep;

    switch(direction) {
        case "up" : {
            snakeStep = document.getElementById(`${posCheckY(--posY)}_${posX}`);
            break;
        }
        case "down" : {
            snakeStep = document.getElementById(`${posCheckY(++posY)}_${posX}`);
            break;
        }
        case "left" : {
            snakeStep = document.getElementById(`${posY}_${posCheckX(--posX)}`);
            break;
        }
        case "right" : {
            snakeStep = document.getElementById(`${posY}_${posCheckX(++posX)}`);
            break;
        }
    }
    eatItself(snakeStep);
    if (endGame) return;

    if (eatApple(snakeStep) != "nomnom" ) {
        snake[snake.length - 1].classList.remove("snake", 
                                                 "snake__tail", 
                                                 "snake__part--rotate_up", 
                                                 "snake__part--rotate_down", 
                                                 "snake__part--rotate_left",
                                                 "snake__part--rotate_right",
                                                 "snake__twist--right",
                                                 "snake__twist--left");
        snake.pop();
    }  

    snake.unshift(snakeStep);

    if (!endGame) createSnake()
}

createField(fieldSizeX);
addApple()