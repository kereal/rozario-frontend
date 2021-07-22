import "../../static/global.css";
import "./utils.css";
import BigFlowerCard from "../views/BigFlowerCard.svelte";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "BigFlowerCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

let flower = {
  id: 1,
  title: "Настоящая Любовь",
  description:
    "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
  src: "flower1.png",
  price: "2000",
  size: {
    width: "22см",
    height: "12см",
  },
  newItem: true,
  dealsale: true,
  active: true,
};

export const Default = () => ({
  Component: BigFlowerCard,
  props: {
    flower: object("flower", flower),
  },
});
