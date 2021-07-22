import "./utils.css";
import IconPack from "../views/IconPack.svelte";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "IconPack",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: IconPack,
});
