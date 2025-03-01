import chess
import chess.engine

stockfish_path = "C:\\Users\\timka\\Desktop\\PROJEKT_SSECH\\stockfish\\stockfish-windows-x86-64-avx2.exe"

# Eingabe von Zügen - Später wird PGN eingefügt
player_moves = [
    "e2e4",
    "e7e5",
    "g1f3",
    "f8c5",
    "f3h4",
    "d8f6",
    "f1c4",
    "f6f2",
]

board = chess.Board()

correct_moves = 0

with chess.engine.SimpleEngine.popen_uci(stockfish_path) as engine:
    for move in player_moves:
        player_move = chess.Move.from_uci(move)
        board.push(player_move)

        result = engine.analyse(board, chess.engine.Limit(time=2.0))
        best_move = result 

        if player_move == best_move:
            correct_moves += 1
        
        print(board)
        print("--------")

# vorläufige Accuarcy
accuracy = (correct_moves / len(player_moves)) * 100
print("Die Genauigkeit beträgt %f" % (accuracy))    