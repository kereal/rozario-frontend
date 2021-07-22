import "./utils.css";
import SpecialCard from "../views/SpecialCard.svelte";

export default {
  title: "SpecialCard",
  excludeStories: /.*Data$/,
};
let recommendation = {
  title: "Настоящая Любовь",
  src: "recommendation.png",
  size: {
    text: "Большой размер",
    width: "35 см",
    height: "35 см",
  },
  description:
    "Альстромерия розовая (3шт.), Атласная лента, Листья Аспидистра, Листья эвкалипта, Роза розовая (3шт.), Гербера белая (3шт.)",
  time:
    'Доставим в течении - <span class="text-black">120 <span class="text-gray-500">мин.</span></span>',
  price: {
    full: 3456,
    sale: 3299,
  },
  rating: 4.5,
};

export const Default = () => ({
  Component: SpecialCard,
  props: {
    recommendation,
  },
});
