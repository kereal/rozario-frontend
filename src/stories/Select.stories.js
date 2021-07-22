import "../../static/global.css";
import "./utils.css";
import { withKnobs, array } from "@storybook/addon-knobs";
import Select from "../views/Select.svelte";

export default {
  title: "Select",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: Select,
  props: {
    title: "Выберите причину:",
    items: array("items", [
      "Нет нужных цветов",
      "Не устраивает время доставки",
      "Передумал(а)",
      "Оформил(а) новый заказ",
    ]),
  },
});
