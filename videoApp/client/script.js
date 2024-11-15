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

// Video- und Chatfunktionen
function toggleMic() {
    alert("Mikrofon an/aus");
    // Logik zum Aktivieren/Deaktivieren des Mikrofons hinzufügen
}

function toggleVideo() {
    alert("Video an/aus");
    // Logik zum Aktivieren/Deaktivieren des Videos hinzufügen
}

function shareScreen() {
    alert("Bildschirmfreigabe starten/beenden");
    // Logik zum Teilen des Bildschirms hinzufügen
}

function endCall() {
    alert("Anruf beenden");
    showPage('homePage');
}

// Chatfunktion
function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const chatMessage = document.getElementById("chatMessage").value;
    if (chatMessage.trim() !== "") {
        const messageElement = document.createElement("div");
        messageElement.textContent = "Du: " + chatMessage;
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
