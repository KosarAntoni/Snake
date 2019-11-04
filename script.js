<<<<<<< HEAD
let position = "0_0";

let snakeStep;
let fieldWidth = 8;
let fieldHeight = 8;
=======
let snake = [];
let autoMove;
let endGame = false;
let crntDirection = "right";
let fieldSize = 20;

document.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "ArrowUp" : {
            if (crntDirection != "down") {
                crntDirection = "up";
            }
            break;
        };
        case "ArrowDown" : {
            if (crntDirection != "up") {
                crntDirection = "down";
            }
            break;
        };
        case "ArrowLeft" : {
            if (crntDirection != "right") {
                crntDirection = "left";
            }
            break;
        };
        case "ArrowRight" : {
            if (crntDirection != "left") {
                crntDirection = "right";
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
>>>>>>> master

function launchSnake() {
    autoMove = setInterval(function step() {
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
    
<<<<<<< HEAD
    for (let y = 0; y < fieldHeight; y++) {
=======
    for (let y = 0; y < fieldSize; y++) {
>>>>>>> master

        let tmpId = y + "_";

<<<<<<< HEAD
        for (let x = 0; x < fieldWidth; x++) {
=======
        for (let x = 0; x < fieldSize; x++) {
>>>>>>> master

            let id = tmpId + x;

            let fieldBox = document.createElement("div");
            fieldBox.classList.add("square")
            fieldBox.setAttribute("id", id);

            gameField.append(fieldBox);
        }
    }
}

<<<<<<< HEAD
function snakeMove(snakeDirection) {
    if (snakeStep) clearTimeout(snakeStep);
    let stepX = snake[0].id.slice(-1);
    let stepY = snake[0].id.slice(0,1);

    snakeStep = setTimeout(function move() {
            let direction = stepY + "_" + stepX;

            switch(snakeDirection) {
                case "left" : {
                    stepX--;
                    break;
                };
                case "right" : {
                    stepX++;
                    break;
                };
                case "up" : {
                    stepY--;
                    break;
                };
                case "down" : {
                    stepY++;
                    break;
                };
            };

            if (stepX > fieldWidth - 1) {
                stepX = 0; 
            };
            if (stepX < 0) {
                stepX = fieldWidth - 1; 
            };
            if (stepY > fieldHeight - 1) {
                stepY = 0; 
            };
            if (stepY < 0) {
                stepY = fieldHeight - 1; 
            };
            removeSquare(snake[snake.length - 1].id);
            // for(let i = 1; i < snake.length; i++) {
            //     snake[i] = snake[]
            // }
            snake[snake.length - 1] = snake[1];
            snake[1] = snake[0];
            snake[0] = document.getElementById(direction);
            addSquare(direction);
            snakeStep = setTimeout(move, 300);
        });
}

function createSnake(width) {
    for (let bodyPart of width) {
        console.log(bodyPart);
        bodyPart.classList.toggle("snake");        
    };
=======
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
>>>>>>> master
}

function snakeMove(direction) {
    if (snake.length == 0) createSnake();
    let tmpDirection = direction.slice(0);

    let crntHeadPos = snake[0].id.split("_");
    let posY = crntHeadPos[0];
    let posX = crntHeadPos[1];
    let snakeStep;

    switch(tmpDirection) {
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

<<<<<<< HEAD
createField();
let snake = [
    document.getElementById("3_2"),
    document.getElementById("3_1"),
    document.getElementById("3_0")
];
let [snakeHead, ...snakeBody] = snake;
console.log(snake);
createSnake(snake);
=======
    snake.unshift(snakeStep);
>>>>>>> master

    if (!endGame) createSnake()
}

createField(fieldSize);
addApple()