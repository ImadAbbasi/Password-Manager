import connectMongo from "@/database/conn";
import Passwords from "@/model/passSchema";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "GET") {
    // Get the user's email from query parameters
    const userEmail = req.query.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "Email is required in the query parameters." });
    }

    try {
      // Use Mongoose to find passwords associated with the provided email
      const passwords = await Passwords.find({ ref: userEmail });

      // Decrypt the passwords
      const decryptedPasswords = passwords.map((password) => {
        const bytes = CryptoJS.AES.decrypt(
          password.password,
          process.env.CRYPTO_SECRET_KEY
        );
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        return {
          ...password._doc,
          password: decryptedPassword,
        };
      });

      res.status(200).json(decryptedPasswords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error while fetching passwords." });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid, only GET method is allowed!" });
  }
}
