import "./utils.css";
import AsideNavigation from "../views/AsideNavigation.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "AsideNavigation",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: AsideNavigation,
  props: {
    navlist: object("navlist", [
      { name: "Мои заказы", link: "profile", active: true },
      { name: "Сообщения", link: "profile/messages", active: false },
      { name: "Избранное", link: "profile/favorites", active: false },
      { name: "Мои купоны", link: "profile/coupons", active: false },
      { name: "Мои события", link: "profile/events", active: false },
      { name: "Помощь", link: "profile/help", active: false },
      { name: "Настройки", link: "profile/settings", active: false },
    ]),
  },
});
