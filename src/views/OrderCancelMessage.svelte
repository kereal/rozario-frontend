<script>
  import OrderCancelMessage from "../components/OrderCancelMessage.svelte";
  
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <OrderCancelMessage {...$$props} />
</div>
