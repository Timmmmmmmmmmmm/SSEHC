from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import chess
import chess.pgn
import chess.engine
import chess.polyglot
import io
import os


SSEHC = Flask(__name__)
CORS(SSEHC)

@SSEHC.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  #JSON-Daten von JavaScript 
    pgn_text = data.get("pgn")
    pgn_stream = io.StringIO(pgn_text)
    STOCKFISH_PATH = r"C:\Users\timka\Documents\stockfish\stockfish.exe"
    #STOCKFISH_PATH = "./stockfish/stockfish-ubuntu-x86-64"
    player_info = {"white": "", "black": "", "whiteElo": "?", "blackElo": "?"}
    move_list = []
    move_eva = [f"{0:.2f}"]
    best_moves = []
    debug = "Gassenfrechdachs"
    game = chess.pgn.read_game(pgn_stream)

    """
    if not os.path.exists(STOCKFISH_PATH):
        return(FileNotFoundError(f"Stockfish is under: {STOCKFISH_PATH}"))
    try:
        engine_test = subprocess.run(["which", "stockfish"], capture_output=True, text=True)
        #engine_test = subprocess.run(["where", "stockfish"], capture_output=True, text=True, shell=True)
        debug = f"Stockfish is under: {engine_test.stdout.strip()}"
    except Exception as e:
        debug = f"Error checking Stockfish: {e}"
 
    """

    engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)
    engine.configure({"Hash": 1024, "Threads": 4})

    response = {
        "gamecreated": False,
        "player_info": player_info,
        "move_list": move_list,
        "move_eva": move_eva,
        "best_moves": best_moves,
        "result": "result",
        "DEBUG": debug}

    if not game:
        return jsonify(response)
    elif len(list(game.mainline_moves())) > 0:
        response["gamecreated"] = True
    else:
        return jsonify(response)
    
    board = chess.Board()
    
    player_info["white"] = game.headers["White"]
    player_info["black"] = game.headers["Black"]
    player_info["whiteElo"] = game.headers["WhiteElo"]
    player_info["blackElo"] = game.headers["BlackElo"]

    for move in game.mainline_moves():
        board.push(move)
        bestM = engine.play(board, chess.engine.Limit(depth=16))
        info = engine.analyse(board, chess.engine.Limit(depth=16))
        score = info["score"].relative
        if score.is_mate():
            move_eva.append(score.score())
        else:
            move_eva.append(score.score()/100)
        if bestM.move:
            best_moves.append(bestM.move.uci())
        move_list.append(move.uci())
    
    for x in range(len(move_eva)):
        if(type(move_eva[x]) == str and move_eva[x] != None):
            eva = float(move_eva[x])
            move_eva[x] = f"{eva:.2f}"

    for x in range(1, len(move_eva), 2):
        if(move_eva[x] != None):
            move_eva[x] *= -1

    engine.quit()

    response["move_list"] = move_list
    response["player_info"] = player_info
    response["move_eva"] = move_eva
    response["best_moves"] = best_moves
    response["result"] = game.headers["Result"]
     
    return jsonify(response) 

@SSEHC.route('/check', methods=['POST'])
def waitingForPlayer():
    data = request.json  #JSON-Daten von JavaScript 
    

if __name__ == '__main__':
    SSEHC.run(debug=True)
