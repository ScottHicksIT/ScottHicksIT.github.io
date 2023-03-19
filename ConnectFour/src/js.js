//Game Variables
let playerOneTurn = true;
let gameOver = false;
var playerOneCoords = new Array();
var playerTwoCoords = new Array();
var activeTokens = new Array();

//Coordinate Object
function coordinate(x, y) {
    this.x = x;
    this.y = y;
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
            playerOneCoords.push(new coordinate(parseInt(x), parseInt(y)));
            activeTokens.push(new coordinate(parseInt(x), parseInt(y)));
            document.getElementById("playerTurn").innerHTML = "Player Two's Turn";
            playerOneTurn = false;
        } else {
            document.getElementById(clicked_id).style.backgroundColor = "yellow";
            playerTwoCoords.push(new coordinate(parseInt(x), parseInt(y)));
            activeTokens.push(new coordinate(parseInt(x), parseInt(y)));
            document.getElementById("playerTurn").innerHTML = "Player One's Turn";
            playerOneTurn = true;
        }
    } else {
        incorrectToken(x,y);
    }
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

    //Add check if token has already been selected. 



    //Checks if a token is below
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
            elem.style.boxShadow = "0px 0px 30px 5px red";
        }
    } 
}

//This resets the token's box shadow once the player moves away from the token they are mousing over. 
function resetToken(hover_id){
    let text = hover_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    tokenID = x + "," + y;
    var elem = document.getElementById(tokenID); 
    elem.style.boxShadow = "0px 0px 0px 0px red";
}