import "./utils.css";
import Textarea from "../views/Textarea.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "Textarea",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: Textarea,
  props: {},
});
