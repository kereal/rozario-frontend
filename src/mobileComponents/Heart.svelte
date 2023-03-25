<script>
    export let active = false;

    let dealElement;
    function addToFavorite() {
        active = !active
        console.log('just like')
    }

</script>

<style>
.button {
    min-width: 50px;
    min-height: 50px;
    border: 1px solid var(--gray-1100);
    box-sizing: border-box;
    border-radius: 16px;
}
    .unlike {
        fill: var(--gray-200);
    }
    .button .like {
        fill: var(--color-info);
        @apply text-info;
     }
    .heart {
        width: 25px;
        height: auto;

    }
</style>

<button class="flex items-center button justify-center"
        aria-label="heart"
        on:click={addToFavorite}
        bind:this={dealElement}>
    <svg
            class="fill-current  heart {active ? 'text-info' : 'unlike'} w-full h-full"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            xmlns="http://www.w3.org/2000/svg">
        <path
                d="M8.12834 2.18487C8.22318 2.2855 8.35546 2.34236 8.49373 2.34194C8.63201
      2.34151 8.76394 2.28384 8.85816 2.18264C10.0163 0.938634 11.9356 0.504295
      13.5669 1.03635C15.1537 1.55389 16.5002 3.00172 16.5002 5.63337C16.5002
      6.74727 16.0311 7.8147 15.2761 8.81049C14.5211 9.8063 13.5023 10.7001
      12.4632 11.4539C10.7689 12.6828 9.06993 13.5041 8.50189 13.7648C8.45802
      13.7443 8.4074 13.7205 8.35054 13.6933C8.12387 13.5849 7.79849 13.424
      7.40738 13.2153C6.62398 12.7972 5.58268 12.1906 4.54439 11.4346C3.50354
      10.6767 2.48258 9.78063 1.72578 8.78787C0.968569 7.79454 0.5 6.73696 0.5
      5.64339C0.5 3.02258 1.84071 1.57816 3.4233 1.05878C5.05022 0.524862
      6.96642 0.952026 8.12834 2.18487Z"
                stroke="#E71F75"
                stroke-linejoin="round" />
    </svg>

</button>