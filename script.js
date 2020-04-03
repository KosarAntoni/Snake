let snakeSpeed = 250;
let autoMove;
let endGame = true;
let nextStep = "right";
let currentStep = "right";
let score = 0;

let snakeBody = [[0, 0, 0, document.querySelector(".snake_tail")],
    [1, 0, 0, document.querySelector("#s3")],
    [2, 0, 0, document.querySelector("#s2")],
    [3, 0, 0, document.querySelector("#s1")],
    [4, 0, 0, document.querySelector(".snake_head")]];

const scoreBox = document.querySelector("#actualScore");
const startPauseBtn = document.querySelector("#btnStart");
const fieldSizeX = Math.floor(document.documentElement.clientWidth / 20) - 2;
const fieldSizeY = Math.floor(document.documentElement.clientHeight / 20) - 4;
const gameField = document.querySelector(".game_field");

let apple = [0, 0, document.createElement("div")];
apple[2].classList = "apple";

//---------ANIMATION SPEED --------------
document.querySelectorAll(".snake").forEach((segment) => segment.style.transitionDuration = `${snakeSpeed}ms`);

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

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
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
}
// --------NAVIGATION SECTION END----------//

startPauseBtn.addEventListener("click", () => {
    if (!endGame) {
        endGame = false;
        launchSnake();
        startPauseBtn.classList.add("paused")
    } else {
        clearInterval(autoMove);
        startPauseBtn.classList.remove("paused");
        endGame = true;
    }
});

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const createField = () => {
    gameField.style.width = `${fieldSizeX * 20}px`;
    gameField.style.height = `${fieldSizeY * 20}px`;
};

const createApple = () => {
    apple[0] = getRandom(0, fieldSizeX);
    apple[1] = getRandom(0, fieldSizeY);

    apple[2].style.left = `${apple[0] * 20}px`;
    apple[2].style.top = `${apple[1] * 20}px`;

    gameField.append(apple[2]);
};

const eatApple = () => {
    if (snakeBody[snakeBody.length - 1][0] === apple[0] &&
        snakeBody[snakeBody.length - 1][1] === apple[1]) {
        createApple();
        score++;
        console.log("OMNOM", score);
    }
};

const posCheck = (step, fieldSize) => {
    if (step > fieldSize - 1) {
        return 0;
    } else if (step < 0) {
        return fieldSize - 1;
    } else {
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
            posY = posCheck(--posY, fieldSizeY);
            if (nextStep === "right") rotation += 90;
            if (nextStep === "left") rotation -= 90;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "down" : {
            posY = posCheck(++posY, fieldSizeY);
            if (nextStep === "right") rotation -= 90;
            if (nextStep === "left") rotation += 90;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "left" : {
            posX = posCheck(--posX, fieldSizeX);
            if (nextStep === "down") rotation -= 90;
            if (nextStep === "up") rotation += 90;
            snakeMove(posX, posY, rotation);
            break;
        }
        case "right" : {
            posX = posCheck(++posX, fieldSizeX);
            if (nextStep === "down") rotation += 90;
            if (nextStep === "up") rotation -= 90;
            snakeMove(posX, posY, rotation);
            break;
        }
    }
};

const launchSnake = () => {
    autoMove = setInterval(() => {
        snakeStep(currentStep, snakeBody.length - 1);
        currentStep = nextStep;
        eatApple();
        // console.log(snakeBody);
    }, snakeSpeed);
};

createField();
createApple();