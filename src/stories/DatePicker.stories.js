import "./utils.css";
import DatePicker from "../views/DatePicker.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "DatePicker",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: DatePicker,
});
