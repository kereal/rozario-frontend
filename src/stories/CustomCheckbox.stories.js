import "./utils.css";
import CustomCheckbox from "../components/CustomCheckbox.svelte";

export default {
  title: "CustomCheckbox",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: CustomCheckbox,
  props: {
    text: "checkbox",
    id: "custom-chb",
  },
});
