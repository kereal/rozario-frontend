import posts from "./posts.js"

import { json } from "@sveltejs/kit"

export function GET({ url }) {
  console.log("uuuu", url)
  return json(posts)
}
