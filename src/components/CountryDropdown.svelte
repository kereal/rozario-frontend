<script>
  import { mainStore } from "../stores/global.js";
  import CustomDropdown from "./CustomDropdown.svelte";

  export let position;
  export let css;
  export let countriesDropdown;

  let countries = [
    { name: "Английский", flag: "united-states-of-america", currency: "$" },
    { name: "Русский", flag: "russia", currency: "₽" }
  ];

  let currencyList = [
    { currency: "$", name: "dollar" },
    { currency: "₽", name: "rouble" },
    { currency: "€", name: "euro" }
  ];

  let countriesDropdownVisible = false;
  let countriesDropdownElement;

  function nextCurrency(e) {
    const next = currencyList.shift();
    currencyList.push(next);
    currencyList = currencyList;
    mainStore.setCurrentCurrency(currencyList[1]);
  }
  function prevCurrency(e) {
    const prev = currencyList.pop();
    currencyList.unshift(prev);
    currencyList = currencyList;
    mainStore.setCurrentCurrency(currencyList[1]);
  }

  function nextCountry(e) {
    const next = countries.shift();
    countries.push(next);
    countries = countries;
    mainStore.setCurrentCountry(countries[1]);
  }
  function prevCountry(e) {
    const prev = countries.pop();
    countries.unshift(prev);
    countries = countries;
    mainStore.setCurrentCountry(countries[1]);
  }

  function selectCurrency(e) {
    if (e.target.dataset.index > 1) {
      nextCurrency();
    } else {
      prevCurrency();
    }
  }
</script>

<button
  data-cy="country-dropdown"
  bind:this={countriesDropdownElement}
  on:click={() => (countriesDropdownVisible = !countriesDropdownVisible)}
  class="bg-white py-4 relative flex-shrink-0 flex justify-between items-center
  mr-16 border-gray-500 border rounded-full px-16">
  <img
    class="mr-8 border border-gray-500"
    style="width: 1.5rem; height:1rem;"
    src="{$mainStore.currentCountry.flag}-flag-icon-32.png"
    alt="{$mainStore.currentCountry.name}" />
  <span data-cy="country-dropdown__currency" class="text-main font-semibold">
    {$mainStore.currentCurrency.currency}
  </span>
</button>
{#if countriesDropdownVisible}
  <CustomDropdown
    bind:dropdownVisible={countriesDropdownVisible}
    {css}
    buttonRef={countriesDropdownElement}
    relativeElement={countriesDropdownElement}
    {position}>
    <div bind:this={countriesDropdown} class="px-32 py-24 bg-white">
      <div
        class="flex justify-between items-center w-full pb-16 border-b
        border-gray-300 mb-16">
        <button on:click={prevCountry} class="w-24 h-24">
          <img src="prev.svg" alt="<" />
        </button>
        <div class="flex mx-8 items-center">
          <img
            width="24"
            class="mr-8 border border-gray-500"
            src="{$mainStore.currentCountry.flag}-flag-icon-32.png"
            alt="" />
          <span class="text-main font-bold">
            {$mainStore.currentCountry.name}
          </span>
        </div>
        <button data-cy="country-dropdown__next" on:click={nextCountry} class="w-24 h-24">
          <img src="next.svg" alt=">" />
        </button>
      </div>
      <ul class="flex w-full px-16 items-center justify-around">
        {#each currencyList as currency, i}
          <li class="mr-8 last:mb-0">
            <div class="text-lg flex justify-between items-center">
              {#if i === 1}
                <span
                  class="inline-block text-main px-8 py-4 border border-gray-700
                  rounded">
                  {currency.currency}
                </span>
              {:else}
                <button
                  data-cy="country-dropdown__button-sel-{currency.name}"
                  data-index={i}
                  on:click={selectCurrency}
                  class="inline-block text-gray-700 px-8 py-4">
                  {currency.currency}
                </button>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </CustomDropdown>
{/if}
