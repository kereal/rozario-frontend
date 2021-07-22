import { writable } from "svelte/store";
import { addOrderItem, deleteOrderItem, changeOrderItem } from "../api/order";

const dev = true;

function createOrderStore() {
  const { subscribe, set, update } = writable({
    orderList: [],
    totalPrice: 0,
  });
  return {
    subscribe,
    set,
    addToOrderList: (order) => {
      if (dev) {
        // remove this when api server gets ready!!!
        update((data) => {
          order.quantity = 1;
          data.orderList = [...data.orderList, {flower: order}];
          data.totalPrice = data.orderList.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          }, 0);
          console.log('hello', data);
          return data;
        });
      } else {
        addOrderItem(order).then(res => {
          const totalPrice = res.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          });
          set({ orderList: res, totalPrice });
        });
      }
    },
    deleteFromOrderList: (order) => {
      if (dev) {
        // remove this when api server gets ready!!!
        update((data) => {
          const i = data.orderList.findIndex((item) => item.flower.id === order.id);
          data.orderList.splice(i, 1);
          data.totalPrice = data.orderList.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          }, 0);
          return data;
        });
      } else {
        deleteOrderItem(order).then((res) => {
          const totalPrice = res.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          });
          set({ orderList: res, totalPrice });
        });
      }
    },
    changeOrderItemQuantity: (id, quantity) => {
      if (dev) {
        // remove this when api server gets ready!!!
        update((data) => {
          const i = data.orderList.findIndex((item) => item.flower.id === id);          
          data.orderList[i].flower.quantity = quantity;
          data.totalPrice = data.orderList.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          }, 0);
          return data;
        });
      } else {
        changeOrderItem(id, quantity).then((res) => {
          const totalPrice = res.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
          }, 0);
          set({ orderList: res, totalPrice });
        });
      }
    },
    clearOrderList: () => set({orderList:[], totalPrice: 0}),
  };
}

export const orderStore = createOrderStore();

function createAddressStore() {
  const { set, subscribe, update } = writable([]);

  return {
    set,
    subscribe,
    addAddress: (address) =>
      update((data) => {
        data.push(address);
        return data;
      }),
    setAddress: (address, index) =>
      update((data) => {
        console.log("addr", address, index);
        if (address.isMain) {
          data = data.map((item) => {
            if (item.isMain) {
              item.isMain = false;
            }
            return item;
          });
        }
        data[index] = address;
        return data;
      }),
    removeAddress: (id) =>
      update((data) => {
        data = data.filter((item) => item.id !== id);
        return data;
      }),
  };
}

export const addressStore = createAddressStore();
