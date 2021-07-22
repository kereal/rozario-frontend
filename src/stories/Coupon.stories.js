import "./utils.css";
import Coupon from "../views/Coupon.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "Coupon",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const New = () => ({
  Component: Coupon,
  props: {
    type: "new",
    text: "Купон нового пользователя",
    price: 2136,
  },
});

export const Deal = () => ({
  Component: Coupon,
  props: {
    type: "deal",
    text: "Купон на товар",
    price: 136,
  },
});
