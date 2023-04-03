export async function load({ fetch, url }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    return {
      path: url.pathname,
      events: json.events,
      recommendations: json.recommendations
    }
  } catch (e) {
    console.log(e)
  }
}
