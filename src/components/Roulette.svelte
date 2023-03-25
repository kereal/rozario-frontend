<script>
  import Button from "./Button.svelte"

  export let user = false
  export let prize
  export let prizes = [
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="32" viewBox="0 0 55 32" fill="none">\n' +
        '<path d="M1 1.85962H53.064V10.2921C49.6216 10.2921 46.8304 13.0827 46.8304 16.5251C46.8304 19.9675 49.621 22.7582 53.0634 22.7582L53.064 30.8248H1V22.7586C4.44227 22.7584 7.23274 19.9679 7.23274 16.5256C7.23274 13.0833 4.44227 10.2927 1 10.2926V1.85962Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<line x1="15.4687" y1="3.41919" x2="15.4687" y2="29.6511" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>\n' +
        "</svg>",
      text: "купон 100 ₽",
      type: "coupon",
      coupon: {
        type: ["purple"],
        price: 100,
        percent: null,
        name: "купон<br>на товар",
        smallDescription: "Оставляй отзывы и получай купоны",
        modifier: "coupon-card--purple"
      }
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="0 0 38 44" fill="none">\n' +
        '<rect x="1.22266" y="9.54602" width="35.449" height="33.3579" rx="3" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="18.7295" y1="9.59155" x2="18.7295" y2="42.8583" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="37.5732" y1="24.2377" x2="1.04392" y2="24.2377" stroke="#E71F75" stroke-width="2"/>\n' +
        '<path d="M18.9472 6.86508V9.59143L13.8626 9.28434C11.6309 9.14956 9.19701 8.27464 8.67433 6.10087C8.32577 4.6513 8.68236 3.05571 10.7834 1.87885C13.2025 0.523779 15.3709 1.09716 16.9242 2.11146C18.4599 3.11426 18.9472 5.03094 18.9472 6.86508Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M18.9464 6.86545V9.5918L24.031 9.28471C26.2626 9.14992 28.6965 8.275 29.2192 6.10124C29.5678 4.65166 29.2112 3.05608 27.1102 1.87922C24.691 0.524145 22.5227 1.09753 20.9693 2.11183C19.4336 3.11463 18.9464 5.0313 18.9464 6.86545Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        "</svg>",
      text: "приз",
      type: "prize",
      photo: "photoForPrize.png",
      size: "(размер — маленький, 50×50 см)"
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="32" viewBox="0 0 55 32" fill="none">\n' +
        '<path d="M1 1.85962H53.064V10.2921C49.6216 10.2921 46.8304 13.0827 46.8304 16.5251C46.8304 19.9675 49.621 22.7582 53.0634 22.7582L53.064 30.8248H1V22.7586C4.44227 22.7584 7.23274 19.9679 7.23274 16.5256C7.23274 13.0833 4.44227 10.2927 1 10.2926V1.85962Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<line x1="15.4687" y1="3.41919" x2="15.4687" y2="29.6511" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>\n' +
        "</svg>",
      text: "купон 200 ₽",
      type: "coupon",
      coupon: {
        type: ["purple"],
        price: 200,
        percent: null,
        name: "купон<br>на товар",
        smallDescription: "Оставляй отзывы и получай купоны",
        modifier: "coupon-card--purple"
      }
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="0 0 38 44" fill="none">\n' +
        '<rect x="1.22266" y="9.54602" width="35.449" height="33.3579" rx="3" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="18.7295" y1="9.59155" x2="18.7295" y2="42.8583" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="37.5732" y1="24.2377" x2="1.04392" y2="24.2377" stroke="#E71F75" stroke-width="2"/>\n' +
        '<path d="M18.9472 6.86508V9.59143L13.8626 9.28434C11.6309 9.14956 9.19701 8.27464 8.67433 6.10087C8.32577 4.6513 8.68236 3.05571 10.7834 1.87885C13.2025 0.523779 15.3709 1.09716 16.9242 2.11146C18.4599 3.11426 18.9472 5.03094 18.9472 6.86508Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M18.9464 6.86545V9.5918L24.031 9.28471C26.2626 9.14992 28.6965 8.275 29.2192 6.10124C29.5678 4.65166 29.2112 3.05608 27.1102 1.87922C24.691 0.524145 22.5227 1.09753 20.9693 2.11183C19.4336 3.11463 18.9464 5.0313 18.9464 6.86545Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        "</svg>",
      text: "приз",
      type: "prize",
      photo: "photoForPrize.png",
      size: "(размер — маленький, 50×50 см)"
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="32" viewBox="0 0 55 32" fill="none">\n' +
        '<path d="M1 1.85962H53.064V10.2921C49.6216 10.2921 46.8304 13.0827 46.8304 16.5251C46.8304 19.9675 49.621 22.7582 53.0634 22.7582L53.064 30.8248H1V22.7586C4.44227 22.7584 7.23274 19.9679 7.23274 16.5256C7.23274 13.0833 4.44227 10.2927 1 10.2926V1.85962Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<line x1="15.4687" y1="3.41919" x2="15.4687" y2="29.6511" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>\n' +
        "</svg>",
      text: "купон 300 ₽",
      type: "coupon",
      coupon: {
        type: ["purple"],
        price: 300,
        percent: null,
        name: "купон<br>на товар",
        smallDescription: "Оставляй отзывы и получай купоны",
        modifier: "coupon-card--purple"
      }
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="0 0 38 44" fill="none">\n' +
        '<rect x="1.22266" y="9.54602" width="35.449" height="33.3579" rx="3" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="18.7295" y1="9.59155" x2="18.7295" y2="42.8583" stroke="#E71F75" stroke-width="2"/>\n' +
        '<line x1="37.5732" y1="24.2377" x2="1.04392" y2="24.2377" stroke="#E71F75" stroke-width="2"/>\n' +
        '<path d="M18.9472 6.86508V9.59143L13.8626 9.28434C11.6309 9.14956 9.19701 8.27464 8.67433 6.10087C8.32577 4.6513 8.68236 3.05571 10.7834 1.87885C13.2025 0.523779 15.3709 1.09716 16.9242 2.11146C18.4599 3.11426 18.9472 5.03094 18.9472 6.86508Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M18.9464 6.86545V9.5918L24.031 9.28471C26.2626 9.14992 28.6965 8.275 29.2192 6.10124C29.5678 4.65166 29.2112 3.05608 27.1102 1.87922C24.691 0.524145 22.5227 1.09753 20.9693 2.11183C19.4336 3.11463 18.9464 5.0313 18.9464 6.86545Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        "</svg>",
      text: "приз",
      type: "prize",
      photo: "photoForPrize.png",
      size: "(размер — маленький, 50×50 см)"
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">\n' +
        '<path d="M24.0045 1.80591L30.8673 16.4229L46.2067 18.7658L35.104 30.1419L37.7267 46.2069L24.0045 38.6186L10.2856 46.2069L12.9051 30.1419L1.80566 18.7658L17.1418 16.4229L24.0045 1.80591Z" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        "</svg>",
      text: "приз",
      type: "prize",
      photo: "photoForPrize.png",
      size: "(размер — маленький, 50×50 см)"
    },
    {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="43" height="40" viewBox="0 0 43 40" fill="none">\n' +
        '<line x1="1" y1="-1" x2="47.8099" y2="-1" transform="matrix(-0.639153 0.769079 0.769079 0.639153 38.1787 1.99341)" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<circle r="5.41736" transform="matrix(-0.374955 -0.927043 -0.927043 0.374955 34.2638 27.7771)" stroke="#E71F75" stroke-width="2"/>\n' +
        '<circle r="5.41736" transform="matrix(-0.374955 -0.927043 -0.927043 0.374955 8.64657 10.3101)" stroke="#E71F75" stroke-width="2"/>\n' +
        "</svg>",
      text: "скидка",
      type: "coupon",
      coupon: {
        type: ["purple"],
        price: 400,
        percent: null,
        name: "купон<br>на товар",
        smallDescription: "Оставляй отзывы и получай купоны",
        modifier: "coupon-card--purple"
      }
    }
  ]
  let rotate = false

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
  }
  let degrees = 1080 + randomInteger(0, 360)
  let numberPrice = degrees / 45 - 26.5
  if (numberPrice > 0) {
    numberPrice = 9 - numberPrice
    numberPrice = numberPrice
  } else {
    numberPrice = numberPrice * -1 + 1
    numberPrice = numberPrice
  }
  let heart = false
  function rotateRoulette() {
    rotate = true
    setTimeout(() => {
      prize = prizes[Math.floor(numberPrice) - 1]
    }, 6000)
    setTimeout(() => {
      heart = true
    }, 4000)
  }
