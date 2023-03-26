<script>
  export let smile
  export let version
</script>

{#if !version}
  <div class="flex flex-col items-center p-8">
    <div class="image-container rounded-full relative overflow-hidden mx-auto mb-8">
      <picture>
        <source data-srcset="{smile.img}.jpg, {smile.img}-2x.jpg 2x" />
        <img
          class="absolute object-cover w-full h-full inset-0"
          data-srcset="{smile.img}-2x.jpg 2x"
          data-src="{smile.img}.jpg"
          alt={smile.title}
        />
      </picture>
      <noscript>
        <img srcset="{smile.img}-2x.png 2x" src="{smile.img}.png" alt={smile.title} />
      </noscript>
    </div>
    <h3 class="text-main text-xs xxl:text-sm mt-24 mb-8 text-center">
      {smile.title}
    </h3>
    <time
      datetime={`${smile.date}`}
      class="block self-center text-infolight text-center text-tiny xxl:text-xs
    mb-8"
    >
      {smile.date}
    </time>
    <div />
  </div>
{:else}
  <div class="clients-photo">
    <div class="photo rounded-full relative overflow-hidden mx-auto mb-8">
      <picture>
        <source data-srcset="{smile.img}.jpg, {smile.img}-2x.jpg 2x" />
        <img
          class="absolute object-cover w-full h-full inset-0"
          data-srcset="{smile.img}-2x.jpg 2x"
          data-src="{smile.img}.jpg"
          alt={smile.title}
        />
      </picture>
      <noscript>
        <img srcset="{smile.img}-2x.png 2x" src="{smile.img}.png" alt={smile.title} />
      </noscript>
    </div>
    <div class="clients-photo__text">
      <p class="clients-photo__name">{smile.title}</p>
      <p class="clients-photo__date">{smile.date}</p>
    </div>
  </div>
{/if}

<style>
  .image-container {
    width: 7.75rem;
    height: 7.75rem;
    background-image: url("../../static/loading-bg-image.svg");
  }
  @media (min-width: 1420px) {
    .image-container {
      width: 9.75rem;
      height: 9.75rem;
    }
  }
  .clients-photo {
    height: 228px;
    width: 156px;
    margin: 0 auto;
  }
  .clients-photo__name {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 135%;
    text-align: center;
    color: #330033;
    margin-top: 24px;
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .photo {
    width: 156px;
    height: 156px;
    background-image: url("../../static/loading-bg-image.svg");
  }
  .clients-photo__date {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 120%;
    text-align: center;
    color: #cc6699;
    vertical-align: bottom;
    margin-top: 8px;
  }
</style>
