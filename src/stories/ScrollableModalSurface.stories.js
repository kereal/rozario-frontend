import "./utils.css";
import ScrollableModalSurface from "../views/ScrollableModalSurface.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ScrollableModalSurface",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: ScrollableModalSurface,
  props: {},
});
