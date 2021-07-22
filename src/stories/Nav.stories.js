import "./utils.css";
import Nav from "../components/Nav.svelte";
import { mainStore, orderStore } from "../stores/test.js";

export default {
  title: "Nav",
  excludeStories: /.*Data$/,
};

let countries = [
  { name: "Английский", flag: "united-states-of-america", currency: "$" },
  { name: "Русский", flag: "russia", currency: "₽" },
];

let cityList = ["Москва", "Санкт-Петербург", "Мурманск", "Воронеж", "Казань"];

export const Default = () => ({
  Component: Nav,
  props: {
    countries,
    cityList,
    mainStore,
    orderStore,
  },
});
