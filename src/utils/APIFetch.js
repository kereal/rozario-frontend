import { get } from "svelte/store"
import { API_URL } from "@/data/constants"
import { currentUser } from "@/stores/global"

function updateOptions(options) {
  const update = { ...options }
  const user = get(currentUser)

  update.headers = {
    ...update.headers,
    "Content-type": "application/json"
  }

  if (user && user.spree_api_key) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${user.spree_api_key}`
    }
  }

  return update
}

export function APIFetch(url, options) {
  return fetch(`${API_URL}${url}`, updateOptions(options))
}
