<script>
  import HeroInputIconButton from "./HeroInputIconButton.svelte";
  import { mainStore, uiStore } from "../stores/global.js";

  let src;
  let alt = "occasion";
  let start = false;
  let borderR = false;
  let borderL = false;
  let text = "";
  export let right = false;
  export let id = "";

  if ($mainStore.flower.occasion) {
    src = "occasion-green.svg";
    text = $mainStore.flower.occasion;
  } else if (right) {
    src = "occasion-gray.svg";
  } else {
    src = "occasion.svg";
  }

  if (right) {
    borderR = false;
    borderL = true;
  }
  if (!right && $uiStore.heroInput.currentState !== "occasion") {
    borderR = true;
  }
</script>

<HeroInputIconButton
  {id}
  on:click
  start={true}
  {src}
  {alt}
  {borderR}
  {borderL}
  {text} />
