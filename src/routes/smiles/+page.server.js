export async function load({ fetch, url }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    return {
      posts: json.blogposts,
      cityMeta: json.cityMeta
    }
  } catch (e) {
    console.log(e)
  }
}
