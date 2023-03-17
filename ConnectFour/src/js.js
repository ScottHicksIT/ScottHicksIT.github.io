let playerOneTurn = true;
let gameOver = false;

function coordinate(x, y) {
    this.x = x;
    this.y = y;
}        

var playerOneCoords = new Array();
var playerTwoCoords = new Array();
var activeTokens = new Array();

playerOneCoords.push(new coordinate(10, 0));
playerOneCoords.push(new coordinate(1, 0));
playerOneCoords.push(new coordinate(12, 7));

console.log(playerOneCoords);


//This is now redundant. To be deleted. 
function updateToken(clicked_id){
    //Check players turn
    if (playerOneTurn == true){
    } else {
    }
    changeStatus(clicked_id); 
}




function changeStatus(clicked_id){
    //Recieves the text coordinate and creates it as array with two elements
    let text = clicked_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]

    if (checkIfPlayAbleToken(x,y) == true) {
        if (playerOneTurn == true){
            document.getElementById(clicked_id).style.backgroundColor = "red";
            playerOneCoords.push(new coordinate(parseInt(x), parseInt(y)));
            activeTokens.push(new coordinate(parseInt(x), parseInt(y)));
            document.getElementById("playerTurn").innerHTML = "Player Two's Turn";
            playerOneTurn = false;
        } else {
            document.getElementById(clicked_id).style.backgroundColor = "yellow";
            playerTwoCoords.push(new coordinate(parseInt(x), parseInt(y)));
            activeTokens.push(new coordinate(parseInt(x), parseInt(y)));
            document.getElementById("playerTurn").innerHTML = "PLayer One's Turn";
            playerOneTurn = true;
        }
    } 
}

function checkIfPlayAbleToken(x,y) {
    //Check if token has already been played
    let playable = true;
    for (let i = 0; i < activeTokens.length; i++) {
        //Check if token is currently already active. 
        if (x == activeTokens[i].x && y == activeTokens[i].y) {
            // alert("This token has alread been selected");
            playable = false;
        } 
    }

    
    //Check if token is stacked on another token
    // for (let i = 0; i < activeTokens.length; i++) {
    //     console.log("x=" + x);
    //     console.log("y=" + y);
    //     console.log("y-1 =" + (y-1));

    //     if (x == activeTokens[i].x && y == (activeTokens[i].y + 1)) {
            
    //     } else {
    //         alert("Token must be placed above another token!")
    //         playable = false;
    //         break;  
    //     }
    // }

    return playable;
}
