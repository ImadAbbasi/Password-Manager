import connectMongo from "@/database/conn";
import Passwords from "@/model/passSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Password ID is required." });
    }

    try {
      await Passwords.findByIdAndDelete(id);
      res.status(200).json({ message: "Password deleted successfully." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Server error while deleting the password." });
    }
  } else {
    res.status(500).json({
      message: "HTTP method not valid, only DELETE method is allowed!",
    });
  }
}
