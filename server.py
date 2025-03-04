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
    data = request.get_json()  #JSON-Daten von JavaScript 
    pgn_text = data.get("PGN", "")
    pgn_stream = StringIO(pgn_text)

    game = chess.pgn.read_game(pgn_text)

    moves = game.mainline_moves()

    

    response = {"message": "PGN ist doof!", "pgn": pgn_text}

    
    return jsonify(response) 

if __name__ == '__main__':
    SSEHC.run(host="0.0.0.0", port=5000, debug=True)
