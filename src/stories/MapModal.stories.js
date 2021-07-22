import "./utils.css";
import MapModal from "../components/MapModal.svelte";

export default {
  title: "MapModal",
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: MapModal,
});
