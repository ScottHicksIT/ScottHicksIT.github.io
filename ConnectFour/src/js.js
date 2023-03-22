//Game Variables
let playerOneTurn = true;
let gameOver = false;
var playerOneCoords = new Array();
var playerTwoCoords = new Array();
var activeTokens = new Array();

//Token Object
class Token {
    constructor(x,y,owner){
        this.x = x;
        this.y = y;
        this.owner = owner;
    }

    getCoordinates() {
        return this.x + "," + this.y;
    }
}



//This runs if a player selects a token. 
function updateToken(clicked_id){
    //Recieves the text coordinate and creates it as array with two elements
    let text = clicked_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]

    if (checkIfPlayAbleToken(x,y) == true) {
        if (playerOneTurn == true){
            document.getElementById(clicked_id).style.backgroundColor = "red";
            playerOneCoords.push(new Token(parseInt(x), parseInt(y), "PLayerOne"));
            activeTokens.push(new Token(parseInt(x), parseInt(y), "PLayerOne"));
            document.getElementById("playerTurn").innerHTML = "Player Two's Turn";   
            playerOneTurn = false;
        } else {
            document.getElementById(clicked_id).style.backgroundColor = "yellow";
            playerTwoCoords.push(new Token(parseInt(x), parseInt(y), "PLayerTwo"));
            activeTokens.push(new Token(parseInt(x), parseInt(y), "PLayerTwo"));
            document.getElementById("playerTurn").innerHTML = "Player One's Turn";
            playerOneTurn = true;
        }
    } 
    checkWinner();
}

//Once token has been selected, this checks if the token has already been played or if there is a token below the selected token. 
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
                
                tokenBelow = true;
            }
        }
        if (tokenBelow == false) {
            playable = false;
          
        }
    } 
    return playable;
}


//This is ran before the player has clicked a token. 
//If the token does not have a token below it, the token box shadow turns red. 
function checkToken(hover_id){
    //Check to see if the token is placed above another token
    //If token is placed on bottom row, it does not check.
    let text = hover_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    tokenID = x + "," + y;
    var elem = document.getElementById(tokenID); 

    //Checks if a token is below
    if (y != 1){
        let tokenBelow = false;
        for (let i = 0; i < activeTokens.length; i++) {
            if (x == activeTokens[i].x && y-1 == (activeTokens[i].y)){
                tokenBelow = true;
            }
        }
        if (tokenBelow == false) {
            playable = false;
            elem.style.boxShadow = "0px 0px 30px 5px red";
        }
    } 
}

//Resets the token's box shadow once the player moves away from the token they are mousing over. 
function resetToken(hover_id){
    let text = hover_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    tokenID = x + "," + y;
    var elem = document.getElementById(tokenID); 
    elem.style.boxShadow = "0px 0px 0px 0px red";
}

//Check who has won
function checkWinner(){
    let localCoord = playerOneCoords;
    let count = 0;
    let yValues = new Array(); 
    let xValues = new Array();
   
    //check's PlayerOne's tokens for vertical connects
   for (let i = 1; i < 8; i++) {
    count = 0;
    for (let j = 0; j < playerOneCoords.length; j++){
        if (playerOneCoords[j].x == i){
            count++;
        }
    }

    if (count == 4){
        alert("Player One has 4 tokens in column " + i);
        bool = false;
        // alert(yValues);
        for (let k = 0; k < yValues.length -1;k++){
            if (yValues[k] == yValues[k+1] -1) {
                bool = true;
                alert ("true");
            } else {
                bool = false;
                alert ("false");
            }
        }
    } 
   }
}