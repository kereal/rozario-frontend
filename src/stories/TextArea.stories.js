import "./utils.css";
import TextArea from "../views/TextArea.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "TextArea",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: TextArea,
  props: {},
});
