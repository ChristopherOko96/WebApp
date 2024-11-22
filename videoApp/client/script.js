let localStream; // Lokaler Stream
let isMicMuted = false; // Status des Mikrofons
let isVideoOff = false; // Status der Kamera
let isStreaming = false;
let screenStream;
let username = "nix";
let mailadresse ="nix";


function getName(){


    return localStorage.getItem("username");
}

// Funktion zum Erstellen oder Beitreten eines Raums
function enterRoom(action) {
    
    console.log("Benutzername und E-Mail gespeichert:", localStorage.getItem("username"), localStorage.getItem("email"));


    if (action === 'create') {
        alert('Raum wird erstellt...');
        
    } else if (action === 'join') {
        alert('Raum beitreten...');
        
    }
    window.location.href = "roomPage.html";
    document.getElementById("abmeldeButton").style.display="none";
    startMedia();
}

// Funktion zum Verlassen eines Raums
function leaveRoom() {
    alert("Raum verlassen....");
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

function cancelVideoScreen(){
    if (localStream) {
        // Stoppe alle Tracks des lokalen Streams
        localStream.getTracks().forEach(track => track.stop());

        // Finde das Video-Tile, das den lokalen Stream anzeigt
        const videoGrid = document.querySelector('.video-grid');
        const localTile = Array.from(videoGrid.children).find(tile =>
            tile.querySelector('video')?.srcObject === localStream
        );

        // Entferne das Video-Tile
        if (localTile) {
            removeVideoTile(localTile);
        }

        // Setze den lokalen Stream zurück
        localStream = null;
        console.log("Kamera und Mikrofon ausgeschaltet.");
    } else {
        console.log("Kein lokaler Stream zum Ausschalten.");
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
    // Überprüfen, ob bereits ein Bildschirm geteilt wird, falls ja teilen wird beendet
    if (isStreaming && screenStream) {
    cancelSharingScreen();
    }else{
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
}

function cancelSharingScreen(){
    if(!isStreaming){
        return;
    }
    const videoGrid = document.querySelector('.video-grid');
        // Beende den Stream
        screenStream.getTracks().forEach(track => track.stop());
        // Entferne das zugehörige Video-Tile
        const screenTile = Array.from(videoGrid.children).find(tile =>
            tile.querySelector('video')?.srcObject === screenStream
        );
        
        removeVideoTile(screenTile);

        // Setze den Status zurück
        screenStream = null;
        isStreaming = false;

        console.log("Screensharing beendet.");
        alert("teilen beendet ...");
        return;
}

    
function removeVideoTile(tile) {
    if (tile) {
        tile.remove();
        console.log("Video-Tile entfernt:", tile);
    }
}

// Anruf beenden
function endCall() {
    cancelSharingScreen();
    cancelVideoScreen();
    alert("Anruf beenden");
    document.getElementById("abmeldeButton").style.display="inline";
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
// Enter Taste für Chatfunktion
document.getElementById("chatMessage")?.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
// Funktion zum Abmelden
function logout() {
    localStorage.removeItem("username");
    document.getElementById("username").style.display = "none";
    localStorage.removeItem("usernameUnterWilkommen");
    document.getElementById("usernameUnterWilkommen").style.display = "none";
    document.getElementById("abmeldeButton").style.display="none";
}

function loginUser() {
    console.log("Das ist die Methode loginUser");
    username = document.getElementById("usernameInputFeld").value;
    mailadresse = document.getElementById("loginMail").value;
    if (username != "" && mailadresse != "") {
        // Speichere den Benutzernamen und die E-Mail im localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", mailadresse);

        console.log("Benutzername und E-Mail gespeichert:", username, mailadresse);

        // Wechsle zur afterLogin.html
        window.location.href = "afterLogin.html";
    }else{
        
        alert("FEHLER!!!  FELDER NICHT LEER LASSEN");
    }

    
}

/*
function registerUser() {
    username = document.getElementById("usernameInputFeldReg").value;
    mailadresse = document.getElementById("registerMail").value;
    if (username != "" && mailadresse != "") {
        document.getElementById("username").textContent = username;
        document.getElementById("username").style.display = "inline";
        document.getElementById("usernameUnterWilkommen").textContent = username;
        document.getElementById("usernameUnterWilkommen").style.display = "inline";
        document.getElementById("abmeldeButton").style.display="inline";

    }else{
        
        alert("FEHLER!!!  FELDER NICHT LEER LASSEN");
    }

}
    */
   async function registerUser() {
    const username = document.getElementById("usernameInputFeldReg").value;
    const email = document.getElementById("registerMail").value;
    const password = document.getElementById("registerPass").value;

    if (!username || !email || !password) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.text();

        if (response.ok) {
            alert(result);
            showPage("loginPage");
        } else {
            alert("Fehler bei der Registrierung: " + result);
        }
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        alert("Ein Fehler ist aufgetreten. Bitte später erneut versuchen.");
    }
}


