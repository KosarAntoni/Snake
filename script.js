let score = 0;
let snakeSpeed = 250;
let endGame = true;

let nextStep;
let currentStep;
let snakeBody;
let apple;

// --------INITIALIZE GAME FIELD----------
const fieldSizeX = Math.floor(document.documentElement.clientWidth / 20) - 2;
const fieldSizeY = Math.floor(document.documentElement.clientHeight / 20) - 4;
const gameField = document.querySelector(".game_field");
gameField.style.width = `${fieldSizeX * 20}px`;
gameField.style.height = `${fieldSizeY * 20}px`;
// --------INITIALIZE GAME FIELD----------

const startPauseBtn = document.querySelector("#btnStart");
const snakeWrapper = gameField.querySelector(".snake_wrapper");
let scoreBlock = document.querySelector("#actualScore");

// --------NAVIGATION SECTION ----------
document.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "ArrowUp" : {
            if (currentStep !== "down") {
                nextStep = "up";
            }
            break;
        }
        case "ArrowDown" : {
            if (currentStep !== "up") {
                nextStep = "down";
            }
            break;
        }
        case "ArrowLeft" : {
            if (currentStep !== "right") {
                nextStep = "left";
            }
            break;
        }
        case "ArrowRight" : {
            if (currentStep !== "left") {
                nextStep = "right";
            }
            break;
        }
    }
});

let xDown = null;
let yDown = null;

