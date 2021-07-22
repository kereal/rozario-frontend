import "./utils.css";
import HeroInput from "../components/HeroInput.svelte";
import { withKnobs, object } from "@storybook/addon-knobs";

export default {
  title: "HeroInput",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

const occasionList = [
  { text: "Все", path: "" },
  { text: "День рождения", path: "birthday" },
  { text: "Юбилей", path: "anniversary" },
  { text: "Поздравление", path: "congratulation" },
  { text: "Сказать люблю", path: "iloveyou" },
  { text: "Извинение", path: "apology" },
  { text: "Бизнес-поздравление", path: "business" },
  { text: "Благодарность", path: "thanks" },
  { text: "На свадьбу", path: "wedding" },
  { text: "Для новорожденного", path: "newborn" },
  { text: "Траур", path: "mourning" },
];

const priceRangeList = [
  { from: "", to: "2000" },
  { from: "2000", to: "4000" },
  { from: "4000", to: "5000" },
  { from: "5000", to: "9000" },
  { from: "9000", to: "14000" },
  { from: "14000", to: "" },
];

const personList = [
  { text: "Маме", path: "mother" },
  { text: "Женшине", path: "woman" },
  { text: "Любимой", path: "beloved" },
  { text: "Семье", path: "family" },
  { text: "Мужчине", path: "man" },
  { text: "Ребенку", path: "kid" },
  { text: "Деловому партнеру", path: "business_partner" },
  { text: "Дочери", path: "daughter" },
  { text: "Подруге", path: "girlfriend" },
  { text: "Сестре", path: "sister" },
];

const flowerList = [
  { text: "все", path: "" },
  { text: "монобукеты", path: "mono" },
  { text: "микс", path: "mix" },
  { text: "с розами", path: "roses" },
  { text: "с герберами", path: "gerbera" },
  { text: "с лилиями", path: "lily" },
  { text: "с хризантемами", path: "chrysanthemum" },
  { text: "с орхидеями", path: "orchid" },
  { text: "с альстромериями", path: "alstroemeria" },
  { text: "с гортензиями", path: "hydrangea" },
  { text: "с ирисами", path: "iris" },
  { text: "с гвоздиками", path: "clove" },
  { text: "с каллами", path: "calla" },
  { text: "с лизиантусами", path: "lisianthus" },
  { text: "с пионами", path: "peony" },
  { text: "с ромашками", path: "chamomile" },
  { text: "с экзотическими цветами", path: "exotic" },
  { text: "с подсолнухами", path: "sunflower" },
  { text: "с тюльпанами", path: "tulip" },
];

export const Default = () => ({
  Component: HeroInput,
  props: {
    occasionList: object("occasionList", occasionList),
    priceRangeList: object("priceRangeList", priceRangeList),
    personList: object("personList", personList),
    flowerList: object("flowerList", flowerList),
  },
});
