let pgnText;
const initialPosition = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'], // 8. Reihe (schwarz)
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'], // 7. Reihe (schwarz)
    ['', '', '', '', '', '', '', ''],           // 6.
    ['', '', '', '', '', '', '', ''],           // 5.
    ['', '', '', '', '', '', '', ''],           // 4.
    ['', '', '', '', '', '', '', ''],           // 3.
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'], // 2. Reihe (weiß)
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']  // 1. Reihe (weiß)
  ];

document.getElementById("analyze").addEventListener("click", function(){
    let pgnInput = document.getElementById("pgn_input").value;
    
    fetch("https://ssehc-backend.onrender.com/analyze",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pgn: pgnInput})
    })
    .then(document.getElementById("output").textContent = "Loading...")
    .then(response => response.json())
    .then(data => {
        pgnText = data.pgn;
        document.getElementById("output").textContent = pgnText;
        console.log("Server response", data);
        console.log(pgnText);
    })
    .catch(error => console.error("Error:", error));

    
});