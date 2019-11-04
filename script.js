let snake = [];
let autoMove;
let endGame = false;
let lastDirection;
let crntDirection = "right";
let fieldSize = 20;

document.getElementById("btnUp").addEventListener("click", function() {
    lastDirection = crntDirection;
    crntDirection = "up";
});
document.getElementById("btnDown").addEventListener("click", function() {
    lastDirection = crntDirection;
    crntDirection = "down";
});
document.getElementById("btnLeft").addEventListener("click", function() {
    lastDirection = crntDirection;
    crntDirection = "left";
});
document.getElementById("btnRight").addEventListener("click", function() {
    lastDirection = crntDirection;
    crntDirection = "right";
});
document.getElementById("btnStop").addEventListener("click", function() {
    clearTimeout(autoMove);
});
document.getElementById("btnStart").addEventListener("click", function() {
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
    return autoMove = setInterval(function step() {
        snakeMove(crntDirection);
    }, 300);
}

function eatItself(pos) {
    if (pos.classList.contains("snake")) {  
        clearInterval(autoMove);   
        autoMove = null;  
        for(let part of snake) {
            part.classList.remove("snake");
        }
        endGame = true;
        snake = [];
    }    
}

function addApple() {
    let appleField = document.getElementById(`${getRandom(0, fieldSize)}_${getRandom(0, fieldSize)}`);
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

function createField(fieldSize) {
    let gameField = document.querySelector(".game__field");
    
    for (let y = 0; y < fieldSize; y++) {

        let tmpId = y + "_";

        for (let x = 0; x < fieldSize; x++) {

            let id = tmpId + x;

            let fieldBox = document.createElement("div");
            fieldBox.classList.add("square")
            fieldBox.setAttribute("id", id);

            gameField.append(fieldBox);
        }
    }
}

function createSnake() {
    if (snake.length == 0) {
        lastDirection = null;
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
}

function posCheck(step) {
    if (step > fieldSize - 1) {
        return 0; 
    } else if (step < 0) {
        return fieldSize - 1; 
    } else {
        return step;
    }
}

function checkDirection(direction) {
    if (lastDirection == "up" && crntDirection == "down") {
        return lastDirection;
    }
    if (lastDirection == "down" && crntDirection == "up") {
        return lastDirection;
    }
    if (lastDirection == "left" && crntDirection == "right") {
        return lastDirection;
    }
    if (lastDirection == "right" && crntDirection == "left") {
        return lastDirection;
    }
    return direction;
}

function snakeMove(direction) {
    console.log("Hssss");
    console.log(endGame);

    if (snake.length == 0) createSnake();

    let crntHeadPos = snake[0].id.split("_");
    let posY = crntHeadPos[0];
    let posX = crntHeadPos[1];
    let snakeStep;

    direction = checkDirection(direction);

    switch(direction) {
        case "up" : {
            crntDirection = "up";
            snakeStep = document.getElementById(`${posCheck(--posY)}_${posX}`);
            break;
        }
        case "down" : {
            crntDirection = "down";
            snakeStep = document.getElementById(`${posCheck(++posY)}_${posX}`);
            break;
        }
        case "left" : {
            crntDirection = "left";
            snakeStep = document.getElementById(`${posY}_${posCheck(--posX)}`);
            break;
        }
        case "right" : {
            crntDirection = "right";
            snakeStep = document.getElementById(`${posY}_${posCheck(++posX)}`);
            break;
        }
    }
    eatItself(snakeStep);
    
    if (endGame == true) return;

    if (eatApple(snakeStep) != "nomnom" ) {
        snake[snake.length - 1].classList.remove("snake");
        snake.pop();
    }  

    snake.unshift(snakeStep);

    if (!endGame) createSnake()
}

createField(fieldSize);
addApple()