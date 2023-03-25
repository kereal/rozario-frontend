<script>
  export let pathlist;
</script>

<style>
  li + li:before {
    content: "\02022";
    padding: 8px;
    color: var(--gray-700);
  }
</style>

<ul>
  {#each pathlist as path, i}
    <li class="inline">
      <a class="{pathlist.length - 1 === i ? 'text-main' : 'text-gray-700'} leading-snug" href={path.href}>{path.name}</a>
    </li>
  {/each}
</ul>
