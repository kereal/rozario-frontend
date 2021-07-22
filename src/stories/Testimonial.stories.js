import "./utils.css";
import Testimonial from "../views/Testimonial.svelte";

export default {
  title: "Testimonial",
  excludeStories: /.*Data$/,
};

const customer = {
  name: "София Великая",
  ordernumber: "1234556",
  img: "customer.png",
  testimonial:
    "“Неожиданно, красивый букет и быстрая доставка - прямо на дачу Брежнева!Мы с В.В. были очень рады, ну ни как не ожидали такого от них, ну совсем.Будем еще заказывать, точно!",
};

export const Default = () => ({
  Component: Testimonial,
  props: {
    customer: customer,
  },
});
