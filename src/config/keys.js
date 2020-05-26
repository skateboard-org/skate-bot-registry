const credential = require("../serviceAccountKeys/firebase-adminsdk.json");

const datebaseURL = "https://skate-board.firebaseio.com";

const firebaseConfig = {
  apiKey: "AIzaSyDj1-XFs8nZBUSYyPgOZRGC3iePDglcpwk",
  authDomain: "skate-board.firebaseapp.com",
  databaseURL: "https://skate-board.firebaseio.com",
  projectId: "skate-board",
  storageBucket: "skate-board.appspot.com",
  messagingSenderId: "223602551302",
  appId: "1:223602551302:web:b692c7d5e2b660a0f9b187",
  measurementId: "G-1HZW2VNTZ1",
};

if (process.env.NODE_ENV === "production") {
  module.exports = firebaseConfig;
} else {
  module.exports = firebaseConfig;
}
