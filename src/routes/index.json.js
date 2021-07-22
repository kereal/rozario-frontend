import { flowersList } from "./data/data.js";
import collections from "./data/collections.js";
import { catalog, catalogSubCategories } from "./data/cata.js";
import recommendations from "./data/recommendation.js";
import cities from "./data/cities.js";
import events from "./data/events.js";
import smiles from "./data/smiles.js";
import testimonials from "./data/testimonials.js";
import blogposts from "./data/blogposts.js";
import { activeOrders, deliveryAddresses, orderStories, currentOrderList } from "./data/order.js";
import {
  compositionList,
  occasionList,
  colorList,
  recipientList,
  priceRangeList
} from "./data/filters.js";

export function get(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    const city = req.query["city"];
    const path = req.query["path"];

    const breadcrumbs = [];

    if (path) {
        console.log('path', path);
        const catalogItem = catalog.find(item => item.path === path);
        if (catalogItem) {
            let slugs = path.split('/');
            if (slugs.length > 2 && slugs[1] === 'catalog') {
                slugs = slugs.slice(2);
            }
            let acc = '/catalog';
            for (let i = 0 ; i< slugs.length; i++) {
                acc += '/' + slugs[i];
                const catalogItem = catalog.find(item => item.path === acc);
                if (catalogItem) {
                    breadcrumbs.push(catalogItem);
                }
            }
        }
    }

    console.log('breadcrumbs', breadcrumbs);

    let cityMeta;
    cityMeta = cities.filter(item => item.name === city);
    if (!cityMeta.length) {
        cityMeta = cities.filter(item => item.subdomain === city);
    }

    cityMeta = cityMeta[0];

    const defaultCityMeta = cities.length > 0 ? cities[0] : {
        name: "Мурманск",
        subdomain: "murmansk",
        locativus: "в Мурманске",
        shop: {
            seotype: "Florist",
            name: "Розарио.Цветы",
            address: {
                street: "ул. Ростинская, д. 9А",
                openingHours: { days: "Пн-Вс", hours: "09:00-21:00", seo: "" },
                lat_lng: [69.02332204932151,33.07223150000001]
            },
            phone: "8 800 250-64-70",
            phone_world: "+7 921 900 80 40",
            contacts_image: "contacts_murmansk",
            owner: "Блинова Светлана Анатольевна",
        }
    };
    const product = {
        name: ""
    };
    res.end(
        JSON.stringify({
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
    );
}
