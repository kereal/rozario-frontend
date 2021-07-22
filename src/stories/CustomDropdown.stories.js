import "./utils.css";
import CustomDropdown from "../views/CustomDropdown.svelte";

export default {
  title: "CustomDropdown",
  excludeStories: /.*Data$/,
};

export const center = () => ({
  Component: CustomDropdown,
  props: {
    position: "CENTER",
  },
});
export const left = () => ({
  Component: CustomDropdown,
  props: {
    position: "LEFT",
  },
});
export const right = () => ({
  Component: CustomDropdown,
  props: {
    position: "RIGHT",
  },
});
