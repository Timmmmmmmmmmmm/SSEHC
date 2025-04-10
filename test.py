import chess
import chess.pgn
import chess.engine
from io import StringIO

STOCKFISH_PATH = r"C:\Users\timka\Documents\stockfish\stockfish.exe"

#pgn_input = '[Event "Live Chess"] [Site "Chess.com"] [Date "2024.09.03"] [Round "?"] [White "Timkai"] [Black "RQ-FER"] [Result "1-0"] [TimeControl "600"] [WhiteElo "1295"] [BlackElo "1257"] [Termination "Timkai gewinnt durch Schachmatt"] [ECO "D00"] [EndTime "14:10:23 GMT+0000"] [Link "https://www.chess.com/game/live/119110872385?move=60"] 1. d4 d5 2. Bf4 Nc6 3. Nf3 Bg4 4. e3 e6 5. Nbd2 Nf6 6. Be2 Bxf3 7. Nxf3 Ne4 8. c3 Be7 9. Qb3 b6 10. Nd2 Nxd2 11. Kxd2 O-O 12. Bd3 Bg5 13. Bg3 a5 14. h4 Bh6 15. Qc2 g6 16. h5 a4 17. hxg6 fxg6 18. Rxh6 Rf6 19. f3 Qf8 20. Rah1 Rf7 21. Bxc7 Rxc7 22. Bxg6 hxg6 23. Qxg6+ Qg7 24. Qxe6+ Rf7 25. Rg6 Nd8 26. Qe8+ Rf8 27. Rxg7+ Kxg7 28. Qe5+ Kf7 29. Rh7+ Kg6 30. Rg7+ Kh6 31. Qg5# 1-0'
#pgn_stream1 = StringIO(pgn_input)
#pgn_empty = ""
moves = []
#pgn_stream2 = StringIO(pgn_empty)
pgn = open(r"C:\Users\timka\Downloads\PROJEKT_SSECH\game.pgn")
game1 = chess.pgn.read_game(pgn) 
#game2 = chess.pgn.read_game(pgn_stream2)
engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)
board = chess.Board()
for move in game1.mainline_moves():
    board.push(move)
    moves.append(move.uci())

#print(moves)
#print("Empty/Wrong Game: ",game2.mainline_moves())

info = engine.analyse(board, chess.engine.Limit(time=1.0))
cp_score = info["score"].relative.mate()

print("Bewertung:", cp_score)

""" 
[Event "Live Chess"]
[Site "Chess.com"]
[Date "2024.09.03"]
[Round "-"]
[White "Timkai"]
[Black "edxerl"]
[Result "1-0"]
[CurrentPosition "Bn5B/p1ppbk2/1p2pp1n/8/3P4/4P3/PP3PPP/RN2K2R b KQ -"]
[Timezone "UTC"]
[ECO "A40"]
[ECOUrl "https://www.chess.com/openings/English-Defense"]
[UTCDate "2024.09.03"]
[UTCTime "13:46:19"]
[WhiteElo "1297"]
[BlackElo "1284"]
[TimeControl "600"]
[Termination "Timkai won by resignation"]
[StartTime "13:46:19"]
[EndDate "2024.09.03"]
[EndTime "13:50:01"]
[Link "https://www.chess.com/analysis/game/live/119110203993?tab=analysis&move=24"]
[WhiteUrl "https://images.chesscomfiles.com/uploads/v1/user/83580632.17b80883.50x50o.2112965a3347.jpg"]
[WhiteCountry "54"]
[WhiteTitle ""]
[BlackUrl "https://images.chesscomfiles.com/uploads/v1/user/331717345.290bc3aa.50x50o.90b834cdaa3e.jpg"]
[BlackCountry "111"]
[BlackTitle ""]

1. d4 b6 2. Bf4 $6 Bb7 3. e3 e6 4. Nf3 Qf6 $2 5. Bd3 $6 Bd6 $2 6. Bg5 $1 Bxf3 7. Bxf6
Bxd1 8. Bxg7 $1 Bxc2 $6 9. Bxc2 Be7 10. Bxh8 f6 11. Bxh7 Kf7 12. Be4 Nh6 $6 13. Bxa8
1-0
"""