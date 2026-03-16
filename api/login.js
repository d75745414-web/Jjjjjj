import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const filePath = path.join(process.cwd(), "users.json");
const SECRET = process.env.JWT_SECRET || "zypher_secret_key";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;
  let users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid login" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid login" });

  const token = jwt.sign({ username }, SECRET, { expiresIn: "7d" });
  res.status(200).json({ token });
                                          }
