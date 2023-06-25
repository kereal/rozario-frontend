import { API_URL } from "@/data/constants"

console.log("API_URL", API_URL)

export async function load({ url, fetch, session }) {
  const res = await fetch(
    `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
  )
  const json = await res.json()

  const res1 = await fetch(`${API_URL}/api/rozmain`)
  const solData = await res1.json()

  return {
    //flowersList: json.flowersList,
    flowersList: solData.products,
    collections: json.collections,
    //categories: json.catalog,
    categories: solData.taxons,
    recommendations: json.recommendations,
    user: session?.user,
    cityMeta: json.cityMeta,
    blogposts: json.blogposts,
    //testimonials: json.testimonials,
    testimonials: solData.reviews,
    smiles: json.smiles,
    orderList: json.orderList
  }
}
