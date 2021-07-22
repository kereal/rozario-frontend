import "./utils.css";
import Tabbar from "../components/Tabbar.svelte";

export default {
  title: "Tabbar",
  excludeStories: /.*Data$/,
};
let menulist = [
  { name: "Активные заказы" },
  { name: "История заказов" },
  { name: "Адреса доставок" },
];
export const Index = () => ({
  Component: Tabbar,
  props: {
    menulist,
  },
});
