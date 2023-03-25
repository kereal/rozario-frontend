<script>
  import Button from "./Button.svelte"
  import SelectLabel from "./SelectLabel.svelte"
  import cloneDeep from "lodash/cloneDeep"

  export let requisites = {
    name: "ООО «Ромашка»",
    paymentAccount: 44444444444466666663,
    BIK: 33552211,
    INN: 519054442210,
    KPP: 30101810300000000615,
    OGRN: 36454346535,
    legaladdress: "г. Мурманск, ул. Промышленная, 19, оф. 310",
    mailingAddress: "г. Мурманск, ул. Промышленная, 19, оф. 310",
    regulations: "",
    director: "Денис Игоревич",
    form: "Товарищество на вере."
  }

  export let forms = [
    "Полное товарищество.",
    "Товарищество на вере.",
    "Общество с ограниченной ответственностью.",
    "Общество с дополнительной ответственностью.",
    "Акционерное общество.",
    "Производственные кооперативы.",
    "Государственные и муниципальные унитарные предприятия"
  ]

  let values = cloneDeep(requisites)
  let changed = false
  $: if (values) {
    if (
      values.name != requisites.name ||
      values.INN != requisites.INN ||
      values.KPP != requisites.KPP ||
      values.legaladdress != requisites.legaladdress ||
      values.bankName != requisites.bankName ||
      values.email != requisites.email
    ) {
      changed = true
    }
  }
</script>

<div class="BusinessRequisites">
  <div class="BusinessRequisites__content">
    <div class="BusinessRequisites__left">
      <div class="BusinessRequisites__input">
        <h3>Название юр. лица</h3>
        <input type="text" bind:value={values.name} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>Расчётный счёт</h3>
        <input
          type="text"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={values.paymentAccount}
        />
      </div>
      <div class="BusinessRequisites__input">
        <h3>ИНН</h3>
        <input
          type="text"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={values.INN}
        />
      </div>
      <div class="BusinessRequisites__input">
        <h3>БИК</h3>
        <input
          type="text"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={values.BIK}
        />
      </div>
      <div class="BusinessRequisites__input">
        <h3>ОГРН/ОГРНИП</h3>
        <input
          type="text"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={values.OGRN}
        />
      </div>
    </div>
    <div class="BusinessRequisites__right">
      <div class="BusinessRequisites__input">
        <h3>Юридический адрес</h3>
        <input type="text" bind:value={values.legaladdress} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>Почтовый адрес</h3>
        <input type="text" bind:value={values.mailingAddress} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>Директор или ИП</h3>
        <input type="text" bind:value={values.director} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>Устав или свидетельство</h3>
        <input type="text" bind:value={values.regulations} />
      </div>
      <div class="BusinessRequisites__input">
        <h3 class="mb-8">Организационно-правовая форма</h3>
        <SelectLabel
          list={forms}
          bind:select={requisites.form}
          size="full"
          className="border-gray-500"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .BusinessRequisites {
    background-color: #fff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    border-radius: 4px;
    padding: 34px 48px 40px 48px;
    width: 100%;
  }
  .BusinessRequisites__content {
    display: flex;
  }
  h3 {
    font-size: 13px;
    line-height: 120%;
    color: var(--gray-600);
  }
  input {
    background: #ffffff;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    margin-top: 8px;
    height: 35px;
    padding: 0 12px;
    width: 100%;
  }
  input:focus {
    background: #ffffff;
    border: 1px solid var(--color-info);
  }
  .BusinessRequisites__left {
    margin-right: 44px;
    flex-basis: calc(100% / 2);
  }
  .BusinessRequisites__right {
    flex-basis: calc(100% / 2);
  }
  .BusinessRequisites__left .BusinessRequisites__input {
    margin-top: 18px;
  }
  .BusinessRequisites__left .BusinessRequisites__input:first-child {
    margin-top: 0;
  }
  .BusinessRequisites__right .BusinessRequisites__input {
    margin-top: 18px;
  }
  .BusinessRequisites__right .BusinessRequisites__input:first-child {
    margin-top: 0;
  }
  @media (max-width: 1300px) {
    .BusinessRequisites {
      padding: 34px 34px 24px 34px;
    }
    .BusinessRequisites__left {
      margin-right: 34px;
      flex-basis: calc(100% / 2);
    }
    .BusinessRequisites__right {
      flex-basis: calc(100% / 2);
    }
  }
  @media (max-width: 1048px) {
    .BusinessRequisites {
      padding: 30px 48x 24px 48px;
    }
    .BusinessRequisites__content {
      display: block;
    }
    .BusinessRequisites__left {
      margin-right: 0;
      flex-basis: 100%;
    }
    .BusinessRequisites__right {
      margin-top: 24px;
      flex-basis: 100%;
    }
  }
</style>
