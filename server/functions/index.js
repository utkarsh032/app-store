const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

// initialize the admin
admin.initializeApp();

// initialize the db instance
const db = admin.firestore();

// function to validate the user JWT token
exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
  // enabling the cors
  cors(req, res, async () => {
    // Get the authorization header from the request
    const authorizationHeader = req.get("Authorization");

    // check if the authorization header is present
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the token from the authorization header
    const token = authorizationHeader.split("Bearer")[1].trim();

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid)
        const doc = await docRef.get()

        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid)
          await userRef.set(decodedToken)
        }

        return res.status(200).json({ success: true, user: decodedToken });
      }
    } catch (error) {
      console.log("Error on validating :", error);
      return res
        .status(402)
        .json({ error: error.message, status: "Unauthorized" });
    }
  });
});
