import "./utils.css";
import TelInputSmall from "../views/TelInputSmall.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "TelInputSmall",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: TelInputSmall,
  props: {
    
  }
})
