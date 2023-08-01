import { writable } from "svelte/store"
import { browser } from "$app/environment"

export const currentUser = writable(
  browser && (localStorage.currentUser ? JSON.parse(localStorage.currentUser) : "")
)
if (browser) {
  currentUser.subscribe((value) => (localStorage.currentUser = JSON.stringify(value)))
}

export const loading = writable(false)

function createMainStore() {
  const { subscribe, set, update } = writable({
    user: {
      auth: false,
      name: ""
    },
    currentCountry: { name: "Россия", flag: "russia", currency: "₽" },
    currentCurrency: { currency: "₽", name: "rouble" },
    favorites: [],
    address: {
      city: { name: "", locativus: "" },
      street: "",
      unknown: ""
    },
    time: ""
  })

  return {
    subscribe,
    set,
    update,
    setAddressByName: (cityName) =>
      update((data) => {
        data.address.city.name = cityName
        return data
      }),
    setAddress: (city) =>
      update((data) => {
        data.address.city = city
        return data
      }),
    removeAddress: () =>
      update((data) => {
        data.address = {
          city: "Мурманск",
          street: "",
          unknown: ""
        }
        return data
      }),
    setUser: (user) =>
      update((data) => {
        data.user = user
        return data
      }),
    removeUser: () =>
      update((data) => {
        data.user = { auth: false, name: "" }
        return data
      }),
    setCurrentCountry: (country) =>
      update((data) => {
        data.currentCountry = country
        return data
      }),
    removeCurrentCountry: () =>
      update((data) => {
        data.currentCountry = { name: "", flag: "", currency: "" }
        return data
      }),
    setCurrentCurrency: (currency) =>
      update((data) => {
        data.currentCurrency = currency
        return data
      }),
    removeCurrentCurrency: () =>
      update((data) => {
        data.currentCurrency = { name: "", flag: "", currency: "" }
        return data
      }),
    addToFavorites: (favorite) =>
      update((data) => {
        data.favorites = [...data.favorites, favorite]
        return data
      }),
    removeFromFavorites: (favorite) =>
      update((data) => {
        data.favorites = data.favorites.filter((item) => item.id !== favorite.id)
        return data
      })
  }
}

export const mainStore = createMainStore()

export const uiStore = writable({
  currentSection: "Букеты",
  heroInput: {
    currentState: "occasion"
  }
})

function createBreadcrumbsStore() {
  const { subscribe, set, update } = writable({
    path: ["/"],
    title: ""
  })

  return {
    subscribe,
    set,
    pushPath: (path) =>
      update((data) => {
        data.path.push(path)
        return data
      }),
    popPath: (_) =>
      update((data) => {
        data.path.pop()
        return data
      }),
    update
  }
}

export const breadcrumbsStore = createBreadcrumbsStore()
