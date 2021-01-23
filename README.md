<h1 id="aWayIn">Smart attendance automation</h1>
<p><img src="https://lh3.googleusercontent.com/O9nHFV1_V4qK4raAFg_D2iAHzrnTz9Np77jmXbGX56f-sRiKqxCju83-OMu-uGu1cHTQYbVDLzE_Pw" alt="enter image description here"></p>
<p><em>A Smart and innovative way for managing attendance.</em><br>
<img src="https://docs.microsoft.com/en-us/azure/cognitive-services/face/images/face.detection.jpg" alt="enter image description here">
<br>This the video of the whole project - https://youtu.be/zHBTr8XeW0w
</p>
<h2 id="installation">Installation</h2>
<blockquote>
<p>OpenCv</p>
</blockquote>
<ul>
<li>Follow this tutorial and install open cv on Raspberry pi - <a href="https://www.pyimagesearch.com/2017/09/04/raspbian-stretch-install-opencv-3-python-on-your-raspberry-pi/">Link</a></li>
</ul>
<blockquote>
<p>Nodejs and React.js</p>
</blockquote>
<ul>
<li>Install Node Js and React On Client and Admin Computers.</li>
</ul>
<h2 id="usage">Usage</h2>
<blockquote>
<p>On Pi</p>
</blockquote>
<ol>
<li>Git clone the repo</li>
<li>Now for the Raspberry pi - Implentation run <a href="http://face.py">face.py</a> and you are done !!!</li>
</ol>
<blockquote>
<p>Client Web - App</p>
</blockquote>
<ol>
<li>Guide to the <code>aWayIn-register folder</code></li>
<li><code>npm i</code></li>
<li><code>npm start</code></li>
</ol>
<blockquote>
<p>Admin Dashboard Web-app</p>
</blockquote>
<ol>
<li>Guide to the <code>aWayIn dashboard folder</code></li>
<li><code>npm i</code></li>
<li><code>npm start</code></li>
</ol>
<h2 id="the-problem-it-solves">The problem it solves</h2>
<p>Every day millions of attendance of billions of students are taken the manual way and imagine how much time we are wasting every day. To ease up we guys in this 30 hours of hackathon have come up with a smart and innovative way to take student attendance efficiently. We are using a facial recognition based attendance system having a client web app and admin web app.<br>
The student can register his facial identity from anywhere in the world using the client web app. As soon as the student enters the room he will look into the Camera and his attendance will be done automatically and he will receive an SMS on his phone. Also, the admin will also get the SMS of the students’ attendance SMS and on his admin dashboard also the students’ pic ( the pic captured during attendance from the camera) and also his name, date and time.</p>
<h2 id="challenges-we-ran-into">Challenges we ran into</h2>
<p>The major challenges was with implementing the project on a processing power restricted environment of raspberry pi for running M.L and CNN and we have to come up with a load efficient solution to take facial recognition and initially solve Student attendance.</p>
<h2 id="technologies-we-used">Technologies we used</h2>
<p>We are using Open cv - For face  Detection on a Raspberry pi b3 + , on the webapp we are using React.js as a front end ,for facial recognition we are using microsoft azure face api , backend we are using fire base and cloudinary(to store images ) and for messaging service we are using twilio api.</p>

