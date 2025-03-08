from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import chess
import chess.pgn
import chess.engine
import chess.polyglot
import io


SSEHC = Flask(__name__)
CORS(SSEHC)

@SSEHC.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  #JSON-Daten von JavaScript 
    pgn_text = data.get("pgn")
    pgn_stream = io.StringIO(pgn_text)
    #STOCKFISH_PATH = r"C:\Users\timka\Documents\stockfish\stockfish.exe"
    STOCKFISH_PATH = "usr/games/Stockfish"
    player_info = {"white": "", "black": "", "whiteElo": "?", "blackElo": "?"}
    move_list = []
    move_eva = []
    best_moves = []
    debug = "wer das liest ist doof"
    game = chess.pgn.read_game(pgn_stream)
    #try:
        #engine_test = subprocess.run(["which", "stockfish"], capture_output=True, text=True)
        #engine_test = subprocess.run(["where", "stockfish"], capture_output=True, text=True, shell=True)
        #debug = f"Stockfish is under: {engine_test.stdout.strip()}"
        
    #except Exception as e:
        #debug = f"Error checking Stockfish: {e}"
    #else:
        #debug = "Stockfish geladen!"
    
    engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)


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
        bestM = engine.play(board, chess.engine.Limit(time=1.0))
        info = engine.analyse(board, chess.engine.Limit(time=1.0))
        move_eva.append(info["score"].relative.score() / 100)
        best_moves.append(bestM.move.uci())
        move_list.append(move.uci())

    engine.quit()

    response["move_list"] = move_list
    response["player_info"] = player_info
    response["move_eva"] = move_eva
    response["best_moves"] = best_moves
    response["result"] = game.headers["Result"]
     
    return jsonify(response) 

if __name__ == '__main__':
    SSEHC.run(debug=True)
