import chess
import chess.pgn
import chess.engine
from io import StringIO

STOCKFISH_PATH = "C:/Users/timka/Downloads/PROJEKT_SSECH/stockfish/stockfish-windows-x86-64-avx2.exe"

print("Paste PGN here: \n")
pgn_input =  input() 
pgn_stream = StringIO(pgn_input)
game = chess.pgn.read_game(pgn_stream)  
moves = []

print(chess.pgn.write_game(game))  # Gibt die PGN-Partie als Text aus
