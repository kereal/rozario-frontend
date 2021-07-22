import "./utils.css";
import DateCard from "../views/DateCard.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "DateCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: DateCard,
  props: {
    
  }
})
