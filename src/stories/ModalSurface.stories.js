import "./utils.css";
import ModalSurface from "../components/ModalSurface.svelte";

export default {
  title: "ModalSurface",
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: ModalSurface,
  props: {
    css: "width: 400px;height: 200px;",
  },
});
