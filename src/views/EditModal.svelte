<script>
  import EditModal from "../components/EditModal.svelte";
  export let order;
  function saveOrderData() {}
  function toggleEditModal() {}
</script>

<style>

</style>

<div class="py-2 mx-auto">
  <EditModal on:save={saveOrderData} on:close={toggleEditModal} {order} />
</div>
