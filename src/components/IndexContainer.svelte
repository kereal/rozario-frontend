<script>
  export let top = false;
  export let bot = false;
</script>

<div
  class="{top ? '' : 'pt-34'} bg-white border-r border-l border-gray-200 pb-34 {bot ? 'mt-8' : 'my-8'}
  w-full">
  <slot />
</div>
