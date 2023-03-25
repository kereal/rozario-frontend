<script>
  import InfoButton from "../components/InfoButton";

  export let text = [];
  export let icon;
  export let css = "width: 320px; max-height: 330px;";
  export let iconPos = "left";
  export let position = "LEFT";
</script>

<style>
  .wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2rem;
  }
</style>

<div class="wrapper">
  <InfoButton on:click {css} {position} {iconPos} {icon} {text}>
    <section class="leading-tight rounded bg-white px-8 py-6">
      <h3 class="text-main text-lg font-bold mb-2">Доставка Розарио.Цветы</h3>
      <p class="text-sm text-gray-700 mb-4">
        Доставку выполняют курьеры Розарио.Цветы
      </p>
      <ul>
        <li>Some text</li>
        <li>Some text</li>
      </ul>
    </section>
  </InfoButton>
</div>