const handleTouchStart = evt => {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

const handleTouchMove = evt => {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0 && currentStep !== "right") {
            nextStep = "left";
        } else if (xDiff < 0 && currentStep !== "left") {
            nextStep = "right";
        }
    } else {
        if (yDiff < 0 && currentStep !== "up") {
            nextStep = "down";
        } else if (yDiff > 0 && currentStep !== "down") {
            nextStep = "up";
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
// --------NAVIGATION SECTION END----------//

startPauseBtn.addEventListener("click", () => {
    if (endGame) {
        startGame();
        startPauseBtn.classList.add("paused")
    } else if (!endGame && !snakeSpeed) {
        snakeBody[snakeBody.length - 1][3].ontransitionend = () => launchSnake();
        launchSnake();
        startPauseBtn.classList.add("paused")
    } else {
        snakeBody[snakeBody.length - 1][3].ontransitionend = null;
        snakeSpeed = null;
        startPauseBtn.classList.remove("paused");
    }
});

const createApple = () => {
    apple = [0, 0, document.createElement("div")];
    apple[2].classList.add("apple");

    apple[0] = Math.floor(Math.random() * fieldSizeX);
    apple[1] = Math.floor(Math.random() * fieldSizeY);

    apple[2].style.left = `${apple[0] * 20}px`;
    apple[2].style.top = `${apple[1] * 20}px`;

    gameField.append(apple[2]);
};

const createSnake = () => {
    const snakeHead = document.createElement("div");
    snakeHead.classList.add("snake", "snake_head");
    snakeHead.ontransitionend = () => launchSnake();
    snakeHead.style.transform = `translateX(-25px)`;
    const snakeSegment = document.createElement("div");
    snakeSegment.classList.add("snake", "snake_segment");
    snakeSegment.style.transform = `translateX(-40px)`;
    snakeSegment.id = "s0";
    const snakeTail = document.createElement("div");
    snakeTail.classList.add("snake", "snake_tail");
    snakeTail.style.transform = `translateX(-60px)`;

    snakeBody = [[-3, 0, 0, snakeTail],
        [-2, 0, 0, snakeSegment],
        [-1, 0, 0, snakeHead]];

//---------ANIMATION SPEED --------------
    snakeBody.forEach((segment) => segment[3].style.transitionDuration = `${snakeSpeed}ms`);

    snakeWrapper.append(snakeTail);
    snakeWrapper.append(snakeSegment);
    snakeWrapper.append(snakeHead);
};

const eatApple = () => {
    let snakeSegment = snakeBody[0].slice();
    snakeSegment[3] = snakeBody[1][3].cloneNode(true);
    snakeSegment[3].classList = "snake snake_segment";
    snakeSegment[3].style.transform = `translateX(${snakeSegment[0] * 20}px) translateY(${snakeSegment[1] * 20}px) rotate(${snakeSegment[2]}deg)`;
    snakeSegment[3].id = `s${score}`;

    const snakeTail = snakeWrapper.querySelector(".snake_tail");
    snakeBody.splice(1, 0, snakeSegment);
    snakeWrapper.insertBefore(snakeSegment[3], snakeTail);

    apple[2].remove();
};

const posCheck = (step, coordinate) => {
    let snakeHead = snakeBody[snakeBody.length - 1];
    switch (coordinate) {
        case "Y" : {
            snakeBody.forEach((segment) => {
                //if Y coordinates match check X coordinates and return if it matches
                step === segment[1] && segment[0] === snakeHead[0] && gameOver();
            });
            if (step === apple[1] && snakeHead[0] === apple[0]) {
                eatApple();
                createApple();
                score++;
                scoreBlock.textContent = score;
                return step;
            } else if (step > fieldSizeY - 1) {
                gameOver();
                break;
            } else if (step < 0) {
                gameOver();
                break;
            } else {
                return step;
            }
        }
        case "X" : {
            snakeBody.forEach((segment) => {
                //if Y coordinates match check X coordinates and return if it matches
                step === segment[0] && segment[1] === snakeHead[1] && gameOver();
            });
            if (step === apple[0] && snakeHead[1] === apple[1]) {
                eatApple();
                createApple();
                score++;
                scoreBlock.textContent = score;
                return step;
            } else if (step > fieldSizeX - 1) {
                gameOver();
                break;
            } else if (step < 0) {
                gameOver();
                break;
            } else {
                return step;
            }
        }
        default:
            return step;
    }
};

const snakeMove = (posX, posY, rotation) => {
    snakeBody.forEach((segment, i) => {
        if (i === snakeBody.length - 1) {
            segment[0] = posX;
            segment[1] = posY;
            segment[2] = rotation;
        } else if (i < snakeBody.length - 1) {
            segment[0] = snakeBody[i + 1][0];
            segment[1] = snakeBody[i + 1][1];
            segment[2] = snakeBody[i + 1][2];
        }
        segment[3].style.transform = `translateX(${segment[0] * 20}px) translateY(${segment[1] * 20}px) rotate(${segment[2]}deg)`;
    });
};

const snakeStep = (direction, segment) => {
    let [posX, posY, rotation] = snakeBody[segment];

    switch (direction) {
        case "up" : {
            posY = posCheck(--posY, "Y");
            //if next steep === right turn +90 deg of current rotation else if next steep === left turn - 90 deg
            nextStep === "right" ? rotation += 90 : nextStep === "left" ? rotation -= 90 : null;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "down" : {
            posY = posCheck(++posY, "Y");
            nextStep === "right" ? rotation -= 90 : nextStep === "left" ? rotation += 90 : null;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "left" : {
            posX = posCheck(--posX, "X");
            nextStep === "down" ? rotation -= 90 : nextStep === "up" ? rotation += 90 : null;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "right" : {
            posX = posCheck(++posX, "X");
            nextStep === "down" ? rotation += 90 : nextStep === "up" ? rotation -= 90 : null;
            snakeMove(posX, posY, rotation);
            break;
        }
    }
};

const gameOver = () => {
    startPauseBtn.classList.remove("paused");
    endGame = true;
    snakeWrapper.innerHTML = null;
    apple[2].remove();
};

const launchSnake = () => {
    snakeSpeed = 250;
    snakeStep(currentStep, snakeBody.length - 1);
    currentStep = nextStep;
};

const startGame = () => {
    score = 0;
    endGame = false;
    nextStep = "right";
    currentStep = "right";
    createSnake();
    createApple();
    setTimeout(() => launchSnake(), snakeSpeed );
};

