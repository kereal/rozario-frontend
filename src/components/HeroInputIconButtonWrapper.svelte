<script>
  import HeroInputIconButton from "@/components/HeroInputIconButton.svelte"
  import { HERO_INPUT_STATES } from "@/data/constants"

  export let name = HERO_INPUT_STATES.OCCASION
  export let right = false
  export let id = ""
  export let filter = {}
  export let currentState = "occasion"

  let src
  let borderR = false
  let borderL = false
  let text = ""
  const alt = name

  let data = ""
  if (name === HERO_INPUT_STATES.PRICE) {
    data = filter["priceRange"].text
  } else {
    data = filter[name].text
  }

  if (data) {
    src = `${name}-green.svg`
    text = data
  } else if (right) {
    src = `${name}-gray.svg`
  } else {
    src = `${name}.svg`
  }

  if (right) {
    borderR = false
    borderL = true
  } else if (!right && currentState !== name) {
    borderR = true
    borderL = false
  }
</script>

<HeroInputIconButton {id} on:click {src} {alt} {borderR} {borderL} {text} />
