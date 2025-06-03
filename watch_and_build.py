import os
import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import http.server
import socketserver
import threading

class JsChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.html')):
            print(f"\nFile {event.src_path} has been modified")
            try:
                # Run build command using node directly
                subprocess.run([
                    "C:\\Program Files\\nodejs\\node.exe",
                    "node_modules\\vite\\bin\\vite.js",
                    "build"
                ], cwd=os.path.join(os.getcwd(), "frontend"), check=True)
                print("Build completed successfully!")
            except subprocess.CalledProcessError as e:
                print(f"Build failed with error: {e}")

def start_http_server():
    dist_dir = os.path.join(os.getcwd(), 'frontend', 'dist')
    if not os.path.exists(dist_dir):
        print(f"Creating dist directory at {dist_dir}")
        os.makedirs(dist_dir, exist_ok=True)
    
    os.chdir(dist_dir)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", 5173), handler) as httpd:
        print("Serving at http://localhost:5173")
        httpd.serve_forever()

def main():
    # Ensure frontend/src directory exists
    src_dir = os.path.join(os.getcwd(), 'frontend', 'src')
    if not os.path.exists(src_dir):
        print(f"Error: Source directory not found at {src_dir}")
        print("Please ensure you're running this script from the project root directory.")
        return

    # Start HTTP server in a separate thread
    server_thread = threading.Thread(target=start_http_server, daemon=True)
    server_thread.start()

    # Set up file watcher
    event_handler = JsChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path=src_dir, recursive=True)
    observer.start()

    print(f"Watching for file changes in {src_dir}...")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\nStopping file watcher...")
    observer.join()

if __name__ == "__main__":
    main() 