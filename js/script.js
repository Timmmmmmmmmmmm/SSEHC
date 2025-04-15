let content;
const empty = [];

let index = 0;
let board = Chessboard("board", {position: "start", 
                                 pieceTheme: "images/pieces/{piece}.svg", 
                                 draggable: false,
                                 dropOffBoard: "snapback",
                                 moveSpeed: "fast"});
let game = new Chess();
let moves = [];
let move;
let result;
let best_moves = [];
let best_move;
let evals = [];
let score = 0;
let flipped = false;
let winner;
let loser;

// Objects Definition
const output = document.getElementById("output");
const analyze = document.getElementById("analyze");
const pWhite = document.getElementById("white");
const pBlack = document.getElementById("black");
const eva = document.getElementById("eval-score");
const bMove = document.getElementById("best-move");
const bar = document.getElementById("eval-bar");
const fill = document.getElementById("eval-fill");

// Audio
function playSound(sound){
    let audio = new Audio(`sounds/${sound}.mp3`)
    audio.play()
}

//Board Rezise
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() =>{
        board.resize();
    }, 200);
});

// PGN an Backend schicken
analyze.addEventListener("click", function(){
    index = 0;
    game.reset();
    let pgnInput = document.getElementById("pgn_input").value;

    //document.querySelector(".output").classList.add("loading");
    output.style.background = "#749bbf";
    output.textContent = "Loading...";
    board.position("start");


    website =  "https://ssehc-backend.onrender.com/analyze"
    flask = "http://127.0.0.1:5000/analyze"

    fetch(flask,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pgn: pgnInput})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response", data);
        if(data.gamecreated){
            moves = data.move_list;
            result = data.result;
            evals = data.move_eva;
            best_moves = data.best_moves;
            index = 0;
            //document.querySelector(".output").classList.add("nav");
            output.style.background = "#4caf50";
            analyze.textContent = "Analyse...🔎";
            output.textContent = "➡ Use the Arrow Keys or Buttons! ⬅";
            pWhite.textContent = data.player_info.white + " (" + data.player_info.whiteElo + ")";
            pBlack.textContent = data.player_info.black + " (" + data.player_info.blackElo + ")";
            document.getElementById("flip").disabled = false;
        }else{
            output.style.background = "#833534";
            //document.querySelector(".output").classList.add("error");
            output.textContent = "Invalid PGN!";
            pWhite.textContent = "White Player (?)";
            pBlack.textContent = "Black Player (?)";
        }
    });
     
});

// Board move Control

    //checkEnd
function checkEnd(){
    if(index == moves.length){
        if(result == "1-0"){
            pWhite.style.borderColor = "#4caf50";
            pBlack.style.borderColor = "#833534";
        }else if(result == "0-1"){
            pBlack.style.borderColor = "#4caf50";
            pWhite.style.borderColor = "#833534";

        }else{
            pWhite.style.borderColor = "#323233";
            pBlack.style.borderColor = "#323233";
        }
    }
}
// UPDATE BAR
function updateEvalBar(){
    let clamp = Math.max(-10, Math.min(10, evals[index]));
    let scaled = 50 + (clamp * 4);
    fill.style.height = `${scaled}%`;
}

    // RIGHT ->
function moveRight(){
    if(index < moves.length){
        /*best_move = game.move({
            from: best_moves[index].slice(0, 2),
            to: best_moves[index].slice(2, 4),
            promotion: best_moves[index].slice(4)
        });
        bMove.textContent = best_move.san;
        game.undo();*/
        move = game.move({
            from: moves[index].slice(0, 2),
            to: moves[index].slice(2, 4),
            promotion: moves[index].slice(4)
        });
        board.position(game.fen());
        index++;
        eva.textContent = Math.round(evals[index] * 10) / 10;
        if(game.in_check()){
            playSound("check");
        }else if(move.flags.includes("c")){
            playSound("capture");
        }else if(game.in_checkmate()){
            playSound("move");
        }else{
            playSound("move");
        }
    }
    checkEnd();
    updateEvalBar()
}
    // LEFT <- 
function moveLeft(){
    if(index > 0){
        game.undo();
        board.position(game.fen());
        index--;
        eva.textContent = Math.round(evals[index] * 10) / 10;
        pWhite.style.borderColor = "#1e293b";
        pBlack.style.borderColor = "#1e293b";
        updateEvalBar();
    }
}
    // TO END OF GAME ->->
function toEnd(){
    for(let i = index; i < moves.length; i++){
        game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
    }
    board.position(game.fen());
    index = moves.length;
    eva.textContent = Math.round(evals[index] * 10) / 10;
    checkEnd();
    updateEvalBar();
}
    // TO START OF GAME <-<-
function toStart(){
    game.reset()
    board.position(game.fen());
    index = 0;
    updateEvalBar();
    eva.textContent = "0.0";
    pWhite.style.borderColor = "#1e293b";
    pBlack.style.borderColor = "#1e293b";
}
 
document.addEventListener("keydown", function(event){
    let key = event.key;
    if(key == "ArrowRight"){
        moveRight();
    }else if(key == "ArrowLeft"){
        moveLeft();
    }else if(key == "ArrowUp"){
        toEnd();
    }else if(key == "ArrowDown"){
        toStart();
    }
});

    // Buttons 

document.getElementById("flip").addEventListener("click", function(){
    if(result == "1-0"){
        result = "0-1";
    }else if(result == "0-1"){
        result = "1-0";
    }
    board.flip();
    let flip;
    flip = pWhite.textContent;
    pWhite.textContent = pBlack.textContent;
    pBlack.textContent = flip;

    flip = pWhite.style.borderColor;
    pWhite.style.borderColor = pBlack.style.borderColor;
    pBlack.style.borderColor = flip;

    if(!flipped){
        fill.style.backgroundColor = "black";
        bar.style.backgroundColor = "white";
        flipped = true;
    }else{
        fill.style.backgroundColor = "white";
        bar.style.backgroundColor = "black";
        flipped = false;
    }
});
document.getElementById("hard-left").addEventListener("click", function(){
    toStart();
});
document.getElementById("left").addEventListener("click", function(){
    moveLeft();
});
document.getElementById("right").addEventListener("click", function(){
    moveRight();
});
document.getElementById("hard-right").addEventListener("click", function(){
    toEnd();
});
document.getElementById("useless").addEventListener("click", function(){

});