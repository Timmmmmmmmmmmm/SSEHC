document.getElementById("analyze").addEventListener("click", function(){
    localStorage.setItem("pgnText", document.getElementById("pgn_input").value);
    let pgnText = localStorage.getItem("pgnText");
    console.log(pgnText);
});