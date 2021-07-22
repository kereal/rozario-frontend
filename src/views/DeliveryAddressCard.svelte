<script>
  import DeliveryAddressCard from "../components/DeliveryAddressCard.svelte";
  export let recipient;
</script>

<style>
  .wrapper {
    width: 450px;
    margin: 50px auto;
  }
</style>

<div class="wrapper">
  <DeliveryAddressCard {recipient} />
</div>
