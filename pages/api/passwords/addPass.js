import connectMongo from "@/database/conn";
import Passwords from "@/model/passSchema";
import CryptoJS from "crypto-js"; // Import crypto-js

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have data!" });
    }
    const { site, username, email, password, ref } = req.body;
    if (!site || !username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the body!" });
    }

    // Check for existing data
    const existingData = await Passwords.findOne({
      $and: [{ email }, { site }],
    });
    if (existingData) {
      return res.status(201).json({ message: "Already exists" });
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_SECRET_KEY
    ).toString();

    // If you need to decrypt the password later, store the secret key securely.

    try {
      const pass = await Passwords.create({
        site,
        username,
        email,
        password: encryptedPassword, // Store the encrypted password
        ref,
      });
      res.status(201).json({ status: true, pass });
    } catch (error) {
      res.status(500).json({ message: "Error Adding To The Passwords!" });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid, only POST method allowed!" });
  }
  res.json({ message: "Added Password" });
}
