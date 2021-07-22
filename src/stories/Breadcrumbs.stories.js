import "./utils.css";
import Breadcrumbs from "../views/Breadcrumbs.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "Breadcrumbs",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: Breadcrumbs,
  props: {
    pathlist: [
      {
        name: "Доставка цветов",
        href: "http://localhost:50000/?path=/story/breadcrumbs--default",
      },
      {
        name: "Мурманск",
        href: "http://localhost:50000/?path=/story/breadcrumbs--default",
      },
      {
        name: "Букеты",
        href: "http://localhost:50000/?path=/story/breadcrumbs--default",
      },
      {
        name: "Букеты из хризантем",
        href: "http://localhost:50000/?path=/story/breadcrumbs--default",
      },
      {
        name: "Во имя любви",
        href: "http://localhost:50000/?path=/story/breadcrumbs--default",
      },
    ],
  },
});
