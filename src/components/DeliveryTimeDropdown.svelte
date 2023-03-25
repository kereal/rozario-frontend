<script>
    let visible = false
    const times = [
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
    ]
</script>
<style>
    .dropdown {
       height: 19rem;
       bottom: 2rem; 
       transform: translateX(-50%);
       left: 50%;
       box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
       display: none;
    }
    .dropdown-arrow {
        display:none;
        z-index: 1;
      width: 1rem;
      height: 1rem;
      position: absolute;
      bottom: 1.1rem;
      left: 50%;
      transform: rotate(45deg) translateX(-50%);
      background-color: white;
    }
    .visible {
        display: flex;
        flex-flow: column;
    }
</style>
<div class="relative">
    <button on:click={() => visible = !visible}>
      <svg
        class="fill-current text-main w-12 h-12 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path
          d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
      </svg>
    </button>
    <div class:visible class="dropdown-arrow shadow"></div>
    <div class:visible class="z-10 w-64 px-24 bg-white rounded dropdown overflow-y-auto absolute">
        {#each times as time}
            <button class="hover:text-gray-400">{time}</button> 
        {/each}
    </div>
</div>
