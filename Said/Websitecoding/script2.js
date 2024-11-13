function showPage(pageId) {
    // Alle Seiten ausblenden
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Gewählte Seite anzeigen
    document.getElementById(pageId).classList.add('active');
}

function enterRoom(action) {
    if (action === 'create') {
        alert('Raum wird erstellt...');
    } else if (action === 'join') {
        alert('Raum beitreten...');
    }
    showPage('roomPage'); // Nach dem Erstellen oder Beitreten zur Raumansicht wechseln
}

function leaveRoom() {
    showPage('homePage'); // Zurück zur Hauptseite wechseln
}

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