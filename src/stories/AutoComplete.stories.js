import "./utils.css";
import AutoComplete from "../components/AutoComplete.svelte";

export default {
  title: "AutoComplete",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: AutoComplete,
  props: {
    data: [
      "moscow",
      "spb",
      "liningrad",
      "vologda",
      "murmashi",
      "orel",
      "pskov",
    ],
    className: "h-10 w-full border-gray-500 px-2",
  },
});
