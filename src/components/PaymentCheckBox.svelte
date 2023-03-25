<script>
  import CustomCheckbox from "./CustomCheckbox.svelte";

  export let text = "";
  export let src = "";
  export let className = "";
  export let id = "";
  export let check = false;
  export let kind = "";
  export let iconWidth = "";
  export let iconHeight = "";
  export let opacity = "";
  console.log("check", check, "kind", kind);

  function checkIfPaymentService() {
    if (kind !== "Cash" && kind !== "BankCard" && kind !== "CashLegal") {
      return true;
    }
    return false;
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
  .opacity-60 {
    opacity: 60%;
  }
  .opacity-70 {
    opacity: 70%;
  }
  .opacity-75 {
    opacity: 75%;
  }
  .opacity-80 {
    opacity: 80%;
  }
  .opacity-85 {
    opacity: 85%;
  }
  div:hover .opacity-60,
  div:hover .opacity-70,
  div:hover .opacity-75,
  div:hover .opacity-80,
  div:hover .opacity-85 {
    opacity: 100%;
  }
  svg {
    min-width: 40px;
  }
  svg .unchecked {
    fill: var(--gray-600);
  }
  svg .checked {
    fill: var(--color-main);
  }
  div:hover svg .unchecked {
    fill: var(--color-main);
  }
</style>

<div
  data-kind={kind}
  on:click
  class="hover:border-info cursor-pointer flex items-center {checkIfPaymentService() ? 'justify-center' : 'justify-between'}
  px-12 rounded border border-gray-700 {check ? 'bg-white border-info' : 'hover:bg-white'}
  {className}">
  <CustomCheckbox
    blocked={true}
    className="pointer-events-none mr-14"
    {check}
    {id} />
  <label
    for={id}
    class="{text ? '' : 'visuallyhidden'} pointer-events-none text-one-five
    leading-mid text-main {text ? 'mr-14' : ''}">
    {text}
  </label>
  {#if kind === 'Cash'}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width="41"
      height="32"
      viewBox="0 0 43 34"
      xml:space="preserve">
      <style>
        .st0 {
          fill: #ffdc00;
        }
        .st2 {
          fill: #fff;
        }
      </style>
      <path
        class="st0"
        d="M1.8 18.9c-.8-.6-1.1-1.8-.4-2.7l3.3-4.3s-.2 0 .7.6l16.1 16 7.3-7c.8.6
        1.1 1.8.4 2.7l-5.6 7.9c-.6.8-1.7 1.1-2.7.4L1.8 18.9z" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M22 33.8c-.6
        0-1.1-.2-1.6-.5l-19-13.8c-.6-.4-1-1-1.1-1.7-.1-.7.1-1.4.5-2L4
        11.6c.1-.3.5-.5.8-.4.2 0 .4.2.6.4.1.1.2.2.5.4 0 0 .1 0 .1.1l15.5 15.5
        6.8-6.5c.3-.3.7-.3 1-.1.6.4 1 1 1.1 1.7.1.7-.1 1.4-.5 2l-5.6 7.9c-.4.6-1
        1-1.7 1.1-.3 0-.5.1-.6.1zM4.8 13L2 16.7c-.2.3-.3.6-.2.9.1.3.2.6.5.7l19
        13.7c.3.3.7.3.9.2.3 0 .6-.2.7-.5l5.6-7.9c.2-.3.3-.6.2-.9 0-.1
        0-.2-.1-.3L21.9 29c-.3.3-.8.3-1 0l-16-16c-.1.1-.1.1-.1 0z" />
      <path
        class="st2"
        d="M3.5 11.2c-.7-.8-.7-1.9 0-2.7l6.8-6.9c.7-.8 1.9-.8 2.7 0l16.6
        16.8c.7.8.7 1.9 0 2.7L22.7 28c-.7.8-1.9.8-2.7 0L3.5 11.2z" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M21.4 29.3c-.7 0-1.4-.3-1.9-.8L2.9 11.7c-1-1-1-2.7 0-3.7l6.8-7c1-1
        2.7-1 3.7 0L30 17.9c1 1 1 2.7 0 3.7l-6.8 6.9c-.5.5-1.1.8-1.8.8zM4
        10.6l16.6 16.8c.4.4 1.1.4 1.6 0l6.8-6.9c.5-.5.5-1.2 0-1.6L12.4
        2.1c-.4-.4-1.1-.4-1.6 0L4 9c-.5.5-.5 1.2 0 1.6z" />
      <path
        class="st0"
        d="M19.8 14.9c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c2 0
        3.5 1.5 3.5 3.5z" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M16.3 19.1c-2.3 0-4.2-1.9-4.2-4.3s1.9-4.3 4.2-4.3c2.4.1 4.2 1.9 4.2
        4.3s-1.9 4.3-4.2 4.3zm0-7c-1.4 0-2.7 1.3-2.7 2.8s1.3 2.8 2.7 2.8c1.5 0
        2.7-1.3 2.7-2.8 0-1.6-1.2-2.8-2.7-2.8z" />
      <g>
        <path
          class="st2"
          d="M33.6 16.9c-.8.3-2.3-.6-3.2-1.6-.8-.9-3.6-3.7-3.6-3.7s-1.7.7-2.8
          1.4c-1.1.8-2.4.7-2.9 0s-.9-2.2.5-2.9c1.4-.7 6.1-2.9 6.1-2.9s1.4-.7
          3.1.9c1.7 1.6 5.1 5 5.1 5s1 .8 3 .8h3.2v12.7h-9.4s-2.1.1-3.2-1" />
      </g>
      <g>
        <path
          class={!check ? 'unchecked' : 'checked'}
          d="M32.6 27.6c-.4 0-2.4-.1-3.7-1.2-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0c.8.7
          2.2.9 2.7.8h8.6V14.9h-2.4c-2.2 0-3.3-.9-3.5-1 0 0-3.5-3.5-5.2-5.1C29
          7.6 28 8 28 8s-4.6 2.2-6 2.9c-.4.2-.5.4-.5.6-.1.4.1.9.3 1.2.2.3 1.1.4
          1.9-.2 1.1-.7 2.9-1.5 3-1.5.3-.1.6-.1.8.2l3.7 3.7c.8.9 2 1.5 2.4
          1.4.4-.1.8.1.9.5.1.4-.1.8-.5.9-1.2.4-3-.7-3.9-1.8-.6-.7-2.4-2.5-3.2-3.3-.6.3-1.6.7-2.3
          1.2-1.3.9-3.1.9-3.9-.2-.6-.7-1-1.6-.7-2.6.1-.5.4-1.1 1.3-1.5 1.4-.7
          6.1-2.9 6.1-2.9.1 0 1.9-.9 3.9 1.1 1.7 1.6 5.1 5.1 5.1 5.1s.8.6
          2.5.6H42c.4 0 .8.3.8.8v12.7c0 .4-.3.8-.8.8l-9.4-.1z" />
      </g>
    </svg>
  {:else if kind === 'BankCard'}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width="40"
      height="32"
      viewBox="0 0 42 34"
      xml:space="preserve">
      <path
        d="M10.6 30c-1.1.6-2.4.1-3-1L1.2 16.7c-.6-1-.1-2.4 1-3L26.9 1.2c1.1-.6
        2.4-.1 3 1l6.4 12.4c.6 1 .1 2.4-1 3L10.6 30z"
        fill="#ffdc00" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M9.7 31c-1.1 0-2.1-.6-2.6-1.6L.6 17c-.3-.6-.4-1.4-.2-2.1.2-.8.8-1.4
        1.5-1.8L26.5.6c1.4-.8 3.2-.2 4 1.3l6.4 12.4c.3.6.4 1.4.2 2.1-.2.8-.8
        1.4-1.5 1.8L11 30.7c-.4.2-.9.3-1.3.3zM27.8 1.7c-.2 0-.4 0-.6.2L2.5
        14.4c-.3.2-.6.5-.7.9-.1.3-.1.7.1 1l6.4 12.4c.4.7 1.3 1 2 .6L35
        16.9c.3-.2.6-.5.7-.9.1-.3.1-.7-.1-1L29.2 2.5c-.3-.5-.8-.8-1.4-.8z" />
      <path
        d="M11.2 33C9.9 33 9 32 9 30.8V16.9c0-1.2 1-2.2 2.2-2.2h27.6c1.2 0 2.2 1
        2.2 2.2v13.9c0 1.2-1 2.2-2.2 2.2H11.2z"
        fill="#fff" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M35.5 28.2h-3.7c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3.7c.4 0
        .8.3.8.8s-.4.8-.8.8z" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M38.8 13.9H11.2c-1.7 0-3 1.3-3 2.9v13.9c0 1.7 1.3 2.9 3 2.9h27.6c1.7
        0 3-1.3 3-2.9V16.9c0-1.7-1.3-3-3-3zm-27.6 1.5h27.6c.8 0 1.5.6 1.5
        1.4v.2H9.7v-.1c0-.8.6-1.5 1.5-1.5zm27.6 16.9H11.2c-.8
        0-1.5-.6-1.5-1.4v-8.6h30.5v8.6c.1.7-.6 1.4-1.4 1.4z" />
    </svg>
  {:else if kind === 'CashLegal'}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width="41"
      height="32"
      viewBox="0 0 41 32"
      xml:space="preserve">
      <path d="M.8 31.2V.7h10.6v30.5H.8z" fill="#ffdc00" />
      <path d="M11.3 31.2V.7h28.9v30.5H11.3z" fill="#fff" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M40.2 0H.8C.3 0 0 .3 0 .8v30.5c0 .4.3.7.8.7h39.5c.4 0
        .8-.3.8-.8V.8c-.1-.5-.4-.8-.9-.8zM1.5 1.5h9.1v29H1.5v-29zm38
        29H12.1v-29h27.4v29z" />
      <path
        class={!check ? 'unchecked' : 'checked'}
        d="M7.9 26.1H4c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h4c.4 0
        .8.3.8.8s-.5.8-.9.8zM17.2 9.1c-.4 0-.7-.3-.8-.7 0-.4.3-.8.7-.8l18-.1c.4
        0 .8.3.8.7.1.4-.3.8-.7.8l-18 .1zM17.2 15.3c-.4 0-.7-.3-.8-.7
        0-.4.3-.8.7-.8l18-.1c.4 0 .8.3.8.7 0 .4-.3.8-.7.8l-18 .1zM17.2 21.6c-.4
        0-.7-.3-.8-.7 0-.4.3-.8.7-.8l9.4-.1c.4 0 .7.3.8.7 0 .4-.3.8-.7.8l-9.4.1z" />
    </svg>
  {:else}
    <img
      width={iconWidth}
      height={iconHeight}
      class="h-32 {check ? '' : `opacity-${opacity}`} pointer-events-none"
      {src}
      alt="платежная система {kind}" />
  {/if}
</div>
