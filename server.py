from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.pgn
import chess.engine
import io


SSEHC = Flask(__name__)
CORS(SSEHC)

@SSEHC.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  #JSON-Daten von JavaScript 
    pgn_text = data.get("pgn")
    pgn_stream = io.StringIO(pgn_text)
    STOCKFISH_PATH = "usr/games/Stockfish"
    player_info = {"white": "", "black": "", "whiteElo": "?", "blackElo": "?"}
    move_list = []
    move_eva = []
    best_moves = []
    debug = "wer das liest ist doof"
    game = chess.pgn.read_game(pgn_stream)
    try:
        engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)
        debug = "Stockfish gestartet"
    except FileNotFoundError:
        debug = "Stockfish nicht geladen"


    response = {
        "gamecreated": False,
        "player_info": player_info,
        "move_list": move_list,
        "move_eva": move_eva,
        "best_moves": best_moves,
        "DEBUG": debug}

    if not game:
        return jsonify(response)
    elif len(list(game.mainline_moves())) > 0:
        response["gamecreated"] = True
    else:
        return jsonify(response)
    
    board = game.board()
    player_info["white"] = game.headers["White"]
    player_info["black"] = game.headers["Black"]
    player_info["whiteElo"] = game.headers["WhiteElo"]
    player_info["blackElo"] = game.headers["BlackElo"]

    for move in game.mainline_moves():

        board.push(move)
    
        move_list.append(move.uci())

    

    response["move_list"] = move_list
    response["player_info"] = player_info
    response["move_eva"] = move_eva
    response["best_moves"] = best_moves
    
    #engine.quit()
    return jsonify(response) 

if __name__ == '__main__':
    SSEHC.run(debug=True)
