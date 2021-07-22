<script>
  import Nav from "./Nav.svelte";
  import { stores, goto } from "@sapper/app";
  import { mainStore } from "../stores/global.js";
  import { orderStore } from '../stores/order.js';

  const { session } = stores();

  let countries = [
    { name: "Английский", flag: "united-states-of-america", currency: "$" },
    { name: "Русский", flag: "russia", currency: "₽" },
  ];

  let cityList = ["Москва", "Санкт-Петербург", "Мурманск", "Воронеж", "Казань"];
</script>

<Nav {session} {mainStore} {orderStore} {countries} {cityList} />
