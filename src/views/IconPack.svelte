<script>
  import Icon from '../components/Icon.svelte'

  import PlusFat from '../components/icons/PlusFat.svelte';
import Add from '../components/icons/Add.svelte';
import Arrow from '../components/icons/Arrow.svelte';
import ArrowLeft from '../components/icons/ArrowLeft.svelte';
import ArrowRight from '../components/icons/ArrowRight.svelte';
import ArrowLeftBig from '../components/icons/ArrowLeftBig.svelte';
import ArrowLeftSmall from '../components/icons/ArrowLeftSmall.svelte';
import ArrowRightBig from '../components/icons/ArrowRightBig.svelte';
import ArrowRightSmall from '../components/icons/ArrowRightSmall.svelte';
import ArrowUp from '../components/icons/ArrowUp.svelte';
import Avatar from '../components/icons/Avatar.svelte';
import CalendarSimple from '../components/icons/CalendarSimple.svelte';
import Calendar from '../components/icons/Calendar.svelte';
import Cap from '../components/icons/Cap.svelte';
import ChatStripes from '../components/icons/ChatStripes.svelte';
import Chat from '../components/icons/Chat.svelte';
import Claps from '../components/icons/Claps.svelte';
import Clock from '../components/icons/Clock.svelte';
import Close from '../components/icons/Close.svelte';
import DeliveryFast from '../components/icons/DeliveryFast.svelte';
import DeliveryOk from '../components/icons/DeliveryOk.svelte';
import Delivery from '../components/icons/Delivery.svelte';
import Diamond from '../components/icons/Diamond.svelte';
import Dislike from '../components/icons/Dislike.svelte';
import Done from '../components/icons/Done.svelte';
import Edit from '../components/icons/Edit.svelte';
import EditOrder from '../components/icons/EditOrder.svelte';
import Email from '../components/icons/Email.svelte';
import Facebook from '../components/icons/Facebook.svelte';
import Florist from '../components/icons/Florist.svelte';
import House from '../components/icons/House.svelte';
import InTheShop from '../components/icons/InTheShop.svelte';
import Info from '../components/icons/Info.svelte';
import Instagram from '../components/icons/Instagram.svelte';
import LetterI from '../components/icons/LetterI.svelte';
import Like from '../components/icons/Like.svelte';
import Loader from '../components/icons/Loader.svelte';
import Location from '../components/icons/Location.svelte';
import MagnifyingGlass from '../components/icons/MagnifyingGlass.svelte';
import MenuInfo from '../components/icons/MenuInfo.svelte';
import Minus from '../components/icons/Minus.svelte';
import Ok from '../components/icons/Ok.svelte';
import Percent from '../components/icons/Percent.svelte';
import Person from '../components/icons/Person.svelte';
import PhoneCall from '../components/icons/PhoneCall.svelte';
import Phone from '../components/icons/Phone.svelte';
import Photo from '../components/icons/Photo.svelte';
import Placeholder from '../components/icons/Placeholder.svelte';
import Plus from '../components/icons/Plus.svelte';
import Postcard from '../components/icons/Postcard.svelte';
import Price from '../components/icons/Price.svelte';
import ShoppingCart from '../components/icons/ShoppingCart.svelte';
import Tablet from '../components/icons/Tablet.svelte';
import Time from '../components/icons/Time.svelte';
import TrashBin from '../components/icons/TrashBin.svelte';
import Twitter from '../components/icons/Twitter.svelte';
import Vk from '../components/icons/Vk.svelte';
import Warranty from '../components/icons/Warranty.svelte';
import Whatsapp from '../components/icons/Whatsapp.svelte';

  let iconlist = [
    {icon: PlusFat, title: "PlusFat"},
{icon: Add, title: "Add"},
{icon: Arrow, title: "Arrow"},
{icon: ArrowLeft, title: "ArrowLeft"},
{icon: ArrowRight, title: "ArrowRight"},
{icon: ArrowLeftBig, title: "ArrowLeftBig"},
{icon: ArrowLeftSmall, title: "ArrowLeftSmall"},
{icon: ArrowRightBig, title: "ArrowRightBig"},
{icon: ArrowRightSmall, title: "ArrowRightSmall"},
{icon: ArrowUp, title: "ArrowUp"},
{icon: Avatar, title: "Avatar"},
{icon: CalendarSimple, title: "CalendarSimple"},
{icon: Calendar, title: "Calendar"},
{icon: Cap, title: "Cap"},
{icon: ChatStripes, title: "ChatStripes"},
{icon: Chat, title: "Chat"},
{icon: Claps, title: "Claps"},
{icon: Clock, title: "Clock"},
{icon: Close, title: "Close"},
{icon: DeliveryFast, title: "DeliveryFast"},
{icon: DeliveryOk, title: "DeliveryOk"},
{icon: Delivery, title: "Delivery"},
{icon: Diamond, title: "Diamond"},
{icon: Dislike, title: "Dislike"},
{icon: Done, title: "Done"},
{icon: Edit, title: "Edit"},
{icon: EditOrder, title: "EditOrder"},
{icon: Email, title: "Email"},
{icon: Facebook, title: "Facebook"},
{icon: Florist, title: "Florist"},
{icon: House, title: "House"},
{icon: InTheShop, title: "InTheShop"},
{icon: Info, title: "Info"},
{icon: Instagram, title: "Instagram"},
{icon: LetterI, title: "LetterI"},
{icon: Like, title: "Like"},
{icon: Loader, title: "Loader"},
{icon: Location, title: "Location"},
{icon: MagnifyingGlass, title: "MagnifyingGlass"},
{icon: MenuInfo, title: "MenuInfo"},
{icon: Minus, title: "Minus"},
{icon: Ok, title: "Ok"},
{icon: Percent, title: "Percent"},
{icon: Person, title: "Person"},
{icon: PhoneCall, title: "PhoneCall"},
{icon: Phone, title: "Phone"},
{icon: Photo, title: "Photo"},
{icon: Placeholder, title: "Placeholder"},
{icon: Plus, title: "Plus"},
{icon: Postcard, title: "Postcard"},
{icon: Price, title: "Price"},
{icon: ShoppingCart, title: "ShoppingCart"},
{icon: Tablet, title: "Tablet"},
{icon: Time, title: "Time"},
{icon: TrashBin, title: "TrashBin"},
{icon: Twitter, title: "Twitter"},
{icon: Vk, title: "Vk"},
{icon: Warranty, title: "Warranty"},
{icon: Whatsapp, title: "Whatsapp"}
  ]

</script>

<style>
.wrapper {
  max-width: 1000px;
  margin: 50px auto;

}
.icon-list {
  display: flex;
  flex-flow: row wrap;
}
.item {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block:hover {
  background: rgba(200,200,200,.2);
}
.wrapper :global(.icon) {
  fill: currentColor;
  color: black;
}
.title {
  margin-top: 0.5rem;
  font-weight: 600;
}
.block {
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0.5rem;
}
h1 {
  margin: 20px auto;
  font-weight: 700;
  font-size: 24px;
}
</style>

<div class="wrapper">
  <h1>ICON PACK</h1>
  <div class="icon-list">
    {#each iconlist as icon}
    <div class="block">
      <div class="item">
        <Icon classNames="icon" iconSize="32" name={icon.icon}/>
      </div>
      <div class="title">{icon.title}</div>
    </div>
    {/each}
  </div>
</div>
