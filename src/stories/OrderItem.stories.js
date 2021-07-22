import "./utils.css";
import OrderItem from "../views/OrderItem.svelte";

export default {
  title: "OrderItem",
  excludeStories: /.*Data$/,
};
const order = {
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
  type: "FLOWER",
};

export const Default = () => ({
  Component: OrderItem,
  props: {
    order,
  },
});