</script>

<div class="wrapper">
  <div class="roulette" class:heart>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="107"
      height="124"
      viewBox="0 0 107 124"
      fill="none"
      class="rouletteArrow"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M16.0423 18.2061C15.7057 17.4416 15.8784 16.5597 16.538 16.0473C19.8951 13.4394 31.4257 5.98108 53.5035 5.98108C75.5813 5.98108 87.1119 13.4394 90.4689 16.0473C91.1286 16.5597 91.3013 17.4417 90.9647 18.2061L56.2491 97.0398C55.1975 99.4277 51.8095 99.4277 50.7579 97.0398L16.0423 18.2061Z"
          fill="#E71F75"
        />
        <path
          d="M19.1581 17.8377C22.9469 15.1418 33.7504 8.98108 53.5035 8.98108C73.2565 8.98108 84.06 15.1418 87.8489 17.8377L53.5035 95.8308L19.1581 17.8377Z"
          stroke="url(#paint0_linear)"
          stroke-width="6"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.874512"
          y="0.981079"
          width="105.258"
          height="122.85"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.6125 0 0 0 0 0 0 0 0 0 0.263375 0 0 0 0.4 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="53.5035"
          y1="5.98108"
          x2="53.5035"
          y2="103.275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C8C7C7" />
          <stop offset="0.807292" stop-color="#F3F3F3" />
        </linearGradient>
      </defs>
    </svg>
    <div
      class="activeBlock flex items-center flex-start"
      style={rotate ? `transform: rotate(${degrees}deg);` : ""}
    >
      {#each prizes as prize, i}
        <div
          class="activeElement activeElement{i} flex items-center"
          style="transform: rotate({i * 45}deg);
                        border-color: transparent transparent transparent {i % 2
            ? 'var(--color-accent)'
            : 'var(--color-light)'};
                       "
        >
          <div class="activeElement__content ">
            <div class="text-center flex justify-center">
              {@html prize.icon}
            </div>
            <p>
              {prize.text}
            </p>
          </div>
        </div>
      {/each}
    </div>
    <div class="centerRoulette">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="45"
        viewBox="0 0 33 45"
        fill="none"
      >
        <path
          d="M28.4579 5.93656L27.6968 3.66939L25.4964 4.71892C24.0668 5.4008 22.7102 6.08425 21.4202 6.77241C20.3103 5.36152 19.0932 3.91292 17.761 2.42346L16.1529 0.622925L14.5448 2.42346C13.2142 3.91135 11.9955 5.35995 10.8839 6.76927C9.59714 6.08111 8.24055 5.39923 6.8077 4.71735L4.60732 3.66625L3.85113 5.93342C0.0556215 17.2818 -0.510702 25.7582 0.828032 31.8464C1.1331 34.8033 2.4118 37.4004 4.29089 39.4806L4.30387 39.4932C7.42271 43.3928 11.8138 45.0111 16.1577 44.8791C20.4969 45.0111 24.8879 43.3944 28.0068 39.4932L28.0197 39.4806C29.8988 37.4004 31.1792 34.8018 31.4858 31.8464C32.8213 25.7598 32.2518 17.2834 28.4579 5.93656ZM16.1529 5.72445C16.9366 6.64829 17.6831 7.55327 18.402 8.44569C17.6295 8.91232 16.8831 9.37581 16.1561 9.84401C15.4259 9.37581 14.6746 8.91232 13.9054 8.44569C14.621 7.5517 15.3707 6.64829 16.1529 5.72445ZM7.16308 9.50622C9.08112 10.4756 10.8336 11.445 12.4385 12.4128C9.13142 14.8953 6.63084 17.3651 4.80854 19.7784C5.23369 16.7382 5.99473 13.3225 7.16308 9.50622ZM24.6348 36.9794C21.3991 41.0267 16.1496 41.5608 11.89 39.8153C7.63367 38.0713 4.38176 34.0492 5.13145 28.9806C5.96228 23.3606 11.4535 16.4397 25.1459 9.50622C29.5321 23.854 28.2258 32.4906 24.6348 36.9794Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
  {#if user}
    <div class="buttonBlock">
      <div class="button flex justify-center">
        <Button size="lg" on:click={rotateRoulette}>Крутить колесо</Button>
      </div>
      <p class="mt-24">
        <a href="rules/gamePromotion" class="cursor-pointer hover:text-info"
          >Правила проведения акции</a
        >
      </p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .roulette {
    width: 432.71px;
    height: 432.71px;
    background: var(--color-info);
    box-shadow: 0px 40px 59px rgba(232, 1, 100, 0.21);
    border-radius: 50%;
    position: relative;
    padding: 34px;
  }

  .buttonBlock {
    text-align: center;
    margin-top: 68px;
    font-size: 14px;
    color: var(--gray-700);
  }
  .button {
    margin: 0 auto;
  }
  .rouletteArrow {
    position: absolute;
    left: calc(50% - 53.5px);
    top: -25px;
    z-index: 2;
  }
  .activeBlock {
    width: 364px;
    height: 364px;
    border-radius: 50%;
    border: 5px solid var(--gray-500);
    overflow: hidden;
    position: relative;
    transition: all 4s ease-in-out 0.1s;
  }
  .activeElement {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 75px 0 75px 182px;
    position: absolute;
  }

  .activeElement__content {
    margin-left: -140px;
    transform: rotate(-90deg);
    font-weight: 600;
    font-size: 16px;
    color: var(--color-info);
  }

  .activeElement__content p {
    width: 49px;
    text-align: center;
    margin-top: 14px;
    margin-right: 5px;
  }

  .activeElement0 {
    left: 0;
  }
  .activeElement1 {
    left: 22px;
    top: 41px;
  }
  .activeElement2 {
    top: 16px;
    left: calc(50% - 91px);
  }

  .activeElement3 {
    right: 22px;
    top: 41px;
  }
  .activeElement4 {
    right: 0;
  }
  .activeElement5 {
    right: 22px;
    bottom: 41px;
  }

  .activeElement6 {
    bottom: 16px;
    left: calc(50% - 91px);
  }
  .activeElement7 {
    left: 22px;
    bottom: 41px;
  }
  .centerRoulette {
    width: 71.95px;
    height: 71.95px;
    border-radius: 50%;
    z-index: 2;
    position: absolute;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
    background: var(--color-info);
  }
  .centerRoulette svg {
    margin: 13px auto 0 auto;
  }

  .heart {
    animation-name: heartbeat;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    @apply text-info;
  }
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
