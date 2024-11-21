// Module laden
const express = require("express");
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Firebase initialisieren
const serviceAccount = require("./connect_now_pk.json"); // Deine Service-Account-JSON-Datei
const adminApp = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// Express-App initialisieren
const app = express();

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "..", "..", "client")));

// Middleware für Formulardaten und JSON-Daten
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route für die Startseite
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "client", "index.html"));
  console.log("Serving file from:", path.join(__dirname));
});

// Route für das Login - Speichert Benutzerdaten in Firestore
app.post("/login", async (req, res) => {
  try {
    const { username, loginMail, passwort } = req.body;

    // Überprüfen, ob alle Felder vorhanden sind
    if (!username || !loginMail || !passwort) {
      return res.status(400).send("Alle Felder sind erforderlich!");
    }

    console.log("Login-Daten empfangen:");
    console.log("Benutzername:", username);
    console.log("E-Mail:", loginMail);
    console.log("Passwort:", passwort);

    // Daten in Firestore speichern
    const userRef = db.collection("users").doc(username);
    await userRef.set({
      username: username,
      email: loginMail,
      password: passwort,
      createdAt: new Date(),
    });

    console.log("Daten erfolgreich in Firestore gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Daten:", error);
  }
});

// Server starten
app.listen(3000, "0.0.0.0", () => {
  console.log("Server listen on port 3000");
});

