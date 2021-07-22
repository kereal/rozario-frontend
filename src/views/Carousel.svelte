<script>
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import Carousel from "../components/Carousel.svelte";
  const items = ["first", "second", "third", "fourth", "fifth", "sixth"];
</script>

<style>
  :global(.carousel-lg) {
    margin-right: -30px;
  }
  @media (min-width: 1420px) {
    :global(.carousel-lg) {
      margin-right: -40px;
    }
  }
  :global(.story-carousel-item) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
    flex: 1 0 auto;
    display: inline-block;
    padding-right: 30px;
  }
  @media (min-width: 1420px) {
    :global(.story-carousel-item) {
        padding-right: 40px;
    }
  }
</style>

<div class="w-full px-20 border border-black">
  <div class="container mx-auto py-10">
    <Carousel
      carouselClass="carousel-lg"
      iconColor="text-infolight"
      buttonColor="bg-circlebtn"
      itemsInRow={3}
      itemClass=".story-carousel-item"
      totalitems={items.length}>
      {#each items as item}
        <div class="story-carousel-item">
          <div class="border-black border">
            <img src="" alt="sample" />
            <section>
              <h2>Title</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem adipisci qui eligendi illum, quasi fuga magni eum eaque
                optio, autem ipsam velit. Repellendus similique itaque eaque.
                Exercitationem laboriosam placeat iste!
              </p>
              <div>{item}</div>
            </section>
          </div>
        </div>
      {/each}
    </Carousel>
  </div>
</div>
