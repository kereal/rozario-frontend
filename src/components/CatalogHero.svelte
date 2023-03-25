<script>
  import { orderStore } from "../stores/order.js"
  import InfoButton from "../components/InfoButton.svelte"
  import CustomDropdown from "../components/CustomDropdown.svelte"

  export let cityMeta = {}
  export let breadcrumbs = ""
  export let title
  const svgSize = 24
  const deliveryOptions = [
    { text: "доставка к точному времени с 21:00 до 08:00", price: "549" },
    { text: "доставка интервал 2 часа с 21:00 до 08:00", price: "349" },
    { text: "доставка к точному времени с 08:00 до 21:00", price: "249" },
    { text: "доставка интервал 2 часа с 08:00 до 21-00", price: "0" }
  ]
</script>

<div class="wrapper relative text-white w-full ">
  <img
    style="z-index: 0;"
    class="absolute object-cover h-full w-full"
    src="../../static/catalog-bg-image.png"
    alt="hero"
  />
  <div class="hero-gradient w-full relative">
    <div class="mt-auto hero-content z-10 pb-16 w-full h-auto absolute bottom-0">
      <div class="px-44 lg:px-34 xl:px-80">
        <div class="hero-title w-full">
          <a class="cursor-pointer breadcrumbs" href="/">Доставка цветов</a>
          <span>&nbsp;&#8226;&nbsp;</span>
          <a class="cursor-pointer breadcrumbs" href="/">{cityMeta.name}</a>
          {#if breadcrumbs}
            {#each breadcrumbs as breadcrumb}
              <span>&nbsp;&#8226;&nbsp;</span>
              <a class="cursor-pointer breadcrumbs" href={breadcrumb.path}>
                {breadcrumb.name}
              </a>
            {/each}
          {/if}
        </div>
        <h1 class="tittle pt-8 pb-18 font-bold leading-tight">{title}</h1>
      </div>
      <div
        class="w-full buttons-wrapper mx-auto flex items-stretch mb-14 px-44 lg:px-34
        xl:px-80 "
      >
        <div class="buttons-wrapper-border">
          <div>
            <InfoButton
              on:click
              css="width: 520px; max-height: 330px;"
              position="LEFT"
              styleForSecond="font-size: 16px;"
              iconPos="left"
              icon="delivery"
              styleBlock="padding:12px 18px; margin-left: -18px; margin-right:40px;"
              styleText="line-height: 155%;"
              styleMainIcon=" min-width: 40px; max-width:40px; height: 40px;
              margin-right:14px;"
              text={['Доставка: 0–549 руб.', 'Бесплатно в интервале 2 часа с 08:00 до 21:00']}
            >
              <section class="leading-tight rounded bg-white px-32 py-24">
                <h3 class="text-main text-lg font-bold mb-8">Доставка Розарио.Цветы</h3>
                <p class="text-sm text-gray-700 mb-16">
                  Доставку выполняют курьеры Розарио.Цветы
                </p>
                <ul>
                  {#each deliveryOptions as option}
                    <li
                      style="transform: translateX(-0.5rem);"
                      class="pl-8 flex items-center text-main py-12 border-b
                      last:border-b-0 border-gray-900"
                    >
                      <div class="image-box">
                        <img
                          width={svgSize}
                          height={svgSize}
                          src="delivery-icon.svg"
                          alt="delivery"
                        />
                      </div>
                      <span class="mx-8">{option.price}Р</span>
                      <p class="text-sm">{option.text}</p>
                    </li>
                  {/each}
                </ul>
              </section>
            </InfoButton>
          </div>
          <InfoButton
            on:click
            css="width: 320px; max-height: 330px;"
            styleBlock="padding:12px 18px; margin-left: -18px; margin-right:40px;"
            position="CENTER"
            iconPos="left"
            icon="ufo"
            styleText="line-height: 155%;"
            styleMainIcon=" min-width: 40px; max-width:40px; height: 40px;
            margin-right:14px;"
            text={['Мы узнаем адрес сами,', 'но о цветах ни слова...']}
          >
            <section class="rounded bg-white px-32 py-24">
              <h3 class="text-main text-lg mb-16 font-bold">
                Мы узнаем адрес сами,
                <br />
                но о цветах ни слова...
              </h3>
              <p class="text-sm text-gray-700">
                Позвоним получателю и уточним адрес получения, без раскрытия информации о
                содержании доставки
              </p>
            </section>
          </InfoButton>
          <div>
            <InfoButton
              on:click
              css="width: 520px; max-height: 330px;"
              position="RIGHT"
              iconPos="right"
              icon="info-icon"
              styleMainIcon="min-width: 37px; max-width:37px; height:37px;"
              styleBlock="padding:12px 18px; margin-right:-18px; margin-left:-18px; "
              text={['Информация', 'о магазине']}
            >
              <section
                class="rounded bg-white px-32 py-24"
                itemscope
                itemtype="https://schema.org/Florist"
              >
                <h3 class="text-main text-lg font-bold mb-16" itemprop="name">
                  {cityMeta.shop.name}
                </h3>
                <div class="text-sm text-gray-700">
                  <div
                    itemprop="address"
                    itemscope
                    itemtype="https://schema.org/PostalAddress"
                  >
                    <span itemprop="addressLocality">{cityMeta.name}</span>
                    ,
                    <span itemprop="streetAddress">{cityMeta.shop.address.street}</span>
                    • Доставка круглосуточно
                  </div>
                  <div>
                    Мы открыты с
                    <span itemprop="openingHours">
                      {cityMeta.shop.address.openingHours.days}
                    </span>
                  </div>
                  <div>
                    Режим работы с
                    <span itemprop="openingHours">
                      {cityMeta.shop.address.openingHours.hours}
                    </span>
                  </div>
                  <div>
                    т.
                    <a href="tel:8-800-250-64-70" itemprop="telephone">
                      {cityMeta.shop.phone}
                    </a>
                  </div>
                  <br />
                  <div itemscope itemtype="https://schema.org/Person">
                    <div>
                      Исполнитель (продавец): ИП
                      <span itemprop="name">
                        {cityMeta.shop.owner}
                        <span>,</span>
                      </span>
                    </div>
                    <div
                      itemprop="address"
                      itemscope
                      itemtype="https://scheme.org/PostalAddress"
                    >
                      <span itemprop="postalCode">183053</span>
                      ,
                      <span itemprop="addressCountry">Россия</span>
                      ,
                      <span itemprop="addressRegion">Мурманская область</span>
                      ,
                      <span itemprop="addressLocality">г. Мурманск</span>
                      ,
                      <span itemprop="streetAddress">
                        ул. Героев - Рыбачьего, д.41 кв.40
                      </span>
                    </div>
                    <div>
                      ИНН
                      <span itemprop="taxID">519054442210</span>
                      , ОГРНИП 318519000018711
                    </div>

                  </div>
                </div>
              </section>
            </InfoButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    --color-transparent: rgba(255, 255, 255, 0.1);
    background-position: center center;
    background-size: cover;
  }
  .hero-gradient {
    height: 398px;
  }
  .breadcrumbs {
    color: #fff;
    opacity: 0.8;
  }
  .hero-gradient:after {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
    display: block;
    background: linear-gradient(360deg, #898787 -22.31%, rgba(196, 196, 196, 0) 129.48%);
  }
  .hero-title {
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
  }
  .tittle {
    font-size: 50px;
  }
  .buttons-wrapper-border {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 8px;
    flex-wrap: wrap;
  }
</style>
