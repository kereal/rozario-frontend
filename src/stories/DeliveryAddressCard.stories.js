import "./utils.css";
import DeliveryAddressCard from "../views/DeliveryAddressCard.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "DeliveryAddressCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: DeliveryAddressCard,
  props: {
    recipient: object("recipient", {
      name: "Константинопольский Константин Константинович",
      address: {
        index: "427790",
        country: "Россия",
        state: "Мурманская область",
        city: "г. Мурманск",
        street: "пр. Ленина",
        house: "19",
        apartment: "24",
      },
      phone: "+7 999 270-12-88",
    }),
  },
});
