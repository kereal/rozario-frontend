import "./utils.css";
import LabelsSelect from "../views/LabelsSelect.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "LabelsSelect",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
const group = "group";
export const Default = () => ({
  Component: LabelsSelect,
  props: {
    labellist: [
      { label: "Тюльпан", group },
      { label: "Гвоздика", group },
      { label: "Гладиолус", group },
      { label: "Роза кустовая", group },
    ],
  },
});
