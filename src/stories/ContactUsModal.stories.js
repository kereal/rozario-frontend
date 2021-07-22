import "./utils.css";
import ContactUsModal from "../views/ContactUsModal.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ContactUsModal",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: ContactUsModal,
  props: {},
});
