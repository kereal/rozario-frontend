<script>
  import { onMount } from "svelte"
  import Swiper, { Navigation } from "swiper"
  import "swiper/css"
  export let items
  export let sliderName
  export let forDesktop
  export let middle
  export let small
  export let height
  export let smallSpaceBetween = 10
  export let middleSpaceBetween = 47
  export let bigSpaceBetween = 35
  export let smallSpaceBreakpoint = 100
  export let middleSpaceBreakpoint = 1000
  export let bigSpaceBreakpoint = 1400

  let widthForSlider
  const breakpoints = {}
  breakpoints[smallSpaceBreakpoint] = {
    slidesPerView: small,
    slidesPerGroup: small,
    spaceBetween: smallSpaceBetween
  }
  breakpoints[middleSpaceBreakpoint] = {
    slidesPerView: middle,
    slidesPerGroup: middle,
    spaceBetween: middleSpaceBetween
  }
  breakpoints[bigSpaceBreakpoint] = {
    slidesPerView: forDesktop,
    slidesPerGroup: forDesktop,
    spaceBetween: bigSpaceBetween
  }
  onMount(async () => {
    Swiper.use([Navigation])
    const newSwiper = new Swiper("." + sliderName, {
      autoHeight: true,
      loopFillGroupWithBlank: true,
      speed: 950,
      breakpoints: breakpoints,
      navigation: {
        nextEl: "." + sliderName + "-next",
        prevEl: "." + sliderName + "-prev"
      }
    })
  })
</script>

<svelte:window bind:innerWidth={widthForSlider} />

<div class="conteiner relative">
  <div class="{sliderName} swiper" style="height:{height}px;">
    <div class="swiper-wrapper">
      <slot />
    </div>
  </div>
  <div class="swiper-button-next sliderButton {sliderName}-next absolute ">
    <svg
      class="fill-current w-24 h-24 text-main"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="8px"
      height="15px"
    >
      <path
        d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8
        15.657l4.95-4.95z"
      />
    </svg>
  </div>
  <div class="swiper-button-prev sliderButton {sliderName}-prev absolute">
    <svg
      class="fill-current w-24 h-24 text-main"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="8px"
      height="15px"
    >
      <path
        d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12
        4.343z"
      />
    </svg>
  </div>
</div>

<style>
  .conteiner {
    margin-left: 80px;
    margin-right: 80px;
    background: none;
  }
  @keyframes animatesliderButton {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .sliderButton {
    animation-name: animatesliderButton;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
    background-color: var(--color-accent);
    color: black;
    border-radius: 50%;
    height: 46px;
    width: 46px;
    opacity: 1;
  }
  @keyframes animate {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .swiper-button-disabled {
    opacity: 0;
    animation-name: animate;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }

  @media (max-width: 1300px) {
  }
  @media (max-width: 1000px) {
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    margin-top: -23px;
    cursor: pointer;
  }
  .swiper-button-prev {
    left: -62px;
  }
  .swiper-button-prev > svg {
    position: absolute;
    top: 11px;
    left: 10px;
  }
  .swiper-button-next {
    right: -62px;
  }
  .swiper-button-next > svg {
    position: absolute;
    top: 11px;
    left: 12px;
  }
  .swiper-button-next:after {
    content: none;
  }
  .swiper-button-prev:after {
    content: none;
  }
</style>
