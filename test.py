import chess
import chess.pgn
import chess.engine
from io import StringIO

STOCKFISH_PATH = "C:/Users/timka/Downloads/PROJEKT_SSECH/stockfish/stockfish-windows-x86-64-avx2.exe"

pgn_input = '[Event "Live Chess"] [Site "Chess.com"] [Date "2024.09.03"] [Round "?"] [White "Timkai"] [Black "RQ-FER"] [Result "1-0"] [TimeControl "600"] [WhiteElo "1295"] [BlackElo "1257"] [Termination "Timkai gewinnt durch Schachmatt"] [ECO "D00"] [EndTime "14:10:23 GMT+0000"] [Link "https://www.chess.com/game/live/119110872385?move=60"] 1. d4 d5 2. Bf4 Nc6 3. Nf3 Bg4 4. e3 e6 5. Nbd2 Nf6 6. Be2 Bxf3 7. Nxf3 Ne4 8. c3 Be7 9. Qb3 b6 10. Nd2 Nxd2 11. Kxd2 O-O 12. Bd3 Bg5 13. Bg3 a5 14. h4 Bh6 15. Qc2 g6 16. h5 a4 17. hxg6 fxg6 18. Rxh6 Rf6 19. f3 Qf8 20. Rah1 Rf7 21. Bxc7 Rxc7 22. Bxg6 hxg6 23. Qxg6+ Qg7 24. Qxe6+ Rf7 25. Rg6 Nd8 26. Qe8+ Rf8 27. Rxg7+ Kxg7 28. Qe5+ Kf7 29. Rh7+ Kg6 30. Rg7+ Kh6 31. Qg5# 1-0'
pgn_stream1 = StringIO(pgn_input)
pgn_empty = "asdsdaads"
pgn_stream2 = StringIO(pgn_empty)
game1 = chess.pgn.read_game(pgn_stream1) 
game2 = chess.pgn.read_game(pgn_stream2)
print("Normal Game: " , len(list(game1.mainline_moves())), "\n")
print("Empty/Wrong Game: ",game2.mainline_moves())
moves = []

cbcv