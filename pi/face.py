#script for activating aks.py on face detect

import numpy as np
import cv2
import os
import time
import subprocess 
# from goto import with_goto
# label .begin
start_time = time.time()
def thread1():
    os.chdir("/home/pi/opencv-3.3.0/data/haarcascades")
    #capture_duration = 5
    face_cascade = cv2.CascadeClassifier('/home/pi/opencv-3.3.0/data/haarcascades/haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier('/home/pi/opencv-3.3.0/data/haarcascades/haarcascade_eye.xml')
    smileCascade = cv2.CascadeClassifier('/home/pi/opencv-3.3.0/data/haarcascades/haarcascade_smile.xml')
    cap = cv2.VideoCapture(0)
    while 1:
    
        ret, img = cap.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x,y,w,h) in faces:
        #print "Face Detected"
            cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
            roi_gray = gray[y:y+h, x:x+w]
            roi_color = img[y:y+h, x:x+w]
        
            eyes = eye_cascade.detectMultiScale(roi_gray)
            for (ex,ey,ew,eh) in eyes:
                cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
            smile = smileCascade.detectMultiScale(
                roi_gray,
                scaleFactor= 1.7,
                minNeighbors=22,
                minSize=(25, 25),
                )
            for (x, y, w, h) in smile:
                #print "Found", len(smile), "smiles!"
                cv2.rectangle(roi_color, (x, y), (x+w, y+h), (255, 0, 0), 1)
                cap.release()
                cv2.destroyAllWindows()
                python_bin = "/home/pi/Desktop/azure-faceApi/faceEnv/bin/python"
                script_file = "/home/pi/Desktop/azure-faceApi/aks.py"
                subprocess.Popen([python_bin, script_file])
            
            
        
        cv2.imshow('img',img)
        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break
    cap.release()
    cv2.destroyAllWindows()


    #python_bin = "/home/pi/Desktop/azure-faceApi/faceEnv/bin/python"
    #script_file = "/home/pi/Desktop/azure-faceApi/aks.py"
    #subprocess.Popen([python_bin, script_file])

thread1()
