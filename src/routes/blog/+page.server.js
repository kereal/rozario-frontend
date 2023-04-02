export async function load({ fetch, url }) {
  const blogRes = await fetch(`/blog/posts.json`)
  const blogJson = await blogRes.json()

  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    return {
      cityMeta: json.cityMeta,
      posts: blogJson[0]
    }
  } catch (e) {
    console.log(e)
  }
}
