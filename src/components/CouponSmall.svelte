<script>
  export let type = "new";
  export let text ='';
  export let price = 0;
  export let color = 'text-black'

  export let blocked = false
</script>

<style lang="postcss">
  .left {
    width: 109px;
    padding-left: 18px;
    padding-right: 18px;
  }
  .right {
    padding-left: 18px;
    padding-right: 18px;
  }
  .price {
    width: 94px;
  }
  .text {
    height: 35px;
  }
</style>

<div class="{type} {blocked ? 'pointer-events-none' : ''} relative text-white flex items-center justify-between">
  <svg class="{color} absolute inset-0 coupon fill-current" width="348" height="35" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M105 0a6 6 0 00-6 6v23a6 6 0 006 6h237a6.001 6.001 0 005.917-5.001A3 3 0 01348 24v-3a3 3 0 110-6v-3a3 3 0 110-6 6 6 0 00-6-6H105zM6 0a6 6 0 00-6 6 3 3 0 010 6v3a3 3 0 110 6v3a3 3 0 01.083 5.999A6.002 6.002 0 006 35h87a6 6 0 006-6V6a6 6 0 00-6-6H6z"/><circle cx="99" cy="7" r="2" fill="#fff"/><circle cx="99" cy="14" r="2" fill="#fff"/><circle cx="99" cy="21" r="2" fill="#fff"/><circle cx="99" cy="28" r="2" fill="#fff"/></svg>
  <div class="text leading-mid relative flex items-baseline">
    <div class="flex items-center justify-center left text-center h-full text-lg font-semibold leading-snug">
      {price}&nbsp;руб.
    </div>
    <div class="flex items-center justify-start right h-full text-sm leading-mid">{text}</div>
  </div>
</div>
