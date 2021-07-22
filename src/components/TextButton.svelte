<script>
  export let className;
</script>

<style>

</style>

<button on:click class="text-gray-700 hover:text-info {className}">
  <slot />
</button>
