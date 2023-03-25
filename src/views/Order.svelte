<script>
  import Order from "../components/Order.svelte";
  export let orderList;
  export let price;
</script>

<style>
  .wrapper {
    padding: 1rem;
    width: 350px;
    height: calc(100vh - 6.4rem);
  }
</style>

<div class="wrapper">
  <Order {orderList} {price} />
</div>
