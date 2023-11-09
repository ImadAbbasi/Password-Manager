import connectMongo from "@/database/conn";
import Notes from "@/model/noteSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "GET") {
    const userEmail = req.query.email;

    if (!userEmail) {
      res.status(400).json({ error: "Email is required in query parameters!" });
    }

    try {
      const notes = await Notes.find({ ref: userEmail });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: "Server Error while fetching notes!" });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid, only GET method is allowed!" });
  }
}
