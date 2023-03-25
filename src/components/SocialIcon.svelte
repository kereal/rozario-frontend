<script>
  import Icon from "./Icon.svelte"
  import Facebook from "./icons/Facebook.svelte"
  import Vk from "./icons/Vk.svelte"
  import Twitter from "./icons/Twitter.svelte"
  import Instagram from "./icons/Instagram.svelte"

  import Email from "./icons/Email.svelte"
  import Whatsapp from "./icons/Whatsapp.svelte"
  import Telegram from "./icons/Telegram.svelte"
  import Viber from "./icons/Viber.svelte"

  export let icon

  let iconComponent
  let link
  switch (icon) {
    case "Facebook":
      iconComponent = Facebook
      link = "https://www.facebook.com/pg/cveti.rozario"
      break
    case "Vk":
      iconComponent = Vk
      link = "https://vk.com/cveti.rozario"
      break
    case "Twitter":
      iconComponent = Twitter
      link = "https://twitter.com/florozario"
      break
    case "Instagram":
      iconComponent = Instagram
      link = "https://instagram.com"
      break

    case "WhatsApp":
      iconComponent = Whatsapp
      link = ""
      break
    case "Telegram":
      iconComponent = Telegram
      link = ""
      break
    case "Viber":
      iconComponent = Viber
      link = ""
      break
    case "Email":
      iconComponent = Email
      link = "mailto:info@rozariofl.ru"
      break
    default:
      throw new Error("no such icon")
  }
</script>

<a
  target="_blank"
  aria-label={icon}
  href={link}
  class="hover:border-info rounded flex items-center justify-center border
  border-infolight"
>
  <Icon classNames="fill-current text-infolight" name={iconComponent} iconSize="18" />
</a>

<style lang="postcss">
  a {
    width: 35px;
    height: 35px;
  }
  a:hover :global(svg) {
    @apply text-info;
  }
</style>
