const fs = require("fs")
const path = require("path")

const BASE_URL = "https://rozarioflowers.ru"
console.log("asdfa", __dirname)

const FOOTER_DIR = "./src/routes"

const pages = [
  {
    path: "catalog/roses"
  },
  {
    path: "catalog/bouquets"
  },
  {
    path: "profile"
  },
  {
    path: "cart"
  }
]

const render = (pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      (page) => `
    <url><loc>${BASE_URL}/${page.path}</loc><priority>0.85</priority></url>
  `
    )
    .join("\n")}
</urlset>
`

export function get(req, res, next) {
  res.setHeader("Cache-Control", `max-age=0, s-max-age=${600}`) // 10 minutes
  res.setHeader("Content-Type", "application/rss+xml")

  const sitemap = render(pages)
  res.end(sitemap)
}
