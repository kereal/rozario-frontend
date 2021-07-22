import "./utils.css";
import CatalogNavbar from "../components/CatalogNavbar.svelte";

export default {
  title: "CatalogNavbar",
  excludeStories: /.*Data$/,
};
let dealsCategories = [
  { name: "Лето", id: 1, path: "/catalog/bouqets" },
  { name: "Букеты", id: 2, path: "/catalog/bouqets" },
  { name: "Розы", id: 3, path: "/catalog/bouqets" },
  { name: "Цветы", id: 4, path: "catalog/bouqets" },
  { name: "Композиции из цветов", id: 5, path: "/catalog/bouqets" },
  { name: "Важные события", id: 6, path: "/catalog/bouqets" },
  { name: "На праздник", id: 7, path: "/catalog/bouqets" },
  { name: "Для близких", id: 8, path: "/catalog/bouqets" },
  { name: "Корзины с фруктами и цветами", id: 9, path: "/catalog/bouqets" },
  { name: "Подарки", id: 10, path: "/catalog/bouqets" },
  { name: "Акции", id: 11, path: "/catalog/bouqets" },
];
export const Index = () => ({
  Component: CatalogNavbar,
  props: {
    initCategories: dealsCategories,
    page: "index",
  },
});

export const Catalog = () => ({
  Component: CatalogNavbar,
  props: {
    initCategories: dealsCategories,
    page: "catalog",
  },
});
