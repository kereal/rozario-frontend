<script>
  import BankCard from "./BankCard.svelte";
  import BankCardBack from "./BankCardBack.svelte";
  import CustomCheckbox from "./CustomCheckbox.svelte";

  let reservedPrice = "3459";
</script>

<style>
  .wrapper {
    min-height: 240px;
  }
  .bankcard {
    width: 473px;
    height: 240px;
  }
  .upper {
    position: relative;
    z-index: 10;
    width: 353px;
  }
  .under {
    position: absolute;
    top: 1.5rem;
    z-index: 1;
    left: 120px;
  }
</style>

<div class="mt-34 sm:mt-40 flex flex-col lg:flex-row wrapper">
  <div class="bankcard relative">
    <div class="upper">
      <BankCard />
    </div>
    <div class="under">
      <BankCardBack />
    </div>    
  </div>
  <div class="flex-1 flex flex-col items-start mt-24 sm:ml-34 xl:ml-68">
    <div class="text-one-five leading-mid text-main mb-24">
      Мы зарезервируем 3 459 ₽ на вашей карте<br/>и спишем после доставки заказа
    </div>
    <div class="block w-full text-left">
      <CustomCheckbox id="cart-save-bank-card" labelClass="text-sm leading-mid text-main" label="Сохранить карту" />
    </div>
  </div>
</div>
