<script>
  import HeroInputIconButton from "./HeroInputIconButton.svelte";
  import { HERO_INPUT_STATES } from "../data/constants.js";

  export let name = HERO_INPUT_STATES.OCCASION;
  export let right = false;
  export let id = "";
  export let filter = {};
  export let currentState = "occasion";

  let src;
  const start = false;
  let borderR = false;
  let borderL = false;
  let text = "";
  const alt = name;

  let data = "";
  if (name === HERO_INPUT_STATES.PRICE) {
    data = filter["priceRange"].text;
  } else {
    data = filter[name].text;
  }

  if (data) {
    src = `${name}-green.svg`;
    text = data;
  } else if (right) {
    src = `${name}-gray.svg`;
  } else {
    src = `${name}.svg`;
  }
  
  if (right) {
    borderR = false;
    borderL = true;
  } else if (!right && currentState !== name) {
    borderR = true;
    borderL = false;
  }
  console.log('border', borderR, borderL, currentState, name);
</script>

<HeroInputIconButton
  {id}
  on:click
  {start}
  {src}
  {alt}
  {borderR}
  {borderL}
  {text} />
