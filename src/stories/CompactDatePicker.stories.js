import "./utils.css";
import CompactDatePicker from "../views/CompactDatePicker.svelte";
import { withKnobs, date } from "@storybook/addon-knobs";

export default {
  title: "CompactDatePicker",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: CompactDatePicker,
  props: {
    initDate: date("initDate", new Date(2020, 2, 2)),
  },
});
