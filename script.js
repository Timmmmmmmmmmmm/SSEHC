let pgnText;

document.getElementById("analyze").addEventListener("click", function(){
    let pgnInput = document.getElementById("pgn_input").value;

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
        document.getElementById("output").textContent = data.pgn;
        console.log("Server response", data);
        console.log(pgnText);
    })
    .catch(error => console.error("Error:", error));

    
});

