import "./utils.css";
import PresentCard from "../views/PresentCard.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "PresentCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: PresentCard,
  props: {
    
  }
})
