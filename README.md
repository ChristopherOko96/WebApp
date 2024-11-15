# WebApp

Jeder kann seine codestücke einfach in seinem Ordner Testen und alle anderen können auch permanent drauf gucken.. somit können wir uns auch jederzeit darüber austauschen


project-root/
│
├── server/
│   ├── signalingServer.js   # Signalisierungsserver mit Socket.io
│   ├── mediasoupServer.js   # SFU-Server mit Mediasoup
│   └── config.js            # Gemeinsame Konfiguration für beide Server
│
├── client/
│   ├── index.html           # HTML für die Benutzeroberfläche
│   ├── script.js            # Client-JavaScript
│   └── mediasoupClient.js   # Verbindungslogik zum SFU-Server
│
└── package.json


ich würde dies als 3 Schichten Architektur Vorschlagen..
unser Dateiverzeichniss sieht dann so aus.. ich teste mich da mal langsam ran.. 
