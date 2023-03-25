<script>
  import { onMount } from "svelte"
  export let number
  let newnumber = number
  let once = true
  let time
  let step
  onMount(() => {
    if (once) {
      once = false
    }
  })

  function animate(num) {
    if (num > 1000) {
      time = 1
      step = 111
    } else if (num > 10000) {
      time = 1
      step = 1311
    } else {
      time = 1
      step = 11
    }
    let n = 0
    let t = Math.round(time / (num / step))
    let interval = setInterval(() => {
      n = n + step
      if (n >= num) {
        n = num
        clearInterval(interval)
      }
      newnumber = n
    }, t)
    n = 0
  }
  function formate(newnumber) {
    newnumber = String(newnumber)
    newnumber = newnumber
  }

  $: if (number && !once) {
    animate(number)
  }
</script>

<span id="out">{String(newnumber).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}</span>
