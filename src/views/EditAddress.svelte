<script>
  import EditAddress from "../components/EditAddress.svelte";
  export let address;
  export let name;
  export let phone;
  export let title;
</script>

<style>

</style>

<div class="py-2 mx-auto">
  <EditAddress {address} {name} {phone} {title} />
</div>
