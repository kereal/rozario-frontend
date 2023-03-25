import { writable } from "svelte/store";

function createEventsStore() {
  const { set, subscribe, update } = writable([]);

  return {
    set,
    subscribe,
    addEvent: (event) =>
      update((data) => {
          console.log(event)
        data.push(event);
        return data;
      }),
    setEvent: (event, index) =>
      update((data) => {
        console.log("addr", event, index);
        data[index] = event;
        return data;
      }),
    removeEvent: (id) =>
      update((data) => {
        data = data.filter((item) => item.id !== id);
        return data;
      }),
  };
}

export const eventsStore = createEventsStore();
