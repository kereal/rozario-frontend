import "./utils.css";
import Popup from "../views/Popup.svelte";

export default {
  title: "Popup",
  excludeStories: /.*Data$/,
};

export const Center = () => ({
  Component: Popup,
  props: {
    position: "CENTER",
  },
});
export const Right = () => ({
  Component: Popup,
  props: {
    position: "RIGHT",
  },
});
export const Left = () => ({
  Component: Popup,
  props: {
    position: "LEFT",
  },
});
