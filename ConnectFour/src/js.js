let playerOneTurn = true;
let gameOver = false;

function coordinate(x, y) {
    this.x = x;
    this.y = y;
}        

var playerOneCoords = new Array();
var playerTwoCoords = new Array();
var activeTokens = new Array();


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
    } else {
        // Shows when a token is incorrect and cannot be selected. 
        id = x + "," + y;
        console.log(id);
        // document.getElementById(id).style.boxShadow = "0px 0px 30px 5px red";
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

    //Check to see if the token is placed above another token
    //If token is placed on bottom row, it does not check. 
    if (y != 1){
        let tokenBelow = false;
        for (let i = 0; i < activeTokens.length; i++) {
            if (x == activeTokens[i].x && y-1 == (activeTokens[i].y)){
                console.log(x,y);
                tokenBelow = true;
            }
        }
        if (tokenBelow == false) {
            playable = false;
            console.log("No Token Was Found Below This Token");
        }
    } 
    return playable;
}
