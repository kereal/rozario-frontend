<script>
  import DateInput from "../components/DateInput.svelte";
  
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <DateInput {...$$props} />
</div>
