#!/bin/bash
# Double-click this file to run Forge locally so your browser can install it.
cd "$(dirname "$0")"
PORT=8765
echo "──────────────────────────────────────────"
echo "  FORGE is starting…"
echo "  Opening http://localhost:$PORT in your browser."
echo ""
echo "  To INSTALL: in Chrome/Edge, click the install"
echo "  icon in the address bar (or the in-app Install button)."
echo ""
echo "  Keep this window open while using the app."
echo "  Close it to stop the server."
echo "──────────────────────────────────────────"
( sleep 1; open "http://localhost:$PORT/index.html" ) >/dev/null 2>&1 &
python3 -m http.server $PORT
