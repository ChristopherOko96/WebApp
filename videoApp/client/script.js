let localStream; // Lokaler Stream
let isMicMuted = false; // Status des Mikrofons
let isVideoOff = false; // Status der Kamera
let isStreaming = false;
let screenStream;



// Funktion zum Anzeigen der gewünschten Seite
function showPage(pageId) {
    // Alle Seiten ausblenden
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Gewählte Seite anzeigen
    document.getElementById(pageId).classList.add('active');
}


// Funktion zum Lesen von Eingabedaten
function readData(mail, passwort) {
    const mailInhalt = document.getElementById(mail)?.value || "";
    const passwortInhalt = document.getElementById(passwort)?.value || "";
    console.log("Email:", mailInhalt);
    console.log("Passwort:", passwortInhalt);
    return { mailInhalt, passwortInhalt };
}

// Funktion zum Erstellen oder Beitreten eines Raums
function enterRoom(action) {
    if (action === 'create') {
        alert('Raum wird erstellt...');
    } else if (action === 'join') {
        alert('Raum beitreten...');
    }
    showPage('roomPage'); // Zur Raumansicht wechseln
    startMedia();
}

// Funktion zum Verlassen eines Raums
function leaveRoom() {
    showPage('homePage'); // Zurück zur Hauptseite wechseln
}

// Funktion zum Abmelden
function logout() {
    alert('Abmelden...');
    showPage('homePage'); // Zurück zur Hauptseite nach dem Abmelden
}


function addVideoTile(stream, isMuted = false) {
    // Finde die Video-Grid-Container
    const videoGrid = document.querySelector('.video-grid');

    // Erstelle eine neue `video-tile`
    const videoTile = document.createElement('div');
    videoTile.classList.add('video-tile');

    // Erstelle ein Video-Element
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream; // Weisen Sie den Stream als Quelle zu
    videoElement.autoplay = true;
    videoElement.playsInline = true; // Wichtig für mobiles Browsing
    videoElement.muted = isMuted; // Stummschalten, wenn lokal

    // Füge das Video-Element in die `video-tile` ein
    videoTile.appendChild(videoElement);

    // Füge die `video-tile` zum Video-Grid hinzu
    videoGrid.appendChild(videoTile);

    console.log("Video hinzugefügt:", videoTile);
    return videoTile; // Gibt die `video-tile` zurück, falls benötigt
}




// Starte die Video- und Audioaufnahme
async function startMedia() {
    try {
        // Zugriff auf Kamera und Mikrofon
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Füge das lokale Video in einer `video-tile` hinzu
        addVideoTile(localStream, true); // Lokales Video ist stummgeschaltet

        console.log("Kamera und Mikrofon erfolgreich gestartet.");
    } catch (error) {
        console.error("Fehler beim Start von Kamera/Mikrofon:", error);
        alert("Bitte erlaube den Zugriff auf Kamera und Mikrofon.");
    }
}




// Video- und Chatfunktionen
function toggleMic() {
    if (!localStream) {
        alert("Der Videostream ist noch nicht gestartet.");
        return;
    }

    localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        isMicMuted = !track.enabled;
    });

    const micButton = document.querySelector('#toggleMicButton');
    micButton.textContent = isMicMuted ? "🎤 Stumm" : "🎤 Aktiviert";
    console.log(`Mikrofon ${isMicMuted ? "ausgeschaltet" : "eingeschaltet"}`);
}

function toggleVideo() {
    if (!localStream) {
        alert("Der Videostream ist noch nicht gestartet.");
        return;
    }

    localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        isVideoOff = !track.enabled;
    });

    const videoButton = document.querySelector('#toggleVideoButton');
    videoButton.textContent = isVideoOff ? "📹 Aus" : "📹 An";
    console.log(`Kamera ${isVideoOff ? "ausgeschaltet" : "eingeschaltet"}`);
    // Logik zum Aktivieren/Deaktivieren des Videos hinzufügen
}

async function shareScreen() {
    const videoGrid = document.querySelector('.video-grid');
    // Überprüfen, ob bereits ein Bildschirm geteilt wird
    if (isStreaming && screenStream) {
        // Beende den Stream
        screenStream.getTracks().forEach(track => track.stop());
        // Entferne das zugehörige Video-Tile
        const screenTile = Array.from(videoGrid.children).find(tile =>
            tile.querySelector('video')?.srcObject === screenStream
        );
        
        if (screenTile) {
            screenTile.remove();
        }

        // Setze den Status zurück
        screenStream = null;
        isStreaming = false;

        console.log("Screensharing beendet.");
        alert("teilen beendet ...");
        return;
    }
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        // Füge den Bildschirmstream in einer `video-tile` hinzu
        addVideoTile(screenStream);
        isStreaming = true;
        console.log("Screensharing gestartet.");
    } catch (error) {
        console.error("Fehler beim Starten von Screensharing:", error);
        alert("Bitte erlaube den Zugriff auf den Bildschirm.");
    }
}

    
function removeVideoTile(tile) {
    if (tile) {
        tile.remove();
        console.log("Video-Tile entfernt:", tile);
    }
}


function endCall() {
    alert("Anruf beenden");
    showPage('afterLogin');
}

// Chatfunktion
function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const chatMessage = document.getElementById("chatMessage").value;
    if (chatMessage.trim() !== "") {
        const messageElement = document.createElement("div");
        messageElement.textContent = document.getElementById("usernameInputFeld").value+" : \n" + chatMessage;
        messageElement.classList.add("chat-message");
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        document.getElementById("chatMessage").value = "";
    }
}

document.getElementById("chatMessage")?.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function logout() {
    localStorage.removeItem("username");
    document.getElementById("username").style.display = "none";
    localStorage.removeItem("usernameUnterWilkommen");
    document.getElementById("usernameUnterWilkommen").style.display = "none";
    document.getElementById("abmeldeButton").style.display="none";
    showPage('homePage');
}

function loginUser() {
    const username = document.getElementById("usernameInputFeld").value;
    const mailadresse = document.getElementById("loginMail").value;
    if (username != "" && mailadresse != "") {
        document.getElementById("username").textContent = username;
        document.getElementById("username").style.display = "inline";
        document.getElementById("usernameUnterWilkommen").textContent = username;
        document.getElementById("usernameUnterWilkommen").style.display = "inline";
        document.getElementById("abmeldeButton").style.display="inline";

        showPage('afterLogin');
    }else{
        
        alert("FEHLER!!!  FELDER NICHT LEER LASSEN");
    }

    
}

function registerUser() {
    const username = document.getElementById("usernameInputFeldReg").value;
    const mailadresse = document.getElementById("registerMail").value;
    if (username != "" && mailadresse != "") {
        document.getElementById("username").textContent = username;
        document.getElementById("username").style.display = "inline";
        document.getElementById("usernameUnterWilkommen").textContent = username;
        document.getElementById("usernameUnterWilkommen").style.display = "inline";
        document.getElementById("abmeldeButton").style.display="inline";

        showPage('afterLogin');
    }else{
        
        alert("FEHLER!!!  FELDER NICHT LEER LASSEN");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").textContent = username;
        document.getElementById("username").style.display = "inline";

        // Kamera und Mikrofon starten
        startMedia();
    } else {
        showPage('homePage');
    }
});

