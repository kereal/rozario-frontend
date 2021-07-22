<script>
  import HeroInputIconButton from "./HeroInputIconButton.svelte";
  import {mainStore, uiStore} from '../stores/global.js'

  let src;
  let alt = "person";
  let start = true;
  let borderR = false;
  let borderL = false;
  let text = "";
  export let right = false;
  export let id="";

  if ($mainStore.person) {
    src = "person-green.svg";
    text = $mainStore.person;
  } else if (right) {
    src = "person-gray.svg";
  } else {
    src="person.svg"
  }

  if(right) {
      borderR = false
      borderL = true
  }

  if (!right && $uiStore.heroInput.currentState !== "person") {
    borderR = true;
  }

</script>

<HeroInputIconButton id={id} on:click {start} {src} {alt} {borderR} {borderL} {text} />