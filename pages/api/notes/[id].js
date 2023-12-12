import connectMongo from "@/database/conn";
import Notes from "@/model/noteSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "GET") {
    const noteId = req.query.id;

    try {
      const note = await Notes.findById(noteId);

      if (!note) {
        return res.status(404).json({ message: "Note not found!" });
      }

      res.status(200).json(note);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Server error while fetching note details!" });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid, only GET method is allowed!" });
  }
}
