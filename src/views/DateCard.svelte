<script>
  import DateCard from "../components/DateCard.svelte";
  
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <DateCard {...$$props} />
</div>
