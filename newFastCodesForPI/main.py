import subprocess
import time
timeout = 10
while 1:
    subprocess.call(["python",  "detect_face.py"])
    subprocess.call(["python",  "client.py"])
    
        
        