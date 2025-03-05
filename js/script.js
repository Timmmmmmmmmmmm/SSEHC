let content;
const empty = [];

let index = 0;
let board = Chessboard("board", {position: "start", pieceTheme: "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png"});
let game = new Chess();
let moves = [];


// for(let i = 0; i < initialPosition.length; i++){
//     document.getElementById("board").textContent = initialPosition[i];
// }
document.getElementById("analyze").addEventListener("click", function(){
    index = 0;
    game.reset();
    let pgnInput = document.getElementById("pgn_input").value;
    document.getElementById("output").textContent = "Loading...";
    board.position("start");
    fetch("https://ssehc-backend.onrender.com/analyze",{
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
            document.getElementById("white").textContent = data.player_info.white + " (" + data.player_info.whiteElo + ")";
            document.getElementById("black").textContent = data.player_info.black + " (" + data.player_info.blackElo + ")";
            document.getElementById("output").textContent = "";
        }else{
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
            game.move({from: moves[index].slice(0,2), to: moves[index].slice(2,4) });
            board.position(game.fen());
            index++;
        }
    }else if(key == "ArrowLeft"){
        if(index > 0){
            game.undo();
            board.position(game.fen());
            index--;
        }
    }else if(key == "ArrowUp"){
        for(let i = index; i < moves.length; i++){
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