import "./utils.css";
import MiscellaneousCard from "../views/MiscellaneousCard.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "miscellaneousCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: MiscellaneousCard,
  props: {
    
  }
})
