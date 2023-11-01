import { Schema, models, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: String,
    note: String,
    ref: String,
  },
  { timestamps: true }
);

const Notes = models.note || model("note", NoteSchema);

export default Notes;
