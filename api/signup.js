import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const filePath = path.join(process.cwd(), "users.json");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

  let users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  if (users.find(u => u.username === username)) return res.status(400).json({ error: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hash });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(200).json({ success: true });
              }
