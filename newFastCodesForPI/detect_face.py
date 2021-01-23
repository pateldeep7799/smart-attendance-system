import numpy as np
import cv2
import os
import time
import subprocess
from send_to_azure import authPerson
import requests
import uuid

# If You want to send the image data to a server
API_ENDPOINT = "http://172.16.18.142:3000/getFace"


faceAuth = authPerson()
class faceDetect:
    def thread1(self):
        os.chdir("/home/pi/Desktop/pi-auth/opencv/data/haarcascades")
        #capture_duration = 5
        face_cascade = cv2.CascadeClassifier('/home/pi/Desktop/pi-auth/opencv/data/haarcascades/haarcascade_frontalface_default.xml')
        eye_cascade = cv2.CascadeClassifier('/home/pi/Desktop/pi-auth/opencv/data/haarcascades/haarcascade_eye.xml')
        cap = cv2.VideoCapture(0)
       
        while 1:
        
            ret, img = cap.read()
            #img = cv2.flip(img, 0)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            for (x,y,w,h) in faces:
                print("Face Detected")
                cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
                roi_gray = gray[y:y+h, x:x+w]
                roi_color = img[y:y+h, x:x+w]
            
                eyes = eye_cascade.detectMultiScale(roi_gray)
                for (ex,ey,ew,eh) in eyes:
                    cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
                    print("Person Face Detection Confirmed")
                    time.sleep(2)
                    cap.release()
                    done = "alla"
                    return done
    def func2(self):
        imageName = "/home/pi/Desktop/pi-auth/images/" + str(uuid.uuid4())
        faceData = {}
        faceAuth.captureImage(image = imageName)
        faceIdList = faceAuth.detectFace(imgFile = imageName)
        print("face id")
        print(faceIdList)
        if len(faceIdList) == 0:
            faceData["faceId"] = "invalid"
            faceData["name"] = "invalid"
            #os.remove(imageName)
            return faceData
        
            personList = faceAuth.identify(ids = faceIdList)
            print("person list:")
            print(personList)
        personList = faceAuth.identify(ids = faceIdList)    
        if len(personList) == 0:
            faceData["faceId"] = "invalid"
            faceData["name"] = "invalid"
            #os.remove(imageName)
            return faceData
                
        else:
            
            faceData["faceId"] = faceIdList[0]
            

            name = faceAuth.getNameAndPhoneNo(personList[0])
            faceData["name"] = name
            #os.remove(imageName)
            return faceData
                    
        
    
if __name__ == '__main__':
    faceDetectObj = faceDetect()
    

        
    faceDetectObj.thread1()

    data = faceDetectObj.func2()
    print(data)
    if data["name"] == "invalid":
        print("invalid")
        
    else:
        # Sending data to a server    
        r = requests.post(url = API_ENDPOINT, data = data)
        print("Posted Data")
            
    
        



