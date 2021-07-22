import "./utils.css";
import CollectionsCard from "../components/CollectionsCard.svelte";

export default {
  title: "CollectionsCard",
  excludeStories: /.*Data$/,
};
let collections = [
  { name: "Букеты", src: "collection1.png", seasonal: true },
  {
    name: "Букеты",
    src: "collection2.png",
    dealgift: true,
  },
  { name: "Цветы", src: "collection3.png", seasonal: true },
];
export const Default = () => ({
  Component: CollectionsCard,
  props: {
    collection: collections[1],
  },
});
