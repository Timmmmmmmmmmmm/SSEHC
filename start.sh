#!/bin/bash
echo "Downloading Stockfish..."
wget -O stockfish https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-linux-x86-64-avx2
chmod +x stockfish
echo "Stockfish is ready!"
python server.py
gunicorn server:SSEHC

!# wget https://github.com/official-stockfish/Stockfish/releases/download/sf_17/stockfish-ubuntu-x86-64.tar && tar -xvf stockfish-ubuntu-x86-64.tar && chmod +x stockfish/stockfish-ubuntu-x86-64 && gunicorn server:SSEHC