
document.getElementById("analyze").addEventListener("click", function(){
    let pgnText = document.getElementById("pgn_input").value;

    fetch("http://127.0.0.1:5000/analyze",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pgn: pgnText})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("output").textContent = data.message + "\n" + data.pgn;
        console.log("Server response", data);
    })
    .catch(error => console.error("Error:", error));

});
