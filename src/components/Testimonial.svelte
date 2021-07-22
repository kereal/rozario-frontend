<script>
  export let testimonial;
  export let version;
</script>

<style>
  .wrapper {
    border-radius: 20px 0px 20px 20px;
  }
  .testimonial-image {
    background-image: url("../../static/loading-bg-image.svg");
    padding-top: 90px;
    width: 90px;

  }
  .clients-review{
    width: 284px;
    height: 300px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    box-sizing: border-box;
    border-radius: 16px 0px 16px 16px;
    margin: 0 auto;
    padding-top: 18px;
  }

  .clients-review__descriptions {
    text-align: center;
  }
  .clients-review__text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 135%;
    text-align: center;
    color: #330033;
    margin-left:18px;
    margin-right:18px;
    margin-top:16px;
    margin-bottom: 8px;
    height:  114px;

  }
  .clients-review__text p {
        overflow: hidden;
    text-overflow: ellipsis;
  }
  .clients-review__name {
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #330033;
  }
  .clients-review__order {
    font-size: 12px;
    line-height: 120%;
    color: #CC6699;
    vertical-align:bottom;
    margin-top: 4px;
  }
  @media (max-width: 1300px) {
    .clients-review{
      width: 284px;
      height: 300px;

    }
  }
  @media (max-width: 1150px) {
    .clients-review{
      width: 225px;
      height: 300px;
    }
  }
</style>

{#if !version}
  <div class="wrapper flex flex-col bg-cardgray px-16 pt-16 pb-24 text-center
  items-center">
    <div
            class="testimonial-image rounded-full border-gray-500 w-full relative
    mx-auto">
      <picture>
        <source
                data-srcset="{testimonial.img}.webp, {testimonial.img}-2x.webp 2x" />
        <img
                class="border-full absolute inset-0 h-full w-full object-contain mb-8"
                data-srcset="{testimonial.img}-2x.png 2x"
                data-src="{testimonial.img}.png"
                alt={testimonial.name} />
      </picture>
      <noscript>
        <img srcset="{testimonial.img}-2x.png 2x" src="{testimonial.img}.png" alt="{testimonial.name}">
      </noscript>
    </div>
    <p class="text-gray-600 text-sm mb-12 leading-snug">
      {testimonial.testimonial}
    </p>
    <h3 class="text-main text-sm font-semibold mb-4">{testimonial.name}</h3>
    <span class="text-xs text-infolight font-semibold italic">
    {testimonial.ordernumber}
  </span>
  </div>
  {:else}
  <div class="clients-review">
    <div class="testimonial-image rounded-full border-gray-500 w-full relative
    mx-auto">
      <picture>
        <source
                data-srcset="{testimonial.img}.webp, {testimonial.img}-2x.webp 2x" />
        <img
                class="border-full absolute inset-0 h-full w-full object-contain mb-8"
                data-srcset="{testimonial.img}-2x.png 2x"
                data-src="{testimonial.img}.png"
                alt={testimonial.name} />
      </picture>
      <noscript>
        <img srcset="{testimonial.img}-2x.png 2x" src="{testimonial.img}.png" alt="{testimonial.name}">
      </noscript>
    </div>
    <div class="clients-review__descriptions">
      <div class="clients-review__text">
        <p>{testimonial.testimonial}</p>

      </div>
      <p class="clients-review__name">{testimonial.name}</p>
      <p class="clients-review__order">{testimonial.ordernumber}</p>
    </div>
  </div>
{/if}

