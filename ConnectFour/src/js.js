//Game Variables
let playerOneTurn = true;
let gameOver = false;

//Token Object
class Token {
    constructor(x, y, owner) {
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

class Board {
    constructor(h, w) {
        this.height = h;
        this.width = w;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.empty = true;
        this.player = null;
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

    setPlayer(player) {
        this.player = player;
    }
    getPlayer() {
        return this.player;
    }
    getPosDiagonal() {
        let x1 = this.x + 1;
        let y1 = this.y + 1;
        let diagonal = x1 + "," + y1;
        return diagonal;
    }
    getNegDiagonal() {
        let x1 = this.x - 1;
        let y1 = this.y + 1;
        let diagonal = x1 + "," + y1;
        return diagonal;
    }
}

function play() {
    document.getElementById("startMenu").style.display = "none";
    const tokenCollection = document.getElementsByClassName("token");
    for (let i = 0; i < tokenCollection.length; i++) {
        //tokenCollection[i].style.backgroundColor = "black";
        tokenCollection[i].style.display = "block";
    }
    document.getElementById("playerTurn").style.display = "block";
}

//Used to get index number based of x and y 
function getIndexNumber(x, y) {
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].getXCoord() == x && positions[i].getYCoord() == y) {
            return i;
        }
    }
}

//Used to get index number based of coordinates
function getIndexNumberCoord(a) {
    let coordArrary = a.split(",");
    let x = coordArrary[0];
    let y = coordArrary[1];
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].getXCoord() == x && positions[i].getYCoord() == y) {
            return i;
        }
    }
}

b = new Board(6, 7);
let positions = new Array;
function createBoard(){
    positions = [];
    //Create Positions 
    for (let i = 1; i <= b.getHeight(); i++) {
        for (let j = 1; j <= b.getWidth(); j++) {
            a = new Position(j, i);
            //alert(i + "," + j);
            positions.push(a);
        }
    }
}
createBoard();

//This runs if a player selects a token. 
function updateToken(clicked_id) {
    //Recieves the text coordinate and creates it as array with two elements
    let text = clicked_id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]

    if (checkIfPlayAbleToken(x, y) == true) {
        if (playerOneTurn == true) {
            document.getElementById(clicked_id).style.backgroundColor = "red";
            document.getElementById("playerTurn").innerHTML = "Player Two's Turn";

            //Position Object
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].getXCoord() == x && positions[i].getYCoord() == y) {
                    positions[i].setPlayer("Player 1");
                }
            }

            playerOneTurn = false;
        } else {
            document.getElementById(clicked_id).style.backgroundColor = "yellow";
            document.getElementById("playerTurn").innerHTML = "Player One's Turn";
            playerOneTurn = true;

            //Position Object
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].getXCoord() == x && positions[i].getYCoord() == y) {
                    positions[i].setPlayer("Player 2");
                }
            }
        }
    }
    checkWinner(x, y);
}

