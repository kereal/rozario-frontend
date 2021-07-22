<script>
  import HeroInputIconButton from "./HeroInputIconButton.svelte";
  import {mainStore, uiStore} from '../stores/global.js'

  let src;
  let alt = "price";
  let start = false;
  let borderR = false;
  let borderL = false;
  let text = "";
  export let currentState;
  export let right = false;
  export let id = '';

  if ($mainStore.flower.priceRange.text) {
    src = "price-green.svg";
    text = $mainStore.flower.priceRange.text;
  } else if (right) {
    src = "price-gray.svg";
  } else {
    src = "price.svg"
  }

  if(right) {
      borderR = false
      borderL = true
  }

  if (!right && $uiStore.heroInput.currentState !== "price") {
    borderR = true;
  }



</script>

<HeroInputIconButton id={id} on:click {start} {src} {alt} {borderR} {borderL} {text} />