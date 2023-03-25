<script>
  export let group = "";
  export let value = "";
  export let label;
  export let name;
  export let labelClass = "weight";
  export let modal = false;
  export let className = "";
  export let weight = 'weight'
  let input;

</script>

<style>
  .text-custom {
    font-size: 15px;
  }
  .custom-radio {
    --color-outer: #ffdc00;
    --color-inner: black;
    --color-main: #330033;
    --circle-size: 20px;
    --inner-dot-size: 6px;
    --label-pad: 8px;
  }
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: calc(var(--circle-size) + var(--label-pad));
    cursor: pointer;
    line-height: var(--circle-size);
    display: inline-block;
    color: var(--color-main);
  }
  [type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 100%;
    background: var(--color-light);
    border: 1px solid var(--gray-500);
  }
  [type="radio"]:not(:checked):hover + label:before {
    background: var(--gray-300);
    border: 1px solid var(--gray-500);
  }

  [type="radio"]:not(:checked):hover + label:after {
    background: var(--gray-700);
    opacity: 1;
    transform: scale(1);
  }

  [type="radio"]:checked + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 100%;
    background: var(--color-outer);
    border: 1px solid var(--color-accent);
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: "";
    width: var(--inner-dot-size);
    height: var(--inner-dot-size);
    background: var(--color-inner);
    position: absolute;
    top: 7px;
    left: 7px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type="radio"]:checked + .weight {
    font-weight: 600;
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
</style>

<div class="custom-radio {className}">
  <input
    bind:this={input}
    bind:group
    type="radio"
    {value}
    id={label}
    {name} />
  <label
    on:click
    class='{labelClass} {weight}'
    style={modal ? 'color: var(--gray-700);' : ''}
    for={label}>
    {label}
  </label>
</div>
