const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const priv_key = process.env.FIREBASE_PRIVATE_KEY || "";

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: priv_key.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const ref = admin.database().ref();

app.get("/api/data", (req, res) => {
  ref.once("value").then((snap) => {
    res.send(snap.val());
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
