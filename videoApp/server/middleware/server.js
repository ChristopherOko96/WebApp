const express = require("express");
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

// Firebase initialisieren
const serviceAccount = require("./connect_now_pk.json");
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const app = express();

// Middleware für Formulardaten und JSON-Daten
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "..", "..", "client")));



// Nodemailer-Konfiguration für Outlook
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // SMTP-Server für Outlook
  port: 587,
  secure: false,
  auth: {
    user: "deine-outlook-email@outlook.de", // Deine Outlook-E-Mail-Adresse
    pass: "dein-outlook-passwort", // Passwort oder App-spezifisches Passwort
  },
  tls: {
   rejectUnauthorized:false,// Für Testzwecke deaktivieren wir die TLS Validierung
  }
});

// Funktion zum Senden der Verifizierungs-E-Mail
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: "deine-outlook-email@outlook.de",
    to: email,
    subject: "Bitte E-Mail verifizieren",
    html: `<p>Klicken Sie auf den folgenden Link, um Ihre E-Mail zu verifizieren:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verifizierungs-E-Mail an ${email} gesendet.`);
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    throw new Error("E-Mail konnte nicht gesendet werden.");
  }
};

// Route für Registrierung
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Empfangene Daten:", req.body);

    if (!username || !email || !password) {
      return res.status(400).send("Alle Felder sind erforderlich!");
    }

    // Benutzer in Firebase Authentication erstellen
    const userRecord = await getAuth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: username,
    });

    console.log("Benutzer erstellt:", userRecord.uid);

    // Verifizierungslink generieren
    const verificationLink = await getAuth().generateEmailVerificationLink(email);

    // Verifizierungs-E-Mail senden
    await sendVerificationEmail(email, verificationLink);

    res.status(200).send("Benutzer erfolgreich registriert. Bitte überprüfen Sie Ihre E-Mail!");
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    res.status(500).send("Fehler bei der Registrierung.");
  }
});

// Route für das Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("E-Mail und Passwort sind erforderlich!");
    }

    // Benutzer aus Firebase Auth abrufen
    const user = await getAuth().getUserByEmail(email);

    // Verifizierungsstatus prüfen
    if (!user.emailVerified) {
      return res.status(403).send("Bitte verifizieren Sie Ihre E-Mail-Adresse, um sich einzuloggen!");
    }

    // Zugriff gewähren
    res.status(200).send("Login erfolgreich. Willkommen zurück!");
  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).send("Fehler beim Login.");
  }
});

// Server starten
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
