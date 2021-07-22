import "./utils.css";
import OrderStoryCard from "../views/OrderStoryCard.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "OrderStoryCard",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: OrderStoryCard,
  props: {
    order: object("order", {
      date: {
        formattedDate: "чт, 21 марта",
        formattedTime: "с 16:00 до 18:00",
        value: "2020-03-21T00:00",
        time: {
          // exact: "16:00"
          range: {
            from: "16:00",
            to: "18:00",
          },
        },
      },
      recipient: "Получу сам(а)",
      destination: "г. Мурманск, ул. Промышленная, 19",
      postcard: "С Днём Рождения!",
      comment: "Осторожно злые собаки",
      number: "190910-06703",
      paymentType: "Оплата наличными",
      totalPrice: 14500,
      list: [
        {
          name: "Букет нарциссы и тюльпаны",
          quantity: 1,
          price: 1590,
        },
        {
          name: "Шикарный букет Разноцветных Роз",
          quantity: 2,
          price: 10590,
        },
      ],
    }),
    testimonials: array("testimonials", [
      "1st slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "2nd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
      "3rd slide «Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день.",
    ]),
  },
});
