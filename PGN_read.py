import chess
import chess.pgn
from io import StringIO

# PGN-Daten (Beispiel aus deiner Nachricht)

def pgn_read(pgn_text):
    pgn_stream = StringIO(pgn_text)

    game = chess.pgn.read_game(pgn_stream)
    if not game:
        raise ValueError("PGN velerhaft")
    
    headers  = game.headers

    board = game.board()

    moves = []
    for move in game.mainline_moves():
        board.push(move)
        moves.append({
            "move": move.uci(),  # UCI Format "e2e4"
            "fen": board.fen(),  # FEN Notation 
        })
        
    return headers, moves 

pgn = input("paste PGN here ")
headers, moves = pgn_read(pgn)
print(pgn)
for move in moves[:5]:
    print("d")
