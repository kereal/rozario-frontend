<script>
  import OrderStoryCard from "../components/OrderStoryCard.svelte";
  export let order;
  export let testimonials;
</script>

<style>
  .wrapper {
    width: 542px;
  }
  @media (min-width: 1280px) {
    .screen {
      padding: 40px;
      max-width: 1440px;
      display: flex;
    }
    .wrapper {
      width: 100%;
      padding: 0 80px;
    }
    .aside {
      width: 320px;
      height: 100vh;
    }
  }
</style>

<div class="screen">
  <div class="wrapper px-10 mx-auto">
    <OrderStoryCard {order} {testimonials} />
  </div>
  <div class="aside" />
</div>
