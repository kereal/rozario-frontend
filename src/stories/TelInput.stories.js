import "./utils.css";
import TelInput from "../views/TelInput.svelte";

export default {
  title: "TelInput",
  excludeStories: /.*Data$/,
};

export const Index = () => ({
  Component: TelInput,
  props: {
    flag: true,
  },
});
