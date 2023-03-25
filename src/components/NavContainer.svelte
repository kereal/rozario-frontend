<script>
  import Nav from "./Nav.svelte"
  import { orderStore } from "../stores/order.js"
  import { getStores } from "$app/stores"

  const { session } = getStores()

  let countries = [
    { name: "Английский", flag: "united-states-of-america", currency: "$" },
    { name: "Русский", flag: "russia", currency: "₽" }
  ]

  let cityList = ["Москва", "Санкт-Петербург", "Мурманск", "Воронеж", "Казань"]
</script>

<Nav {session} {orderStore} {countries} {cityList} />
