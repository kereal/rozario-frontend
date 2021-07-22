import "./utils.css";
import PlusMinusButton from "../views/PlusMinusButton.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "PlusMinusButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: PlusMinusButton,
  props: {
    number: 2,
  },
});
