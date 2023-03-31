const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_API_URL
  : import.meta.env.VITE_DEV_API_URL

//export const API_URL = "http://localhost:8000"

export const ORDER_ITEM_TYPE = {
  FLOWER: "FLOWER",
  MISC: "MISC"
}

export const HERO_INPUT_STATES = {
  OCCASION: "occasion",
  PERSON: "person",
  PRICE: "price",
  FLOWER: "flower"
}

export const DROPDOWN_MAX_HEIGHT = 360

export const ADDRESS_GROUP = {
  ADDRESS: "address",
  NO_ADDRESS: "noAddress",
  SELF_PICKUP: "selfPickup"
}
