<script>
  import { createEventDispatcher } from "svelte"
  import ModalSurface from "./ModalSurface.svelte"
  import Button from "./Button.svelte"

  let compliment = ""

  const dispatch = createEventDispatcher()

  function sendCompliment() {
    dispatch("add")
  }
  function cancel() {
    dispatch("cancel")
  }
</script>

<ModalSurface css="width:265px; height: 223px;" on:close={cancel}>
  <h1 class="text-main leading-mid font-semibold mb-16">Добавить комплимент</h1>
  <div class="text-xs leading-tight text-gray-600 mb-8">Введите ваш комплимент</div>
  <textarea bind:value={compliment} />
  <Button on:click={sendCompliment} size="lg" status="active-main">Отправить</Button>
</ModalSurface>

<style lang="postcss">
  textarea {
    resize: none;
    height: 56px;
    @apply w-full rounded border border-gray-300 p-4 mb-14;
  }
</style>
