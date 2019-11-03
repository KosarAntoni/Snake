let position = "0_0";

let snakeStep;
let fieldWidth = 8;
let fieldHeight = 8;

function createField() {
    let gameField = document.querySelector(".game__field");
    
    for (let y = 0; y < fieldHeight; y++) {

        let tmpIdFirst = y + "_";

        for (let x = 0; x < fieldWidth; x++) {

            let tmpId = tmpIdFirst + x;

            let fieldBox = document.createElement("div");
            fieldBox.classList.add("square")
            fieldBox.setAttribute("id", tmpId);

            gameField.append(fieldBox);
        }
    }
}

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
}

function addSquare(id) {
    let tmpBox = document.getElementById(id);
    tmpBox.classList.add("snake");
}

function removeSquare(id) {
    let tmpBox = document.getElementById(id);
    tmpBox.classList.remove("snake");
}

document.getElementById("btnUp").addEventListener("click", () => snakeMove("up") );
document.getElementById("btnDown").addEventListener("click", () => snakeMove("down") );
document.getElementById("btnLeft").addEventListener("click", () => snakeMove("left") );
document.getElementById("btnRight").addEventListener("click", () => snakeMove("right") );

createField();
let snake = [
    document.getElementById("3_2"),
    document.getElementById("3_1"),
    document.getElementById("3_0")
];
let [snakeHead, ...snakeBody] = snake;
console.log(snake);
createSnake(snake);


