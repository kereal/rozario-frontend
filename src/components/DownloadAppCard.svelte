<script>
  export let className;
</script>

<style>
  .wrapper {
    max-height: 255px;
  }
  .image-box {
    max-height: 164px;
  }
  @media (min-width: 1280px) {
    .image-box {
      max-height: 100%;
    }
  }
  .left-side {
    flex: 1 1 55%;
  }
  .right-side {
    flex: 1 1 45%;
  }
  .leaf-1 {
    right: 28px;
    top: 91px;
  }
  .leaf-2 {
    right: -25px;
    top: 23px;
  }
  .ellipse-1 {
    top: 14px;
    right: 59px;
  }
  .ellipse-2 {
    top: 33px;
    right: 82px;
  }
  .ellipse-3 {
    bottom: 27px;
    right: 8px;
  }
  .ellipse-4 {
    bottom: 39px;
    right: 49px;
  }
</style>

<div
  class="{className} flex items-center justify-between wrapper relative
  overflow-hidden rounded-l border border-gray-300 bg-white">
  <div style="padding-right: 70px;" class="flex-1 pl-24 pt-24 lg:pb-24 pb-18">
    <img src="logo-sm.svg" alt="Розарио.Цветы" class="mb-8" />
    <div class="text-gray-600 text-sm mb-16 lg:mb-18 leading-mid">
      Удобно отслеживать статус заказа, много бонусов.
    </div>
    <div class="flex flex-wrap items-center">
      <img class="mr-16 mb-12" src="play-market.svg" alt="Play Market" />
      <img src="apple-store.svg" class="mb-12" alt="Apple Store" />
    </div>
    <div class="text-gray-600 text-xs lg:text-sm leading-tight lg:leading-mid">
      Вам пришло смс с ссылкой на приложение. Это бесплатно
    </div>
  </div>
  <div class="image-box h-full absolute right-0 top-0 bottom-0">
    <img class="h-full w-full" src="cellphone.svg" alt="icon" />
  </div>
</div>
