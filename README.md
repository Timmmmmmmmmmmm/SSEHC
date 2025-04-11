# SSEHC – Schachpartien analysieren im Browser 🧠♟️

Willkommen bei **SSEHC** – einem interaktiven Schach-Analysetool, das im Browser läuft!  
Dieses Projekt richtet sich an alle, die ihre Schachpartien nachträglich analysieren und besser verstehen wollen – inklusive Bewertung einzelner Züge und einer Evaluation wie auf chess.com.

## 🔍 Was ist das Ziel?

Mit **SSEHC** kannst du:
- PGN-Dateien hochladen und Zug für Zug durchgehen
- jeden einzelnen Zug bewerten lassen
- die Spielgenauigkeit nachvollziehen
- eine Evaluationsleiste sehen, die den Spielverlauf visuell darstellt
- langfristig tiefere Analysen mit einer echten Schach-Engine (z. B. Stockfish) durchführen

Das Projekt ist als Lernprojekt gedacht und wächst Stück für Stück.

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Analyse**: Python (mittels [`python-chess`](https://github.com/niklasf/python-chess)), Anbindung über Web-Backend geplant
- **Hosting**: [Netlify](https://www.netlify.com/) für die Website
- **Schach-Logik**: PGN-Parsen, Zugweise Analyse, Evaluationsgraph
- **Engine-Integration**: [Stockfish](https://stockfishchess.org/)

## 🚀 Live-Demo

➡️ https://schachmaster-bytim.netlify.app/

## 📂 Projektstruktur

```plaintext
.
├── index.html           # Hauptseite
├── script.js            # JavaScript für GUI und Interaktion
├── styles.css           # Look & Feel
├── assets/              # Icons, Bilder etc.
├── analysis/            # Python-Code für Backend-Analyse
└── README.md            # Du bist hier!
