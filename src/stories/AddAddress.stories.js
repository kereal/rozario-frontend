import "./utils.css";
import AddAddress from "../views/AddAddress.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "AddAddress",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: AddAddress,
  props: {},
});
