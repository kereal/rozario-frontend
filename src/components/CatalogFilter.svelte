<script>
  import { mainStore, uiStore } from "../stores/global.js";
  import DropdownElement from "./DropdownElement.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import ItemList from "./ItemList.svelte";

  export let filtersData;

  let sortList = [
    { name:"popularity", text: "По популярности", checked: true },
    { name:"priceAscending", text: "По возрастанию цены", checked: false },
    { name: "priceDescending", text: "По убыванию цены", checked: false },
  ];
  export let sortingOrder = sortList[0];

  let deliveryDropdownVisible;

  let deliveryDropdownIcon;

  let deliveryDropdownButton;

  let checkedFilter = null;

  let isFilterChecked;

  function toggleDeliveryDropdown() {
    deliveryDropdownVisible = !deliveryDropdownVisible;
  }
  function selectSort(e) {
    sortingOrder = e.detail.data.find((sort) => sort.checked);
    toggleDeliveryDropdown();
  }
  function removeAllFilters() {
    filtersData = filtersData.map(filter => {
      filter.current = null
      return filter
    })
  }
</script>

<style>
  .border-right-left-clr {
    border-right-color: var(--gray-300);
    border-left-color: var(--gray-300);
  }
  .border-bottom-clr {
    border-bottom-color: var(--gray-300);
  }
  .cleanButton {
    width: 178px;
    height: 44px;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 16px;
    line-height: 130%;
    color: var(--gray-700);
    margin-top: 12px;
  }
  .cleanButton:hover {
    border: 1px solid var(--gray-700);
    color: var(--gray-600);
  }
  .height-46 {
    min-height: 46px;
  }
  .common-filter {
    width: 52px;
    height: 46px;
  }
  .filter-list {
    min-height: 46px;
    height: auto;
  }
  .sortButton{

  }
  .sortButton:hover line{
    stroke:var(--color-info);
  }
  .sortButton:hover circle{
    stroke:var(--color-info);
  }
  .sortButton:hover path{
    stroke:var(--color-info);
  }
</style>

<div
  class="border-right-left-clr border-bottom-clr px-44 lg:px-34 xl:px-80
  border-b border-l border-r flex justify-between pb-14">
  <div
    class="filter-list w-full rounded  flex flex-col">
    <div class="flex flex-wrap justify-start items-center">
      {#each filtersData as filter (filter.name)}
        <div class="filter mr-14 bg-gray-200 leading-snug px-14 py-12 rounded mt-14 " >
          <DropdownElement
            bind:currentFilter={filter.current}
            type={filter.name}
            listData={filter.list}
            hover = true
            text={filter.text} />
        </div>
      {/each}
      {#if filtersData.find(filter => filter.current)}
        <div class="cleanButton" >
          <button on:click={removeAllFilters} class="leading-snug w-full h-full">Очистить фильтры</button>
        </div>
      {/if}
    </div>
  </div>
  <div
    class="common-filter px-12 ml-20 flex rounded items-center mt-14 bg-gray-200">
    <button
      on:click={toggleDeliveryDropdown}
      bind:this={deliveryDropdownButton}
      class="sortButton flex text-main items-center  justify-between">
      {#if sortingOrder.text == 'По популярности'}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" bind:this={deliveryDropdownIcon} class="w-full h-full" fill="none">
          <line x1="10.75" y1="4.25" x2="22.25" y2="4.25" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="0.75" y1="4.25" x2="3.25" y2="4.25" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="7" cy="4" r="3.25" stroke="#330033" stroke-width="1.5"/>
          <line x1="13.25" y1="16.75" x2="0.75" y2="16.75" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="0.75" y1="-0.75" x2="3.25" y2="-0.75" transform="matrix(-1 0 0 1 24 18)" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <circle r="3.25" transform="matrix(-1 0 0 1 17 17)" stroke="#330033" stroke-width="1.5"/>
        </svg>
      {/if}
      {#if sortingOrder.text == 'По возрастанию цены'}
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="19" viewBox="0 0 29 19" fill="none" bind:this={deliveryDropdownIcon} class="w-full h-full">
          <line x1="17.75" y1="2.25" x2="28.25" y2="2.25" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="28.25" y1="16.75" x2="23.75" y2="16.75" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="28.25" y1="9.28839" x2="20.75" y2="9.28839" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M11 7L5.99554 1L1 7" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6.03906" y1="18.25" x2="6.03906" y2="1.75" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
      {#if sortingOrder.text == 'По убыванию цены'}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="19" viewBox="0 0 28 19" fill="none" bind:this={deliveryDropdownIcon} class="w-full h-full">
          <line x1="16.75" y1="1.25" x2="27.25" y2="1.25" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="27.25" y1="15.75" x2="22.75" y2="15.75" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="27.25" y1="8.28839" x2="19.75" y2="8.28839" stroke="#330033" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M11 12L5.99554 18L1 12" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="0.75" y1="-0.75" x2="17.25" y2="-0.75" transform="matrix(4.37114e-08 1 1 -4.37114e-08 6.78906 0)" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
    </button>
    {#if deliveryDropdownVisible}
      <CustomDropdown
        bind:dropdownVisible={deliveryDropdownVisible}
        relativeElement={deliveryDropdownIcon}
        buttonRef={deliveryDropdownButton}
        css="width:320px; max-height:336px;"
        position="CENTER">
        <ItemList
          id="catalog-sort"
          buttonRef={deliveryDropdownButton}
          css="max-height:336px;"
          listData={sortList}
          on:click={selectSort} />
      </CustomDropdown>
    {/if}
  </div>
</div>
