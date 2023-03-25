<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(`index.json?city=${page.host[0]}&path=${page.path}`)
      const json = await res.json()
      return {
        slug: page.slug,
        path: page.path,
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
</script>

<script>
  import ScrollSpy from "../../utils/scrollSpy.js"
  import { onMount, setContext } from "svelte"
  import { mainStore } from "../../stores/global.js"
  import Tabbar from "../../components/Tabbar.svelte"
  import AsideNavigation from "../../components/AsideNavigation.svelte"
  import OutlineRadio from "../../components/OutlineRadio.svelte"
  import AutoWidthButtons from "../../components/AutoWidthButtons.svelte"
  import ActiveBusinessOrder from "../../components/ActiveBusinessOrder.svelte"
  import BusinessPretension from "../../components/BusinessPretension.svelte"
  import BusinessHistoryOrder from "../../components/BusinessHistoryOrder.svelte"

  export let cityMeta

  let ActiveOrderHeader
  let OrderHistoryHeader
  let PretensionHeader
  let headers
  let scrollSpy
  let timeoutid

  const navlist = [
    { name: "Заказы", link: "businessProfile", active: true },
    { name: "Данные", link: "businessProfile/data", active: false },
    { name: "Витрина", link: "businessProfile/showcase", active: false },
    { name: "Финансы", link: "businessProfile/finance", active: false },
    { name: "Помощь", link: "businessProfile/help", active: false }
  ]
  let currentMenuIndex = 0

  const menulist = [
    { name: "Активные заказы", index: 0 },
    { name: "История заказов", index: 1 },
    { name: "Претензии", index: 2 }
  ]

  let reportButtons = [
    { name: "Все", id: "allOrderReport" },
    { name: "Новые", id: "AdoptedOrder" },
    { name: "Согласование", id: "coordination" },
    { name: "Изготовление", id: "ManufacturingOrder" },
    { name: "Фото до доставки", id: "PhotoOrder" },
    { name: "Доставка", id: "DeliveryOrder" },
    { name: "Выполнены", id: "CompletedOrder" }
  ]
  let selectedActiveButton = "Все"

  export let orders = [
    {
      number: 14375765,
      date: new Date(2015, 5, 1),
      status: "newOrder",
      address: {
        value: "г. Мурманск",
        street: "пр Ленина",
        house: "",
        building: "",
        intercom: "",
        apartment: "",
        porch: "",
        floor: "",
        neighbors: ""
      },
      option: "Нельзя оставить букет соседям/родственникам",
      service: "Сделать фото в момент вручения заказа",
      comment:
        "Сам не спец в цветах, но жене очень понравился оригинальный весенний букет," +
        " собранный с позитивным настроением. Оставляю свой положительный отзыв магазину." +
        " Конечно, буду рекомендовать. Лучший цветочный! Молодцы!",
      way: "Наличными при получении",
      summ: 17333,
      delivery: "Доставка к точному времени",
      deliveriPrice: 250,
      postcardPrice: 50,
      products: [
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            },
            {
              name: "Лента декоративная",
              count: 0.5,
              price: 50
            }
          ],
          postcard: "С днём рождения!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-68-73"
        },
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            }
          ],
          postcard:
            "Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!" +
            " Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-55-73"
        }
      ],
      completed: true,
      reason: "",
      open: false,
      florist: "Выберите сотрудника",
      courier: "Выберите сотрудника",
      sender: "Константин Константинович",
      senderPhone: "+7 999 568-56-23",
      photoAfterOrder: ["", ""],
      selected: false,
      cashBack: 15000
    },
    {
      number: 14375765,
      status: "creating",
      date: new Date(2020, 5, 1),
      address: {
        value: "г. Мурманск",
        street: "пр Ленина",
        house: "",
        building: "",
        intercom: "",
        apartment: "",
        porch: "",
        floor: "",
        neighbors: ""
      },
      option: "Нельзя оставить букет соседям/родственникам",
      service: "Сделать фото в момент вручения заказа",
      comment:
        "Сам не спец в цветах, но жене очень понравился оригинальный весенний букет," +
        " собранный с позитивным настроением. Оставляю свой положительный отзыв магазину." +
        " Конечно, буду рекомендовать. Лучший цветочный! Молодцы!",
      way: "Наличными при получении",
      summ: 17333,
      delivery: "Доставка к точному времени",
      deliveriPrice: 250,
      postcardPrice: 50,
      products: [
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            },
            {
              name: "Лента декоративная",
              count: 0.5,
              price: 50
            }
          ],
          postcard: "С днём рождения!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-68-73"
        },
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            }
          ],
          postcard:
            "Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!" +
            " Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-55-73"
        }
      ],
      completed: false,
      reason: "указан некорректный номер телефона получателя",
      open: false,
      selected: false,
      florist: "Александра",
      courier: "Константин Константинович",
      sender: "Константин Константинович",
      senderPhone: "+7 999 568-56-23",
      photoAfterOrder: ["", ""],
      cashBack: 15000
    }
  ]

  export let orderHistory = [
    {
      number: 14375765,
      date: new Date(2015, 5, 1),
      address: {
        value: "г. Мурманск",
        street: "пр Ленина",
        house: "",
        building: "",
        intercom: "",
        apartment: "",
        porch: "",
        floor: "",
        neighbors: ""
      },
      option: "Нельзя оставить букет соседям/родственникам",
      service: "Сделать фото в момент вручения заказа",
      comment:
        "Сам не спец в цветах, но жене очень понравился оригинальный весенний букет," +
        " собранный с позитивным настроением. Оставляю свой положительный отзыв магазину." +
        " Конечно, буду рекомендовать. Лучший цветочный! Молодцы!",
      way: "Наличными при получении",
      summ: 17333,
      delivery: "Доставка к точному времени",
      deliveriPrice: 250,
      postcardPrice: 50,
      products: [
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          open: false,
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            },
            {
              name: "Лента декоративная",
              count: 0.5,
              price: 50
            }
          ],
          postcard: "С днём рождения!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-68-73"
        },
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          open: false,
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            }
          ],
          postcard:
            "Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!" +
            " Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-55-73"
        }
      ],
      completed: true,
      reason: "",
      open: false,
      florist: "Александра",
      courier: "Константин Константинович",
      sender: "Константин Константинович",
      senderPhone: "+7 999 568-56-23",
      photoAfterOrder: ["", ""],
      selected: false
    },
    {
      number: 14375765,
      date: new Date(2020, 5, 1),
      address: {
        value: "г. Мурманск",
        street: "пр Ленина",
        house: "",
        building: "",
        intercom: "",
        apartment: "",
        porch: "",
        floor: "",
        neighbors: ""
      },
      option: "Нельзя оставить букет соседям/родственникам",
      service: "Сделать фото в момент вручения заказа",
      comment:
        "Сам не спец в цветах, но жене очень понравился оригинальный весенний букет," +
        " собранный с позитивным настроением. Оставляю свой положительный отзыв магазину." +
        " Конечно, буду рекомендовать. Лучший цветочный! Молодцы!",
      way: "Наличными при получении",
      summ: 17333,
      delivery: "Доставка к точному времени",
      deliveriPrice: 250,
      postcardPrice: 50,
      products: [
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          open: false,
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            },
            {
              name: "Лента декоративная",
              count: 0.5,
              price: 50
            }
          ],
          postcard: "С днём рождения!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-68-73"
        },
        {
          photo: "",
          name: "Шикарный букет Разноцветных Роз",
          count: 1,
          price: 1790,
          size: "огромный размер, 120×120 см",
          open: false,
          composition: [
            {
              name: "Хризантема кустовая розовая",
              count: 5,
              price: 250
            },
            {
              name: "Роза красная",
              count: 3,
              price: 550
            }
          ],
          postcard:
            "Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!" +
            " Тебе желаю море счастья, Улыбок, солнца и тепла." +
            " Чтоб жизнь была еще прекрасней, Удача за руку вела!",
          postcardCount: 1,
          receiver: "Сашина Александра Алексеевна",
          phone: "+7 906 758-55-73"
        }
      ],
      completed: false,
      reason: "указан некорректный номер телефона получателя",
      open: false,
      selected: false,
      florist: "Александра",
      courier: "Константин Константинович",
      sender: "Константин Константинович",
      senderPhone: "+7 999 568-56-23",
      photoAfterOrder: ["", ""]
    }
  ]

  export let pretensions = [
    {
      number: 14375765,
      date: new Date(2016, 5, 1),
      reason: "Неполная комплектация заказа",
      resolution: "Возврат 10% от суммы заказа покупателю",
      responsible: "Сотрудник Розарио.Цветы",
      completed: true
    },
    {
      number: 14375765,
      date: new Date(2017, 5, 1),
      reason: "Не вовремя доставлен заказ",
      resolution: "Повторная доставка заказа",
      responsible: "Вы",
      completed: true
    },
    {
      number: 14375765,
      date: new Date(2018, 5, 1),
      reason: "Не вовремя доставлен заказ",
      resolution: "Повторная доставка заказа",
      responsible: "Вы",
      completed: true
    },
    {
      number: 14375765,
      date: new Date(2019, 5, 1),
      reason: "Не вовремя доставлен заказ",
      resolution: "Повторная доставка заказа",
      responsible: "Вы",
      completed: true
    },
    {
      number: 14375765,
      date: new Date(2020, 5, 1),
      reason: "Не вовремя доставлен заказ",
      resolution: "Повторная доставка заказа",
      responsible: "Вы",
      completed: false
    }
  ]

  let pretensionsStatus = ["Все претензии", "Текущие", "Решённые"]
  let selcetedPretension = "Все претензии"

  onMount(() => {
    headers = [ActiveOrderHeader, OrderHistoryHeader, PretensionHeader]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      console.log("set index")
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    $mainStore.address.city = cityMeta
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }

    const images = document.querySelectorAll("img[data-src]")

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    Array.from(images).forEach((image) => observer.observe(image))

    return () => {
      scrollSpy.destroy()
      window.removeEventListener("scrollspy-activate", setIndex)
      clearTimeout(timeoutid)
      images.forEach((image) => observer.unobserve(image))
      observer.disconnect()
    }
  })

  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    scrollSpy.refresh()
    window.scroll({
      top: scrollSpy._offsets[index] - 20,
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  let claimsShown = pretensions
  $: if (selcetedPretension) {
    if (selcetedPretension == "Все претензии") {
      claimsShown = pretensions
    } else if (selcetedPretension == "Текущие") {
      claimsShown = []
      pretensions.forEach((item) => {
        if (item.completed == false) {
          claimsShown.push(item)
        }
      })
    } else if (selcetedPretension == "Решённые") {
      claimsShown = []
      pretensions.forEach((item) => {
        if (item.completed == true) {
          claimsShown.push(item)
        }
      })
    }
  }
  let activeOrderShow = orders

  $: if (selectedActiveButton) {
    if (selectedActiveButton == "Все") {
      activeOrderShow = orders
    } else if (selectedActiveButton == "Новые") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "newOrder") {
          activeOrderShow.push(item)
        }
      })
      console.log(activeOrderShow)
    } else if (selectedActiveButton == "Согласование") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "coordination") {
          activeOrderShow.push(item)
        }
      })
      console.log(activeOrderShow)
    } else if (selectedActiveButton == "Изготовление") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "creating") {
          activeOrderShow.push(item)
        }
      })
    } else if (selectedActiveButton == "Фото до доставки") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "photo") {
          activeOrderShow.push(item)
        }
      })
    } else if (selectedActiveButton == "Доставка") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "delivery") {
          activeOrderShow.push(item)
        }
      })
    } else if (selectedActiveButton == "Выполнены") {
      activeOrderShow = []
      orders.forEach((item) => {
        if (item.status == "done") {
          activeOrderShow.push(item)
        }
      })
    }
  }
