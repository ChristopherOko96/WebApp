 //https://www.youtube.com/watch?v=HLbtNPcGVNo&list=PLNmsVeXQZj7ogA_q-mOoYH3dDQIh8B3Oe&index=7
 //video 7


 //holen des Moduls express
 const express = require("express");



// Lädt das eingebaute "path"-Modul, das Funktionen zum Arbeiten mit Dateipfaden bietet.
 const path =require("path")

 //es wird eine Instanz des Express aufgesetzt
 const app= express(); 

//Stellt statische Dateien aus dem Ordner "public" bereit, z. B. für CSS, JS, Bilder.
//man kann die html datei besser verküpfen guck index.html durch . ist es im root
 app.use(express.static("public"));


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

app.get("/",(req,res,next) =>{
   res.send("<h1>hallo wie gehts </h1>")
})

 app.get("/users/",(req,res) =>{
    console.log("users: "+res.locals.validateUsers)
    res.send("<h1> Hallo get Users</h1>");
 }); 

 //Create
 app.post("*",(req,res) =>{   
    console.log("Ip addresse: "+req.ip)
    res.send("<h1> Hallo post Express</h1>");
 }); 

//Update
 app.put("*",(req,res) =>{   
    console.log("Ip addresse: "+req.ip)
    res.send("<h1> Hallo put Express</h1>");
 });

//Delete
 app.delete("*",(req,res) =>{   
    console.log("Ip addresse: "+req.ip)
    res.send("<h1> Hallo delete Express</h1>");
 });  

 //der Server laueft auf port 3000
 app.listen(3000,"0.0.0.0",()=>{
    console.log("Server listen on port 3000");
 });
 
