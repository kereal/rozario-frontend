import { writable } from "svelte/store";

export const currTabStore = writable("other");
export const currPaymentStore = writable("BankCard");
export const cartFormStore = writable({
  recieverForm: {
    phonenumber: { value: "", isValid: false },
    name: { value: "", isValid: false },
    takePhoto: false,
    addPostCard: false,
  },
  address: {
    idkAddress: false,
    home: {
      value: "",
    },
    apartment: {
      value: "",
    },
    domophone: {
      value: "",
    },
    porch: {
      value: "",
    },
    floor: {
      value: "",
    },
    comment: "",
    callRecieverForClarification: false,
    deliverWithoutCall: false,
    leaveBouquetToNeighbourghs: false,
    selfPickup: false,
    clarifyAddress: false,
    withoutCall: false,
  },
  customer: {
    phonenumber: {
      value: "",
      isValid: false,
    },
    name: { value: "", isValid: false },
    sms: { value: "", isValid: false },
    email: { value: "", isValid: false },
    sendAnonymously: false,
    addPostCard: false,
  },
  promoCode: { value: "", isValid: false },
  bankCard: {
    cardNumber: {
      value: "",
      isValid: false,
    },
    cardHolder: {
      value: "",
      isValid: false,
    },
    expirationDate: {
      value: "",
      isValid: false,
    },
    cvv: {
      value: "",
      isValid: false,
    },
  },
  beznal: {
    companyName: {
      value: "",
      isValid: false,
    },
    inn: {
      value: "",
      isValid: false,
    },
    kpp: {
      value: "",
      isValid: false,
    },
    legalEntityAddress: {
      value: "",
      isValid: false,
    },
    bankName: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
  },
});

// cartFormStore.subscribe(value => {
//   console.log(value);
// });
