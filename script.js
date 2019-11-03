let position = "0_0";
let snakeStep;
let fieldSize = 20;


function createField() {
    let gameField = document.querySelector(".game__field");
    
    for (let y = 0; y < fieldSize; y++) {

        let tmpIdFirst = y + "_";

        for (let x = 0; x < fieldSize; x++) {

            let tmpId = tmpIdFirst + x;

            let fieldBox = document.createElement("div");
            fieldBox.classList.add("square")
            fieldBox.setAttribute("id", tmpId);

            gameField.append(fieldBox);
        }
    }
}

createField();

let snake = [
    document.getElementById("3_3"),
    document.getElementById("3_2"),
    document.getElementById("3_1")
];

// function snakeMove(snakeDirection) {
//     if (snakeStep) clearTimeout(snakeStep);
//     let stepX = position.slice(-1);
//     let stepY = position.slice(0,1);

//     snakeStep = setTimeout(function move() {
//             let direction = stepY + "_" + stepX;

//             switch(snakeDirection) {
//                 case "left" : {
//                     stepX--;
//                     break;
//                 };
//                 case "right" : {
//                     stepX++;
//                     break;
//                 };
//                 case "up" : {
//                     stepY--;
//                     break;
//                 };
//                 case "down" : {
//                     stepY++;
//                     break;
//                 };
//             };

//             if (stepX > 7) {
//                 stepX = 0; 
//             };
//             if (stepX < 0) {
//                 stepX = 7; 
//             };
//             if (stepY > 7) {
//                 stepY = 0; 
//             };
//             if (stepY < 0) {
//                 stepY = 7; 
//             };

//             removeSquare(position);
//             position = direction;
//             addSquare(direction);
//             snakeStep = setTimeout(move, 500);
//         });
// }
// function addSquare(id) {
//     let tmpBox = document.getElementById(id);
//     tmpBox.classList.add("snake");
// }

// function removeSquare(id) {
//     let tmpBox = document.getElementById(id);
//     tmpBox.classList.remove("snake");
// }

function createSnake(snake) {
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
    let crntHeadPos = snake[0].id.split("_");
    let posY = crntHeadPos[0];
    let posX = crntHeadPos[1];

    switch(direction) {
        case "up" : {
            snake.unshift( document.getElementById(`${posCheck(--posY)}_${posX}`) );
            break;
        }
        case "down" : {
            snake.unshift( document.getElementById(`${posCheck(++posY)}_${posX}`) );
            break;
        }
        case "left" : {
            snake.unshift( document.getElementById(`${posY}_${posCheck(--posX)}`) );
            break;
        }
        case "right" : {
            snake.unshift( document.getElementById(`${posY}_${posCheck(++posX)}`) );
            break;
        }
    }

    snake[snake.length - 1].classList.remove("snake");
    snake.pop();

    createSnake(snake)
}



document.getElementById("btnUp").addEventListener("click", () => snakeMove("up") );
document.getElementById("btnDown").addEventListener("click", () => snakeMove("down") );
document.getElementById("btnLeft").addEventListener("click", () => snakeMove("left") );
document.getElementById("btnRight").addEventListener("click", () => snakeMove("right") );

createSnake(snake)
