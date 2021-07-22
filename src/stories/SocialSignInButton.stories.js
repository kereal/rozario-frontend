import "./utils.css";
import SocialSignInButton from "../views/SocialSignInButton.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "SocialSignInButton",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: SocialSignInButton,
  props: {
    
  }
})
