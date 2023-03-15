<script>
  import HeroInput from "./HeroInput.svelte"

  export let locativus = ""
  export let name = ""

  const visible = false

  const occasionList = [
    { text: "Все", path: "" },
    { text: "День рождения", path: "birthday" },
    { text: "Юбилей", path: "anniversary" },
    { text: "Поздравление", path: "congratulation" },
    { text: "Сказать люблю", path: "iloveyou" },
    { text: "Извинение", path: "apology" },
    { text: "Бизнес-поздравление", path: "business" },
    { text: "Благодарность", path: "thanks" },
    { text: "На свадьбу", path: "wedding" },
    { text: "Для новорожденного", path: "newborn" },
    { text: "Траур", path: "mourning" }
  ]

  const priceRangeList = [
    { from: "", to: "2000", text: "От 2000", query: "from-2000" },
    { from: "2000", to: "4000", text: "От 2000 до 4000", query: "from-2000-to-4000" },
    { from: "4000", to: "5000", text: "От 4000 до 5000", query: "from-4000-to-5000" },
    { from: "5000", to: "9000", text: "От 5000 до 9000", query: "from-5000-to-9000" },
    { from: "9000", to: "14000", text: "От 9000 до 14000", query: "from-9000-to-14000" },
    { from: "14000", to: "", text: "От 14000", query: "from-14000" }
  ]

  const personList = [
    { text: "Маме", path: "mother" },
    { text: "Женшине", path: "woman" },
    { text: "Любимой", path: "beloved" },
    { text: "Семье", path: "family" },
    { text: "Мужчине", path: "man" },
    { text: "Ребенку", path: "kid" },
    { text: "Деловому партнеру", path: "business_partner" },
    { text: "Дочери", path: "daughter" },
    { text: "Подруге", path: "girlfriend" },
    { text: "Сестре", path: "sister" }
  ]

  const flowerList = [
    { text: "все", path: "" },
    { text: "монобукеты", path: "mono" },
    { text: "микс", path: "mix" },
    { text: "с розами", path: "roses" },
    { text: "с герберами", path: "gerbera" },
    { text: "с лилиями", path: "lily" },
    { text: "с хризантемами", path: "chrysanthemum" },
    { text: "с орхидеями", path: "orchid" },
    { text: "с альстромериями", path: "alstroemeria" },
    { text: "с гортензиями", path: "hydrangea" },
    { text: "с ирисами", path: "iris" },
    { text: "с гвоздиками", path: "clove" },
    { text: "с каллами", path: "calla" },
    { text: "с лизиантусами", path: "lisianthus" },
    { text: "с пионами", path: "peony" },
    { text: "с ромашками", path: "chamomile" },
    { text: "с экзотическими цветами", path: "exotic" },
    { text: "с подсолнухами", path: "sunflower" },
    { text: "с тюльпанами", path: "tulip" }
  ]
</script>

<div class="wrapper z-10 rounded-t relative text-white">
  <picture>
    <source
      srcset="pexels-dbart-714918.jpg, pexels-dbart-714918.jpg 2x"
      type="image/webp"
    />
    <img
      srcset="pexels-dbart-714918.jpg 2x"
      class="absolute object-cover h-full w-full rounded-t"
      src="pexels-dbart-714918.jpg"
      alt="hero"
    />
  </picture>
  <noscript>
    <img src="pexels-dbart-714918.jpg" alt="hero" />
  </noscript>
  <div class="hero-content w-full relative">
    <div class="w-full z-10 relative">
      <div class="hero-title w-full mx-auto pb-32">
        <div class="text">
          <a class="cursor-pointer" href="/">Доставка цветов</a>
          <span>&nbsp;&#8226;&nbsp;</span>
          <a class="cursor-pointer" href="/">{name}</a>
        </div>
        <h1
          style="font-size: 3.125rem"
          class="tracking-wider text-left text-white leading-tight w-9/12"
        >
          <span>Надежная доставка цветов</span>
          <br />
          <span>{locativus}</span>
        </h1>
      </div>
      <HeroInput
        {occasionList}
        {priceRangeList}
        {personList}
        {flowerList}
        closeFinalDropdown={!visible}
      />
    </div>
  </div>
</div>

<style>
  .wrapper {
    --color-transparent: rgba(255, 255, 255, 0.1);
    background-position: center center;
    background-size: cover;
  }
  .hero-content {
    padding: 50px 80px;
  }
  .hero-content:after {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
    display: block;
    background: rgba(0, 0, 0, 0.3);
  }
  .hero-title {
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
  }
</style>
