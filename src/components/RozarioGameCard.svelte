<script>
  import TelInput from "./TelInput.svelte";
</script>

<style>
  .meta {
    width: 45%;
    padding-top: 3.625rem;
    padding-bottom: 5.375rem;
  }
</style>

<div class="flex justify-between">
  <div class="meta">
    <div class="flex flex-col">
      <div style="margin-bottom: 4.625rem">
        <h2 class="font-bold text-3xl text-main mb-16">Розарио.Игра</h2>
        <p class="text-secondary text">
          Испытай удачу, выиграй букет и другие призы!
        </p>
      </div>
      <div>
        <TelInput game={true} />
      </div>
    </div>
  </div>
  <div class="w-1/2">
    <img
      class="w-100 object-fill"
      src="flowers-and-coins.png"
      alt="flowers-and-coins" />
  </div>
</div>
