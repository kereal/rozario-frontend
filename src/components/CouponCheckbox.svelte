<script>
  import CustomCheckbox from "./CustomCheckbox.svelte";
  import CouponSmall from "./CouponSmall.svelte";
  export let check = false;
  export let type = "";
  export let id = '';

  let color;
  let text;

  let checkbox;

  switch (type) {
    case "newuser":
      color = "text-green";
      text = "Купон нового пользователя";
      break;
    case "firsttime":
      color = "text-orange";
      text = "Купон на первый заказ";
      break;
    case "friend":
      color = "text-blue";
      text = "Купон друга";
      break;
    default:
      throw new Error("no such coupon");
  }
  function handleCheck() {
    checkbox.click()
  }
</script>

<style>
  div:hover :global(.hover + label:before) {
    background: var(--gray-200);
    border: 1px solid var(--gray-700);
  }
  div:hover :global(.hover + label:after) {
    content: "";
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMSAxTDQuODQ2MTUgN0wxIDMuMjUiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
    top: 6px;
    left: 4px;
    width: 12px;
    height: 8px;
    position: absolute;
    display: block;
  }
</style>

<div on:click={handleCheck} data-type={type} class="flex cursor-pointer items-center">
  <CustomCheckbox bind:ref={checkbox} blocked={true} className="pointer-events-none mr-6" {check} {id} />
  <CouponSmall blocked={true} {text} {color} />
</div>
