import connectMongo from "@/database/conn";
import Notes from "@/model/noteSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have data!" });
    }
    const { title, note, ref } = req.body;
    if (!title || !note) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the body!" });
    }

    try {
      const createNote = await Notes.create({
        title,
        note,
        ref,
      });
      res.status(201).json({ status: true, createNote });
    } catch (error) {
      res.status(500).json({ error: "Error adding to the notes!" });
    }
  } else {
    res
      .status(500)
      .json({ messaage: "HTTP method not valid only POST request allowed!" });
  }
  res.json({ messaage: "Added Note!" });
}
