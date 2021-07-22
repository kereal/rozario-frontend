<script>
  import SpecialCard from "../components/SpecialCard.svelte";
  export let recommendation;
</script>

<style>
  .wrapper {
    width: calc(286px + 4rem);
    padding: 2rem;
    background: white;
  }
</style>

<div class="wrapper">
  <SpecialCard {recommendation} />
</div>
