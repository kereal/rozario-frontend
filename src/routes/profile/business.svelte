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
  import { onMount, setContext } from "svelte"
  import { mainStore } from "../../stores/global.js"
  import { orderStore, addressStore } from "../../stores/order.js"
  import Tabbar from "../../components/Tabbar.svelte"
  import ActiveOrder from "../../components/ActiveOrder.svelte"
  import AsideNavigation from "../../components/AsideNavigation.svelte"
  import OrderStoryCard from "../../components/OrderStoryCard.svelte"
  import DeliveryAddressCard from "../../components/DeliveryAddressCard.svelte"
  import AddAddress from "../../components/AddAddress.svelte"
  import OutlineRadio from "../../components/OutlineRadio.svelte"
  import CustomCheckbox from "../../components/CustomCheckbox.svelte"
  import ReportOrders from "../../components/ReportOrders.svelte"
  import ReportAccounts from "../../components/ReportAccounts.svelte"
  import ReportInvoice from "../../components/ReportInvoice.svelte"
  import ReportReconciliations from "../../components/ReportReconciliations.svelte"
  import BusinessRequisites from "../../components/BusinessRequisites.svelte"
  import BusinessListEmployees from "../../components/BusinessListEmployees.svelte"
  import Icon from "../../components/Icon.svelte"
  import ScrollSpy from "../../utils/scrollSpy.js"
  import throttle from "lodash/throttle"
  import debounce from "lodash/debounce"
  import Button from "../../components/Button.svelte"

  import Add from "../../components/icons/Add.svelte"

  import { page } from "$app/stores"

  export let activeOrders
  export let deliveryAddresses
  export let orderStories
  export let cityMeta
  export let recommendations

  export let businessUser = false

  export let businessOrder = {
    report: [
      {
        number: 1420,
        status: "Ожидает оплаты",
        date: new Date(2013, 5, 1),
        employee: "Евгений Николаевич",
        phone: "+7 921 275-53-71",
        details: false,
        products: [
          {
            name: "Музыка огня",
            size: "средний, 50×50 см",
            post: "День рождения",
            amount: 2,
            price: 500
          },
          {
            name: "Шикарный букет разноцветных роз",
            size: "огромный, 100×100 см",
            post: "Бизнес-поздравление",
            amount: 4,
            price: 2500
          }
        ],
        adress: "г. Мурманск, ул. Защитников Заполярья, 21, к. 3",
        deliveryPrice: 250,
        amount: 11250,
        selected: false
      },
      {
        number: 622,
        status: "Ожидает оплаты",
        date: new Date(2020, 10, 15),
        employee: "Константин Евгеньевич",
        phone: "+7 921 275-53-71",
        details: false,
        products: [
          {
            name: "Музыка огня",
            size: "средний, 50×50 см",
            post: "День рождения",
            amount: 2,
            price: 500
          },
          {
            name: "Шикарный букет разноцветных роз",
            size: "огромный, 100×100 см",
            post: "Бизнес-поздравление",
            amount: 4,
            price: 2500
          }
        ],
        adress: "г. Мурманск, ул. Защитников Заполярья, 21, к. 3",
        deliveryPrice: 250,
        amount: 11250,
        selected: false
      },
      {
        number: 5555,
        status: "В доставке",
        date: new Date(2020, 11, 25),
        employee: "Марина",
        phone: "+7 921 275-53-71",
        details: false,
        products: [
          {
            name: "Музыка огня",
            size: "средний, 50×50 см",
            post: "День рождения",
            amount: 2,
            price: 500
          },
          {
            name: "Шикарный букет разноцветных роз",
            size: "огромный, 100×100 см",
            post: "Бизнес-поздравление",
            amount: 4,
            price: 2500
          },
          {
            name: "Во имя любви",
            size: "огромный, 100×100 см",
            post: "Бизнес-поздравление",
            amount: 4,
            price: 2500
          }
        ],
        adress: "г. Мурманск, ул. Защитников Заполярья, 21, к. 3",
        deliveryPrice: 250,
        amount: 21250,
        selected: false
      }
    ],
    allReport: false
  }
  export let businessAccount = [
    {
      number: "Б-4758673629-1",
      issued: new Date(2013, 5, 1),
      summa: 12950,
      paymentDate: new Date(2013, 5, 1),
      method: "Безнал для юр. лиц",
      overhead: "184-8764-85",
      selected: false
    },
    {
      number: "Б-4758673629-1",
      issued: new Date(2015, 5, 1),
      summa: 12950,
      paymentDate: false,
      method: "Банковская карта для юр. лиц",
      overhead: "184-8764-85",
      selected: false
    },
    {
      number: "Б-4758673629-1",
      issued: new Date(2020, 5, 1),
      summa: 12950,
      paymentDate: new Date(2013, 5, 1),
      method: "Безнал для юр. лиц",
      overhead: "184-8764-85",
      selected: false
    }
  ]
  export let businessInvoices = [
    {
      number: "184-8764-85",
      date: new Date(2013, 5, 1),
      amount: 28950,
      selected: false
    },
    {
      number: "184-8764-85",
      date: new Date(2017, 5, 1),
      amount: 18950,
      selected: false
    },
    {
      number: "184-8764-85",
      date: new Date(2016, 5, 1),
      amount: 84350,
      selected: false
    },
    {
      number: "184-8764-85",
      date: new Date(2015, 5, 1),
      amount: 2950,
      selected: false
    },
    {
      number: "184-8764-85",
      date: new Date(2014, 5, 1),
      amount: 83440,
      selected: false
    }
  ]

  export let businessReconciliations = [
    {
      number: "Б-4758673629-1",
      dateOrder: new Date(2015, 5, 1),
      ActsAndPayment: "Оплата",
      date: new Date(2015, 5, 1),
      debit: 2322.66,
      credit: 333
    },
    {
      number: "Б-4758673629-1",
      dateOrder: new Date(2016, 5, 1),
      ActsAndPayment: "Акт",
      date: new Date(2016, 5, 1),
      debit: 0.44,
      credit: 3222.77
    },
    {
      number: "Б-4758673629-1",
      dateOrder: new Date(2017, 5, 1),
      ActsAndPayment: "Оплата",
      date: new Date(2017, 5, 1),
      debit: 2322.87,
      credit: 1444.15
    }
  ]
  export let businessAdmin = {
    name: "Евгений",
    phone: "+7 921 275-53-71",
    select: false
  }

  export let listEmployees = [
    {
      group: "Продажи",
      listWorkers: [
        {
          name: "Джордан Белфорт",
          phone: "+7 921 225-53-71",
          selected: false
        },
        {
          name: "Джон Генри Паттерсон",
          phone: "+7 921 225-53-71",
          selected: false
        },
        {
          name: "Эрика Фейднер",
          phone: "+7 921 225-53-71",
          selected: false
        }
      ]
    },
    {
      group: "Маркетинг",
      listWorkers: [
        {
          name: "Стив Джобс",
          phone: "+7 921 225-53-71",
          selected: false
        },
        {
          name: "Николай Шустов",
          phone: "+7 921 225-53-71",
          selected: false
        },
        {
          name: "Альберт Ласкер",
          phone: "+7 921 225-53-71",
          selected: false
        }
      ]
    }
  ]
  function removeAddress(id) {
    addressStore.removeAddress(id)
  }

  setContext("profile", {
    removeAddress
  })

  let addAddressVisible = false

  let currentMenuIndex = 0

  let ActiveOrderHeader
  let OrderHistoryHeader
  let DeliveryAddressesHeader
  let Reporting
  let Employees
  let Requisites
  let containerElement
  let addWorker = false
  let reportButtons = ["Заказы", "Счета", "Накладные", "Акт сверки"]
  let selectedReportButton = "Заказы"

  const photo = "flower-photo.png"

  const menulist = [
    { name: "Активные заказы", index: 0 },
    { name: "История заказов", index: 1 },
    { name: "Адреса доставок", index: 2 },
    { name: "Отчётность", index: 3 },
    { name: "Сотрудники", index: 4 },
    { name: "Реквизиты", index: 5 }
  ]

  const navlist = [
    { name: "Мои заказы", link: "profile", active: false },
    { name: "Избранное", link: "profile/favorites", active: false },
    { name: "Мои купоны", link: "profile/coupons", active: false },
    { name: "Мои события", link: "profile/events", active: false },
    { name: "Помощь", link: "profile/help", active: false },
    { name: "Настройки", link: "profile/settings", active: false },
    { name: "Бизнес-заказы", link: "profile/business", active: true },
    { name: "Игры", link: "profile/games", active: false }
  ]

  let timeoutid

  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    window.scroll({
      top: scrollSpy._offsets[index] + 10,
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  function toggleAddAddress() {
    addAddressVisible = !addAddressVisible
  }
  function toggleAddWorker() {
    addWorker = !addWorker
  }

  function addAddress(e) {
    toggleAddAddress()
    addressStore.addAddress({
      id: e.detail.id,
      recipient: {
        address: e.detail.address,
        name: e.detail.name,
        phone: e.detail.phone
      },
      isMain: e.detail.isMain,
      title: e.detail.title
    })
  }

  let headers

  let scrollSpy

  onMount(() => {
    headers = [
      ActiveOrderHeader,
      OrderHistoryHeader,
      DeliveryAddressesHeader,
      Reporting,
      Employees,
      Requisites
    ]

    $mainStore.address.city = cityMeta
    $orderStore.activeOrderList = activeOrders
    $addressStore = deliveryAddresses

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
  $: if (listEmployees) {
    listEmployees = listEmployees
  }
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>Профиль</title>
  <meta name="description" content="PROFILE_DESCRIPTION" />

  <link rel="canonical" href={$page.host + $page.path} />

  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="en"
    title="English"
  />

  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, "
  />

  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />

  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />

  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div>
  <div class="flex justify-between">
    <div class="w-full">
      <Tabbar
        pos="top: 5rem;"
        className="sticky"
        on:change={goToHeader}
        {currentMenuIndex}
        {menulist}
      />
      <div
        bind:this={containerElement}
        class="wrapper box-content py-24 lg:py-34 flex flex-col border-b
        border-r border-l border-gray-300"
      >
        <h2
          data-scrollspy
          bind:this={ActiveOrderHeader}
          class="text-2xl font-bold text-main mb-24"
        >
          Активные заказы
        </h2>
        <ul>
          {#each activeOrders as order}
            <li>
              <ActiveOrder {photo} {...order} />
            </li>
          {/each}
        </ul>
        <h2
          data-scrollspy
          bind:this={OrderHistoryHeader}
          class="text-2xl font-bold text-main mb-24 mt-48"
        >
          История заказов
        </h2>
        <ul>
          {#each orderStories as order}
            <li>
              <OrderStoryCard {...order} />
            </li>
          {/each}
        </ul>
        <div class="flex justify-between items-center mb-24 mt-48">
          <h2
            data-scrollspy
            bind:this={DeliveryAddressesHeader}
            class="text-2xl font-bold text-main"
          >
            Адреса доставок
          </h2>
        </div>
        <ul class="-mr-40 flex flex-col lg:flex-row flex-wrap">
          {#each $addressStore as address, i}
            <li class="w-full lg:w-1/2 pr-40 pb-40">
              <DeliveryAddressCard
                index={i}
                title={address.title}
                isMainAddress={address.isMain}
                id={address.id}
                recipient={address.recipient}
              />
            </li>
          {/each}
        </ul>
        <Button
          className="-mt-6"
          size="full"
          textClass="text-base"
          status={businessUser == false ? "disabled-main" : "active-main"}
          on:click={toggleAddAddress}
        >
          Добавить адрес доставки
        </Button>

        <section>
          <h2 class="text-2xl font-bold text-main" data-scrollspy bind:this={Reporting}>
            Отчётность
          </h2>
          <p>
            История заказов по всем сотрудникам и акты, доступные для скачивания и печати.
          </p>
          {#if businessOrder.report}
            <div class="reportButtons flex">
              {#each reportButtons as reportButton, i}
                <div class="reportButton">
                  <OutlineRadio
                    text={reportButton}
                    label="reportButton{i}"
                    bind:value={reportButton}
                    bind:group={selectedReportButton}
                    name={selectedReportButton}
                  />
                </div>
              {/each}
            </div>
            {#if selectedReportButton == "Заказы"}
              <ReportOrders orders={businessOrder} />
            {:else if selectedReportButton == "Счета"}
              <ReportAccounts accounts={businessAccount} />
            {:else if selectedReportButton == "Накладные"}
              <ReportInvoice invoices={businessInvoices} />
            {:else if selectedReportButton == "Акт сверки"}
              <ReportReconciliations reconciliations={businessReconciliations} />
            {/if}
          {:else}
            <p class="mb-34 mt-12">
              Сделайте свой первый заказ, и все документы по нему тут же появятся здесь.
            </p>
            <Button size="lg">Перейти в каталог</Button>
          {/if}
        </section>
        <section>
          <h2 class="text-2xl font-bold text-main" data-scrollspy bind:this={Employees}>
            Список сотрудников
          </h2>
          <p class="mb-30">
            Добавляйте сотрудников, чтобы они могли заказывать цветы и подарки, оплачивая
            с вашего расчётного счёта. Можно объединять сотрудников в группы (например,
            «Отдел продаж», «Бухгалтерия» <span class="whitespace-nowrap">и т. д.).</span
            >
          </p>
          <BusinessListEmployees
            bind:listEmployees
            bind:businessAdmin
            bind:businessUser
          />
          <div id="RequisitesBlock" />
        </section>
        <section>
          <h2 class="text-2xl font-bold text-main" data-scrollspy bind:this={Requisites}>
            Реквизиты
          </h2>
          <p>Работает автоподстановка — начните вводить название юр. лица или ИП</p>
          <div class="businessRequisites">
            <BusinessRequisites bind:businessUser />
          </div>
        </section>
      </div>
    </div>
    <div class="aside-nav-container">
      <AsideNavigation {recommendations} {navlist} />
    </div>
  </div>
</div>

{#if addAddressVisible}
  <AddAddress on:add={addAddress} on:close={toggleAddAddress} />
{/if}

<style lang="postcss">
  .wrapper {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    padding-right: 80px;
    padding-left: 80px;
    padding-top: 48px;
    @apply rounded;
  }
  section {
    margin-top: 68px;
  }
  section h2 {
    margin-bottom: 18px;
  }
  section p {
    font-size: 16px;
    line-height: 145%;
    color: var(--color-main);
  }
  .reportButton {
    margin-right: 14px;
  }
  .businessRequisites {
    margin-top: 34px;
  }
  .reportButtons {
    margin-top: 34px;
  }
  @media (max-width: 1300px) {
    .wrapper {
      padding-bottom: 34px;
      padding-top: 34px;
      @apply px-44;
    }
    .businessRequisites {
      margin-top: 30px;
    }
    .reportButtons {
      margin-top: 30px;
    }
  }
  @media (max-width: 1000px) {
    .businessRequisites {
      margin-top: 24px;
    }
    .wrapper {
      padding-top: 24px;
    }
    section {
      margin-top: 48px;
    }
    .reportButtons {
      margin-top: 24px;
    }
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-left: 10px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  .add-address-button:hover span {
    @apply text-info;
  }
  .add-address-button:hover > :global(svg) {
    @apply text-info;
  }
</style>
