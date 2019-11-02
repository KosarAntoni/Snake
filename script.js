let position = "0_0";
let snakeStep;

function createField() {
    let gameField = document.querySelector(".game__field");
    
    for (let y = 0; y < 8; y++) {

        let tmpIdFirst = y + "_";

        for (let x = 0; x < 8; x++) {

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
    let stepX = position.slice(-1);
    let stepY = position.slice(0,1);

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

            if (stepX > 7) {
                stepX = 0; 
            };
            if (stepX < 0) {
                stepX = 7; 
            };
            if (stepY > 7) {
                stepY = 0; 
            };
            if (stepY < 0) {
                stepY = 7; 
            };

            removeSquare(position);
            position = direction;
            addSquare(direction);
            snakeStep = setTimeout(move, 500);
        });
}

function createSnake(width) {
    for (let w = 0; w < width; w++) {
        let tmpBox = document.getElementById(`3_${w}`)
        if (w == width - 1) {
            tmpBox.classList.toggle("snake__head");
        } else {
            tmpBox.classList.toggle("snake");
        }        
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


