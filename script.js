let snakeSpeed = 250;
let autoMove;
let endGame = true;
let nextStep = "right";
let currentStep = "right";
let headPosition = [0, 0, 0];

const snake = document.querySelector(".snake");
const scoreBox = document.querySelector("#actualScore");
const startPauseBtn = document.querySelector("#btnStart");
const fieldSizeX = Math.floor(document.documentElement.clientWidth / 20) - 2;
const fieldSizeY = Math.floor(document.documentElement.clientHeight / 20) - 4;

snake.style.transitionDuration = `${snakeSpeed}ms`;

// --------NAVIGATION SECTION ----------//

document.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "ArrowUp" : {
            if (currentStep != "down") {
                nextStep = "up";
            }
            break;
        };
        case "ArrowDown" : {
            if (currentStep != "up") {
                nextStep = "down";
            }
            break;
        };
        case "ArrowLeft" : {
            if (currentStep != "right") {
                nextStep = "left";
            }
            break;
        };
        case "ArrowRight" : {
            if (currentStep != "left") {
                nextStep = "right";
            }
            break;
        }
    }
})

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
let xDown = null;                                                        
let yDown = null;                                                        
function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};   

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if(xDiff > 0 && currentStep != "right") {
                nextStep = "left";
            }
            else if(xDiff < 0 && currentStep != "left") {
                nextStep = "right";
            }                      
    } else {
            if(yDiff < 0 && currentStep != "up") {
                nextStep = "down";
            }
            else if(yDiff > 0 && currentStep != "down") {
                nextStep = "up";
            }                                                               
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

// --------NAVIGATION SECTION END----------//

startPauseBtn.addEventListener("click", () => {
    if (endGame == true) {
        endGame = false;
        launchSnake();
        startPauseBtn.classList.add("paused")
    } else {
        clearInterval(autoMove);
        startPauseBtn.classList.remove("paused")
        endGame = true;
    }
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createField() {
    let gameField = document.querySelector(".game__field");
    gameField.style.width = `${fieldSizeX * 20}px`;
    gameField.style.height = `${fieldSizeY * 20}px`;
}

function posCheck(step, fieldSize) {
    if (step > fieldSize - 1) {
        return 0;
    } else if (step < 0) {
        return fieldSize - 1;
    } else {
        return step;
    }
}

function snakeMove(direction) {
    let [posX, posY, rotation] = headPosition;

    switch(direction) {
        case "up" : {
            posY = posCheck(--posY, fieldSizeY);
            if (nextStep == "right") rotation += 90;
            if (nextStep == "left") rotation -= 90;
            headPosition = [posX, posY, rotation];
            snake.style.transform = `translateX(${posX * 20}px) translateY(${posY * 20}px) rotate(${rotation}deg)`;
            break;
        }
        case "down" : {
            posY = posCheck(++posY, fieldSizeY);
            if (nextStep == "right") rotation -= 90;
            if (nextStep == "left") rotation += 90;
            headPosition = [posX, posY, rotation];
            snake.style.transform = `translateX(${posX * 20}px) translateY(${posY * 20}px) rotate(${rotation}deg)`;
            break;
        }
        case "left" : {
            posX = posCheck(--posX, fieldSizeX);
            if (nextStep == "down") rotation -= 90;
            if (nextStep == "up") rotation += 90;
            headPosition = [posX, posY, rotation];
            snake.style.transform = `translateX(${posX * 20}px) translateY(${posY * 20}px) rotate(${rotation}deg)`;
            break;
        }
        case "right" : {
            posX = posCheck(++posX, fieldSizeX);
            if (nextStep == "down") rotation += 90;
            if (nextStep == "up") rotation -= 90;
            headPosition = [posX, posY, rotation];
            snake.style.transform = `translateX(${posX * 20}px) translateY(${posY * 20}px) rotate(${rotation}deg)`;
            break;
        }
    }
}

function launchSnake() {
    autoMove = setInterval(() => {
        snakeMove(currentStep);
        currentStep = nextStep;
    }, snakeSpeed);
}

createField();