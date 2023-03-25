import { flowersList } from "./data.js"
import collections from "./collections.js"
import { catalog, catalogSubCategories } from "./cata.js"
import recommendations from "./recommendation.js"
import cities from "./cities.js"
import events from "./events.js"
import smiles from "./smiles.js"
import testimonials from "./testimonials.js"
import blogposts from "./blogposts.js"
import {
  activeOrders,
  deliveryAddresses,
  orderStories,
  currentOrderList
} from "./order.js"
import {
  compositionList,
  occasionList,
  colorList,
  recipientList,
  priceRangeList
} from "./filters.js"

import { json } from "@sveltejs/kit"

export function GET({ url }) {
  const city = url.searchParams.get("city")
  const path = url.searchParams.get("path")

  const breadcrumbs = []

  if (path) {
    console.log("path", path)
    const catalogItem = catalog.find((item) => item.path === path)
    if (catalogItem) {
      let slugs = path.split("/")
      if (slugs.length > 2 && slugs[1] === "catalog") {
        slugs = slugs.slice(2)
      }
      let acc = "/catalog"
      for (let i = 0; i < slugs.length; i++) {
        acc += "/" + slugs[i]
        const catalogItem = catalog.find((item) => item.path === acc)
        if (catalogItem) {
          breadcrumbs.push(catalogItem)
        }
      }
    }
  }

  console.log("breadcrumbs", breadcrumbs)

  let cityMeta
  cityMeta = cities.filter((item) => item.name === city)
  if (!cityMeta.length) {
    cityMeta = cities.filter((item) => item.subdomain === city)
  }

  cityMeta = cityMeta[0]

  const defaultCityMeta =
    cities.length > 0
      ? cities[0]
      : {
          name: "Мурманск",
          subdomain: "murmansk",
          locativus: "в Мурманске",
          shop: {
            seotype: "Florist",
            name: "Розарио.Цветы",
            address: {
              street: "ул. Ростинская, д. 9А",
              openingHours: { days: "Пн-Вс", hours: "09:00-21:00", seo: "" },
              lat_lng: [69.02332204932151, 33.07223150000001]
            },
            phone: "8 800 250-64-70",
            phone_world: "+7 921 900 80 40",
            contacts_image: "contacts_murmansk",
            owner: "Блинова Светлана Анатольевна"
          }
        }
  const product = {
    name: ""
  }
  return json({
    events,
    flowersList,
    collections,
    catalog,
    catalogSubCategories,
    recommendations,
    cityMeta: cityMeta ? cityMeta : defaultCityMeta,
    breadcrumbs,
    activeOrders,
    deliveryAddresses,
    orderStories,
    smiles,
    testimonials,
    blogposts,
    filters: {
      compositionList,
      occasionList,
      colorList,
      recipientList,
      priceRangeList
    },
    product,
    orderList: currentOrderList
  })
}
