from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.pgn
import chess.engine
from io import StringIO


SSEHC = Flask(__name__)
CORS(SSEHC)
STOCKFISH_PATH = "C:/Users/timka/Downloads/PROJEKT_SSECH/stockfish/stockfish-windows-x86-64-avx2.exe"


@SSEHC.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  # Die JSON-Daten von JavaScript holen
    pgn_text = data.get("pgn", "")
    pgn_stream = StringIO(pgn_text)

    game = chess.pgn.read_game(pgn_stream)
    if not game:
        return ValueError("PGN velerhaft")
    
    return game
    headers  = game.headers


    board = game.board()

    moves = []
    for move in game.mainline_moves():
        board.push(move)
        moves.append({
            "move": move.uci(),  # UCI Format "e2e4"
            "fen": board.fen(),  # FEN Notation 
        })
    

    #response = {"message": "PGN empfangen!", "pgn": pgn_text}

    #return jsonify(response)

if __name__ == '__main__':
    SSEHC.run(host="0.0.0.0", port=5000, debug=True)
