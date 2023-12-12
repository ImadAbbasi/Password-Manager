import connectMongo from "@/database/conn";
import Notes from "@/model/noteSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Note Id is required!" });
    }

    try {
      await Notes.findByIdAndDelete(id);
      res.status(200).json({ message: "Note Deleted Successfuly!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server Error While Deleting Note!" });
    }
  } else {
    res.status(500).json({
      message: "HTTP method not valid, only DELETE method is allowed!",
    });
  }
}
