import { writable } from "svelte/store";

function createMainStore() {
  const { subscribe, set, update } = writable({
    user: {
      auth: false,
      name: "",
    },
    currentCountry: { name: "россия", flag: "russia", currency: "₽" },
    currentCurrency: { currency: "₽", name: "rouble" },
    favorites: [],
    address: {
      city: {
        name: "Мурманск",
        subdomain: "murmansk",
        locativus: "в Мурманске",
        shop: {
          seotype: "Florist",
          name: "Розарио.Цветы",
          address: {
            street: "ул. Ростинская, д. 9А",
            openingHours: { days: "ПН-ВС", hours: "09:00 до 21:00", seo: "" },
          },
          phone: "8 800 250-64-70",
          owner: "Блинова Светлана Анатольевна",
        },
      },
      street: "",
      unknown: "",
    },
    time: "",
  });

  return {
    subscribe,
    set,
    update,
    setAddressByName: (cityName) =>
      update((data) => {
        data.address.city.name = cityName;
        return data;
      }),
    setAddress: (city) =>
      update((data) => {
        data.address.city = city;
        return data;
      }),
    removeAddress: (city) =>
      update((data) => {
        data.address = {
          city: "Мурманск",
          street: "",
          unknown: "",
        };
        return data;
      }),
    setUser: (user) =>
      update((data) => {
        data.user = user;
        return data;
      }),
    removeUser: () =>
      update((data) => {
        data.user = { auth: false, name: "" };
        return data;
      }),
    setCurrentCountry: (country) =>
      update((data) => {
        data.currentCountry = country;
        return data;
      }),
    removeCurrentCountry: () =>
      updata((data) => {
        data.currentCountry = { name: "", flag: "", currency: "" };
        return data;
      }),
    setCurrentCurrency: (currency) =>
      update((data) => {
        data.currentCurrency = currency;
        return data;
      }),
    removeCurrentCurrency: () =>
      update((data) => {
        data.currentCurrency = { name: "", flag: "", currency: "" };
        return data;
      }),
    addToFavorites: (favorite) =>
      update((data) => {
        data.favorites = [...data.favorites, favorite];
        return data;
      }),
    removeFromFavorites: (favorite) =>
      update((data) => {
        data.favorites = data.favorites.filter(
          (item) => item.id !== favorite.id
        );
        return data;
      }),
  };
}

export const mainStore = createMainStore();

function createOrderStore() {
  const { subscribe, set, update } = writable({
    orderList: [],
    totalPrice: 0,
  });
  return {
    subscribe,
    set,
    addToOrderList: (order) =>
      update((data) => {
        data.orderList = [...data.orderList, { flower: order, count: 1 }];
        return data;
      }),
    removeFromOrderList: (order) =>
      update((data) => {
        data.orderList = data.orderList.filter(
          (item) => item.flower.id !== order.id
        );
        return data;
      }),
    incrementOrderList: (index) =>
      update((data) => {
        data.orderList[index].count = data.orderList[index].count + 1;
        return data;
      }),
    decrementOrderList: (index) =>
      update((data) => {
        data.orderList[index].count = data.orderList[index].count - 1;
        return data;
      }),
    clearOrderList: () => set([]),
  };
}
export const orderStore = createOrderStore();
