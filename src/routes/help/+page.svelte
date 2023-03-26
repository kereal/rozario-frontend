<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(
        `index.json?city=${page.host.split(".")[0]}&path=${page.path}`
      )
      const json = await res.json()
      return {
        cityMeta: json.cityMeta
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import { setContext, onMount } from "svelte"
  import Button from "@/components/Button.svelte"
  import Tabbar from "@/components/Tabbar.svelte"
  import HelpQuestion from "@/components/HelpQuestion.svelte"
  import HelpCategory from "@/components/HelpCategory.svelte"
  import HelpSearchInput from "@/components/HelpSearchInput.svelte"
  import HelpSearchResult from "@/components/HelpSearchResult.svelte"
  import ContactUsModal from "@/components/ContactUsModal.svelte"
  import ChatStripes from "@/components/icons/ChatStripes.svelte"
  import Icon from "@/components/Icon.svelte"
  import GetCallModal from "@/components/GetCallModal.svelte"
  import InfoPopup from "@/components/InfoPopup.svelte"
  import debounce from "lodash/debounce"
  import ScrollSpy from "@/utils/scrollSpy.js"
  import { mainStore } from "@/stores/global.js"
  import { page } from "$app/stores"

  setContext("contact-us-modal", {
    toggleGetCall
  })

  export let data
  let containerElement
  let AboutServiceHeader
  let OrderCheckoutHeader
  let PaymentHeader
  let DeliveryHeader
  let ReceivementHeader
  let ProtectionHeader

  const menulist = [
    { name: "О сервисе", index: 0 },
    { name: "Оформление заказа", index: 1 },
    { name: "Оплата", index: 2 },
    { name: "Доставка", index: 3 },
    { name: "Получение заказа", index: 4 },
    { name: "Защита покупателя", index: 5 }
  ]
  let currentMenuIndex = 0

  let timeoutid
  let showClearSearchButton = true
  let hasResultsChanged = function (hasResults) {
    console.log(hasResults)
    showClearSearchButton = !hasResults
  }

  let aboutServiceQA = [
    {
      question: "Как можно с вами связаться?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Зачем регистрироваться на сайте?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как войти в личный кабинет?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Что делать, если забыл пароль?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]
  let orderCheckoutQA = [
    {
      question: "Можно ли изменить заказ после оформления?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как узнать статус заказа?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как отменить заказ?",
      answer:
        "Чтобы отменить заказ, нажмите на кнопку «Отменить» в соответствующем заказе в личном кабинете (ссылка приходит при оформлении заказа в смс и на электронную почту)"
    },
    {
      question: "Можно ли увидеть готовый заказ до доставки?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как будет выглядеть открытка?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как будет выглядеть открытка?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]
  let paymentQA = [
    {
      question: "Какие доступны способы оплаты на сайте?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как применить купон при оплате заказа?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Можно ли оплатить заказ при получении?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как оплатить безналичным расчетом для юридических лиц или ИП?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как осуществляется возврат денежных средств?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как осуществляется возврат денежных средств?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]
  let deliveryQA = [
    {
      question: "Как связаться с курьером?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Есть ли самовывоз?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "От чего зависит стоимость доставки?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Можно доставить заказ к точному времени?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как я узнаю о доставке заказа?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Как я узнаю о доставке заказа?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]
  let receivementQA = [
    {
      question: "Что делать, если курьер опаздывает?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Что делать, если полученный заказ не устраивает?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question:
        "Если время или место получения заказа нужно согласовать с получателем, то когда ему позвонят?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]
  let protectionQA = [
    {
      question: "Что такое защита покупателя?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Безопасно ли оплачивать заказ на сайте?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Получу ли я полный возврат, если отменю заказ?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Могу ли я заказать букет анонимно?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Какие гарантии того, что цветы будут свежими?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    },
    {
      question: "Какие гарантии того, что цветы будут свежими?",
      answer:
        "Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб."
    }
  ]

  let qaList = [
    {
      header: menulist[0].name,
      qa: aboutServiceQA
    },
    {
      header: menulist[1].name,
      qa: orderCheckoutQA
    },
    {
      header: menulist[2].name,
      qa: paymentQA
    },
    {
      header: menulist[3].name,
      qa: deliveryQA
    },
    {
      header: menulist[4].name,
      qa: receivementQA
    },
    {
      header: menulist[5].name,
      qa: protectionQA
    }
  ]

  function goToHeader(e) {
    if (searchTerm) {
      clearSearch()
      setTimeout(function () {
        scrollSpy.refresh()
        scrollToHeader(e)
      }, 300)
    } else {
      scrollToHeader(e)
    }
  }
  function scrollToHeader(e) {
    console.log(e)

    setTimeout(() => {
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
    })
  }

  let headers
  let scrollSpy
  let searching = false
  let searchTerm = ""

  function onSearch(term) {
    searchTerm = term
    searching = true
  }
  function onSearchCanceled() {
    clearSearch()
  }
  let contactUsModalVisible = false
  let infoModalVisible = false
  let getCallVisible = false
  setContext("contact-us-modal", {
    toggleGetCall
  })
  function toggleGetCall() {
    getCallVisible = !getCallVisible
  }
  function toggleContactUs() {
    contactUsModalVisible = !contactUsModalVisible
  }
  function toggleInfoModal() {
    infoModalVisible = !infoModalVisible
  }
  function clearSearch() {
    searchTerm = ""
    searching = false
    showClearSearchButton = false
    scrollSpy.refresh()
  }
  function onQuestionOpenChanged() {
    setTimeout(function () {
      scrollSpy.refresh()
    }, 300)
  }

  onMount(() => {
    headers = [
      AboutServiceHeader,
      OrderCheckoutHeader,
      PaymentHeader,
      DeliveryHeader,
      ReceivementHeader,
      ProtectionHeader
    ]

    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    $mainStore.address.city = data.cityMeta
  })
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>Помощь</title>
  <meta name="description" content="CONTACTS_DESCRIPTION" />
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
<div id="search-page">
  <div class="flex justify-between">
    <div class="w-full page" itemscope itemtype="https://schema.org/FAQPage">
      <div class="with-background">
        <Tabbar
          pos="top: 5rem;"
          className="sticky"
          on:change={goToHeader}
          {currentMenuIndex}
          {menulist}
        />
        <div class="page-content" bind:this={containerElement}>
          <div class="search-n-button">
            <div class="search">
              <HelpSearchInput {searching} {searchTerm} {onSearchCanceled} {onSearch} />
            </div>
            <div
              on:click={toggleContactUs}
              class="button cursor-pointer bg-transparent flex nav-item items-center pl-24 contact-us-button"
            >
              <div style="padding-left:1px;" class="icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6571 2.34506C12.1455 0.834171 10.1378 0 7.99943 0C5.86102 0 3.85334 0.834171 2.34171 2.34506C-0.574294 5.25963 -0.785453 9.91625 1.81214 13.072C1.4535 13.8057 1.03118 14.2948 0.551887 14.5293C0.260286 14.6734 0.0960515 14.9883 0.142976 15.3099C0.193252 15.6348 0.44128 15.8861 0.766397 15.9363C0.944039 15.9631 1.13509 15.9799 1.33284 15.9799C2.3149 15.9799 3.34723 15.6415 4.20862 15.0486C5.36832 15.6717 6.67214 16 7.99943 16C10.1378 16 12.1455 15.1692 13.6571 13.6583C15.1688 12.1474 16 10.1374 16 8.00335C16 5.86935 15.1688 3.85595 13.6571 2.34506ZM13.017 13.0151C11.6763 14.3551 9.89315 15.0921 7.99943 15.0921C6.73247 15.0921 5.48898 14.7538 4.40637 14.1173C4.33599 14.0771 4.25555 14.0536 4.17846 14.0536C4.08126 14.0536 3.9807 14.0871 3.90026 14.1474C2.87463 14.9414 1.8423 15.0586 1.38982 15.0687C1.92945 14.6667 2.38193 14.0435 2.76068 13.1759C2.83106 13.0151 2.8009 12.8275 2.68359 12.6935C0.203307 9.8928 0.334024 5.62479 2.98189 2.97822C4.32258 1.63819 6.1057 0.901172 7.99943 0.901172C9.89315 0.901172 11.6763 1.63819 13.017 2.97822C15.7855 5.74874 15.7855 10.2513 13.017 13.0151Z"
                    fill="#999999"
                  />
                  <path
                    d="M11.3522 6H4.64877C4.39739 6 4.19629 6.20101 4.19629 6.45226C4.19629 6.70352 4.39739 6.90452 4.64877 6.90452H11.3522C11.6036 6.90452 11.8047 6.70352 11.8047 6.45226C11.8047 6.20101 11.6003 6 11.3522 6Z"
                    fill="#999999"
                  />
                  <path
                    d="M11.3522 9.37549H4.64877C4.39739 9.37549 4.19629 9.57649 4.19629 9.82775C4.19629 10.079 4.39739 10.28 4.64877 10.28H11.3522C11.6036 10.28 11.8047 10.079 11.8047 9.82775C11.8047 9.57649 11.6003 9.37549 11.3522 9.37549Z"
                    fill="#999999"
                  />
                </svg>
              </div>
              <span class="ml-10 leading-snug">Связаться с нами</span>
            </div>
            {#if contactUsModalVisible}
              <ContactUsModal on:close={toggleContactUs} />
            {/if}

            {#if infoModalVisible}
              <InfoPopup
                on:close={toggleInfoModal}
                title="Спасибо за обращение!"
                text="Ожидайте звонка нашего специалиста."
              />
            {/if}

            {#if getCallVisible}
              <GetCallModal
                on:thanks={() => {
                  toggleGetCall()
                  toggleInfoModal()
                }}
                on:close={toggleGetCall}
              />
            {/if}
          </div>
          <div bind:this={AboutServiceHeader} class:searching>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[0].header}
                qaList={qaList[0].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          <div bind:this={OrderCheckoutHeader}>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[1].header}
                qaList={qaList[1].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          <div bind:this={PaymentHeader}>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[2].header}
                qaList={qaList[2].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          <div bind:this={DeliveryHeader}>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[3].header}
                qaList={qaList[3].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          <div bind:this={ReceivementHeader}>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[4].header}
                qaList={qaList[4].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          <div bind:this={ProtectionHeader}>
            <div class:hidden={searching}>
              <HelpCategory
                header={qaList[5].header}
                qaList={qaList[5].qa}
                {onQuestionOpenChanged}
              />
            </div>
          </div>
          {#if searching}
            <div class="search-results">
              <HelpSearchResult {hasResultsChanged} {searching} {searchTerm} {qaList} />
            </div>
          {/if}
        </div>
      </div>
      {#if searching}
        {#if showClearSearchButton}
          <div id="clear-search-button">
            <Button on:click={clearSearch}>Вернуться к списку вопросов</Button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
  }
  .with-background {
    background: linear-gradient(
        180deg,
        var(--color-light) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      #f2f2f2;
    margin-bottom: 10px;
    flex-basis: 100%;
  }
  .page-content {
    border: 1px solid var(--gray-300);
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-right: 44px;
    padding-left: 44px;
    padding-top: 24px;
    padding-bottom: 68px;
    min-height: calc(100vh - 5.5em - 70px - 56px);
  }
  .no-results .page-content {
    min-height: calc(100% - 5.5rem - 70px - 52px);
  }
  #clear-search-button :global(button) {
    padding: 12px;
    width: 100%;
    margin-top: -4px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .search-n-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: auto;
    position: relative;
    z-index: 3;
  }
  div.page-content :global(div.searching) {
    margin-bottom: 0;
  }
  .page-content > :global(div) {
    max-width: 1028px;
    margin: auto;
  }
  .page-content .search-n-button + :global(div:not(.search-results):not(.searching)) {
    margin-top: -38px;
  }
  .page .page-content :global(.answer-wrapper) {
    max-width: 850px;
  }
  .search {
    flex-grow: 1;
  }
  .contact-us-button {
    color: var(--gray-700);
    font-size: 14px;
  }
  .contact-us-button :global(svg) {
    width: 16px;
    height: 16px;
  }
  .contact-us-button :global(path) {
    fill: var(--gray-700);
  }
  .contact-us-button:hover {
    color: var(--color-info);
  }
  .contact-us-button:hover :global(path) {
    fill: var(--color-info);
  }
  .contact-us-button:active {
    color: var(--gray-700);
  }
  .contact-us-button:active :global(path) {
    fill: var(--gray-700);
  }
  .search-results {
    padding-top: 16px;
  }
  .page-content > div:last-child :global(.questions-category) {
    padding-bottom: 0;
  }
  .page .page-content :global(.answer-wrapper) {
    max-width: 900px;
  }

  @media (min-width: 1280px) {
    .page-content {
      padding-left: 2.125rem;
      padding-right: 2.125rem;
    }
  }
  @media (min-width: 1420px) {
    .page-content {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }
  @media screen and (max-width: 1300px) {
    .page-content {
      padding-bottom: 68px;
    }
    .page .page-content :global(.answer-wrapper) {
      max-width: 900px;
    }
  }
  @media screen and (max-width: 1300px) {
    .page-content {
      padding-top: 18px;
    }
    #clear-search-button :global(button) {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 1000px) {
    .page .page-content :global(.answer-wrapper) {
      max-width: 750px;
    }
  }
</style>
