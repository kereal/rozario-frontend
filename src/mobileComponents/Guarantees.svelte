<script>
  import Popup from "./Popup.svelte"
  export let visible
  export let guarantees = [
    {
      title: "100 % гарантия свежести",
      text: "Мы собираем букеты только из свежих цветов высшего качества",
      img: "icon_flowers.svg"
    },
    {
      title: "Счастливый получатель",
      text: "Не понравился букет? Сообщите нам об этом в течение 24 часов, и мы заменим его на новый.",
      img: "icon_face.svg"
    },
    {
      title: "Всегда на связи",
      text: "Мы всегда согласуем с вами любые изменения в заказе, а также сообщим, если не удалось связаться с получателем букета.",
      img: "icon_feedback.svg"
    },
    {
      title: "Лучшие флористы",
      text: "Все букеты с любовью собирают опытные флористы, настоящие мастера своего дела.",
      img: "icon_superhero.svg"
    },
    {
      title: "Замена букета",
      text: "В последний момент передумали или решили отказаться от покупки? Ничего страшного! Свяжиетсь с нами до момента сборки букета, и мы учтём ваши пожелания.",
      img: "icon_exchange.svg"
    },
    {
      title: "Пунктуальная доставка",
      text: "Наши курьеры безупречно вежливы, и всегда доставляют заказы точно в срок.",
      img: "icon_delivery.svg"
    }
  ]
</script>

<Popup title="Гарантии покупателя" bind:visible size="max-height:95%;">
  {#each guarantees as item}
    <div class="garant flex">
      <div class="garant__icon">
        <img src="/{item.img}" alt="guarantees" class="w-full h-full" />
      </div>
      <div>
        <div class="garant__name">{item.title}</div>
        <div class="garant__text">{item.text}</div>
      </div>
    </div>
  {/each}
</Popup>

<style>
  .garant {
    margin-bottom: 24px;
  }
  .garant__icon {
    min-width: 44px;
    height: 44px;
    margin-right: 12px;
  }
  .garant__name {
    font-weight: 600;
    font-size: 15px;
    color: var(--color-main);
    margin-bottom: 4px;
  }
  .garant__text {
    font-size: 14px;
    line-height: 140%;
    color: var(--gray-600);
  }
</style>
