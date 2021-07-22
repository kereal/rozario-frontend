import { fetchFlowersList } from "../utils/request";

// import { Machine } from "xstate";
// import { createModel } from "@xstate/test";
// import { render, fireEvent, getByText } from "@testing-library/svelte";
// import HeroInput from "../HeroInput.svelte";
// import { writable, get } from "svelte/store";

// const mainStoreMock = writable({
//   address: {
//     city: "Мурманск",
//     street: "",
//     unknown: ""
//   },
//   person: "",
//   flower: {
//     priceRange: { from: "", to: "", text: "" },
//     kind: ""
//   }
// });

// function closePersonDropdown(e) {
//   setTimeout(() => {
//     console.log("closePersonDropdown");
//   }, 200);
// }
// function closePriceDropdown(e) {
//   setTimeout(() => {
//     console.log("closePriceDropdown");
//   }, 200);
// }
// function closeFlowerDropdown(e) {
//   setTimeout(() => {
//     console.log("closeFlowerDropdown");
//   }, 200);
// }

// const heroInputMachine = Machine(
//   {
//     id: "heroInput",
//     initial: "person",
//     states: {
//       person: {
//         exit: "closePersonDropdown",
//         on: {
//           CLICK_PERSON: [
//             {
//               target: "price",
//               cond: "ifPrice",
//               actions: "person"
//             },
//             {
//               target: "flower",
//               cond: "ifFlower",
//               actions: "person"
//             },
//             {
//               target: "end",
//               cond: "ifEnd",
//               actions: "person"
//             }
//           ],
//           TO_PRICE: {
//             target: "price"
//           },
//           TO_FLOWER: {
//             target: "flower"
//           }
//         },
//         meta: {
//           test: async page => {

//           }
//         }
//       },
//       price: {
//         exit: "closePriceDropdown",
//         on: {
//           CLICK_PRICE: [
//             {
//               target: "flower",
//               cond: "ifFlower",
//               actions: "price"
//             },
//             {
//               target: "person",
//               cond: "ifPerson",
//               actions: "price"
//             },
//             {
//               target: "end",
//               cond: "ifEnd",
//               actions: "price"
//             }
//           ],
//           TO_PERSON: {
//             target: "person"
//           },
//           TO_FLOWER: {
//             target: "flower"
//           }
//         },
//         meta: {
//         }
//       },
//       flower: {
//         exit: "closeFlowerDropdown",
//         on: {
//           CLICK_FLOWER: [
//             {
//               target: "end",
//               actions: "flower"
//             }
//           ],
//           TO_PERSON: {
//             target: "person"
//           },
//           TO_PRICE: {
//             target: "price"
//           }
//         },
//         meta: {
//         }
//       },
//       end: {
//         on: {
//           COMPLETE: {
//             target: "final"
//           },
//           RESET: {
//             target: "person",
//             actions: "reset"
//           },
//           TO_PERSON: "person",
//           TO_PRICE: "price",
//           TO_FLOWER: "flower"
//         }
//       },
//       final: {
//         type: "final"
//       }
//     }
//   },
//   {
//     actions: {
//       person: (context, event) => {
//         console.log('EVENT', event)
//         mainStoreMock.person.set(event.person)
//         // mainStoreMock.person = event.person;
//       },
//       price: (context, event) => {
//         console.log('EVENT', event)
//         mainStoreMock.flower.priceRange.set(event.priceRange)
//       },
//       flower: (context, event) => {
//         mainStoreMock.flower.kind.set(event.flower)
//       },
//       reset: (context, event) => {
//         mainStoreMock.person.set("")
//         mainStoreMock.flower.priceRange.set({ to: "", from: "", text: "" })
//         mainStoreMock.flower.kind.set("")
//       },
//       closePersonDropdown: (context, event) => {
//         closePersonDropdown();
//       },
//       closePriceDropdown: (context, event) => {
//         closePriceDropdown();
//       },
//       closeFlowerDropdown: (context, event) => {
//         closeFlowerDropdown();
//       }
//     },
//     guards: {
//       ifPerson: (context, event) => {
//         console.log(mainStoreMock.person);
//         return !get(mainStoreMock).person;
//       },
//       ifPrice: (context, event) => {
//         return !get(mainStoreMock).flower.priceRange.text;
//       },
//       ifFlower: (context, event) => {
//         return !get(mainStoreMock).flower.kind;
//       },
//       ifEnd: (context, event) => {
//         if (currentState === "person") {
//           return (
//             get(mainStoreMock).flower.priceRange.text && get(mainStoreMock).flower.kind
//           );
//         } else if (currentState === "price") {
//           return get(mainStoreMock).person && get(mainStoreMock).flower.kind;
//         } else {
//           return (
//             get(mainStoreMock).person &&
//             get(mainStoreMock).flower.priceRange.text &&
//             get(mainStoreMock).flower.kind
//           );
//         }
//       }
//     }
//   }
// );

// let currentState = heroInputMachine.initialState.value

// const heroInputModel = createModel(heroInputMachine).withEvents(
// {
//   CLICK_PERSON: {
//     exec: async (page) => {
//       await page.click('#hero-input-person')
//       await page.waitFor('.hero-person-dropdown')
//       const [button] = await page.$x("//button[contains(., 'Маме')]");
//       console.log('button', button)
//       if (button) {
//           await button.click();
//       }
//     },
//   },
//   CLICK_PRICE: {
//     exec: async (page) => {
//       const [button] = await page.$x("//button[contains(., 'До 2000')]");
//       if (button) {
//           await button.click();
//       }
//     },
//   },
//   CLICK_FLOWER: {
//     exec: async (page) => {
//       const [button] = await page.$x("//button[contains(., 'Все')]");
//       if (button) {
//           await button.click();
//       }
//     },
//   },
//   TO_FLOWER: {
//     exec: async page => {
//       await page.click('img[src="flower.svg"]')
//     }
//   },
//   TO_PERSON: {
//     exec: async para => {
//       await page.click('img[src="person.svg"]')
//     }
//   },
//   TO_PRICE: {
//     exec: async para => {
//       await page.click('img[src="price.svg"]')
//     }
//   },
//   COMPLETE: {
//     exec: async para => {
//     }
//   }
// }
// );

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(
    `//button[contains(text(), ${escapedText})]`
  );

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

describe("hero input e2e", () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
    page.waitForNavigation()
  });
  afterEach(async () => {
    await page.evaluate(() => {
      location.reload(true);
    });
  });
  it("all stages flow", async () => {
    await expect(page).toClick("button", { text: "Выберите повод" });
    await page.waitFor(600);
    await expect(page).toClick("button", { text: "День рождения" });
    await page.waitFor(600);
    await expect(page).toMatchElement("#hero-input-occasion-icon-text p", {
      text: "День рождения"
    });

    await expect(page).toClick("button", { text: "До 2000" });
    await page.waitFor(600);
    await expect(page).toMatchElement("#hero-input-price-icon-text p", {
      text: "До 2000"
    });

    await expect(page).toClick("button", { text: "все" });
    await expect(page).toMatchElement("#hero-input-flower-icon-text p", {
      text: "все"
    });
  });
  it("images clicks", async () => {
    await page.waitForSelector('button div img[src="price-gray.svg"]');
    await expect(page).toClick('button div img[src="price-gray.svg"]');
    await expect(page).toClick('button div img[src="flower-gray.svg"]');
    await expect(page).toClick('button div img[src="occasion.svg"]');
  });
});
