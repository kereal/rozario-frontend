import { nanoid } from "nanoid"
import fs from "fs"

export function post(req, res) {
  const emailCode = nanoid()
  fs.writeFileSync("code.txt")
  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({ mail: req.body.email }))
}
