<script>
  import Postcard from "./icons/Postcard.svelte";
  import Percent from "./icons/Percent.svelte";
  import Icon from './Icon.svelte'
  export let type;

  let title;
  let text;
  let icon;
  let width;
  let height;

  switch (type) {
    case "present":
      title = "Открытка в подарок";
      text = "При заказе букета открытка в подарок";
      icon = Percent;
      width = '23'
      height = '26'
      break;
    case "deal":
      title = "Открытка в подарок";
      text = "При заказе букета открытка в подарок";
      icon = Postcard;
      width = '26'
      height = '32'
      break;
  }
</script>

<style>
  .rect-size {
    width: 70px;
    height: 60px;
  }
</style>

<div class="flex items-center border border-gray-1000 rounded py-10 px-12">
  <div class="bg-deal flex items-center justify-center rounded rect-size">
    <Icon name={icon} {width} {height} />
  </div>
  <div class="ml-12">
    <div class="leading-snug text-main mb-2">{title}</div>
    <div class="text-gray-700 text-ssm leading-tight">{text}</div>
  </div>
</div>
