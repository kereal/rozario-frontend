<script>
  export let imagelist
  let mainImage = imagelist[0]
  let miniImages = imagelist
  let selectedIndex = 0

  function selectImage() {
    selectedIndex = parseInt(this.dataset.index)
    mainImage = imagelist[selectedIndex]
  }
</script>

<div class="wrapper">
  <div class="main">
    <img src={mainImage.src} alt={mainImage.alt} />
  </div>
  <ul class="flex justify-between minis">
    {#each miniImages as image, i}
      <li
        data-index={i}
        on:click={selectImage}
        class="mr-14 last:mr-0 {selectedIndex === i
          ? 'border-infolight'
          : 'border-gray-300'} mini"
      >
        <img src={image.src} alt={image.alt} />
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .border-infolight {
    border: 1px solid var(--color-info-light);
  }
  .border-gray-300 {
    border: 1px solid var(--gray-300);
  }

  .main {
    background-image: url("../../static/loading-bg-image.svg");
    @apply border rounded border-gray-300;
  }
  .main img {
    @apply w-full h-full inset-0 object-contain rounded;
  }
  .minis {
    margin-top: 12px;
  }
  .mini {
    width: 19%;
    height: auto;
    background-image: url("../../static/loading-bg-image.svg");
    @apply rounded cursor-pointer;
  }

  .border-gray-300:hover {
    border: 1px solid var(--gray-1100);
  }
  .mini img {
    @apply w-full h-full inset-0 object-contain rounded;
  }
  @media (max-width: 1300px) {
    .minis {
      margin-top: 8px;
    }
    .mini {
      margin-right: 8px;
    }
    .mini:last-child {
      margin-right: 0;
    }
  }
  @media (max-width: 1100px) {
    .mini {
      margin-right: 3px;
    }
    .mini:last-child {
      margin-right: 0;
    }
  }
</style>
