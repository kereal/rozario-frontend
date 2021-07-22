<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { mainStore } from "../stores/global.js";
  import Location from "./icons/Location.svelte";
  import Portal from "./Portal.svelte";
  const svgSize = 24;
  let modalElement;
  let mapModal;
  let street = "";
  const api = false;
  let currentFocus = -1;

  const dispatch = createEventDispatcher();

  let autoCompleteInputValue = "";
  let autoCompleteInputElement;
  let autoCompleteVisible = false;
  let mapModalAutocompleteElement;

  function autoCompleteListMouseover(e) {
    console.log("MOUSEOVER", e.target);
    const active = document.querySelector(".mapmodal-autocomplete-active");
    const li = e.target.closest(".mapmodal-autocomplete-list-item");
    if (!li) {
      return;
    }
    if (active) {
      active.classList.remove("mapmodal-autocomplete-active");
      console.log("li", li);
      li.classList.add("mapmodal-autocomplete-active");
    } else {
      console.log("li", li);
      li.classList.add("mapmodal-autocomplete-active");
    }
    currentFocus = li.dataset.value;
  }
  let data = [];
  function handleAutoCompleteItemClick(e) {
    e.preventDefault();
    const closest = e.target.closest(".mapmodal-autocomplete-list-item");
    console.log("dataset", e.target.dataset);
    if (closest.dataset.number.length > 0) {
      autoCompleteInputValue =
        closest.dataset.street + ", " + closest.dataset.number;
      closeAllLists();
    } else {
      autoCompleteInputValue = closest.dataset.street || autoCompleteInputValue;
      const initialData = data;
      data = initialData.filter(item => {
        console.log("item", item);
        return (
          item.street
            .toLocaleLowerCase()
            .substring(0, autoCompleteInputValue.length) ===
          autoCompleteInputValue.toLocaleLowerCase()
        );
      });
    }
  }

  async function handleAutoCompleteInput() {
    currentFocus = -1;
    if (autoCompleteInputValue.length > 1) {
      if (api) {
        const res = await fetch(
          `http://localhost:8000/autocomplete?city=${$mainStore.address.city}&text=${autoCompleteInputValue}`
        );
        const json = await res.json();
        data = json.resultList;
        return;
      }
      const initialData = data;
      data = initialData.filter((item) => {
        console.log("item", item);
        return (
          item.street
            .toLocaleLowerCase()
            .substring(0, autoCompleteInputValue.length) ===
          autoCompleteInputValue.toLocaleLowerCase()
        );
      });
      if (data.length > 0) openAutoComplete();
    }
  }

  function handleAutoCompleteBlur() {}

  function handleAutoCompleteFocus() {
    console.log("FOCUS INPUT", autoCompleteInputValue);
    if (autoCompleteInputValue.length > 0) {
      console.log("HEREEEEEEE");
      openAutoComplete();
      return;
    }
    $mainStore.address.unknown = false;
  }

  function handleAutoCompleteKeydown(e) {
    const x = document.querySelectorAll(".mapmodal-autocomplete-list-item");
    // console.log("x", x);
    // console.log("data", data);
    if (e.key == "ArrowDown") {
      // if (currentFocus === x.length) currentFocus = -1;
      console.log("currentfocus", currentFocus);
      currentFocus++;
      addActive(x);
    } else if (e.key == "ArrowUp") {
      // if (currentFocus === -1) currentFocus = x.length;
      currentFocus--;
      addActive(x);
    } else if (e.key == "Enter") {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  }

  function addActive(ul) {
    if (!ul) return false;
    const active = document.querySelector(".mapmodal-autocomplete-active");
    console.log("active", active);
    if (active) {
      console.log("isActive");
      active.classList.remove("mapmodal-autocomplete-active");
    }

    if (currentFocus >= ul.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = ul.length - 1;

    console.log("currentFocus", currentFocus);
    ul[currentFocus].classList.add("mapmodal-autocomplete-active");
  }

  function handleAutoCompleteMouseOut() {}

  function handleAutoCompleteMouseOver() {}

  function closeAllLists() {
    console.log("close all lists");
    autoCompleteVisible = false;
  }

  function openAutoComplete() {
    const frameID = window.requestAnimationFrame(() =>
      document.addEventListener("click", hideAutoComplete)
    );
    autoCompleteVisible = true;
    function hideAutoComplete(e) {
      if (
        autoCompleteInputElement &&
        autoCompleteVisible &&
        !mapModalAutocompleteElement.contains(e.target) &&
        !autoCompleteInputElement.contains(e.target)
      ) {
        autoCompleteVisible = false;
        window.cancelAnimationFrame(frameID);
        document.removeEventListener("click", hideAutoComplete);
      }
    }
  }

  function closeModal() {
    console.log("closeMOdal");
    dispatch("close");
  }

  function closeViaOverlay(e) {
    console.log("closeViaOverlay", modalElement);
    if (modalElement && !modalElement.contains(e.target)) dispatch("close");
  }

  async function getPlace(coords) {
    const [lat, long] = coords;
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=239f3c15-dce2-4008-8563-b9f9ca399b0b&geocode=${long},${lat}&lang=ru_RU&format=json`
    );
    const json = await res.json();
    street = json.response.GeoObjectCollection.featureMember[0].GeoObject.name;
  }

  function getLocation() {
    if (location) {
      console.log("hello");
      location
        .get({
          provider: "browser",
          mapStateAutoApply: true
        })
        .then(
          res => {
            console.log("hereerereer");
            // Получение местоположения пользователя.
            const userAddress = res.geoObjects.get(0).properties.get("text");
            const userCoodinates = res.geoObjects
              .get(0)
              .geometry.getCoordinates();

            console.log(
              "userAddress",
              userAddress,
              "userCoordinates",
              userCoodinates
            );
            myMap.setCenter(userCoodinates);
            street = "";
            // Пропишем полученный адрес в балуне.
            // myMap.geoObjects.add(res.geoObjects);
          },
          err => {
            console.log("error", err);
          }
        );
    }
  }

  function setStreet() {
    $mainStore.address.street = street;
    closeModal();
  }

  function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  const debouncedRequest = debounce(getPlace, 250);

  let location;
  let myMap;
  let ymaps;
  onMount(() => {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    if (ymaps) {
      try {
        ymaps.ready(init);
        function init() {
          // Создание карты.
          // myMap = new ymaps.Map("modal-map", {
          //   // Координаты центра карты.
          //   // Порядок по умолчанию: «широта, долгота».
          //   // Чтобы не определять координаты центра карты вручную,
          //   // воспользуйтесь инструментом Определение координат.
          //   center: [55.76, 37.64],
          //   // Уровень масштабирования. Допустимые значения:
          //   // от 0 (весь мир) до 19.
          //   zoom: 15
          // });
          ymaps.geocode($mainStore.address.city).then(res => {
            myMap = new ymaps.Map("modal-map", {
              center: res.geoObjects.get(0).geometry.getCoordinates(),
              zoom: 10
            });
            myMap.events.add("actiontick", () => {
              // console.log("center", myMap.getCenter());
              debouncedRequest(myMap.getCenter());
            });
            myMap.controls.remove("searchControl");
            location = ymaps.geolocation;
          });
        }
      } catch (e) {
        console.log("e", e);
      }
    }
  });
  onDestroy(() => {
    if (myMap) {
      myMap.destroy();
      myMap = null;
    }
  });
</script>

<style lang="postcss">
  .image-box {
    @apply w-32 h-32 flex items-center justify-center;
  }
  .map-modal {
    min-width: 800px;
    min-height: 600px;
    max-height: 48%;
    max-width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (min-width: 1280px) {
    .map-modal {
      min-width: 800px;
      min-height: 600px;
      max-height: 50%;
      max-width: 60%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (min-width: 1440px) {
    .map-modal {
      min-width: 800px;
      min-height: 600px;
      max-height: 50%;
      max-width: 55%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (min-width: 1800px) {
    .map-modal {
      min-width: 800px;
      min-height: 600px;
      max-height: 50%;
      max-width: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
  .close-button {
    right: 1rem;
    top: 1rem;
  }
  .map-wrapper {
    width: 100%;
    height: 400px;
  }
  .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .mapmodal-autocomplete {
    background: white;
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 3rem;
  }
  .close-icon {
    stroke: var(--gray-500);
  }
  .close-icon:hover {
    stroke: var(--gray-700);
  }
  :global(.mapmodal-autocomplete-active) {
    background: rgba(230, 230, 230, 0.4);
  }
</style>

<Portal>
  <div
    transition:fade
    bind:this={mapModal}
    on:click={closeViaOverlay}
    class="overlay">
    <div
      bind:this={modalElement}
      class="bg-white flex flex-col h-full rounded-lg map-modal relative px-34
      pt-24 pb-34">
      <section class="mb-18">
        <h2 class="leading-tight text-main text-3xl mb-32">
          Укажите адрес доставки
        </h2>
        <div class="h-48 flex justify-between items-center">
          <div
            class="w-full relative h-full flex justify-between items-center
            bg-white mr-12 rounded">
            <button
              class="flex py-8 items-center border border-accent rounded-l
              h-full px-8"
              on:click={getLocation}>
              <div class="image-box">
                <Location iconSize="20" classNames="fill-current color-main" />
              </div>
              <span class="text-main ">Определить</span>
            </button>
            {#if street}
              <div
                class="bg-accent flex justify-between items-center rounded-r
                w-full flex pl-20 pr-12 py-8 mr-12">
                <p class="text-main font-bold text-lg">{street}</p>
                <button
                  on:click={e => {
                    e.stopPropagation();
                    street = '';
                  }}
                  class="image-box">
                  <img
                    width={svgSize + 8}
                    height={svgSize + 8}
                    src="close-dark.svg"
                    alt="close" />
                </button>
              </div>
            {:else}
              <div
                class="shadow-tiInset w-full py-8 pl-20 pr-12 flex h-full
                justify-between items-center rounded-r border-r border-t
                border-b border-gray-500 mr-12">
                <input
                  on:focus={handleAutoCompleteFocus}
                  on:keydown={handleAutoCompleteKeydown}
                  on:blur={handleAutoCompleteBlur}
                  on:mouseover={handleAutoCompleteMouseOver}
                  on:mouseout={handleAutoCompleteMouseOut}
                  on:input={handleAutoCompleteInput}
                  bind:value={autoCompleteInputValue}
                  bind:this={autoCompleteInputElement}
                  autocomplete="off"
                  placeholder="Или указать..."
                  class="placeholder-input py-4 w-full h-full rounded"
                  type="text"
                  name="autocomplete" />
                {#if autoCompleteInputValue.length > 0}
                  <button
                    on:click|stopPropagation={e => {
                      autoCompleteInputValue = '';
                    }}
                    class="image-box">
                    <svg
                      class="close-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width={svgSize}
                      height={svgSize}
                      viewBox="0 0 32 32"
                      enable-background="new 0 0 32 32"
                      xml:space="preserve">
                      <g>

                        <line
                          fill="none"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="bevel"
                          stroke-miterlimit="10"
                          x1="5.37"
                          y1="26.637"
                          x2="26.74"
                          y2="5.267" />

                        <line
                          fill="none"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="bevel"
                          stroke-miterlimit="10"
                          x1="5.37"
                          y1="5.266"
                          x2="26.74"
                          y2="26.637" />
                      </g>
                    </svg>
                  </button>
                {/if}
                {#if autoCompleteVisible}
                  <ul
                    on:mouseover={autoCompleteListMouseover}
                    bind:this={mapModalAutocompleteElement}
                    class="mapmodal-autocomplete border-t-2 border-gray-300
                    absolute rounded-b shadow-card overflow-y-auto
                    custom-scrollbar w-9/12 bg-white">
                    {#each data as item, i}
                      <li
                        on:click={handleAutoCompleteItemClick}
                        data-value={i}
                        data-street={item.street}
                        data-number={item.number}
                        class="hover:bg-faded w-full
                        mapmodal-autocomplete-list-item pl-34 cursor-pointer
                        text-black">
                        <div class="py-4 last:border-none">
                          {#if item.number.length > 0}
                            <div>{item.street}, {item.number}</div>
                          {:else}
                            <div>{item.street}</div>
                          {/if}
                          <div class="text-sm text-gray-500">
                            {$mainStore.address.city}
                          </div>
                        </div>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>
            {/if}
            {#if street.length > 0}
              <button
                on:click={setStreet}
                class="rounded bg-accent text-main py-8 px-32 font-bold text-lg">
                <div class="flex justify-center items-center h-32">ОК</div>
              </button>
            {:else}
              <button
                class="cursor-not-allowed rounded bg-accent text-main py-8 px-32
                font-bold text-lg">
                <div
                  class="flex justify-center items-center text-gray-700 h-32">
                  ОК
                </div>
              </button>
            {/if}
          </div>
        </div>
      </section>
      <div class="map-wrapper relative">
        <div class="w-full h-full" id="modal-map" />
        <div class="marker">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            preserveAspectRatio="xMidYMid slice">
            <g width="100%" height="100%">
              <path
                fill="#000"
                d="M16.003,6.109c-3.767,0-6.819,3.053-6.819,6.819c0,6.008,6.819,12.965,6.819,12.965
                s6.818-6.822,6.818-12.965C22.821,9.162,19.769,6.109,16.003,6.109z
                M16.003,15.489c-1.403,0-2.541-1.138-2.541-2.54
                c0-1.403,1.138-2.541,2.541-2.541c1.402,0,2.541,1.138,2.541,2.541C18.544,14.352,17.405,15.489,16.003,15.489z" />
            </g>
          </svg>
        </div>
      </div>
      <button on:click={closeModal} class="close-button absolute">
        <svg
          class="close-icon"
          xmlns="http://www.w3.org/2000/svg"
          width={svgSize}
          height={svgSize}
          viewBox="0 0 32 32"
          enable-background="new 0 0 32 32"
          xml:space="preserve">
          <g>

            <line
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="bevel"
              stroke-miterlimit="10"
              x1="5.37"
              y1="26.637"
              x2="26.74"
              y2="5.267" />

            <line
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="bevel"
              stroke-miterlimit="10"
              x1="5.37"
              y1="5.266"
              x2="26.74"
              y2="26.637" />
          </g>
        </svg>
      </button>
    </div>
  </div>
</Portal>
