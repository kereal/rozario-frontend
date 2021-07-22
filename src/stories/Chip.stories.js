import "./utils.css";
import Chip from "../views/Chip.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "Chip",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: Chip,
  props: {
    name: "-30%",
  },
});
