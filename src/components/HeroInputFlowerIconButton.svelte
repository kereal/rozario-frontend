<script>
  import HeroInputIconButton from "@/components/HeroInputIconButton.svelte"
  import { mainStore, uiStore } from "@/stores/global"

  let src
  let alt = "flower"
  let borderR = false
  let borderL = false
  let text = ""
  export let right = false
  export let id = ""

  if ($mainStore.flower.kind) {
    src = "flower-green.svg"
    text = $mainStore.flower.kind
  } else if (right) {
    src = "flower-gray.svg"
  } else {
    src = "flower.svg"
  }

  if (right) {
    borderR = false
    borderL = true
  }

  if (!right && $uiStore.heroInput.currentState !== "flower") {
    borderR = true
  }
</script>

<HeroInputIconButton {id} on:click {src} {alt} {borderR} {borderL} {text} />
