<script>
  import Coupon from "../components/Coupon.svelte";
  export let type;
  export let text;
  export let price;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <Coupon {...$$props} />
</div>
