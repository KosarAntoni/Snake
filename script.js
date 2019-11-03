let snake = [];
let crntDirection = "right";
let fieldSize = 20;

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function addApple() {
    let appleField = document.getElementById(`${getRandom(0, fieldSize)}_${getRandom(0, fieldSize)}`);
    appleField.classList.add("apple");
    return appleField;
}

function eatApple(pos) {
    console.log(pos);
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
        snake = [
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
    if (direction == "up" && crntDirection == "down") {
        return crntDirection;
    }
    if (direction == "down" && crntDirection == "up") {
        return crntDirection;
    }
    if (direction == "left" && crntDirection == "right") {
        return crntDirection;
    }
    if (direction == "right" && crntDirection == "left") {
        return crntDirection;
    }
    return direction;
}

function snakeMove(direction) {
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

    snake.unshift(snakeStep);
    if (eatApple(snakeStep) != "nomnom" ) {
        snake[snake.length - 1].classList.remove("snake");
        snake.pop();
    }  
    createSnake(snake)
}

let autoMove = setTimeout(function step() {
    snakeMove(crntDirection);
    autoMove = setTimeout(step, 300);
}, 300);

createField(fieldSize);
createSnake(snake)
addApple()

document.getElementById("btnUp").addEventListener("click", () => snakeMove("up") );
document.getElementById("btnDown").addEventListener("click", () => snakeMove("down") );
document.getElementById("btnLeft").addEventListener("click", () => snakeMove("left") );
document.getElementById("btnRight").addEventListener("click", () => snakeMove("right") );
