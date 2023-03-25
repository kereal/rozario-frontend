<script>
  import Button from "./Button.svelte"
  import cloneDeep from "lodash/cloneDeep"

  export let requisites = {
    name: "",
    INN: "",
    KPP: "",
    legaladdress: "",
    bankName: "",
    email: ""
  }

  let values = cloneDeep(requisites)
  let changed = false
  let filled = false

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

  $: if (requisites) {
    if (
      values.name != "" &&
      values.INN != "" &&
      values.KPP != "" &&
      values.legaladdress != "" &&
      values.bankName != "" &&
      values.email != ""
    ) {
      filled = true
    }
  }

  export let businessUser = false
</script>

<div class="BusinessRequisites">
  <div class="BusinessRequisites__content">
    <div class="BusinessRequisites__left">
      <div class="BusinessRequisites__input">
        <h3>Название юр. лица</h3>
        <input type="text" bind:value={values.name} />
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
        <h3>КПП</h3>
        <input
          type="text"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={values.KPP}
        />
      </div>
    </div>
    <div class="BusinessRequisites__right">
      <div class="BusinessRequisites__input">
        <h3>Юридический адрес</h3>
        <input type="text" bind:value={values.legaladdress} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>Название банка</h3>
        <input type="text" bind:value={values.bankName} />
      </div>
      <div class="BusinessRequisites__input">
        <h3>E-mail для отправки счёта</h3>
        <input type="text" bind:value={values.email} />
      </div>
    </div>
  </div>
  {#if !businessUser}
    <div class="flex">
      <Button
        size="lg"
        className="mt-30"
        status={filled == false ? "disabled-main" : "active-main"}
        on:click={() => {
          businessUser = true
          requisites = values
          values = cloneDeep(requisites)
        }}><span class="whitespace-nowrap">Стать корпоративным клиентом</span></Button
      >
      <a href="/business">
        <Button size="lg" className="ml-24 mt-30">Отменить</Button>
      </a>
    </div>
  {:else}
    <Button
      size="lg"
      className="mt-30"
      status={changed == false ? "disabled-main" : "active-main"}
      on:click={() => {
        requisites = values
      }}>Сохранить</Button
    >
  {/if}
</div>

<style>
  .BusinessRequisites {
    background-color: #fff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    border-radius: 4px;
    padding: 34px 48px 24px 48px;
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
