<script>
  export let element;
  export let className;
</script>

<div
  on:mouseenter
  on:mouseleave
  bind:this={element}
  class="{className} w-46 h-48 rounded-r-lg flex items-center justify-center
  bg-dealsale text-main py-4 px-8">
  <slot />
</div>
