<script>
  import { orderStore } from "../stores/order.js";
  import { onMount, beforeUpdate, createEventDispatcher } from "svelte";
  import CustomDropdown from "../components/CustomDropdown.svelte";
  import DropdownLinkList from "../components/DropdownLinkList.svelte";
  import { scrollToSmoothly } from "../utils";
  import cloneDeep from "lodash/cloneDeep";
  import throttle from "lodash/throttle";

  export let page = "";
  export let currentSubCategory = '';
  export let initCategories = [];
  let categories = cloneDeep(initCategories);

  const dispatch = createEventDispatcher();
  let moreCategories = [];
  let moreDropdownVisible = false;
  let moreDropdownElement;
  let moreDropdownButton;
  const indexButtonStyleSelected =
    "leading-12 bg-accent px-16 whitespace-nowrap mr-8 rounded-full text-main";
  const indexButtonStyle =
    "hover:bg-gray-300 leading-12 px-16 whitespace-nowrap mr-8 rounded-full text-main";
  let currWindowScreenWidth = 0;
  let dimensions = 0;

  function setCurrentCategory(e) {
    currCategory = e.target.dataset.value;
  }

  function reduceNavListInitial(currWindowScreenWidth) {
    if (categories.length < 1) {
      return;
    }
    let lettersLength = calculateLettersLength(categories);

    while (currWindowScreenWidth + dimensions < lettersLength) {
      const last = categories.pop();
      moreCategories.push(last);
      if (categories.length > 0) {
        lettersLength = calculateLettersLength(categories);
      }
    }
    categories = categories;
    moreCategories = moreCategories;
  }

  function styleMoreButton() {
    if (moreCategories.length === 0) {
      moreDropdownButton.style.display = "none";
    } else {
      moreDropdownButton.style.display = "inline-flex";
    }
  }

  function calculateLettersLength(categories) {
    if (categories) {
      return categories
        .map((item) => item.name.split("").length * 11)
        .reduce((acc, length) => acc + length);
    }
    return 0;
  }

  function reduceNavList() {
    if (categories.length < 1) {
      return;
    }
    if (moreCategories.length > 0) {
      moreDropdownButton.style.display = "inline-flex";
    }
    let lettersLength = calculateLettersLength(categories);
    let navLength = categories.length;

    if (currWindowScreenWidth + dimensions < lettersLength) {
      const last = categories.pop();
      moreCategories.push(last);
      if (categories.length > 0) {
        lettersLength = calculateLettersLength(categories);
      }
    }
    categories = categories;
  }

  function expandNavList() {
    if (categories.length < 1) {
      return;
    }
    if (moreCategories.length > 0) {
      let lettersLength = calculateLettersLength(categories);
      let navLength = categories.length;
      if (
        moreCategories.length &&
        currWindowScreenWidth + dimensions >
          lettersLength +
            moreCategories[moreCategories.length - 1].name.split("").length * 11
      ) {
        const last = moreCategories.pop();
        categories.push(last);
        lettersLength = calculateLettersLength(categories);
      }
      categories = categories;
    } else {
      moreDropdownButton.style.display = "none";
    }
  }

  function selectCategory(e) {
    dispatch("category", {
      category: moreCategories[e.target.value],
    });
  }

  let goToCategory;

  function getOptimalScreenWidth() {
    if (window.innerWidth) {
      return window.innerWidth < 1500 ? window.innerWidth : 1500;
    }
    return 1500;
  }

  beforeUpdate(() => {
    let navLength = categories.length;
    if (page === "index" || $orderStore.orderList.length === 0) {
      dimensions = -160 - 160 - 90 - 8 * navLength;
    } else if (page === "catalog") {
      dimensions = -80 - 320 - 160 - 90 - 8 * navLength;
    }
    let currWindowScreenWidth = getOptimalScreenWidth();
    reduceNavListInitial(currWindowScreenWidth);
  });

  onMount(() => {
    console.info(categories)
    styleMoreButton();
    goToCategory = (e) => {
      selectCategory(e);
    };
  });

  function resizeWindow(e) {
    if (window.innerWidth>1000) {
      if (currWindowScreenWidth > window.innerWidth && window.innerWidth > 1000) {
        reduceNavList();
      } else {
        expandNavList();
      }
    }
    currWindowScreenWidth = getOptimalScreenWidth();
  }
  function showMoreNav() {
    moreDropdownVisible = !moreDropdownVisible;
  }
  const throttledResize = throttle(resizeWindow, 100);
</script>

<style>
  .inner-nav {
    top: 5rem;
  }
</style>

<svelte:window on:resize={throttledResize} />

<nav
  style=
          {page !== 'index' ? 'height: 70px' : 'height: 5rem'}
  class="px-44 lg:px-34 xl:px-80 border-right-left-clr sticky z-20 inner-nav bg-white flex
  justify-between border-bottom-clr border-b border-r border-l">
  <ul class="flex h-full overflow-hidden flex-wrap">
    {#each categories as category}
      {#if category.name === currentSubCategory}
        <li class="h-full flex items-center">
          <a
            href={category.permalink}
            on:click={goToCategory}
            class={indexButtonStyleSelected}>
            {category.name}
          </a>
        </li>
      {:else}
        <li class="h-full flex items-center">
          <a
            href={category.permalink}
            data-value={category}
            on:click={goToCategory}
            class={indexButtonStyle}>
            {category.name}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
  <div class="inline-flex items-center h-full">
    <button
      bind:this={moreDropdownButton}
      on:click={showMoreNav}
      data-value="Еще"
      class="{indexButtonStyle} hidden border-b border-transparent items-center ">
      <span class="mr-8">Еще</span>
      <svg
        bind:this={moreDropdownElement}
        xmlns="http://www.w3.org/2000/svg"
        width="13px"
        height="7px"
        viewBox="0 0 23.179 13.002">
        <polyline
          fill="none"
          stroke="#330033"
          stroke-width="2"
          stroke-miterlimit="10"
          points="22.472,0.707 11.589,11.588 0.707,0.707 " />
      </svg>
    </button>
  </div>
  {#if moreDropdownVisible}
    <CustomDropdown
      bind:dropdownVisible={moreDropdownVisible}
      css="width:400px;"
      buttonRef={moreDropdownButton}
      relativeElement={moreDropdownButton}
      position="RIGHT">
      <div class="bg-white rounded">
        {#if moreCategories.length > 0}
          <DropdownLinkList
            on:close={() => (moreDropdownVisible = false)}
            listData={moreCategories}
            css="width: 100%;max-height:300px;" />
        {/if}
      </div>
    </CustomDropdown>
  {/if}
</nav>
