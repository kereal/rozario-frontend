<script>
  import HeroInputIconButton from "./HeroInputIconButton.svelte";
  import {mainStore, uiStore} from '../stores/global.js'

  let src;
  let alt = "flower";
  let start = false;
  let borderR = false;
  let borderL = false;
  let text = "";
  export let right = false;
  export let id = '';

  if ($mainStore.flower.kind) {
    src = "flower-green.svg";
    text = $mainStore.flower.kind;
  } else if(right) {
    src = "flower-gray.svg";
  } else {
    src = "flower.svg"
  }

  if(right) {
      borderR = false
      borderL = true
  }

  if (!right && $uiStore.heroInput.currentState !== "flower") {
    borderR = true;
  }

</script>

<HeroInputIconButton id={id} on:click {start} {src} {alt} {borderR} {borderL} {text} />