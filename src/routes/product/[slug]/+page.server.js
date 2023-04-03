export async function load({ fetch, url }) {
  console.log(url)

  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()

    return {
      flowersList: json.flowersList,
      categories: json.catalog,
      cityMeta: json.cityMeta,
      activeOrders: json.activeOrders,
      deliveryAddresses: json.deliveryAddresses,
      orderStories: json.orderStories,
      smiles: json.smiles,
      testimonials: json.testimonials,
      recommendations: json.recommendations,
      product: json.product,
      orderList: json.orderList
    }
  } catch (e) {
    console.log(e)
  }
}
