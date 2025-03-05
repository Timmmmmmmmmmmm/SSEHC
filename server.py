from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.pgn
import chess.engine
import io


SSEHC = Flask(__name__)
CORS(SSEHC)
STOCKFISH_PATH = "C:/Users/timka/Downloads/PROJEKT_SSECH/stockfish/stockfish-windows-x86-64-avx2.exe"


@SSEHC.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  #JSON-Daten von JavaScript 
    pgn_text = data.get("pgn")
    pgn_stream = io.StringIO(pgn_text)


    game = chess.pgn.read_game(pgn_stream)
    if not game:
        return jsonify("")
    board = game.board()
    move_list = []

    for move in game.mainline_moves():
        board.push(move)
        move_list.append(move.uci())
    

    #response = {"message": "Antwort erhalten!", "content": move_list}

    
    return jsonify(move_list) 

if __name__ == '__main__':
    SSEHC.run(debug=True)
