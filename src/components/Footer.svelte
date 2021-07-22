<script>
  import House from "./icons/House.svelte";
  import Phone from "./icons/Phone.svelte";
  import Email from "./icons/Email.svelte";
  import SocialIcon from "./SocialIcon.svelte";

  export let className = "";

  const customerInfoList = [
    { name: "Вопросы и ответы", href: "/help" },
    { name: "Информация о доставке", href: "/delivery" },
    { name: "Букеты для бизнеса", href: "/business" },
    { name: "Обратная связь", href: "/contacts" },
    { name: "Стать партнером", href: "/businessRegistration" }
  ];
  const bouquetsAndCompositions = [
    { name: "Лето", href: "/" },
    { name: "Букеты на День рождения", href: "/" },
    { name: "Букеты из Роз", href: "/" },
    { name: "Цветы поштучно", href: "/" },
    { name: "Букеты", href: "/" },
    { name: "Композиции из цветов", href: "/" },
    { name: "Важные события", href: "/" },
    { name: "На праздник", href: "/" },
    { name: "Для близких", href: "/" },
    { name: "Корзины с фруктами", href: "/" },
    { name: "Подарки", href: "/" }
  ];
  const about = [
    { name: "О Розарио.Цветы",  href: "/about" },
    { name: "Блог", href: "/blog" },
    { name: "Отзывы", href: "/reviews" },
    { name: "Улыбки получателей", href: "/smiles" }
  ];
  const termsOfUse = [
    { name: "Карта сайта", href: "/map" },
    { name: "Использование cookies", href: "/rules/cookies" },
    { name: "Пользовательское соглашение", href: "/rules" }
  ];
  const socials = [
    { icon: "Instagram" },
    { icon: "Twitter" },
    { icon: "Facebook" },
    { icon: "Vk" }
  ];
</script>

<style>
  footer {
    flex-shrink: 0;
  }
  .footer-padding {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .header {
    @apply mb-16 text-one-five font-semibold;
  }
  @media (min-width: 1480px) {
    .footer-padding {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }
  @media (min-width: 1240px) {
    .header {
      @apply mb-24;
    }
    .footer-padding {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }
  .footer-width {
    max-width: 1420px;
  }
  .map {
    width: 281px;
    height: 166px;
    background-color: gray;
  }
  .footer-list {
    @apply flex flex-col text-gray-700;
  }
  .footer-header {
    @apply my-48;
  }
  .footer-block {
    @apply mr-24 flex-1 min-h-full flex flex-col justify-between;
  }
  .footer-link-list {
    font-size: 13px;
  }
  .footer-link-list li {
    @apply mb-12 cursor-pointer leading-mid text-sm;
  }
  .footer-link-list li a {
    @apply leading-mid;
  }
  .footer-link-list li a:hover {
    @apply underline;
  }
  .footer-link-list li:last-of-type {
    @apply mb-0;
  }
  .divider {
    height: 1px;
    @apply w-full bg-gray-300;
  }
</style>

<footer class="{className} relative z-20 bg-gray-800 w-full">
  <div
    itemscope
    itemtype="http://schema.org/Florist"
    class="w-full flex flex-col justify-between items-center border-b
    border-gray-200">
    <div class="footer-width footer-padding flex items-center py-48 w-full">
      <a href="#header" class="mr-134">
        <img
          width="175"
          height="23"
          src="logo-footer.svg"
          alt="Розарио Цветы" />
      </a>
      <ul
        class="flex justify-between font-semibold text-gray-600 w-8/12 leading-snug">
        <li class="mr-16">Бесплатная доставка</li>
        <li class="mr-16">Покупки без риска</li>
        <li class="mr-16">Служба поддержки</li>
        <li>Высокое качество цветов</li>
      </ul>
    </div>
    <div class="divider" />
    <div class="footer-width footer-padding flex pt-34 pb-12 lg:pb-34 w-full">
      <div class="footer-block">
        <div class="footer-list">
          <h3 class="header">
            Информация для покупателей
          </h3>
          <ul class="footer-link-list">
            {#each customerInfoList as item}
              <li>
                <a href={item.href}>{item.name}</a>
              </li>
            {/each}
          </ul>
        </div>
        <div>
          <h3 class="text-one-five text-gray-700 mb-8 font-semibold">Мы в соцсетях:</h3>
          <div class="flex">
            {#each socials as social}
              <div class="mr-12">
                <SocialIcon icon={social.icon} />
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="footer-block">
        <div class="footer-list">
          <h3 class="header">Букеты и композиции</h3>
          <ul class="footer-link-list">
            {#each bouquetsAndCompositions as item}
              <li>
                <a href={item.href}>{item.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="footer-block">
        <div class="footer-list">
          <h3 class="header">О компании</h3>
          <ul class="footer-link-list">
            {#each about as item}
              <li>
                <a href={item.href}>{item.name}</a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="footer-list">
          <h3 class="header">
            Условия использования сервиса
          </h3>
          <ul class="footer-link-list">
            {#each termsOfUse as item}
              <li>
                <a href={item.href}>{item.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="footer-list">
        <h3 class="header">
          Контакты нашего магазина
        </h3>
        <div class="flex flex-col">
          <div class="flex w-full mb-12">
            <House classNames="fill-current text-info" iconSize="15" />
            <address
              class="text-sm ml-8 not-italic"
              itemprop="address"
              itemscope
              itemtype="https://schema.org/PostalAddress">
              <span itemprop="addressLocality">г. Мурманск</span>
              <span itemprop="streetAddress">&nbsp;ул. Ростинская, 9А</span>
            </address>
          </div>
          <div class="flex items-center w-full mb-12">
            <Phone classNames="fill-current text-info" iconSize="15" />
            <div class="text-sm ml-8">
              <a href="tel:8-800-250-64-70" itemprop="telephone">
                8 800 250 64 70
              </a>
            </div>
          </div>
          <div class="flex items-center w-full mb-18">
            <Email classNames="fill-current text-info" iconSize="15" />
            <div class="text-sm ml-8">
              <span class="email">info@rozariofl.ru</span>
            </div>
          </div>
          <div class="mb-2 text-sm w-full leading-mid">
            Мы работаем: с Пн-Вс, с 8:00 до 21:00
          </div>
          <div class="w-full text-sm leading-mid">Доставка круглосуточно!</div>
          <img
            src="https://static-maps.yandex.ru/1.x/?ll=37.620070,55.753630&size=450,450&z=16&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99"
            alt="map"
            class="map mt-24" />
        </div>
      </div>
    </div>
    <div class="divider" />
    <div
      class="footer-width w-full mx-auto footer-padding self-start text-left
      text-gray-700 text-ssm py-24">
      2020
      <span itemprop="name">Розарио.Цветы</span>
    </div>
  </div>
</footer>
