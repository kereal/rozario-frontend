import "./utils.css";
import EditAddress from "../views/EditAddress.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "EditAddress",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: EditAddress,
  props: {
    title: text("title", "Константин Константинович"),
    name: text("name", "Константинопольский Константин Константинович"),
    phone: text("phone", "+7 921 274-11-38"),
    address: object("address", {
      country: "Россия",
      state: "Мурманская область",
      city: "г. Мурманск",
      street: "ул. Ленина",
      house: "21",
      apartment: "14",
    }),
  },
});
