import http.server
import socketserver
import os
import webbrowser


class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)


def start_server(port=8000):
    with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{port}")
        print("Serving files from current directory")
        print("Press Ctrl+C to stop the server")

        webbrowser.open(f"http://localhost:{port}")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")


if __name__ == "__main__":
    start_server()