//Once token has been selected, this checks if the token has already been played or if there is a token below the selected token. 
function checkIfPlayAbleToken(x, y) {
    //Check if token has already been played
    let playable = true;

    if (positions[(getIndexNumber(x, y))].getPlayer() != null) {
        //alert("Position Invalid");
        playable = false;
    }

    //Check to see if the token is placed above another token
    //If token is placed on bottom row, it does not check. 

    if (y != 1) {
        let tokenBelow = false;
        for (let i = 0; i < positions.length; i++) {
            if ((x == positions[i].x && y - 1 == (positions[i].y) && positions[i].getPlayer() != null)) {
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
function checkToken(id) {
    //Check to see if the token is placed above another token
    //If token is placed on bottom row, it does not check.
    let text = id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    tokenID = x + "," + y;
    var elem = document.getElementById(tokenID);

    //Checks if a token is below
    if (y != 1) {
        let tokenBelow = false;
        for (let i = 0; i < positions.length; i++) {
            if ((x == positions[i].x && y - 1 == (positions[i].y) && positions[i].getPlayer() != null)) {
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
function resetToken(id) {
    let text = id;
    let coordArrary = text.split(",")
    let x = coordArrary[0]
    let y = coordArrary[1]
    tokenID = x + "," + y;
    var elem = document.getElementById(tokenID);
    elem.style.boxShadow = "0px 0px 0px 0px red";
}

//Check who has won
function checkWinner(x, y) {
    let count = 0;
    let tokenObjectPos = new Array();
    let positionIDs = new Array();
    let positionObjs = new Array();

    //Check Vertical Player 1
    //Number of of Columns (0 to 7)
    for (let i = 1; i < 7; i++) {
        count = 0;
        positionIDs = [];
        for (let j = 0; j < positions.length; j++) {
            if (positions[j].x == i && positions[j].getPlayer() == "Player 1") {
                let currentIndex = j;
                positionIDs.push(currentIndex);
                count++;
            }
        }
        if (count >= 4) {
            checkIfVertical(positionIDs, "Player 1");
        }

        //Check Vertical Player 2
        count = 0;
        positionIDs = [];
        for (let j = 0; j < positions.length; j++) {
            if (positions[j].x == i && positions[j].getPlayer() == "Player 2") {
                let currentIndex = j;
                positionIDs.push(currentIndex);
                count++;
            }
        }
        if (count >= 4) {
            checkIfVertical(positionIDs, "Player 2");
        }
    }

    //Check Horizontal Connects for Player 1
    for (let i = 1; i < 6; i++) {
        count = 0;
        positionIDs = [];
        positionObjs = [];
        for (let j = 0; j < positions.length; j++) {
            if (positions[j].y == i && positions[j].getPlayer() == "Player 1") {
                positionIDs.push(j);
                positionObjs.push(positions[j]);
                count++;
            }
        }

        if (count >= 4) {
            checkIfHorizontal(positionIDs, "Player 1", positionObjs);
        }
    }
    //Check Horizontal Connects for Player 2
    for (let i = 1; i < 6; i++) {
        count = 0;
        positionIDs = [];
        positionObjs = [];
        for (let j = 0; j < positions.length; j++) {
            if (positions[j].y == i && positions[j].getPlayer() == "Player 2") {
                positionIDs.push(j);
                positionObjs.push(positions[j]);
                count++;
            }
        }

        if (count >= 4) {
            checkIfHorizontal(positionIDs, "Player 2", positionObjs);
        }
    }

    //Check Positive Diagonal Connection
    for (let i = 0; i < 42; i++) {
        let player = null;
        let tokenIndex = null;
        let diagonalTokenIndex = null;
        let diagonalPlayer = null;

        let tokenIndexs = new Array();
        tokenIndex = i;

        tokenIndexs.push(i);
        player = positions[i].getPlayer();
        diagonalTokenIndex = getIndexNumberCoord(positions[i].getPosDiagonal());
        try {
            diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
        } catch (error) {
            console.log(".")
        }

        //Check First Diagonal Connection 
        if (player != null && player == diagonalPlayer) {
            tokenIndex = diagonalTokenIndex;
            player = positions[diagonalTokenIndex].getPlayer();
            diagonalTokenIndex = getIndexNumberCoord(positions[tokenIndex].getPosDiagonal());
            diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
            tokenIndexs.push(tokenIndex);


            //Check Second Diagonal Connection 
            if (player != null && player == diagonalPlayer) {
                tokenIndex = diagonalTokenIndex;
                player = positions[diagonalTokenIndex].getPlayer();
                diagonalTokenIndex = getIndexNumberCoord(positions[tokenIndex].getPosDiagonal());
                diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
                tokenIndexs.push(diagonalTokenIndex);


                //Check Third Diagonal Connection
                if (player != null && player == diagonalPlayer) {
                    tokenIndexs.push(tokenIndex);
                    gameOverPhase(player, tokenIndexs);
                }
            }
        }
    }

    //Check Negative Diagonal Connection
    for (let i = 0; i < 42; i++) {
        let player = null;
        let tokenIndex = null;
        let diagonalTokenIndex = null;
        let diagonalPlayer = null;

        let tokenIndexs = new Array();
        tokenIndex = i;

        tokenIndexs.push(i);
        player = positions[i].getPlayer();
        diagonalTokenIndex = getIndexNumberCoord(positions[i].getNegDiagonal());
        try {
            diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
        } catch (error) {
            console.error(error);
        }

        //Check First Diagonal Connection 
        if (player != null && player == diagonalPlayer) {
            tokenIndex = diagonalTokenIndex;
            player = positions[diagonalTokenIndex].getPlayer();
            diagonalTokenIndex = getIndexNumberCoord(positions[tokenIndex].getNegDiagonal());
            diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
            tokenIndexs.push(tokenIndex);

            //Check Second Diagonal Connection 
            if (player != null && player == diagonalPlayer) {
                tokenIndex = diagonalTokenIndex;
                player = positions[diagonalTokenIndex].getPlayer();

                diagonalTokenIndex = getIndexNumberCoord(positions[tokenIndex].getNegDiagonal());
                diagonalPlayer = positions[diagonalTokenIndex].getPlayer();
                tokenIndexs.push(diagonalTokenIndex);

                //Check Third Diagonal Connection
                if (player != null && player == diagonalPlayer) {
                    tokenIndexs.push(tokenIndex);
                    gameOverPhase(player, tokenIndexs);
                }
            }
        }
    }

}

function checkIfVertical(positionIDs, player) {
    let sequentialOrder = true;
    let firstToken;
    let secondToken;
    let thirdToken;
    let fourthToken;

    for (let i = 0; i < positionIDs.length; i++) {
        if (player == "Player 1") {
            firstToken = positions[positionIDs[i]];
            secondToken = positions[positionIDs[i + 1]];
            thirdToken = positions[positionIDs[i + 2]];
            fourthToken = positions[positionIDs[i + 3]];
        } else if (player == "Player 2") {
            firstToken = positions[positionIDs[i]];
            secondToken = positions[positionIDs[i + 1]];
            thirdToken = positions[positionIDs[i + 2]];
            fourthToken = positions[positionIDs[i + 3]];
        }

        //Check if tokens are in order vertically
        if (secondToken.getYCoord() == firstToken.getYCoord() + 1) {
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }
        if (thirdToken.getYCoord() == firstToken.getYCoord() + 2) {
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }
        if (fourthToken.getYCoord() == firstToken.getYCoord() + 3) {
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }

        if (sequentialOrder == true) {
            gameOverPhase(player, positionIDs)
            break;
        }
    }
}

function checkIfHorizontal(positionIDs, player, positionObjs) {
    let sequentialOrder = true;
    let firstToken;
    let secondToken;
    let thirdToken;
    let fourthToken;
    let currentPosIDs = new Array;


    for (let i = 0; i < positionObjs.length; i++) {

        //Order Tokens by X Value
        positionObjs.sort(function (a, b) { return a.x - b.x });
        firstToken = positionObjs[i];
        secondToken = positionObjs[i + 1];
        thirdToken = positionObjs[i + 2];
        fourthToken = positionObjs[i + 3];

        let selectedTokens = new Array;
        selectedTokens = [];
        selectedTokens.push(firstToken);
        selectedTokens.push(secondToken);
        selectedTokens.push(thirdToken)
        selectedTokens.push(fourthToken)

        //Store current position IDs
        currentPosIDs = [];
        currentPosIDs.push(positionIDs[i]);
        currentPosIDs.push(positionIDs[i+1]);
        currentPosIDs.push(positionIDs[i+2]);
        currentPosIDs.push(positionIDs[i+3]);
        

        if (secondToken.getXCoord() == firstToken.getXCoord() + 1) {
            sequentialOrder = true;
           
        } else {
            sequentialOrder = false;
        }
        if (thirdToken.getXCoord == firstToken.getXCoord + 2) {
            sequentialOrder = true;
            
        } else {
            sequentialOrder = false;
        }

        if (fourthToken.getXCoord() == firstToken.getXCoord() + 3) {
            sequentialOrder = true;
        } else {
            sequentialOrder = false;
        }

        if (sequentialOrder == true) {
            gameOverPhase(player, currentPosIDs);
        }
    }
}

function gameOverPhase(winner, selectedTokens) {
    gameOver = true;
    playerWinner
    document.getElementById("playerWinner").innerHTML = winner + " Wins!";
    document.getElementById("gameOverMessage").style.display = "block";
    for (let i = 0; i < positions.length;i++){
        let elem = document.getElementById(positions[i].getCoordinates());
        elem.style.boxShadow = "none";
    }
    for (k = 0; k <= 4; k++) {
        let tokenID = positions[selectedTokens[k]];
        tokenID = tokenID.getCoordinates();
        let elem = document.getElementById(tokenID);
        elem.style.boxShadow = "0px 0px 30px 5px white";
    }
}

function playAgain() {
    createBoard();
    for (let i = 0; i < positions.length;i++){
        let elem = document.getElementById(positions[i].getCoordinates());
        elem.style.boxShadow = "none";
        elem.style.backgroundColor = "#D9D9D9";
    }
    document.getElementById("gameOverMessage").style.display = "none";
    playerOneTurn = true;
    document.getElementById("playerTurn").innerHTML = "Player One's Turn";

}