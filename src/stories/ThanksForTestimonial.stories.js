import "./utils.css";
import ThanksForTestimonial from "../views/ThanksForTestimonial.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ThanksForTestimonial",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: ThanksForTestimonial,
  props: {},
});
