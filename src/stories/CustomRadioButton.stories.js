import "./utils.css";
import CustomRadioButton from "../components/CustomRadioButton.svelte";

export default {
  title: "CustomRadioButton",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: CustomRadioButton,
  props: {
    groupValue: "group",
    value: "val",
    label: "labeltext",
    name: "radio",
  },
});
