<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { changePosition, calculatePosition } from "../utils/popup.js";
  import Portal from "./Portal.svelte";

  export let relativeElement = null;
  export let position = "";
  export let dropdownVisible = false;
  export let css = "";
  export let buttonRef = null;
  export let customShadow;
  export let overSize = false;

  let customDropdown;
  let customDropdownArrowTop;
  let customDropdownArrowBottom;

  let arrowTop = false;
  let arrowBottom = false;

  const relativeElementRect = relativeElement.getBoundingClientRect();

  let isCalculated = false;

  function removeOnScroll() {
    if (customDropdown) {
      dropdownVisible = false;
    }
  }
  function removeOnResize() {
    if (customDropdown) {
      dropdownVisible = false;
    }
  }
  function removeOnDocumentClick(e) {
    if (buttonRef && buttonRef.contains(e.target)) {
      return;
    }
    console.log('e target', customDropdown.contains(e.target))
    if (customDropdown && !customDropdown.contains(e.target)) {
      dropdownVisible = false;
    }
  }
  onMount(() => {
    if (
      window.innerHeight - relativeElementRect.y - customDropdown.offsetHeight - 50 <
      0
    ) {
      arrowTop = false;
      arrowBottom = true;
    } else {
      arrowTop = true;
      arrowBottom = false;
    }
    position = changePosition(relativeElementRect.left, position, css);

    const rafID = window.requestAnimationFrame(() => {
      calculatePosition(
        customDropdown,
        relativeElementRect,
        customDropdownArrowBottom,
        customDropdownArrowTop,
        position
      );
    });

    setTimeout(() => (isCalculated = true), 401);

    return () => window.cancelAnimationFrame(rafID);
  });
  let content__perspective = true;
</script>

<style>
  .arrow {
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
  @keyframes animate {
    from {
      margin-top: -25px;
      opacity:0;
    }
    to {
      margin-top: 0;
      opacity:1;
    }
  }

  .content__perspective {
    animation-name: animate;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }

  @media (max-width: 1000px) {
    .overSize {
      margin-left:-150px;
    }
    .overSize__arrow {
      left: 200px !important;
    }
  }
</style>

<svelte:window on:resize={removeOnResize} on:scroll={removeOnScroll} />
<svelte:body on:click={removeOnDocumentClick} />

<Portal>
  <div
    bind:this={customDropdown}
    style={`${css}`}
    class="{isCalculated ? 'pointer-events-auto' : 'pointer-events-none'}
    custom-dropdown fixed z-40 rounded {overSize ? 'overSize' : ''} content__perspective"
    id="custom-dropdown">
    <div class="p-12 relative flex rounded">
      <div
        bind:this={customDropdownArrowTop}
        class="{arrowTop ? 'block' : 'hidden'} arrow arrow-top {overSize ? 'overSize__arrow' : ''}" />
      <div class="shadow-popup overflow-y-auto w-full rounded" style="{customShadow}">
        <slot />
      </div>
      <div
        bind:this={customDropdownArrowBottom}
        class="{arrowBottom ? 'block' : 'hidden'} arrow arrow-bottom {overSize ? 'overSize__arrow' : ''}" />
    </div>
  </div>
</Portal>
