<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"
  import { onMount } from "svelte"
  import CustomDropdown from "./CustomDropdown.svelte"
  import TextInput from "./TextInput.svelte"
  import { format, add } from "date-fns"
  import Loading from "./Loading.svelte"
  import Button from "./Button.svelte"

  const dispatch = createEventDispatcher()
  let value = "Удалённая доставка"
  export let route = ""
  export let city = "Мурманск"
  export let visible
  export let shop_name
  export let shop_address
  export let long = 25
  export let onCity = true
  export let delivery_price = 25
  export let deliveryOptions = [
    { text: "доставка к точному времени с 21:00 до 08:00", price: "549" },
    { text: "доставка интервал 2 часа с 21:00 до 08:00", price: "349" },
    { text: "доставка к точному времени с 08:00 до 21:00", price: "249" },
    { text: "доставка интервал 2 часа с 08:00 до 21-00", price: "0" }
  ]
  let modalElement
  let dealVisible = false
  let dealElement
  let position = "RIGHT"
  let once = true
  let tab = "other"
  const deliveryPerionds = [
    "Доставка к точному времени с 21:00 до 08:00",
    "Доставка интервал 2 часа с 21:00 до 08:00",
    "Доставка к точному времени с 08:00 до 21:00",
    "Доставка интервал 2 часа с 08:00 до 21:00",
    "Уточнить время у получателя"
  ]
  let selectedDeliveryPeriond = "Доставка к точному времени с 21:00 до 08:00"
  let deliveryParams = {
    "Доставка к точному времени с 21:00 до 08:00": {
      cost: 150,
      time: 21,
      until: "08",
      period: false,
      toogle: "PeriodOne"
    },
    "Доставка интервал 2 часа с 21:00 до 08:00": {
      cost: 250,
      time: 21,
      until: "08",
      period: 2,
      toogle: "PeriodTwo"
    },
    "Доставка к точному времени с 08:00 до 21:00": {
      cost: 350,
      time: "08",
      until: "21",
      period: false,
      toogle: "PeriodThree"
    },
    "Доставка интервал 2 часа с 08:00 до 21:00": {
      cost: 450,
      time: "08",
      until: "21",
      period: 2,
      toogle: "PeriodFour"
    },
    "Уточнить время у получателя": {
      cost: 550,
      time: "21"
    }
  }
  let PeriodOne = false
  let PeriodTwo = true
  let PeriodThree = true
  let PeriodFour = true

  let calDate
  let timeInputExact
  let timeInputFrom

  onMount(() => {
    if (once) {
      once = false
    }
    ymaps.ready(init)
  })

  function toggleDeal() {
    dealVisible = !dealVisible
  }

  function closeViaOverlay(e) {
    if (!modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
    visible = !visible
  }
  let myMap

  function init() {
    ymaps.geocode(city).then(function (res) {
      myMap = new ymaps.Map("minimap", {
        center: res.geoObjects.get(0).geometry.getCoordinates(),
        zoom: 9,
        controls: []
      })
      myMap.events.add("click", function (e) {
        myMap.geoObjects.remove(PlacemarkShop)
        deliveryСoordinates = e.get("coords")
        PlacemarkShop = new ymaps.Placemark(deliveryСoordinates)
        myMap.geoObjects.add(PlacemarkShop)
        myMap.setCenter(deliveryСoordinates)
        fetch(
          "http://geocode-maps.yandex.ru/1.x/?apikey=239f3c15-dce2-4008-8563-b9f9ca399b0b&format=json&results=1&geocode=" +
            deliveryСoordinates.reverse()
        )
          .then((response) => response.json())
          .then(
            (commits) =>
              (deliveryAdress =
                commits.response.GeoObjectCollection.featureMember[0].GeoObject.name)
          )
      })
      fetch(
        "http://geocode-maps.yandex.ru/1.x/?apikey=239f3c15-dce2-4008-8563-b9f9ca399b0b&format=json&results=1&geocode=" +
          city
      )
        .then((response) => response.json())
        .then((commits) => {
          shopAdress =
            commits.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
          let myPlacemark = new ymaps.Placemark(shopAdress)
          myMap.geoObjects.add(myPlacemark)
        })
    })
  }
  let shopAdress
  let myPlacemark
  export let deliveryAdress = ""
  let PlacemarkShop
  let deliveryСoordinates

  function getPlaceDelivery(commits) {
    myMap.geoObjects.remove(PlacemarkShop)
    deliveryСoordinates =
      commits.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(" ")
        .reverse()
    PlacemarkShop = new ymaps.Placemark(deliveryСoordinates)
    myMap.geoObjects.add(PlacemarkShop)
    myMap.setCenter(deliveryСoordinates)
  }
  let loading = false
  let loadingcardVis = true
  let postcardVis = false
  let postcardAfterMapVis = true

  function stopLoading() {
    loadingcardVis = !loadingcardVis
    postcardAfterMapVis = !postcardAfterMapVis
  }
  function Calculate() {
    loadingcardVis = !loadingcardVis
    postcardVis = !postcardVis
    setTimeout(stopLoading, 2000)
  }
  function save() {
    route = deliveryAdress
    visible = !visible
  }
</script>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div bind:this={modalElement} class="modal relative">
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
      {#if value == "Удалённая доставка"}
        <div class="loading" class:loadingcardVis>
          <Loading text="Рассчитываю стоимость..." />
        </div>
        <div class="postcard" class:postcardVis>
          <h2 class="deliverycard__name">Рассчитать стоимость доставки</h2>
          <div>
            <div class="flex">
              <input
                bind:value={deliveryAdress}
                placeholder="Укажите адрес"
                class="input__city text-main"
                on:blur={fetch(
                  "http://geocode-maps.yandex.ru/1.x/?apikey=239f3c15-dce2-4008-8563-b9f9ca399b0b&format=json&results=1&geocode=" +
                    deliveryAdress
                )
                  .then((response) => response.json())
                  .then((commits) => getPlaceDelivery(commits))}
              />

              <Button
                status={deliveryAdress == "" ? "disabled-main" : "active-main"}
                size="lg"
                on:click={Calculate}
              >
                Рассчитать
              </Button>
            </div>
            <div class="map" id="minimap" style="width:632px; height:417px;" />
          </div>
        </div>
        <div class:postcardAfterMapVis>
          <h2 class="deliverycard__name">Стоимость доставки</h2>
          {#if onCity}
            <p class="delivery__text mb-8">
              Длина маршрута <span class="delivery__text_param"
                >{city} — {deliveryAdress}, 1 = {long} км
              </span>
            </p>
            <p class="delivery__text mb-34">
              Расчёт стоимости удалённой доставки производится по тарифу <span
                class="delivery__text_param">1км = {delivery_price} ₽</span
              >
            </p>
          {:else}
            <p class="delivery__text mb-34">
              {shop_name} • {city}, {shop_address} • Доставка круглосуточно
            </p>
          {/if}
          <div>
            <ul>
              {#each deliveryOptions as option}
                <li
                  style="transform: translateX(-0.5rem);"
                  class="pl-8 flex items-center text-main py-12 border-b
                      last:border-b-0 border-gray-900"
                >
                  <div class="image-box">
                    <img width={24} height={24} src="/delivery-icon.svg" alt="delivery" />
                  </div>
                  <span class="mx-8 block w-40">{option.price}Р</span>
                  <p class="ml-40 text-md">{option.text}</p>
                </li>
              {/each}
            </ul>
          </div>
          <div class="save_button">
            <Button size="lg" on:click={save}>Сохранить</Button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</Portal>

<style lang="postcss">
  .postcardAfterMapVis {
    display: none;
  }
  .loadingcardVis {
    display: none;
  }
  .postcardVis {
    display: none;
  }
  .PeriodOne {
    display: none;
  }
  .overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    width: 700px;
    height: 596px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 30px 34px;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  .deliverycard__name {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 24px;
    color: var(--color-main);
  }
  .search {
    margin-bottom: 24px;
  }
  .input__city {
    width: 464px;
    height: 46px;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 24px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 16px;
    line-height: 130%;
  }
  .map {
    width: 632px;
    height: 417px;
  }
  .loading {
    margin-top: 250px;
    margin-left: 200px;
  }
  .delivery__text {
    font-weight: normal;
    font-size: 14px;
    color: var(--gray-600);
  }
  .delivery__text_param {
    color: var(--color-main);
    font-size: 15px;
  }
  .save_button {
    position: absolute;
    left: 34px;
    bottom: 30px;
  }
</style>
