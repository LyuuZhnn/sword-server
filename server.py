import http.server
import socketserver
import os

PORT = 8080

os.chdir(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

class TJKTServer(
    http.server.SimpleHTTPRequestHandler
):
    pass

with socketserver.ThreadingTCPServer(
    ("0.0.0.0", PORT),
    TJKTServer
) as server:

    print()
    print("==============================")
    print("     ⚡ TJKT NETWORK SERVER")
    print("==============================")
    print()
    print("Server aktif di:")
    print(f"http://localhost:{PORT}")
    print()
    print("Tekan CTRL+C untuk berhenti.")
    print()

    server.serve_forever()
