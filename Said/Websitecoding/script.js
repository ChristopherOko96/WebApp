function showPage(pageId) {
    console.log("Switching to page:", pageId); 

    // Alle Seiten auswählen und sicherstellen, dass keine 'active' Klasse gesetzt ist
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        //page.classList.remove('active');
        page.style.display = "none"; // Alle Seiten verstecken
    });
   
    document.getElementById(pageId).style.display = "block"; // meine Seite anzeigen

    pages.forEach(page => {
        console.log("Aktuelle Seite nach dem Wechsel:", page);
        console.log("Hat 'active' Klasse?", page.classList.contains('active'));
    });
}

function readData(mail, passwort){
    console.log(mail);
    console.log(passwort);
    const mailInhalt = document.getElementById(mail).value;
    const passwortInhalt = document.getElementById(passwort).value;
    console.log(mailInhalt);
    console.log(passwortInhalt);
}
