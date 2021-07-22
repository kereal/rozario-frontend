import "./utils.css";
import ImageViewer from "../views/ImageViewer.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ImageViewer",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: ImageViewer,
  props: {
    imagelist: [
      { src: "11.jpg", alt: "11" },
      { src: "12.jpg", alt: "12" },
      { src: "13.jpg", alt: "13" },
      { src: "14.jpg", alt: "14" },
      { src: "15.jpg", alt: "15" },
    ],
  },
});
