export async function load({ fetch, url }) {
  try {
    const res = await fetch(
      `/data?city=${url.searchParams.get("city")}&path=${url.searchParams.get("path")}`
    )
    const json = await res.json()
    return {
      slug: page.slug,
      path: page.path,
      categories: json.catalog,
      cityMeta: json.cityMeta,
      activeOrders: json.activeOrders,
      deliveryAddresses: json.deliveryAddresses,
      orderStories: json.orderStories,
      recommendations: json.recommendations,
      orderList: json.orderList,
      cityMeta: json.cityMeta
    }
  } catch (e) {
    console.log(e)
  }
}
