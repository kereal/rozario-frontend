<script>
  // FIXME refactor component
  import { beforeUpdate, onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";

  export let relativeElement;
  export let position;
  export let dropdownVisible;
  export let css = "";
  export let buttonRef;

  let once = true;
  let cssTransform = "";

  let customDropdown;
  let customDropdownArrow;

  let arrowTop = false;
  let arrowBottom = false;

  beforeUpdate(() => {
    changePosition();
  });

  function getWidthFromCss() {
    let width = "";
    css.split(";").forEach(item => {
      if (item.search("width") !== -1) {
        width = parseInt(item.split(":")[1]);
      }
    });
    return width;
  }

  function getHeightFromCss() {
    let height = "";
    css.split(";").forEach(item => {
      if (item.search("height") !== -1) {
        height = parseInt(item.split(":")[1]);
      }
    });
    return height;
  }

  function changePosition() {
    const relativeElementRect = relativeElement.getBoundingClientRect();
    if (
      window.innerHeight - relativeElementRect.y - getHeightFromCss() - 20 <
      0
    ) {
      arrowTop = false;
      arrowBottom = true;
      if (position === "RIGHT") {
        cssTransform = "transform: translateY(-100%);";
      } else if (position === "CENTER") {
        cssTransform = "transform: translateY(-100%);";
      } else {
        cssTransform = "transform: translateY(-100%);";
      }
    } else {
      arrowBottom = false;
      arrowTop = true;
      if (position === "RIGHT") {
        cssTransform = "";
      } else if (position === "CENTER") {
        console.log(css);
        cssTransform = "";
        console.log(css);
      } else {
        cssTransform = "";
      }
    }
    if (
      window.innerWidth - relativeElementRect.left - getWidthFromCss() < 0 &&
      position === "LEFT"
    ) {
      position = "RIGHT";
      console.warn("setted to RIGHT");
    } else if (
      relativeElementRect.left - getWidthFromCss() < 0 &&
      position === "RIGHT"
    ) {
      position = "LEFT";
      console.warn("setted to LEFT");
    } else if (
      window.innerWidth - relativeElementRect.left - getWidthFromCss() / 2 <
        0 &&
      position === "CENTER"
    ) {
      position = "RIGHT";
    } else if (
      relativeElementRect.left - getWidthFromCss() / 2 < 0 &&
      position === "CENTER"
    ) {
      position = "LEFT";
    }
  }

  function calculatePosition() {
    const relativeElementRect = relativeElement.getBoundingClientRect();
    if (
      window.innerHeight - relativeElementRect.y - getHeightFromCss() - 20 <
      0
    ) {
      // top
      if (position === "RIGHT") {
        customDropdown.style.right = 0 + "px";
        customDropdown.style.top = -12 + "px";
        customDropdownArrow.style.right = relativeElementRect.width / 2 + "px";
      } else if (position === "CENTER") {
        customDropdown.style.left = 0 + "px";
        relativeElementRect.left + relativeElementRect.width / 2 + "px";
        customDropdown.style.top = -12 + "px";
        customDropdownArrow.style.left = "50%";
      } else if (position === "LEFT") {
        customDropdown.style.right = 0 + "px";
        customDropdown.style.top = -12 + "px";
        customDropdownArrow.style.left =
          relativeElementRect.width / 2 + 14 + "px";
      }
    } else {
      // bottom
      if (position === "RIGHT") {
        customDropdown.style.right = 0 + "px";
        customDropdown.style.top = relativeElementRect.height + 3 + "px";
        customDropdownArrow.style.right = relativeElementRect.width / 2 + "px";
      } else if (position === "CENTER") {
        customDropdown.style.left = 0 + "px";
        customDropdown.style.top = relativeElementRect.height + 3 + "px";
        customDropdownArrow.style.left = "50%";
      } else if (position === "LEFT") {
        customDropdown.style.right = 0 + "px";
        customDropdown.style.top = relativeElementRect.height + 3 + "px";
        customDropdownArrow.style.left =
          relativeElementRect.width / 2 + 14 + "px";
      }
    }
  }
  function removeOnScroll(e) {
    if (customDropdown && !customDropdown.contains(document.body)) {
      dropdownVisible = false;
    }
  }
  function removeOnResize(e) {
    if (customDropdown && !customDropdown.contains(document.body)) {
      dropdownVisible = false;
    }
  }
  function removeOnDocumentClick(e) {
    if (buttonRef && buttonRef.contains(e.target)) {
      return;
    }
    if (e.target.dataset && e.target.dataset.heroinputbutton) {
      return;
    }
    if (customDropdown && !customDropdown.contains(e.target)) {
      dropdownVisible = false;
    }
  }
  onMount(() => {
    const rafId = window.requestAnimationFrame(() => calculatePosition());
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

<svelte:window on:resize={removeOnResize} />
<svelte:body on:click={removeOnDocumentClick} />

<div
  bind:this={customDropdown}
  in:fly={arrowTop ? { y: 50, duration: 600, delay: 50 } : { y: -50, duration: 600, delay: 50 }}
  style={`${css} ${cssTransform}`}
  class="custom-dropdown absolute z-20 rounded">
  <div class="p-3 relative flex rounded">
    {#if arrowTop}
      <div
        bind:this={customDropdownArrow}
        class="pointer-events-none arrow arrow-top block" />
    {/if}
    <div class="shadow-popup w-full rounded">
      <slot />
    </div>
    {#if arrowBottom}
      <div
        bind:this={customDropdownArrow}
        class="pointer-events-none arrow arrow-bottom block" />
    {/if}
  </div>
</div>
