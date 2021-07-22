<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(
        `index.json?city=${page.host[0]}&path=${page.path}`
      );
      const json = await res.json();
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
      };
    } catch (e) {
      console.log(e);
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  import { currPaymentStore } from "../stores/cart.js";
  import RecieverCard from "../components/RecieverCard.svelte";
  import AddressCard from "../components/AddressCard.svelte";
  import UserDataCard from "../components/UserDataCard.svelte";
  import PaymentCard from "../components/PaymentCard.svelte";
  import PaymentResult from "../components/PaymentResult.svelte";
  import MyOrder from "../components/OrderContainer.svelte";
  import CartMenu from "../components/CartMenu.svelte";
  import DateCard from "../components/DateCard.svelte";
  import MiscellaneousCard from "../components/MiscellaneousCard.svelte";
  import { orderStore } from "../stores/order.js";
  import { mainStore } from "../stores/global.js";
  import { stores } from "@sapper/app";

  const { page } = stores();

  let date;

  export let orderList;
  export let cityMeta;

  console.log("orderStore", $orderStore);

  let gpayReady = false;
  let mounted = false;

  let tab = "other";
let address = {
    value: "г. Мурманск",
    street: "пр Ленина",
    house: "",
    building:'',
    intercom: '',
    apartment: "",
    porch: "",
    floor: "",
    noAddress: "selfPickup",
    selfPickup: "",
    status: "selfPickup",
    neighbors:'',
    noSay:''
  };
  let paymentName;
  let paymentTypes = [
    {
      buttonText: "Перейти к оплате",
      text: "Банковская карта",
      src: "bankcard.svg",
      kind: "BankCard",
      check: true
    },
    {
      buttonText: "Оформить заказ",
      text: "Оплата при получении",
      src: "cash.svg",
      kind: "Cash",
      check: false
    },
    {
      buttonText: "",
      text: "",
      src: "gpay.svg",
      kind: "GooglePay",
      width: "72",
      height: "29",
      opacity: '85',
      check: false
    },
    {
      buttonText: "Выставить счёт",
      text: "Безнал для юр. лиц",
      src: "legal.svg",
      kind: "CashLegal",
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "PayPal.svg",
      kind: "PayPal",
      width: "120",
      height: "32",
      opacity: "80",
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "Yandex_Money.svg",
      kind: "YandexMoney",
      width: "134",
      height: "26",
      opacity: '70',
      check: false
    },
    {
      buttonText: "Оплатить с",
      text: "",
      src: "apple-pay.svg",
      kind: "ApplePay",
      width: "73",
      height: "32",
      opacity: '60',
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "Beeline.svg",
      kind: "Beeline",
      width: "109",
      height: "32",
      opacity: '70',
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "WebMoney_logo.svg",
      kind: "WebMoney",
      width: "133",
      height: "30",
      opacity: "85",
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "qiwi_logo.svg",
      kind: "Qiwi",
      width: "88",
      height: "32",
      opacity: "75",
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "Svyaznoy.svg",
      kind: "Svyaznoy",
      width: "104",
      height: "18",
      opacity: "80",
      check: false
    },
    {
      buttonText: "Перейти к оплате",
      text: "",
      src: "mts.svg",
      kind: "Mts",
      width: "88",
      height: "22",
      opacity: "75",
      check: false
    }
  ];

  function scrollToError() {
    let noValid;
    setTimeout(()=>{
      const yOffset = -100;
      const element = document.querySelector(".error")
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'})
          }, 0.2)
  }
  onMount(() => {
    $orderStore.orderList = orderList || [];
    $orderStore.totalPrice =
      orderList.reduce((acc, val) => {
        return acc + val.flower.price * val.flower.quantity;
      }, 0) || 0;
    $mainStore.address.city = cityMeta || {};
    mounted = true;
    if (gpayReady) {
      loadGooglePay();
    }
  });

  $: console.log("paymentTypes", paymentTypes, $currPaymentStore);

  $: paymentName = paymentTypes.find(type => type.check)
    ? paymentTypes.find(type => type.check).buttonText
    : "Оформить заказ";


</script>

<style lang="postcss">
  .cart-grid {
    grid-template-rows: 1fr 46px;
    grid-template-columns: 1fr 350px;
    grid-column-gap: 10px;
    grid-row-gap: 6px;
    grid-template-areas:
      "main order"
      "pay order";
    display: grid;
    margin-bottom: 10px;
  }
  .cart-grid-main {
    grid-area: main;
    height: 100%;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
      #f2f2f2;
  }
  .cart-grid-order {
    position: sticky;
    top: 88px;
    height: calc(100vh - 6.4rem);
    grid-area: order;
  }
  .cart-grid-pay {
    grid-area: pay;
  }

  @supports (-webkit-appearance: -apple-pay-button) {
    .apple-pay-button-with-text {
      display: inline-block;
      -webkit-appearance: -apple-pay-button;
      -apple-pay-button-type: buy;
    }
    .apple-pay-button-with-text > * {
      display: none;
    }
    .apple-pay-button-black-with-text {
      -apple-pay-button-style: black;
    }
    .apple-pay-button-white-with-text {
      -apple-pay-button-style: white;
    }
    .apple-pay-button-white-with-line-with-text {
      -apple-pay-button-style: white-outline;
    }
  }

  @supports not (-webkit-appearance: -apple-pay-button) {
    .apple-pay-button-with-text {
      --apple-pay-scale: 1; /* (height / 32) */
      display: inline-flex;
      justify-content: center;
      font-size: 12px;
      border-radius: 5px;
      padding: 0px;
      box-sizing: border-box;
      min-width: 200px;
      min-height: 32px;
      max-height: 64px;
    }
    .apple-pay-button-black-with-text {
      background-color: black;
      color: white;
    }
    .apple-pay-button-white-with-text {
      background-color: white;
      color: black;
    }
    .apple-pay-button-white-with-line-with-text {
      background-color: white;
      color: black;
      border: 0.5px solid black;
    }
    .apple-pay-button-with-text.apple-pay-button-black-with-text > .logo {
      background-image: -webkit-named-image(apple-pay-logo-white);
      background-color: black;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-text > .logo {
      background-image: -webkit-named-image(apple-pay-logo-black);
      background-color: white;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-line-with-text
      > .logo {
      background-image: -webkit-named-image(apple-pay-logo-black);
      background-color: white;
    }
    .apple-pay-button-with-text > .text {
      font-family: -apple-system;
      font-size: calc(1em * var(--apple-pay-scale));
      font-weight: 300;
      align-self: center;
      margin-right: calc(2px * var(--apple-pay-scale));
    }
    .apple-pay-button-with-text > .logo {
      width: calc(35px * var(--scale));
      height: 100%;
      background-size: 100% 60%;
      background-repeat: no-repeat;
      background-position: 0 50%;
      margin-left: calc(2px * var(--apple-pay-scale));
      border: none;
    }
  }
  .line {
    height: 1px;
    @apply w-full bg-gray-1000;
  }
  .wrapper {
    @apply px-44 pt-34 pb-68 border-l border-r border-t border-gray-300 rounded;
  }
  @media (min-width: 1140px) {
    .wrapper {
      @apply pt-34;
    }
  }
  @media (min-width: 1420px) {
    .wrapper {
      @apply px-80 pt-48;
    }
  }
</style>

<svelte:head>
  <title>Корзина</title>
  <meta name="description" content="CART_DESCRIPTION" />

  <link rel="canonical" href={$page.host + $page.path} />

  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="ru"
    title="Русский" />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="en"
    title="English" />

  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, " />

  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />

  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />

  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<form class="cart-grid">
  {#if tab === 'me'}
    <div class="cart-grid-main h-full rounded">
      <div class="wrapper">
        <CartMenu bind:tab />
        <UserDataCard tab="me" />
        <span class="block w-full h-68" />
        <AddressCard bind:address={address} tab="me" />
        <span class="block w-full h-68" />
        <DateCard bind:date tab="me" bind:address={address}/>
        <span class="block w-full h-68" />
        <MiscellaneousCard />
        <span class="block w-full h-68" />
        <PaymentCard bind:paymentTypes />
      </div>
      <div class="line" />
      <PaymentResult tab="me" {date} />
    </div>
  {:else if tab === 'other'}
    <div class="cart-grid-main h-full">
      <div class="wrapper">
        <CartMenu bind:tab />
        <RecieverCard />
        <span class="block w-full h-68" />
        <AddressCard bind:address={address} tab="other" />
        <span class="block w-full h-68" />
        <DateCard bind:date tab="other"bind:address={address}/>
        <span class="block w-full h-68" />
        <UserDataCard tab="other" />
        <span class="block w-full h-68" />
        <MiscellaneousCard />
        <span class="block w-full h-68" />
        <PaymentCard bind:paymentTypes />
      </div>
      <div class="line" />
      <PaymentResult tab="other" {date} />
    </div>
  {/if}
  <button
    id="goto-payment"
    class="{$currPaymentStore === 'ApplePay' ? 'bg-black text-white' : ''} font-semibold
    cart-grid-pay text-main bg-accent w-full text-center rounded hover:bg-info hover:text-white" on:click={scrollToError}>
    <div class="flex justify-center items-center">
      {paymentName}
      {#if $currPaymentStore === 'GooglePay'}
        <span>Оплатить с </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none" class="ml-12 mr-6 ">
          <path d="M18.3451 9.74422C18.3459 9.09498 18.292 8.44686 18.1839 7.80701H9.3584V11.4763H14.4133C14.3098 12.0624 14.0909 12.621 13.7697 13.1186C13.4484 13.6162 13.0316 14.0424 12.5442 14.3716V16.7534H15.561C17.3274 15.0954 18.3451 12.6434 18.3451 9.74422Z" fill="#4285F4"/>
          <path d="M9.35857 19.0546C11.8841 19.0546 14.0105 18.2103 15.5611 16.7548L12.5443 14.373C11.7047 14.9525 10.6233 15.2833 9.35857 15.2833C6.91758 15.2833 4.84573 13.6081 4.10485 11.3507H0.99707V13.8053C1.77599 15.3832 2.97037 16.7097 4.44688 17.6366C5.92338 18.5636 7.6239 19.0545 9.35857 19.0546Z" fill="#34A853"/>
          <path d="M4.10429 11.3507C3.71262 10.1678 3.71262 8.88677 4.10429 7.70386V5.24927H0.996508C0.341255 6.57667 0 8.04168 0 9.52727C0 11.0129 0.341255 12.4779 0.996508 13.8053L4.10429 11.3507Z" fill="#FBBC04"/>
          <path d="M9.35858 3.77122C10.6932 3.74903 11.9828 4.26238 12.9486 5.20031L15.6196 2.48107C13.9259 0.861539 11.6821 -0.0276131 9.35858 1.47261e-05C7.6239 9.52118e-05 5.92338 0.491006 4.44688 1.41794C2.97037 2.34487 1.77599 3.67135 0.99707 5.24927L4.10485 7.70387C4.84573 5.44643 6.91758 3.77122 9.35858 3.77122Z" fill="#EA4335"/>
        </svg> <span>Pay</span>
      {/if}
      {#if $currPaymentStore === 'ApplePay'}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 16 19" fill="none" class="ml-12 mr-6 -mt-4">
          <path d="M10.4992 2.95091C9.85786 3.72402 8.83165 4.33381 7.80545 4.24669C7.67717 3.20135 8.17959 2.09068 8.76752 1.40468C9.40889 0.609782 10.5313 0.0435558 11.4399 0C11.5468 1.0889 11.1299 2.15601 10.4992 2.95091ZM11.4292 4.45358C9.94338 4.36647 8.67131 5.31381 7.96579 5.31381C7.24959 5.31381 6.16993 4.49714 4.99407 4.51892C3.46545 4.5407 2.04373 5.4227 1.26338 6.82738C-0.340062 9.63673 0.846488 13.7963 2.39649 16.083C3.15545 17.2154 4.06407 18.4568 5.26131 18.4132C6.39441 18.3697 6.84338 17.6619 8.21165 17.6619C9.59062 17.6619 9.98614 18.4132 11.1834 18.3915C12.4234 18.3697 13.2037 17.259 13.9627 16.1266C14.8285 14.8417 15.1813 13.5894 15.2027 13.5241C15.1813 13.5023 12.8082 12.5767 12.7868 9.78918C12.7654 7.45894 14.6575 6.34826 14.743 6.28293C13.6741 4.67136 12.0065 4.49714 11.4292 4.45358Z" fill="white"/>
        </svg> <span>Pay</span>
      {/if}
    </div>
  </button>
  <aside class="cart-grid-order">
    <MyOrder />
  </aside>
</form>
