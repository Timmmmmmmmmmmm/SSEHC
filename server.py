from flask import Flask, request, jsonify
from flask_cors import CORS
import chess.pgn


server1 = Flask(__name__)
CORS(server1)

@server1.route('/analyze', methods=['POST'])
def analyze_pgn():
    data = request.json  # Die JSON-Daten von JavaScript holen
    pgn_text = data.get("pgn", "")

    # Hier kannst du später die PGN-Analyse machen
    response = {"message": "PGN empfangen!", "pgn": pgn_text}

    return jsonify(response)

if __name__ == '__main__':
    server1.run(debug=True)


def process_pgn(pgn_Text):
    print("Pgn: ", pgn_Text)

