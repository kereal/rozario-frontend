import { API_URL } from "@/data/constants"

export async function addOrderItem(flower) {
  try {
    const result = fetch(`${API_URL}/add_to_orderlist`, {
      method: "POST",
      body: JSON.stringify(flower)
    })
    const response = result.json()
    if (result.ok) {
      return response
    }
    return null
  } catch (e) {
    throw new Error(e)
  }
}

export async function deleteOrderItem(flower) {
  try {
    const result = fetch(`${API_URL}/delete_order_item`, {
      method: "POST",
      body: JSON.stringify(flower)
    })
    const response = result.json()
    if (result.ok) {
      return response
    }
    return null
  } catch (e) {
    throw new Error(e)
  }
}

export async function changeOrderItem(quantity) {
  try {
    const result = fetch(`${API_URL}/change_order_item`, {
      method: "POST",
      body: JSON.stringify({ quantity })
    })
    const response = result.json()
    if (result.ok) {
      return response
    }
    return null
  } catch (e) {
    throw new Error(e)
  }
}
