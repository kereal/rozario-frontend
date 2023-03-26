<script>
  import { onMount, createEventDispatcher } from "svelte"
  import { mainStore } from "../stores/global.js"
  const svgSize = 24
  export let visible = false
  export let heroInputContainer
  let finalDropdown
  let finalDropdownVisible
  let questionDropdown

  const dispatch = createEventDispatcher()
  function calculatePosition(e) {
    if (heroInputContainer) {
      const rectInputContainer = heroInputContainer.getBoundingClientRect()
      // finalDropdown.style.top = rectInputContainer.y + "px";
      // finalDropdown.style.left = rectInputContainer.right + "px";
      finalDropdown.style.width = rectInputContainer.width + "px"
    }
  }

  onMount(() => {
    window.requestAnimationFrame(() => calculatePosition())
  })
  function closeDropdown() {
    dispatch("close")
  }
  function finish() {
    dispatch("finish")
  }
</script>

<div bind:this={finalDropdown} class:visible class="final-dropdown">
  <div class="flex flex-col">
    <div style="margin-bottom: 0.625rem" class="flex items-center">
      <label class="mr-12" for="hero-path">
        {#if !$mainStore.address.unknown}
          <div class="image-box">
            <img
              width={svgSize}
              height={svgSize}
              src="location-green.svg"
              alt="location"
            />
          </div>
        {:else}
          <div class="image-box">
            <img src="location.svg" alt="location" />
          </div>
        {/if}
      </label>
      <div class="flex items-center justify-center mr-8">
        <input
          id="radio-hero-path"
          name="hero-input-radio"
          value="address"
          type="radio"
        />
        <label class="hollow-label block" for="radio-hero-path" />
      </div>
      <input
        value={$mainStore.address.street}
        class="input text-black"
        id="hero-path"
        name="path"
        type="text"
      />
    </div>
    <div
      style="padding-bottom: 1.125rem"
      class="flex border-b items-center border-gray-900"
    >
      <label class="mr-12" for="hero-ufo">
        {#if $mainStore.address.unknown}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="hero-ufo-green.svg" alt="ufo" />
          </div>
        {:else}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="hero-ufo.svg" alt="ufo" />
          </div>
        {/if}
      </label>
      <div class="flex items-center justify-center mr-8">
        <input
          id="radio-hero-unknown"
          name="hero-input-radio"
          value="unknown"
          type="radio"
        />
        <label class="hollow-label" for="radio-hero-unknown" />
      </div>
      <div class="relative w-full">
        <p>Мы узнаем адрес сами, но о цветах ни слова</p>
        <div class="question absolute">
          <svg
            on:click={() => (dropdownQuestion = !dropdownQuestion)}
            role="button"
            class="fill-current w-4 h-4 text-info cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42
              1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13
              9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3
              8v2h2v-2H9z"
            />
          </svg>
        </div>
        <div
          class="shadow hidden rounded absolute text-sm text-secondary py-24 px-32
          bg-white"
        >
          <div class="dropdown-arrow block" />
          <p class="text-gray-500">
            Мы сами заранее позвоним получателю и уточним, где и в какое время ему будет
            удобно получить подарок
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center my-16">
      <label class="mr-34" for="hero-date" />
      <input
        value={$mainStore.address.time}
        class="input text-black"
        id="hero-date"
        type="text"
        placeholder="Выберите время и дату доставки"
      />
    </div>
    <div class="flex items-center mb-16">
      <label class="mr-34" for="hero-congratulation">
        {#if $mainStore.person.length > 0}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="person-green.svg" alt="person" />
          </div>
        {:else}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="person.svg" alt="person" />
          </div>
        {/if}
      </label>
      <input
        value={$mainStore.person}
        class="input text-black"
        id="hero-congratulation"
        type="text"
        placeholder="Выберите поздравление"
      />
    </div>
    <div style="margin-bottom: 1.625rem" class="flex items-center">
      <label class="mr-34" for="hero-flowers">
        {#if $mainStore.flower.kind.length > 0}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="flower-green.svg" alt="flower" />
          </div>
        {:else}
          <div class="image-box">
            <img width={svgSize} height={svgSize} src="flower.svg" alt="flower" />
          </div>
        {/if}
      </label>
      <input
        value={$mainStore.flower.kind}
        class="input text-black"
        id="hero-flowers"
        type="text"
        placeholder="Выберите товар"
      />
    </div>
    <div class="self-end flex items-center font-semibold">
      <button
        on:click={closeDropdown}
        style="height: 2.75rem"
        class="rounded flex items-center justify-center bg-gray-700 text-white
        mr-12 px-24 py-12"
      >
        <span>Редактировать</span>
      </button>
      <button
        on:click={finish}
        style="height: 2.75rem"
        class="flex items-center justify-center rounded bg-accent text-main
        py-12 px-40"
      >
        <span>Все верно!</span>
      </button>
    </div>
  </div>
  <button class="final-dropdown-close" on:click={closeDropdown}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      style="transform: rotate(180deg); transform-origin: 50% 50%;"
      viewBox="0 0 32 32"
      xml:space="preserve"
    >
      <polyline
        fill="none"
        stroke="#666666"
        stroke-width="2"
        stroke-miterlimit="10"
        points="26.883,10.56 15.999,21.44 5.117,10.56 "
      />
    </svg>
  </button>
</div>

<style>
  .final-dropdown {
    border-radius: 3px;
    top: 0;
    left: 0;
    position: absolute;
    display: none;
    z-index: 100;
    background-color: white;
    padding-left: 0.75rem;
    padding-right: 7.625rem;
    padding-top: 1.625rem;
    padding-bottom: 2.375rem;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.8 ease;
  }
  .final-dropdown-close {
    position: absolute;
    top: 0.8rem;
    right: 1.5rem;
  }
  .visible {
    display: flex;
    flex-flow: column nowrap;
  }
  .image-box {
    width: 24px;
    height: 24px;
  }
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  .question {
    right: calc(1rem);
    top: 50%;
    transform: translate(-50%, -50%);
  }
  [type="radio"]:checked + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid var(--gray-500);
    border-radius: 100%;
    background: var(--color-accent);
  }
  [type="radio"]:not(:checked) + label:before {
    border-radius: 100%;
    background: white;
    border: 1px solid var(--gray-500);
    box-shadow: inset 0px 0px 4px 1px rgba(18, 18, 18, 0.15);
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: "";
    width: 6px;
    height: 6px;
    background: black;
    position: absolute;
    top: 7px;
    left: 7px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .hollow-label {
    width: 20px;
    height: 20px;
  }
</style>
