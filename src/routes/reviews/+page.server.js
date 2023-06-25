import { API_URL } from "@/data/constants"

export async function load({ fetch, url }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    const res1 = await fetch(`${API_URL}/api/rozmain`)
    const solData = await res1.json()
    return {
      reviews: solData.reviews,
      cityMeta: json.cityMeta
    }
  } catch (e) {
    console.log(e)
  }
}
