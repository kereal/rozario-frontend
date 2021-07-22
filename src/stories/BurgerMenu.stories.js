import "./utils.css";
import BurgerMenu from "../views/BurgerMenu.svelte";

export default {
  title: "BurgerMenu",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: BurgerMenu,
  props: {},
});
