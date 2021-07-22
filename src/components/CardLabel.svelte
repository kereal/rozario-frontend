<script>
  import { onMount } from "svelte";
  export let type;
  export let element;
  let text;
  let bg;
  onMount(() => {
    switch (type) {
      case "NEW":
        text = "Новинка";
        bg = "bg-dealnew";
        break;
      case "HIT":
        text = "Хит продаж";
        bg = "bg-dealhit";
        break;
    }
  });
</script>

<style>
  .dealnew {
    top: 0;
    height: 36px;
    transform: rotate(270deg) translate(-100%, 0);
    transform-origin: top left;
    @apply absolute;
  }
</style>

<div
  on:mouseenter
  on:mouseleave
  bind:this={element}
  class="dealnew flex items-center justify-center px-16 {bg}">
  <div class="vertical-text text-white text-sm font-semibold">{text}</div>
</div>
