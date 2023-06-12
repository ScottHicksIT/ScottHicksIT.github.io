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
    getYCoord() {
        return this.y;
    }
    getXCoord() {
        return this.x;
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
    let count = 0;
    let tokenObjectPos = new Array();
    
    //Check Vertical
    //Number of of Columns (0 to 7)
    for (let i = 1; i < 7; i++) {
        
        count = 0;
        tokenObjectPos = [];
        for (let j = 0; j < playerOneCoords.length; j++){ 
            if (playerOneCoords[j].x == i){
                let currentIndex = j;
                tokenObjectPos.push(currentIndex);
                count++;
            }
        }
        if (count >= 4){
            checkIfVertical(tokenObjectPos, "Player1");
        }
        
        //Check Vertical
        count = 0;
        tokenObjectPos = [];

        for (let j = 0; j < playerTwoCoords.length; j++){ 
            if (playerTwoCoords[j].x == i){
                let currentIndex = j;
                tokenObjectPos.push(currentIndex);
                count++;
            }
        }
        if (count >= 4){
            checkIfVertical(tokenObjectPos, "Player2");
        }  
    }  

    //Check Horizontal Connects
    for (let i=1; i < 6; i++){
        count = 0;
        tokenObjectPos = [];
        for (let j = 0; j < playerOneCoords.length; j++){ 
            if (playerOneCoords[j].y == i){
                let currentIndex = playerOneCoords[j];
                tokenObjectPos.push(currentIndex);
                count++;
            }
        } 
    
        if (count >= 4) {
             for (let n = 0; n < tokenObjectPos.length; n++){
                console.log(tokenObjectPos[n].getCoordinates());
             }
             checkIfHorizontal(tokenObjectPos, "Player1");
           
        }
    }

    for (let i=1; i < 6; i++){
        count = 0;
        tokenObjectPos = [];
        for (let j = 0; j < playerTwoCoords.length; j++){ 
            if (playerTwoCoords[j].y == i){
                let currentIndex = playerTwoCoords[j];
                tokenObjectPos.push(currentIndex);
                count++;
            }
        } 
    
        if (count >= 4) {
             for (let n = 0; n < tokenObjectPos.length; n++){
                console.log(tokenObjectPos[n].getCoordinates());
             }
             checkIfHorizontal(tokenObjectPos, "Player2");
           
        }
    }
}   

function checkIfVertical(tokenIndexs, player){
    let sequentialOrder = true;
    let firstToken;
    let secondToken;
    let thirdToken;
    let fourthToken;
 
    for (let i = 0; i < tokenIndexs.length; i++){
        if (player == "Player1"){
            alert("Player1");
            firstToken = playerOneCoords[tokenIndexs[i]];
            secondToken = playerOneCoords[tokenIndexs[i+1]];
            thirdToken = playerOneCoords[tokenIndexs[i+2]];
            fourthToken = playerOneCoords[tokenIndexs[i+3]];
        } else if (player == "Player2") {
            alert("Player2");
            firstToken = playerTwoCoords[tokenIndexs[i]];
            secondToken = playerTwoCoords[tokenIndexs[i+1]];
            thirdToken = playerTwoCoords[tokenIndexs[i+2]];
            fourthToken = playerTwoCoords[tokenIndexs[i+3]];
        }

        //Check if tokens are in order vertically
        if (secondToken.getYCoord() == firstToken.getYCoord() + 1 ){
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }
        if (thirdToken.getYCoord() == firstToken.getYCoord() + 2 ){
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }
        if (fourthToken.getYCoord() == firstToken.getYCoord() + 3 ){
            sequentialOrder = true; 
        } else {
            sequentialOrder = false;
        }

        if(sequentialOrder == true){
            alert("The tokens are in order!!!");
            let tokenID;
            for (k = i; k < tokenIndexs.length; k++){
            if (player == "Player1"){
                tokenID = playerOneCoords[tokenIndexs[k]].getCoordinates();
            } else if (player == "Player2") {
                tokenID = playerTwoCoords[tokenIndexs[k]].getCoordinates();
            }
            var elem = document.getElementById(tokenID); 
            elem.style.boxShadow = "0px 0px 30px 5px white";
            }  
            alert("Game is over")
            break;
        }
    }
}

function checkIfHorizontal(tokenIndexs, player) {
    let sequentialOrder = true;

    let firstToken;
    let secondToken;
    let thirdToken;
    let fourthToken;

    for (let i = 0; i < tokenIndexs.length; i++){
        //Order Tokens by X Value
        tokenIndexs.sort(function(a, b){return a.x - b.x});
        firstToken = tokenIndexs[i];
        secondToken = tokenIndexs[i+1];
        thirdToken = tokenIndexs[i+2];
        fourthToken = tokenIndexs[i+3];

        let selectedTokens = new Array;
        selectedTokens = [];
        selectedTokens.push(firstToken);
        selectedTokens.push(secondToken);
        selectedTokens.push(thirdToken)
        selectedTokens.push(fourthToken)
        
        if (secondToken.getXCoord() == firstToken.getXCoord() + 1 ){
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }
        if (thirdToken.getXCoord == firstToken.getXCoord + 2 ){
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }

        if (fourthToken.getXCoord() == firstToken.getXCoord() + 3 ){
            sequentialOrder = true; 
        } else {
            sequentialOrder = false;
        }

        if(sequentialOrder == true){
            alert("The tokens are in order!!!");
            let tokenID;
            for (k = 0; k < selectedTokens.length; k++){
                tokenID = selectedTokens[k].getCoordinates();
                var elem = document.getElementById(tokenID); 
                elem.style.boxShadow = "0px 0px 30px 5px white";
            }  

            if (player == "Player 1"){
                alert("Game is over. Player 1 wins!");
            } else {
                alert("Game is over. Player 2 wins!");
            }
            
        }
    }
}