import connectMongo from "@/database/conn";
import Notes from "@/model/noteSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "PUT") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have data!" });
    }

    const { title, note } = req.body;
    if (!title || !note) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the body!" });
    }

    const { id } = req.query;

    try {
      // Find the note by ID
      const existingNote = await Notes.findById(id);

      if (!existingNote) {
        return res.status(404).json({ error: "Note not found!" });
      }

      // Update the note with the new data
      existingNote.title = title;
      existingNote.note = note;

      // Save the updated note
      const updatedNote = await existingNote.save();

      res.status(200).json({ status: true, updatedNote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error while updating note!" });
    }
  } else {
    res
      .status(500)
      .json({ messaage: "HTTP method not valid, only PUT request allowed!" });
  }
}
