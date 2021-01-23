# virtualenv -p python3 envname
# cd faceEnv/bin/
# source activate
# source deactivate
import subprocess

import requests

import urllib.request, urllib.parse, urllib.error, http.client, base64, json
import requests

group_id = '********' # name of personGroup
personList = [] 
KEY = '***********'


import uuid
auth_token = '**************' 
account_sid = '************'


import time 
import datetime
import os

import glob #to get latest added file 

faceIdList = []
personList = []
import sys




class authPerson:

        def captureImage(self, image):
            command = "fswebcam -r 480x360 --no-banner " + image
            os.system(command)
#                p = subprocess.Popen(["fswebcam", "-r", "480x360","--no-banner",  image], stdout=subprocess.PIPE, shell=False)
#                (output, err) = p.communicate()
#                p_status = p.wait()
                
        def identify(self,ids):
                headers = {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': KEY}
                params = urllib.parse.urlencode({'personGroupId': group_id})
                body = "{'personGroupId':'students', 'faceIds':"+str(ids)+"}"
                conn = http.client.HTTPSConnection('centralindia.api.cognitive.microsoft.com')
                conn.request("POST", "/face/v1.0/identify?%s" % params, body, headers)
                response = conn.getresponse()

                data = json.loads(response.read().decode('utf-8')) # turns response into index-able dictionary
                print(data)
                for resp in data:
                        candidates = resp['candidates']
                for candidate in candidates: # for each candidate in the response
                        # confidence = candidate['confidence'] # retrieve confidence
                        personId = str(candidate['personId']) # and personId
                        personList.append(personId)
                conn.close()
                return personList


        # takes in person_id and retrieves known person's name with azure GET request
        def getNameAndPhoneNo(self, person_Id):
                headers = {'Ocp-Apim-Subscription-Key': KEY}
                params = urllib.parse.urlencode({'personGroupId': group_id, 'personId': person_Id})

                conn = http.client.HTTPSConnection('centralindia.api.cognitive.microsoft.com')
                conn.request("GET", "/face/v1.0/persongroups/{"+group_id+"}/persons/"+person_Id+"?%s" % params, "{body}", headers)
                response = conn.getresponse()
                data = json.loads(response.read().decode('utf-8'))
                self.name = data['name']

                userData = data['userData']
                
                UserDataRead = json.loads(userData)
  

                conn.close()
                print(self.name)
                print(userData)
            

                return self.name




        def detectFace(self ,imgFile):
                headers = {'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': KEY}
                body = open(imgFile ,'rb')
                params = urllib.parse.urlencode({'returnFaceId': 'true'})
                conn = http.client.HTTPSConnection('centralindia.api.cognitive.microsoft.com')# this should be taken from your endpoint
                conn.request("POST", '/face/v1.0/detect?%s' % params, body, headers) # this is the specific endpoint
                response = conn.getresponse()
                photo_data = json.loads(response.read().decode('utf-8'))
                print(photo_data)
                
                if not photo_data: # if post is empty (meaning no face found)
                        return faceIdList
                else: # if face is found
                        for face in photo_data: # for the faces identified in each photo
                                faceIdList.append(str(face['faceId'])) # get faceId for use in identify
                                return faceIdList

