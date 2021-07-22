import "./utils.css";
import HelpButton from "../views/HelpButton.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "HelpButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: HelpButton,
  props: {
    
  }
})
