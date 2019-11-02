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
    tmpBox.classList.toggle("snake");
}

function btnListener() {
    let up = document.getElementById("btnUp");
    up.addEventListener("click", addSquare(id))
}



createField();
createSnake(5);

