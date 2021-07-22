import "./utils.css";
import ActionInput from "../views/ActionInput.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ActionInput",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: ActionInput,
  props: {
    
  }
})
