<script>
  import { getContext, onMount, onDestroy, beforeUpdate } from "svelte";
  import { fade, fly } from "svelte/transition";
  /* import { changePosition, calculatePosition } from "../utils/popup.js"; */
  import { DROPDOWN_MAX_HEIGHT } from "../data/constants.js";
  import Portal from "./Portal.svelte";

  export let position;
  export let visible;
  export let buttonRef;
  export let css;

  let arrowTop = false;
  let arrowBottom = false;

  let popupElement;
  let popupArrowElementTop;
  let popupArrowElementBottom;

  beforeUpdate(() => {
    if (
      window.innerHeight -
        30 -
        DROPDOWN_MAX_HEIGHT >
      0
    ) {
      arrowTop = false;
      arrowBottom = true;
    } else {
      arrowBottom = false;
      arrowTop = true;
    }
  });

  function removeOnScroll() {
    if (popupElement) {
      visible = false;
    }
  }
  function removeOnResize() {
    if (popupElement) {
      visible = false;
    }
  }
  function removeOnDocumentClick(e) {
    if (buttonRef && buttonRef.contains(e.target)) {
      return;
    }
    if (popupElement && !popupElement.contains(e.target)) {
      visible = false;
    }
  }

  function calculatePosition(
    element,
    relativeElementRect,
    position,
    popupArrowElementBottom,
    popupArrowElementTop
  ) {
    console.log("hsadfasdfsadf");
    if (window.innerHeight - relativeElementRect.y - DROPDOWN_MAX_HEIGHT < 0) {
      if (position === "RIGHT") {
        element.style.left = "0";
        element.style.top = "1.5rem";
        popupArrowElementBottom.style.right =
          relativeElementRect.width / 2 + "px";
      } else if (position === "CENTER") {
        element.style.left = `calc(50% - ${element.width / 2})`;
        element.style.top = "1.5rem";
        popupArrowElementBottom.style.left = "50%";
      } else if (position === "LEFT") {
        element.style.right = "0";
        element.style.top = "1.5rem";
        popupArrowElementBottom.style.left =
          relativeElementRect.width / 2 + 14 + "px";
      }
    } else {
      // bottom
      if (position === "RIGHT") {
        element.style.left = "0";
        element.style.bottom = "1.5rem";
        popupArrowElementTop.style.right = relativeElementRect.width / 2 + "px";
      } else if (position === "CENTER") {
        element.style.left = `calc(50% - ${element.width / 2})`;
        element.style.bottom = "1.5rem";
        popupArrowElementTop.style.left = "50%";
      } else if (position === "LEFT") {
        element.style.right = "0";
        element.style.bottom = "1.5rem";
        popupArrowElementTop.style.left =
          relativeElementRect.width / 2 + 14 + "px";
      }
    }
  }
  onMount(() => {
    const rafId = window.requestAnimationFrame(() =>
      calculatePosition(
        popupElement,
        buttonRef.getBoundingClientRect(),
        position,
        popupArrowElementBottom,
        popupArrowElementTop
      )
    );
    return () => window.cancelAnimationFrame(rafId);
  });
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
</style>

<svelte:window
  on:resize={removeOnResize}
  on:click={removeOnDocumentClick}
  on:scroll={removeOnScroll} />

<div class="relative z-20 rounded">
  <slot name="button" />
  <div
    style={css}
    bind:this={popupElement}
    transition:fly={arrowTop ? { y: 50, duration: 600, delay: 50 } : { y: -50, duration: 600, delay: 50 }}
    class="{visible ? 'flex' : 'hidden'} p-12 absolute rounded">
    <div
      bind:this={popupArrowElementTop}
      class="{arrowTop ? 'block' : 'none'} pointer-events-none arrow arrow-top" />
    <div class="shadow-popup w-full rounded">
      <slot name="content" />
    </div>
    {#if arrowBottom}
      <div
        bind:this={popupArrowElementBottom}
        class="{arrowBottom ? 'block' : 'none'} pointer-events-none arrow
        arrow-bottom" />
    {/if}
  </div>
</div>
