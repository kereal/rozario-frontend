import "./utils.css";
import SocialIcon from "../views/SocialIcon.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "SocialIcon",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: SocialIcon,
  props: {
    iconlist: ["Facebook", "Vk", "Twitter", "Instagram"],
  },
});
