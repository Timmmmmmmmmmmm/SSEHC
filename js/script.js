let content;
const empty = [];

let index = 0;
let board = Chessboard("board", {position: "start", pieceTheme: "images/pieces/{piece}.svg"});
let game = new Chess();
let moves = [];
let result = "";
// Objects Definition
const output = document.getElementById("output");
const analyze = document.getElementById("analyze");
const pWhite = document.getElementById("white");
const pBlack = document.getElementById("black");
const eva = document.getElementById("Eva");
// Audio
function playSound(sound){
    let audio = new Audio(`sounds/${sound}.mp3`)
    audio.play()
}

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
    local = "http://127.0.0.1:5000/analyze"

    fetch(local,{
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
            index = 0;
            //document.querySelector(".output").classList.add("nav");
            output.style.background = "#4caf50";
            analyze.textContent = "Analyse...🔎";
            output.textContent = "➡ Use the Arrow Keys or Buttons! ⬅";
            pWhite.textContent = data.player_info.white + " (" + data.player_info.whiteElo + ")";
            pBlack.textContent = data.player_info.black + " (" + data.player_info.blackElo + ")";
        }else{
            output.style.background = "#833534";
            //document.querySelector(".output").classList.add("error");
            output.textContent = "Invalid PGN!";
            document.getElementById("white").textContent = "White Player (?)";
            document.getElementById("black").textContent = "Black Player (?)";
        }
    });
     
});

// Board move Control
document.addEventListener("keydown", function(event){
    let key = event.key;
    if(key == "ArrowRight"){
        if(index < moves.length){
            flag = game.move({from: moves[index].slice(0,2), to: moves[index].slice(2,4) });
            game.move({
                from: moves[index].slice(0,2), 
                to: moves[index].slice(2,4),
                promotion: moves[index].slice(4)
                });
            board.position(game.fen());
            index++;
            if(game.in_check()){
                playSound("check");

            }else if(flag.flags.includes("c")){
                playSound("capture");
            }else if(game.in_checkmate()){
                playSound("move");
            }else{
                playSound("move");
            }
            
        }
        if(index == moves.length){
            if(result == "1-0"){
                pWhite.style.borderColor = "#4caf50";
                pBlack.style.borderColor = "#833534";
            }else if(result == "0-1"){
                pWhite.style.borderColor = "#833534";
                pBlack.style.borderColor = "#4caf50";
    
            }else{
                pWhite.style.borderColor = "#323233";
                pBlack.style.borderColor = "#323233";
            }
        }
    }else if(key == "ArrowLeft"){
        if(index > 0){
            game.undo();
            board.position(game.fen());
            index--;
            pWhite.style.borderColor = "#1e293b";
            pBlack.style.borderColor = "#1e293b";
        }
    }else if(key == "ArrowUp"){
        for(let i = index; i < moves.length; i++){
            //result = game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
            game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
        }
        board.position(game.fen());
        if(result == "1-0"){
            pWhite.style.borderColor = "#4caf50";
            pBlack.style.borderColor = "#833534";
        }else if(result == "0-1"){
            pWhite.style.borderColor = "#833534";
            pBlack.style.borderColor = "#4caf50";

        }else{
            pWhite.style.borderColor = "#323233";
            pBlack.style.borderColor = "#323233";
        }
        index = moves.length;
    }else if(key == "ArrowDown"){
        game.reset()
        board.position(game.fen());
        index = 0;
        pWhite.style.borderColor = "#1e293b";
        pBlack.style.borderColor = "#1e293b";
    }
});
    // Buttons 
document.getElementById("flip").addEventListener("click", function(){
    board.flip();
    let temp = "";
    temp = pWhite.textContent;
    pWhite.textContent = pBlack.textContent;
    pBlack.textContent = temp;

    temp = pWhite.style.borderColor;
    pWhite.style.borderColor = pBlack.style.borderColor;
    pBlack.style.borderColor = temp;
});
document.getElementById("hard-left").addEventListener("click", function(){
    game.reset()
    board.position(game.fen());
    index = 0;
    pWhite.style.borderColor = "#1e293b";
    pBlack.style.borderColor = "#1e293b";

});
document.getElementById("left").addEventListener("click", function(){
    if(index > 0){
        game.undo();
        board.position(game.fen());
        index--;
        pWhite.style.borderColor = "#1e293b";
        pBlack.style.borderColor = "#1e293b";
    }
});
document.getElementById("right").addEventListener("click", function(){
    if(index < moves.length){
        flag = game.move({from: moves[index].slice(0,2), to: moves[index].slice(2,4) });
        game.move({
            from: moves[index].slice(0,2), 
            to: moves[index].slice(2,4),
            promotion: moves[index].slice(4)
            });
        board.position(game.fen());
        index++;
        if(game.in_check()){
            playSound("check");

        }else if(flag.flags.includes("c")){
            playSound("capture");
        }else if(game.in_checkmate()){
            playSound("move");
        }else{
            playSound("move");
        }
        
    }
    if(index == moves.length){
        if(result == "1-0"){
            pWhite.style.borderColor = "#4caf50";
            pBlack.style.borderColor = "#833534";
        }else if(result == "0-1"){
            pWhite.style.borderColor = "#833534";
            pBlack.style.borderColor = "#4caf50";

        }else{
            pWhite.style.borderColor = "#323233";
            pBlack.style.borderColor = "#323233";
        }
    }
});
document.getElementById("hard-right").addEventListener("click", function(){
    for(let i = index; i < moves.length; i++){
        //result = game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
        game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
    }
    if(result == "1-0"){
        pWhite.style.borderColor = "#4caf50";
        pBlack.style.borderColor = "#833534";
    }else if(result == "0-1"){
        pWhite.style.borderColor = "#833534";
        pBlack.style.borderColor = "#4caf50";

    }else{
        pWhite.style.borderColor = "#323233";
        pBlack.style.borderColor = "#323233";
    }
    board.position(game.fen());
    index = moves.length;
});
document.getElementById("useless").addEventListener("click", function(){

});