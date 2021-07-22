import "./utils.css";
import SearchComplete from "../components/SearchComplete.svelte";

export default {
  title: "SearchComplete",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: SearchComplete,
  props: {
    placeholder: "Placeholder",
  },
});
