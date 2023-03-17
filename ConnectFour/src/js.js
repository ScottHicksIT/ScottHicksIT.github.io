let playerOneTurn = true;
let gameOver = false;

function coordinate(x, y) {
    this.x = x;
    this.y = y;
}        

var playerOneCoords = new Array();
var playerTwoCoords = new Array();

playerOneCoords.push(new coordinate(10, 0));
playerOneCoords.push(new coordinate(1, 0));
playerOneCoords.push(new coordinate(12, 7));

console.log(playerOneCoords);



function changeStatus(clicked_id){
    let text = clicked_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    if (playerOneTurn == true){
        document.getElementById(clicked_id).style.backgroundColor = "red";
        playerOneCoords.push(new coordinate(parseInt(x), parseInt(y)));
        playerOneTurn = false;
    } else {
        document.getElementById(clicked_id).style.backgroundColor = "yellow";
        playerTwoCoords.push(new coordinate(parseInt(x), parseInt(y)));
        playerOneTurn = true;
    }
}


function updateToken(clicked_id){
    //Check players turn
    if (playerOneTurn == true){
        document.getElementById("playerTurn").innerHTML = "Player Two's Turn";
    } else {
        document.getElementById("playerTurn").innerHTML = "PLayer One's Turn";
    }
    changeStatus(clicked_id);
    
}