</script>

<div class="flex justify-between">
  <div class="wrapper w-full">
    <Tabbar
      pos="top: 5rem;"
      className="sticky"
      on:change={goToHeader}
      {currentMenuIndex}
      {menulist}
    />
    <div class="content">
      <section class="ActiveOrder">
        <h2 data-scrollspy bind:this={ActiveOrderHeader} class="sectionName">
          Активные заказы
        </h2>
        <div class="buttons">
          <AutoWidthButtons
            value={selectedActiveButton}
            bind:group={selectedActiveButton}
            selectedText="Еще"
            list={reportButtons}
            buttonElement=""
          />
        </div>
        {#if activeOrderShow != []}
          {#each activeOrderShow as order}
            <div class="activeOrder">
              <ActiveBusinessOrder bind:order />
            </div>
          {/each}
        {/if}
        {#if activeOrderShow == []}
          <p>У вас нет активных заказов с таким статусом</p>
        {/if}
      </section>
      <section>
        <h2 data-scrollspy bind:this={OrderHistoryHeader} class="sectionName">
          История заказов
        </h2>
        <p class="historyText">
          История заказов и акты, доступные для скачивания и печати.
        </p>
        <BusinessHistoryOrder bind:orders={orderHistory} />
      </section>
      <section>
        <h2 data-scrollspy bind:this={PretensionHeader} class="sectionName">Претензии</h2>
        <div class="pretensionButtons">
          {#each pretensionsStatus as status, i}
            <div class="mr-14 last:mr-0">
              <OutlineRadio
                text={status}
                label="status{i}"
                bind:value={status}
                bind:group={selcetedPretension}
                name={selcetedPretension}
              />
            </div>
          {/each}
        </div>
        <BusinessPretension pretensions={claimsShown} />
      </section>
    </div>
  </div>
  <div class="aside-nav-container">
    <AsideNavigation {navlist} />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    margin-right: 10px;
  }
  .content {
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    border: 1px solid var(--gray-300);
    border-top: none;
    box-sizing: border-box;
    border-radius: 4px;
    @apply px-80;
    padding-bottom: 80px;
    height: 100%;
    margin-bottom: 10px;
    height: calc(100% - 75px);
  }
  section {
    padding-top: 48px;
    width: 100%;
  }
  .sectionName {
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;
    color: var(--color-main);
  }
  .buttons {
    width: 100%;
    margin-bottom: 25px;
    margin-top: 18px;
  }
  .pretensionButtons {
    display: flex;
    margin: 24px 0;
  }
  .historyText {
    margin-bottom: 34px;
    margin-top: 18px;
    font-size: 16px;
    color: var(--color-main);
  }
  .activeOrder {
    margin-bottom: 35px;
    display: flex;
    flex-wrap: wrap;
  }
  .activeOrder:last-child {
    margin-bottom: 0;
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  @media (max-width: 1465px) {
    .buttons {
      max-width: 880px;
    }
  }
  @media (max-width: 1300px) {
    .content {
      @apply px-44;
    }
    section {
      padding-top: 34px;
    }
    .buttons {
      max-width: 785px;
    }
  }
  @media (max-width: 1024px) {
    section {
      padding-top: 24px;
    }
  }
</style>
