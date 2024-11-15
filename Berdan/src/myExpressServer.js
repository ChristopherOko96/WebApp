 //https://www.youtube.com/watch?v=HLbtNPcGVNo&list=PLNmsVeXQZj7ogA_q-mOoYH3dDQIh8B3Oe&index=7
 //video 7


 //holen des Moduls express
 const express = require("express");



// Lädt das eingebaute "path"-Modul, das Funktionen zum Arbeiten mit Dateipfaden bietet.
 const path =require("path");
const { nextTick } = require("process");
const { SourceTextModule } = require("vm");

 //es wird eine Instanz des Express aufgesetzt
 const app= express(); 

//Stellt statische Dateien aus dem Ordner "public" bereit, z. B. für CSS, JS, Bilder.
//man kann die html datei besser verküpfen guck index.html durch . ist es im root
app.use(express.static(path.join(__dirname, "..", "..", "Said", "Websitecoding")));

 



 /*der erste Parameter gibt an an welche verzeichnis er es schicken soll
 bedeutet wenn ich * habe kann ich localhost/fewfefwef schreiben
    es wird an alle verzeichnisse gesendet 
 die methode all gibt an egal welche Methode Post,get,put...
 es reagiert auf alle Methoden
*/
//Die Methoden werden auch CRUD Methode genannt: Create, Read, Update, Delete

//Read
 /*app.get("/",(req,res) =>{
   //gib den Pfad aus
    console.log("Pfad ist:  "+path.join(__dirname))
    //es wird ein file gesendet
    res.sendFile(path.join(__dirname)+"/index.html");
 });
 */ 

app.get("/",(req,res,next) =>{
   
   res.locals.validateUsers= "Bob"
   console.log("middelware: "+res.locals.validateUsers)
   console.log
   next();
})

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,"..","..", "Said","Websitecoding", "index.html"));
  
});





app.use(express.urlencoded({ extended: true })); // Für URL-codierte Daten (Formulardaten)
app.use(express.json()); // Für JSON-Daten

// Route für das Login
app.post('/login', (req, res) => {
   const { username, password } = req.body; // Extrahiert Benutzername und Passwort
   console.log("hallo");
   console.log('loginMail:', req.body.username);
   console.log('loginPass:', req.body.password);
   next();
   

  
});



 //der Server laueft auf port 3000
 app.listen(3000,"0.0.0.0",()=>{
    console.log("Server listen on port 3000");
 });
 
