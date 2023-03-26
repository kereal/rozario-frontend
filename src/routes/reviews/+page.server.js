export async function load({ fetch, url, session }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    const res1 = await fetch(`http://127.0.0.1:3003/rozmain`)
    const solData = await res1.json()
    return {
      reviews: solData.reviews,
      cityMeta: json.cityMeta
    }
  } catch (e) {
    console.log(e)
  }
}
