<script>
  import { onMount, setContext } from "svelte"
  import { eventsStore } from "@/stores/events"
  import { page } from "$app/stores"
  import debounce from "lodash/debounce"
  import ScrollSpy from "@/utils/scrollSpy"
  import Calendar from "@/components/Calendar.svelte"
  import Tabbar from "@/components/Tabbar.svelte"
  import AsideNavigation from "@/components/AsideNavigation.svelte"
  import EventCard from "@/components/EventCard.svelte"
  import AddEvent from "@/components/AddEvent.svelte"
  import InfoDelPopup from "@/components/InfoDelPopup.svelte"
  import Button from "@/components/Button.svelte"

  export let data

  const recommendations = data.recommendations
  const events = data.events
  const today = new Date()

  function removeEvent(id) {
    removeConfirmation = true
    eventsStore.removeEvent(id)
  }

  setContext("events", {
    removeEvent
  })

  let addEventVisible = false
  let removeConfirmation = false

  let currentMenuIndex = 0

  let CalendarHeader
  let EventsHeader
  let DeliveryAddressesHeader
  let containerElement

  const menulist = [
    { name: "Календарь", index: 0 },
    { name: "События", index: 1 }
  ]

  const navlist = [
    { name: "Мои заказы", link: "/profile", active: false },
    { name: "Избранное", link: "/profile/favorites", active: false },
    { name: "Мои купоны", link: "/profile/coupons", active: false },
    { name: "Мои события", link: "/profile/events", active: true },
    { name: "Помощь", link: "/profile/help", active: false },
    { name: "Настройки", link: "/profile/settings", active: false }
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
      top: scrollSpy._offsets[index] + 20,
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  function toggleAddEvent() {
    addEventVisible = !addEventVisible
  }

  function addEvent(e) {
    toggleAddEvent()
    eventsStore.addEvent({
      id: e.detail.id,
      ...e.detail.event
    })
  }

  let headers

  let scrollSpy

  function getEventsSections(events) {
    return events
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      .reduce((acc, curr) => {
        const currDate = new Date(curr.date)
        const currMonth = currDate.getMonth()
        const sectionTitle = new Date(currDate.getFullYear(), currMonth)
        const section = acc.find((el) => el.title.getTime() === sectionTitle.getTime())

        if (section) {
          section.list.push(curr)
        } else {
          acc.push({
            title: sectionTitle,
            list: [curr]
          })
        }
        return acc
      }, [])
  }

  function getEventsComing(events) {
    return events.filter((event) => {
      const daysTillToday = Math.round((new Date(event.date) - new Date()) / 86400000)
      return daysTillToday <= 7
    })
  }

  function formatSectionTitle(date) {
    const title = new Intl.DateTimeFormat("ru", { month: "long" }).format(date)
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  $: eventsSections = getEventsSections($eventsStore)
  $: eventsComming = getEventsComing($eventsStore)

  onMount(() => {
    headers = [CalendarHeader, EventsHeader]

    $eventsStore = events

    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      console.log("set index")
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    return () => {
      scrollSpy.destroy()
      window.removeEventListener("scrollspy-activate", setIndex)
    }
  })
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>Мои события</title>
  <meta name="description" content="PROFILE_DESCRIPTION" />

  <link rel="canonical" href={$page.url.hostname + $page.url.pathname} />

  <link
    rel="alternate"
    href={$page.url.hostname + $page.url.pathname}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.url.hostname + $page.url.pathname}
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
        class="wrapper box-content pb-80 flex flex-col border-b
        border-r border-l border-gray-300 events-card-wrapper"
      >
        <div class="flex flex-row justify-between">
          <h2
            data-scrollspy
            bind:this={CalendarHeader}
            class="text-2xl font-bold text-main title-calendar"
          >
            Календарь
          </h2>
          <!--    <button

                            on:click={toggleAddEvent}
                            class="title-left add-event-button flex items-center">
                        <Icon
                                name={Add}
                                iconSize="14"
                                classNames="fill-current text-main"/>
                        <span class="ml-8 text-main text-sm leading-mid">
                Добавить событие
              </span>
                    </button> -->
        </div>
        <Calendar
          events={eventsComming}
          allEvents={$eventsStore}
          {today}
          year={new Date().getFullYear()}
          month={new Date().getMonth()}
        />
        <h2
          data-scrollspy
          bind:this={EventsHeader}
          class="text-2xl font-bold text-main mb-0 event-padding"
        >
          События
        </h2>
        <ul class="-mr-40 flex flex-col lg:flex-row flex-wrap">
          {#each eventsSections as section, i}
            <span class="text-main font-semibold title-month"
              >{formatSectionTitle(section.title)}</span
            >
            {#each section.list as event, i}
              <li class="w-full lg:w-1 pr-40 cards-event">
                <EventCard id={event.id} index={i} {event} />
              </li>
            {/each}
          {/each}
        </ul>
        {#if eventsSections.length === 0}
          <div class="no-event font-p">У вас пока не запланировано никаких событий.</div>
        {/if}
        <div class="buttonAdd">
          <Button
            className="w-full"
            size="full"
            textClass="text-base"
            on:click={toggleAddEvent}
          >
            Добавить событие
          </Button>
        </div>
      </div>
    </div>
    <div class="aside-nav-container">
      <AsideNavigation {recommendations} {navlist} />
    </div>
  </div>
</div>

{#if addEventVisible}
  <AddEvent on:add={addEvent} on:close={toggleAddEvent} />
{/if}

{#if removeConfirmation}
  <InfoDelPopup
    size="sm"
    text="Событие удалено"
    on:close={() => (removeConfirmation = false)}
  />
{/if}

<style lang="postcss">
  .wrapper {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    padding-right: 80px;
    padding-left: 80px;
    @apply rounded;
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-left: 10px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  .add-event-button:hover span {
    @apply text-info;
  }

  .add-event-button:hover > :global(svg) {
    @apply text-info;
  }

  .add-event-button {
    display: flex;
    justify-content: flex-end;
  }

  h2 {
    font-size: 24px;
  }

  .title-left {
    flex: 1;
    margin-top: 48px;
  }

  .title-calendar {
    padding-top: 48px;
    margin-bottom: 24px;
  }

  .title-month {
    font-size: 18px;
    margin-top: 24px;
    margin-bottom: 10px;
  }
  .event-padding {
    padding-top: 68px;
  }

  .cards-event {
    margin: 8px 0 10px 0;
  }
  .text-title-size {
    font-size: 18px;
    margin-bottom: 18px;
  }
  .font-p {
    font-size: 16px;
  }
  .events-card-wrapper {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-bottom: 10px;
    bottom: 10px;
    min-height: calc(100% - 155px);
  }
  .no-event {
    margin-top: 16px;
  }
  .buttonAdd {
    width: 100%;
    margin-top: 34px;
  }

  @media (max-width: 1300px) {
    .title-calendar {
      padding-top: 34px;
    }
    .buttonAdd {
      margin-top: 30px;
    }
    .title-left {
      margin-top: 18px;
    }
    .font-p {
      font-size: 15px;
    }
    .event-padding {
      padding-top: 48px;
    }
    .events-card-wrapper {
      padding-bottom: 68px;
    }
    .title-month {
      margin-top: 18px;
    }
    .cards-event {
      margin: 6px 0 12px 0;
    }
  }
  @media (max-width: 1000px) {
    .title-calendar {
      padding-top: 24px;
      margin-bottom: 18px;
    }
    h2 {
      font-size: 22px;
    }
    .no-event {
      margin-top: 12px;
    }
    .event-padding {
      padding-top: 40px;
    }
    .title-left {
      margin-top: 18px;
    }
    .title-event {
      margin-top: 40px;
    }
    .events-card-wrapper {
      padding-bottom: 48px;
    }
  }

  @media (max-width: 1300px) {
    .wrapper {
      @apply px-44;
    }
  }
</style>
