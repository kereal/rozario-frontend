<script>
  import PresentCard from "../components/PresentCard.svelte";
  
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <PresentCard {...$$props} />
</div>
