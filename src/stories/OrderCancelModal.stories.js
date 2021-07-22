import "../../static/global.css";
import "./utils.css";
import OrderCancelModal from "../components/OrderCancelModal.svelte";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "OrderCancelModal",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: OrderCancelModal,
});
