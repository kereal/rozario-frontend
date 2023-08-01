<script>
  import Button from "./Button.svelte"
  import { onMount } from "svelte"
  import Croppie from "croppie"

  export let selected
  export let visible
  export let fullImage
  export let miniBlob

  let newPhoto
  let zoom
  let el
  let vanilla

  function croppied() {
    miniBlob = vanilla.get()
    vanilla.result("blob").then(function (blob) {
      let URLObj = window.URL || window.webkitURL
      let source = URLObj.createObjectURL(blob)
      newPhoto = source
      selected = newPhoto
      visible = false
    })
  }
  function minus() {
    zoom = vanilla.get().zoom
    zoom = zoom - 0.1
    vanilla.bind({
      url: fullImage,
      zoom: zoom
    })
  }
  function plus() {
    zoom = vanilla.get().zoom
    zoom = zoom + 0.1
    vanilla.bind({
      url: fullImage,
      zoom: zoom
    })
  }

  onMount(async () => {
    activateCroppie(fullImage)
  })

  function activateCroppie(url) {
    el = document.getElementById("CroppieContainer__croppie")
    vanilla = new Croppie(el, {
      viewport: { width: 350, height: 350, type: "circle" },
      boundary: { width: 350, height: 350 },
      enableExif: true
    })
    vanilla.bind({
      url: url
    })
  }

  let otherPhoto
  $: if (otherPhoto) {
    let input = document.getElementById("fileOtherPhoto")
    let fReader = new FileReader()
    fReader.readAsDataURL(input.files[0])
    fReader.onloadend = function (event) {
      fullImage = event.target.result
      vanilla.bind({
        url: event.target.result
      })
      minZoom = vanilla.get().zoom
    }
  }
</script>

<div class="CroppieContainer" id="CroppieContainer__croppie">
  <div class="CroppieContainer__croppie">
    <div class="CroppieContainer__controller">
      <span class="minus" on:click={minus}>-</span><span class="plus" on:click={plus}
        >+</span
      >
    </div>
  </div>
</div>
<div class="flex mt-24">
  <Button textClass="text-base" size="md" on:click={croppied}>Применить</Button>
  <Button textClass="text-base" size="md" status="active-secondary" className="ml-30">
    <input
      type="file"
      id="fileOtherPhoto"
      accept="image/*,image/jpeg,image/jpg,image/png"
      bind:value={otherPhoto}
    />
    Другое фото
  </Button>
</div>

<style>
  input[type="file"] {
    display: none;
  }
  .minus,
  .plus {
    position: absolute;
    color: var(--gray-200);
    z-index: 1000;
    cursor: pointer;
  }
  .minus::selection,
  .plus::selection {
    background: transparent;
  }
  .minus {
    font-size: 33px;
    top: 342px;
    left: 332px;
  }
  .plus {
    font-size: 25px;
    top: 344px;
    left: 448px;
  }
  .CroppieContainer {
    overflow: hidden;
    padding-left: -10px !important;
  }
  .CroppieContainer__controller {
    display: flex;
  }
  :global(.cr-slider-wrap) {
    z-index: 999 !important;
    margin: -47px 0 0 115px !important;
    position: absolute;
    width: 153px !important;
    height: 26px;
    background: rgba(51, 0, 51, 0.8);
    border-radius: 30px;
  }
  :global(.cr-slider) {
    width: 90px !important;
    padding-bottom: 1px !important;
  }
  :global(input[type="range"]::-webkit-slider-runnable-track) {
    width: 300px;
    height: 5px;
    background: var(--gray-700);
    border-radius: 3px;
  }
  :global(input[type="range"]::-webkit-slider-thumb) {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    background: white;
  }
  :global(.cr-viewport) {
    border: none !important;
    box-shadow: 0 0 2000px 2000px rgba(51, 0, 51, 0.4) !important;
  }
  :global(.croppie-container) {
    margin-left: -15px !important;
  }
</style>
