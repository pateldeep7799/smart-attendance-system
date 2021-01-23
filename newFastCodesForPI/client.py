import cv2
import zmq
import base64
import time
timeout = 2000000 
context = zmq.Context()
footage_socket = context.socket(zmq.PUB)
footage_socket.connect('tcp://192.168.43.254:5555')
timeout_start = time.time()
camera = cv2.VideoCapture(0)  # init the camera

while time.time() < timeout_start + timeout:
    try:
        (grabbed, frame) = camera.read()  # grab the current frame
        frame = cv2.resize(frame, (640, 360))  # resize the frame
        encoded, buffer = cv2.imencode('.jpg', frame)
        jpg_as_text = base64.b64encode(buffer)
        footage_socket.send(jpg_as_text)

    except KeyboardInterrupt:
        camera.release()
        cv2.destroyAllWindows()
        print("\n\nBye bye\n")
        break
camera.release()
cv2.destroyAllWindows()
print("\n\nBye bye\n")

