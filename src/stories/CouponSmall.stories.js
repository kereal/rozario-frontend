import "./utils.css";
import CouponSmall from "../views/CouponSmall.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "CouponSmall",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: CouponSmall,
  props: {
    
  }
})
