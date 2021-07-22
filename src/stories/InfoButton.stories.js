import "./utils.css";
import InfoButton from "../views/InfoButton.svelte";
import { withKnobs, object, text, array } from "@storybook/addon-knobs";

export default {
  title: "InfoButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Left_dropdown_left_icon = () => ({
  Component: InfoButton,
  props: {
    css: text("css", "width: 320px; max-height: 330px;"),
    position: text("position", "LEFT"),
    icon: text("icon", "delivery"),
    iconPos: text("iconPost", "left"),
    text: array("text", ["Первая строка", "Вторая строка"]),
  },
});
