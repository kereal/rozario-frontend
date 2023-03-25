<script>
  export let icon;

  let iconName;
  let link;
  let width;
  let height;
  let style;
  switch (icon) {
    case "Facebook":
      iconName = 'facebook';
      link = "https://www.facebook.com/pg/cveti.rozario";
      width="10"
      height="21"
      style="width:65%;height:auto;"
      break;
    case "Vk":
      iconName = 'vk';
      link = "https://vk.com/cveti.rozario";
      width="24"
      height="12"
      style="width:65%;height:auto;"
      break;
    case "Ok":
      iconName = 'ok'
      link = "https://twitter.com/florozario";
      width="12"
      height="21"
      style="width:65%;height:auto;"
      break;
    case "Google":
      iconName = 'google';
      link = "https://instagram.com";
      width="19"
      height="20"
      style="width:65%;height:auto;"
      break;
    default:
      throw new Error("no such icon");
  }
</script>

<style>
  a {
    width: 36px;
    height: 36px;
  }
</style>

<a
  aria-label={icon}
  href={link}
  class="hover:border-info rounded flex items-center justify-center border
  border-gray-1100">
  <img {style} {width} {height} src={`${iconName}-icon.svg`} alt={iconName} />
</a>
