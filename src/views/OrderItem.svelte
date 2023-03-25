<script>
  import OrderItem from "../components/OrderItem.svelte";
  export let order;
</script>

<style>
  .wrapper {
    width: 310px;
    padding: 2rem;
  }
</style>

<div class="wrapper">
  <OrderItem item={order} />
</div>
