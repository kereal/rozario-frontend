import "./utils.css";
import ItemList from "../components/ItemList.svelte";
import { withKnobs, array } from "@storybook/addon-knobs";

export default {
  title: "ItemList",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: ItemList,
  props: {
    css: "max-height: 335px;",
    listData: array("listData", [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
    ]),
  },
});
