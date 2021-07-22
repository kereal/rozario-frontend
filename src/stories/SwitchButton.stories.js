import "./utils.css";
import SwitchButton from "../views/SwitchButton.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "SwitchButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: SwitchButton,
  props: {
    
  }
})
