<script>
  import PlusMinusButton from "../components/PlusMinusButton.svelte";
  export let number;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <PlusMinusButton {...$$props} />
</div>
