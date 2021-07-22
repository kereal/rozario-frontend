import "./utils.css";
import OrderCancelMessage from "../views/OrderCancelMessage.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "OrderCancelMessage",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: OrderCancelMessage,
  props: {
    
  }
})
