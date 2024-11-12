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
