let playerOneTurn = true;




function changeStatus(clicked_id){
    if (playerOneTurn == true){
        document.getElementById(clicked_id).style.backgroundColor = "red";
    } else {
        document.getElementById(clicked_id).style.backgroundColor = "yellow";
    }
    
}

function updateToken(clicked_id){

    //Check players turn
    if (playerOneTurn = true){
        document.getElementById("playerTurn").innerHTML = "Player One's Turn";
    } else {
        document.getElementById("playerTurn").innerHTML = "PLayer Two's Turn";

    changeStatus(clicked_id);
    //Add ID of token to array

    playerOneTurn = false;

}

