import "./utils.css";
import Carousel from "../views/Carousel.svelte";

export default {
  title: "Carousel",
  excludeStories: /.*Data$/,
};

export const carousel3 = () => ({
  Component: Carousel,
});
