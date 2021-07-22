import "./utils.css";
import TextButton from "../views/TextButton.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "TextButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: TextButton,
  props: {},
});
