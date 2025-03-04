let pgnText;


// for(let i = 0; i < initialPosition.length; i++){
//     document.getElementById("board").textContent = initialPosition[i];
// }
document.getElementById("analyze").addEventListener("click", function(){
    let pgnInput = document.getElementById("pgn_input").value;
    document.getElementById("output").textContent = "Loading..."

    fetch("https://ssehc-backend.onrender.com/analyze",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pgn: pgnInput})
    })
    .then(response => response.json())
    .then(data => {
        pgnText = data.pgn;
        document.getElementById("output").textContent = pgnText;
        console.log("Server response", data);
    })
    
});