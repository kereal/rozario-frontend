<script>
  import { getStores } from "$app/stores"
  import { orderStore } from "@/stores/order.js"
  import Nav from "@/components/Nav.svelte"
  import cities from "@/data/russian-cities.json"

  const { session } = getStores()

  let countries = [
    { name: "Английский", flag: "united-states-of-america", currency: "$" },
    { name: "Русский", flag: "russia", currency: "₽" }
  ]

  const cityList = [...new Set(cities.map((record) => record.name))]
</script>

<Nav {session} {orderStore} {countries} {cityList} />
