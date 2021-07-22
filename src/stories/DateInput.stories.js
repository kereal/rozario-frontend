import "./utils.css";
import DateInput from "../views/DateInput.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "DateInput",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: DateInput,
  props: {
    
  }
})
