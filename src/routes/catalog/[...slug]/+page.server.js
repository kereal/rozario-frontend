import { API_URL } from "@/data/constants"

export async function load({ fetch, params, url }) {
  try {
    const regex = /(.jpg|.webp|.png|.jpeg|.gif|.svg)/

    if (params.slug.substring(params.slug.lastIndexOf(".")).match(regex)) {
      return
    }

    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )

    const json = await res.json()
    const res1 = await fetch(`${API_URL}/rozmain${url.pathname}`)
    const solData = await res1.json()

    return {
      path: url.pathname,
      //flowersList: json.flowersList,
      flowersList: solData.products,
      categories: json.catalog,
      //catalogSubCategories: json.catalogSubCategories,
      catalogSubCategories: solData.taxons,
      cityMeta: json.cityMeta,
      breadcrumbs: json.breadcrumbs,
      filters: json.filters,
      orderList: json.orderList,
      currentTaxon: solData.current_taxon
    }
  } catch (e) {
    console.log(e)
  }
}
