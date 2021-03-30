import admin from "firebase-admin";

const service_account = require("../constants/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

export const db = admin.firestore();
