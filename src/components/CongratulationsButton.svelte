<script>
  import CustomRadioButton from "./CustomRadioButton.svelte";
  let visible = false;
  const congratulations = [
    "1-е сентября",
    "14 февраля",
    "23 февраля",
    "8 марта",
    "9 мая",
    "Выпускной",
    "Новый год",
    "День учителя",
    "День рождения",
    "Рождения ребенка",
    "Свадьба",
    "Юбилей",
    "Праздник",
    "Люблю",
    "Прости",
    "Выздоравливай",
  ];
  function setVisible(e) {
    e.preventDefault();
    visible = !visible;
  }
</script>

<style>
  .modal {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.6rem;
    display: flex;
    flex-flow: column nowrap;
    z-index: 20;
    padding: 1rem 1.5rem;
    width: 50%;
  }
  .modal-wrapper {
    background-color: rgba(0, 0, 0, 0.25);
  }
  .visible {
    display: block;
  }
</style>

<div>
  <button
    class="bg-white text-main shadow border border-gray-400 py-4 px-8 text-sm"
    on:click={setVisible}>
    Выбрать поздравления
  </button>
  <div
    class:visible
    class="z-10 hidden top-0 left-0 modal-wrapper absolute w-screen h-screen">
    <div class="modal shadow">
      <div class="flex justify-between items-center my-16">
        <h4 class="text-gray-700 text-sm">
          Выбирайте готовые поздравления и меняйте их, как захотите
        </h4>
        <button on:click={setVisible}>
          <svg
            class="fill-current w-4 h-4 text-secondary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414
              1.414L10 11.414l7.071 7.071 1.414-1.414L11.414
              10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <form class="h-48 flex flex-col flex-wrap mb-8">
        {#each congratulations as congratulation}
          <CustomRadioButton
            modal
            className="m-8"
            label={congratulation}
            name="radio-modal-group"
            value={congratulation} />
        {/each}
      </form>
      <p class="text-gray-700 mb-4">Введите текст для открытки</p>
      <textarea class="border border-gray-500 rounded text-main p-8 mb-8" />
      <button
        class="text-semibold rounded inline-block self-end w-2/5 px-24 py-4
        bg-accent text-main">
        Написать на открытке
      </button>
    </div>
  </div>
</div>
