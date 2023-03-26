<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte"

  export let itemsInRow = 5
  export let buttonPrev = null
  export let buttonNext = null
  export let totalitems = itemsInRow
  export let buttonColor = "bg-accentlight"
  export let iconColor = "text-main"
  export let itemClass = ".carousel-item"
  export let carouselClass = ""

  let curr = 0
  let slider
  let carousel
  let prevButton
  let nextButton
  const once = true

  let itemslist
  onMount(() => {
    const selector = carouselClass ? `.${carouselClass} ${itemClass}` : itemClass
    itemslist = document.querySelectorAll(selector)
    totalitems = itemslist.length
    itemslist.forEach((item) => {
      item.style.width = 100 / itemsInRow + "%"
    })
    Array.from(itemslist)
      .slice(0, itemsInRow)
      .forEach((item) => {
        item.classList.add("carousel-item-active")
      })
  })

  function prev() {
    if (curr - itemsInRow < 1) {
      prevButton.style.opacity = "0"
      setTimeout(() => {
        prevButton.style.visibility = "hidden"
      }, 400)
    }
    if (curr < totalitems) {
      nextButton.style.visibility = "visible"
      nextButton.style.opacity = "1"
    }
    if (curr > 0) {
      const itemslist = document.querySelectorAll(itemClass)
      Array.from(itemslist)
        .slice(curr, curr + itemsInRow)
        .forEach((item) => {
          item.classList.remove("carousel-item-active")
        })
      curr = curr - itemsInRow
      Array.from(itemslist)
        .slice(curr, curr + itemsInRow)
        .forEach((item) => {
          item.classList.add("carousel-item-active")
        })
      slider.style.webkitTransform = `translateX(-${(100 / itemsInRow) * curr}%)`
      slider.style.transform = `translateX(-${(100 / itemsInRow) * curr}%)`
    }
  }
  function next() {
    if (curr + itemsInRow >= totalitems - itemsInRow) {
      nextButton.style.opacity = "0"
      setTimeout(() => {
        nextButton.style.visibility = "hidden"
      }, 400)
    }
    if (curr === 0) {
      prevButton.style.visibility = "visible"
      prevButton.style.opacity = "1"
    }
    if (curr < totalitems - itemsInRow) {
      const itemslist = document.querySelectorAll(itemClass)
      Array.from(itemslist)
        .slice(curr, curr + itemsInRow)
        .forEach((item) => {
          item.classList.remove("carousel-item-active")
        })
      curr = curr + itemsInRow
      Array.from(itemslist)
        .slice(curr, curr + itemsInRow)
        .forEach((item) => {
          item.classList.add("carousel-item-active")
        })
      slider.style.webkitTransform = `translateX(-${(100 / itemsInRow) * curr}%)`
      slider.style.transform = `translateX(-${(100 / itemsInRow) * curr}%)`
    }
  }
</script>

<div class="carousel-wrapper relative">
  <button
    aria-label="previous"
    bind:this={prevButton}
    on:click={prev}
    class="{buttonColor} z-10 btn-l left-tns-button rounded-full flex
    items-center justify-center"
  >
    <svg
      class="fill-current w-24 h-24 {iconColor}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12
        4.343z"
      />
    </svg>
  </button>
  <div class="overflow-hidden px-40 -mx-40 py-40 -my-40">
    <div bind:this={carousel} class={carouselClass}>
      <div
        bind:this={slider}
        class="carousel-slider items-stretch flex-nowrap flex flex-row w-full"
      >
        <slot>
          <div style="width: 500px; height: 300px; background:gray;" />
        </slot>
      </div>
    </div>
  </div>
  <button
    aria-label="next"
    bind:this={nextButton}
    on:click={next}
    class="{buttonColor} z-10 btn-r right-tns-button rounded-full flex
    items-center justify-center"
  >
    <svg
      class="fill-current w-24 h-24 {iconColor}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8
        15.657l4.95-4.95z"
      />
    </svg>
  </button>
</div>

<style lang="postcss">
  .carousel-slider {
    transition: transform 0.8s ease;
  }
  .btn-l {
    height: 2.875rem;
    width: 2.875rem;
    transition: opacity 0.4s ease;
    transform: translateY(-50%);
    left: -63px;
    @apply absolute invisible opacity-0 top-1/2;
  }
  .btn-r {
    height: 2.875rem;
    width: 2.875rem;
    transition: opacity 0.4s ease;
    transform: translateY(-50%);
    right: -63px;
    @apply absolute top-1/2;
  }
  .carousel-wrapper :global(.carousel-item-active) {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
  .carousel-wrapper :global(.carousel-item-not-active) {
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>
