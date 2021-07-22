jest.mock("node-fetch");

import fetch, { Response } from "node-fetch";

import {
  fetchFlowersList,
  fetchCustomersList,
  fetchBlogPostsList,
  fetchSmilesList,
} from "../utils/request.js";
import expectPuppeteer from "expect-puppeteer";

let flowersList = [
  {
    title: "Традиционный украинский борщ с пампушками",
    description:
      "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
    src: "flower1.png",
    price: "2000",
    size: {
      width: "22см",
      height: "12см",
    },
  },
];
let customersList = [
  {
    name: "София Великая",
    ordernumber: "1234556",
    img: "customer.png",
    testimonial:
      "“Неожиданно, красивый букет и быстрая доставка - прямо на дачу Брежнева!Мы с В.В. были очень рады, ну ни как не ожидали такого от них, ну совсем.Будем еще заказывать, точно!",
  },
];
let blogpostsList = [
  {
    title: "1 сентября с нашим букетом! 1 сенября с нашим букетом!",
    img: "blogimage.png",
    commentsCount: 20,
    date: "20/12/2020",
  },
];
let smilesList = [
  {
    title: "Букет из красных роз и зеленых георгин",
    img: "smile.png",
    date: "20/12/2020",
  },
];

describe("hero input integration", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("response object keys are the same(flowersList)", async () => {
    fetch.mockResponseOnce(JSON.stringify(flowersList));

    const flowers = await fetchFlowersList();

    expect(Object.keys(flowers[0])).toEqual([
      "title",
      "description",
      "src",
      "price",
      "size",
    ]);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it("response object keys are the same(customersList)", async () => {
    fetch.mockResponseOnce(JSON.stringify(customersList));

    const customers = await fetchCustomersList();

    expect(Object.keys(customers[0])).toEqual([
      "name",
      "ordernumber",
      "img",
      "testimonial",
    ]);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it("response object keys are the same(blogpostsList)", async () => {
    fetch.mockResponseOnce(JSON.stringify(blogpostsList));

    const blogposts = await fetchBlogPostsList();

    expect(Object.keys(blogposts[0])).toEqual([
      "title",
      "img",
      "commentsCount",
      "date",
    ]);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it("response object keys are the same(smilesList)", async () => {
    fetch.mockResponseOnce(JSON.stringify(smilesList));

    const smiles = await fetchSmilesList();

    expect(Object.keys(smiles[0])).toEqual(["title", "img", "date"]);
    expect(fetch.mock.calls.length).toEqual(1);
  });
});
