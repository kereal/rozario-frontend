import "./utils.css";
import OutlineRadio from "../views/OutlineRadio.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "OutlineRadio",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
const group = "radio-group";
const name = {};

const radioList = [
  {
    label: "маленький",
    group,
    value: "small",
  },
  {
    label: "средний",
    group,
    value: "mid",
  },
  {
    label: "большой",
    group,
    value: "big",
  },
];

export const Default = () => ({
  Component: OutlineRadio,
  props: {
    radioList,
  },
});
