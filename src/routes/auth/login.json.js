import fs from "fs";
export function post(req, res) {
  const emailCode = req.body.code;
  const code = fs.readFileSync("code.txt");
  if (code === emailCode) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: true }));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: false }));
  }
}
