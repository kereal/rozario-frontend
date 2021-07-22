<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let list = null;
  export let offset = "HEIGHT";
  export let position = "LEFT";
  export let direction = "TOP";
  export let wrapperWidth = 200;
  export let popupElement;
  export let title;
  export let text;
  export let active;
  export let relativeElement;

  let popupArrow;
  let wrapperElement;
  let popupContentElement;

  let popupArrowBottom;
  let popupArrowTop;

  function leave() {
    active = false;
  }

  function calculatePosition() {
    const relativeElementRect = relativeElement.getBoundingClientRect();
    active = true;
    popupElement.style.width = wrapperWidth + "px";
    if (relativeElementRect.y - 300 - 160 > 0 && direction === "TOP") {
      popupArrowTop.style.display = "none";
      popupArrowBottom.style.display = "block";

      if (offset === "HEIGHT") {
        popupElement.style.bottom = relativeElement.offsetHeight + "px";
      } else {
        popupElement.style.bottom = relativeElement.offsetWidth + "px";
      }

      popupElement.style.top = "auto";
      if (position === "CENTER") {
        popupElement.style.left = `50%`;
        popupElement.style.transform = `translateX(-50%)`;

        popupArrowBottom.style.left = "50%";
      } else if (position === "LEFT") {
        popupElement.style.left = `-12px`;

        popupArrowBottom.style.left =
          relativeElement.offsetWidth / 2 + 7 + "px";
      } else if (position === "RIGHT") {
        popupElement.style.right = `-12px`;

        popupArrowBottom.style.right =
          relativeElement.offsetWidth / 2 - 3 + "px";
      }
    } else {
      popupArrowTop.style.display = "block";
      popupArrowBottom.style.display = "none";

      if (offset === "HEIGHT") {
        popupElement.style.top = relativeElement.offsetHeight + "px";
      } else {
        popupElement.style.top = relativeElement.offsetWidth + "px";
      }

      popupElement.style.bottom = "auto";
      if (position === "CENTER") {
        popupElement.style.left = `50%`;
        popupElement.style.transform = `translateX(-50%)`;

        popupArrowTop.style.left = "50%";
      } else if (position === "LEFT") {
        popupElement.style.left = `-12px`;

        popupArrowTop.style.left = relativeElement.offsetWidth / 2 + 7 + "px";
      } else if (position === "RIGHT") {
        popupElement.style.right = `-12px`;

        popupArrowTop.style.right = relativeElement.offsetWidth / 2 - 3 + "px";
      }
    }
  }
  onMount(() => {
    if (relativeElement) calculatePosition();
  });
</script>

<style>
  .outer {
  }
  .wrapper {
    z-index: 8;
    position: absolute;
    border-radius: 2px;
    padding: 0.75rem;
    max-height: 300px;
  }
  .content {
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
    @apply bg-white overflow-y-auto;
  }

  .arrow {
    pointer-events: none;
    width: 14px;
    height: 14px;
    position: absolute;
    overflow: hidden;
    bottom: 100%;
    transform: translateX(-50%);
  }
  .arrow-top {
    top: 0;
  }
  .arrow-bottom {
    bottom: 0;
  }
  .arrow-top:after {
    content: "";
    bottom: -8px;
    display: block;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    background-color: white;
  }
  .arrow-bottom:after {
    content: "";
    top: -8px;
    display: block;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    background-color: white;
  }
  .icon-wrapper:hover + .wrapper {
    display: flex;
  }
  .wrapper-active {
    display: flex;
  }
</style>

<div
  on:mouseover={calculatePosition}
  on:mouseout={leave}
  class="rounded relative outer">
  <slot hovering={active} />
  <div
    bind:this={popupElement}
    class="wrapper w-full rounded {active ? 'flex' : 'hidden'}">
    <div bind:this={popupArrowTop} class="arrow arrow-top" />
    <div bind:this={popupContentElement} class="content w-full px-24 pt-20 pb-32">
      <h3 class="text-main font-semibold pb-16 border-b border-gray-300 mb-16">
        {title}
      </h3>
      {#if list}
        {#each list as item}
          <ul class="flex flex-col">
            <li
              class="text-main mb-16 last:mb-0 text-sm w-full flex
              justify-between items-center">
              <span>{item.text}</span>
              <span>{item.rating}</span>
            </li>
          </ul>
        {/each}
      {:else}
        <p class="text-gray-700 text-sm leading-snug">{text}</p>
      {/if}
    </div>
    <div bind:this={popupArrowBottom} class="arrow arrow-bottom" />
  </div>
</div>
