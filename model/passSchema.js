import { Schema, models, model } from "mongoose";

const PasswordSchema = new Schema(
  {
    site: String,
    username: String,
    email: String,
    password: String,
    ref: String,
  },
  { timestamps: true }
);

const Passwords = models.password || model("password", PasswordSchema);

export default Passwords;
