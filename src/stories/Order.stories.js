import "./utils.css";
import Order from "../views/Order.svelte";

export default {
  title: "Order",
  excludeStories: /.*Data$/,
};
export const Default = () => ({
  Component: Order,
  props: {
    orderList: [
      {
        flower: {
          id: 1,
          title: "Настоящая Любовь",
          description:
            "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
          src: "flower1",
          price: "2000",
          size: {
            name: "средний",
            width: {
              num: "22",
              measureUnit: "см",
            },
            height: {
              num: "12",
              measureUnit: "см",
            },
          },
          newItem: true,
          dealsale: true,
          active: true,
          quantity: 1
        },
      },
      {
        flower: {
          id: 2,
          title: "Шикарный букет красных роз роз",
          description:
            "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
          src: "flower1",
          price: "2000",
          size: {
            name: "средний",
            width: {
              num: "22",
              measureUnit: "см",
            },
            height: {
              num: "12",
              measureUnit: "см",
            },
          },
          hitItem: true,
          dealcoupon: true,
          active: true,
          quantity: 2
        }
      },
      {
        flower: {
          id: 3,
          title: "Шикарный букет красных роз роз",
          description:
            "Свекла, капуста, морковь, картофель, лукрепчатый, говядина, фасоль, пампушки",
          src: "flower1",
          price: "2000",
          size: {
            name: "средний",
            width: {
              num: "22",
              measureUnit: "см",
            },
            height: {
              num: "12",
              measureUnit: "см",
            },
          },
          hitItem: true,
          dealcoupon: true,
          active: true,
          quantity: 2,
        }
      },
    ],
  },
});
