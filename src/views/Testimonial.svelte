<script>
  import Testimonial from "../components/Testimonial.svelte";
  export let customer;
</script>

<style>
  .wrapper {
    width: 280px;
    padding: 1rem;
  }
</style>

<div class="wrapper">
  <Testimonial {customer} />
</div>
