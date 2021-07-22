import "./utils.css";
import HeartCounter from "../views/HeartCounter.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "HeartCounter",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: HeartCounter,
  props: {
    count: 18,
    like: false,
  },
});
