import "./utils.css";
import CouponCheckbox from "../views/CouponCheckbox.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "CouponCheckbox",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: CouponCheckbox,
  props: {
    
  }
})
