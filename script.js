let snake = [];
let autoMove;
let endGame = false;
let tmpDirection = "right";
let crntDirection = "right";
let fieldSize = 20;

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

document.getElementById("btnUp").addEventListener("click", function() {
    if (crntDirection != "down") {
        crntDirection = "up";
    }
});
document.getElementById("btnDown").addEventListener("click", function() {
    if (crntDirection != "up") {
        crntDirection = "down";
    }
});
document.getElementById("btnLeft").addEventListener("click", function() {
    if (crntDirection != "right") {
        crntDirection = "left";
    }
});
document.getElementById("btnRight").addEventListener("click", function() {
    if (crntDirection != "left") {
        crntDirection = "right";
    }
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
            part.classList.remove("snake");
        }
        endGame = true;
        snake = [];
    }    
}

function addApple() {
    let appleField = document.getElementById(`${getRandom(0, fieldSize)}_${getRandom(0, fieldSize)}`);
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

function snakeMove(direction) {
    if (snake.length == 0) createSnake();

    let crntHeadPos = snake[0].id.split("_");
    let posY = crntHeadPos[0];
    let posX = crntHeadPos[1];
    let snakeStep;

    switch(direction) {
        case "up" : {
            snakeStep = document.getElementById(`${posCheck(--posY)}_${posX}`);
            break;
        }
        case "down" : {
            snakeStep = document.getElementById(`${posCheck(++posY)}_${posX}`);
            break;
        }
        case "left" : {
            snakeStep = document.getElementById(`${posY}_${posCheck(--posX)}`);
            break;
        }
        case "right" : {
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