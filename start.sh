#!/bin/bash
echo "Downloading Stockfish..."
wget -O stockfish https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-linux-x86-64-avx2
chmod +x stockfish
echo "Stockfish is ready!"
python server.py
gunicorn server:SSEHC