export async function load({ fetch, url }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    return {
      path: url.pathname,
      categories: json.catalog,
      cityMeta: json.cityMeta,
      activeOrders: json.activeOrders,
      deliveryAddresses: json.deliveryAddresses,
      orderStories: json.orderStories,
      recommendations: json.recommendations
    }
  } catch (e) {
    console.log(e)
  }
}
