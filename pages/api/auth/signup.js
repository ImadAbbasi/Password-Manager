import connectMongo from "@/database/conn";
import Users from "@/model/userSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!" }));

  //   Only post method is accepted
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data!" });

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request body!" });
    }

    // Check for existing user
    const checkExixting = await Users.findOne({ email });

    // if user exists
    if (checkExixting)
      return res.status(422).json({ message: "User Already Exists!" });

    // if the user does not exist

    try {
      const user = await Users.create({
        username,
        email,
        password: await hash(password, 12),
      });
      res.status(201).json({ status: true, user });
    } catch (error) {
      res.status(500).json({ error: "Error Creating User!" });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted!" });
  }
  res.json({ message: "Signup Post Request" });
}
