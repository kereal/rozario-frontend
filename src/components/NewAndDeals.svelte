<script>
  let categories = [
    { name: "Лето" },
    { name: "Букеты" },
    { name: "Розы" },
    { name: "Цветы" },
    { name: "Композиции из цветов" },
    { name: "Корзины с цветами" },
  ];
</script>

<div>
  <nav>
    <ul class="flex">
      {#each categories as category}
        <li>
          <button class="bg-accent text-main rounded-full px-8 py-4 mr-8">
            {category}
          </button>
        </li>
      {/each}
    </ul>
  </nav>
  <h2 class="text-main font-bold text-lg">Акции и новинки</h2>
  <div />
</div>
