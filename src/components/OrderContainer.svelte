<script>
  import { orderStore } from "../stores/order.js";
  import Order from "./Order.svelte";

  let timeDropdownVisible = false;
  let timeDropdownIcon;
  let timeDropdownButton;

  function deleteOrderList() {
    orderStore.clearOrderList();
  }

  function deleteOrderListItem({ detail }) {
    orderStore.deleteFromOrderList(detail.flower);
  }

  function decrementItemQuantity({detail}) {
    orderStore.changeOrderItemQuantity(detail.flower.id, detail.flower.quantity - 1)
  }
  function incrementItemQuantity({detail}) {
    orderStore.changeOrderItemQuantity(detail.flower.id, detail.flower.quantity + 1)
  }
</script>

<Order
  on:delete-list={deleteOrderList}
  on:delete-item={deleteOrderListItem}
  on:dec-item={decrementItemQuantity}
  on:inc-item={incrementItemQuantity}
  price={$orderStore.totalPrice}
  orderList={$orderStore.orderList} />
