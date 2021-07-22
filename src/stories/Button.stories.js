import "./utils.css";
import Button from "../views/Button.svelte";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Button",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const ActiveMain = () => ({
  Component: Button,
  props: {
    text: text("text", "Отменить заказ"),
    status: "active-main",
    size: "lg",
  },
});
export const ActiveSecondary = () => ({
  Component: Button,
  props: {
    text: text("text", "Отменить заказ"),
    status: "active-secondary",
    size: "lg",
  },
});
export const ActiveTransparent = () => ({
  Component: Button,
  props: {
    text: text("text", "Отменить заказ"),
    status: "active-transparent",
    size: "lg",
  },
});
export const DisabledMain = () => ({
  Component: Button,
  props: {
    text: text("text", "Отменить заказ"),
    status: "disabled-main",
    size: "lg",
  },
});

export const DisabledSecondary = () => ({
  Component: Button,
  props: {
    text: text("text", "Отменить заказ"),
    status: "disabled-secondary",
    size: "lg",
  },
});
