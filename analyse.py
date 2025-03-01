import chess
import chess.engine

# Pfad zu Stockfish
stockfish_path = "C:\Users\timka\Downloads\PROJEKT_SSECH\stockfish\\stockfish-windows-x86-64-avx2.exe"


# Neues Brett
board = chess.Board()

# Anzeige Brett
print("Startposition:")
print(board)

# Stockfish start
with chess.engine.SimpleEngine.popen_uci(stockfish_path) as engine:
    # Aktuelle Position
    result = engine.analyse(board, chess.engine.Limit(time=2.0))
    
    # Bewertung
    print(f"Bewertung der Position: {result['score']}")
    
    # Bester Zug
    best_move = engine.play(board, chess.engine.Limit(time=2.0))
    print(f"Bester Zug: {best_move.move}")

    # Bester Zug wird gemacht
    board.push(best_move.move)
    print("Schachbrett nach dem besten Zug:")
    print(board)