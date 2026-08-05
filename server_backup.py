from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import shutil
import time
import platform

START_TIME = time.time()

class TJKTHandler(SimpleHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/api/system":

            uptime = int(time.time() - START_TIME)

            total, used, free = shutil.disk_usage("/")

            data = f"""
{{
    "os": "{platform.system()}",
    "hostname": "{platform.node()}",
    "cpu": "{os.cpu_count()}",
    "storage_total": "{total // (1024**3)} GB",
    "storage_used": "{used // (1024**3)} GB",
    "storage_free": "{free // (1024**3)} GB",
    "uptime": "{uptime}"
}}
"""

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(data.encode())

        else:
            super().do_GET()


server = ThreadingHTTPServer(("0.0.0.0", 8080), TJKTHandler)

print("===================================")
print("      TJKT NETWORK SERVER")
print("===================================")
print("Server aktif di:")
print("http://localhost:8080")
print("===================================")

server.serve_forever()
