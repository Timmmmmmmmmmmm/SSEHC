let content;
const empty = [];

let index = 0;
let board = Chessboard("board", {position: "start", pieceTheme: "images/pieces/{piece}.svg"});
let game = new Chess();
let moves = [];
// Audio
function playSound(sound){
    let audio = new Audio(`sounds/${sound}.mp3`)
    audio.play()
}

// PGN an Backend schicken
document.getElementById("analyze").addEventListener("click", function(){
    index = 0;
    game.reset();
    let pgnInput = document.getElementById("pgn_input").value;
    document.getElementById("output").textContent = "Loading...";
    board.position("start");
    fetch("http://127.0.0.1:5000/analyze",{
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
            document.getElementById("output").style.background = "";
            document.getElementById("analyze").textContent = "Analyse...🔎";
            document.getElementById("output").textContent = "➡ Use the Arrow Keys to navigate through the Game! ➡";
            document.getElementById("white").textContent = data.player_info.white + " (" + data.player_info.whiteElo + ")";
            document.getElementById("black").textContent = data.player_info.black + " (" + data.player_info.blackElo + ")";
        }else{
            document.getElementById("output").style.background = "#833534";
            document.getElementById("output").textContent = "Invalid PGN!";
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
            result = game.move({from: moves[index].slice(0,2), to: moves[index].slice(2,4) });
            game.move({from: moves[index].slice(0,2), to: moves[index].slice(2,4) });
            board.position(game.fen());
            index++;
            if(game.in_check()){
                playSound("check");

            }else if(result.flags.includes("c")){
                playSound("capture");
            }else if(game.in_checkmate()){
                playSound("move");
            }else{
                playSound("move");
            }
            
        }
    }else if(key == "ArrowLeft"){
        if(index > 0){
            game.undo();
            board.position(game.fen());
            index--;
        }
    }else if(key == "ArrowUp"){
        for(let i = index; i < moves.length; i++){
            result = game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
            game.move({from: moves[i].slice(0,2), to: moves[i].slice(2,4) });
            board.position(game.fen());
            
            
        }
        index = moves.length;
    }else if(key == "ArrowDown"){
        game.reset()
        board.position(game.fen());
        index = 0;
        
    }
});