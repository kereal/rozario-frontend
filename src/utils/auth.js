import { APIFetch } from "@/utils/APIFetch"
import { currentUser, loading } from "@/stores/global"

const loadCurrentUser = async () => {
  loading.set(true)
  try {
    const response = await APIFetch("/api/users/current", {
      method: "GET"
    })
    if (response.status === 200) {
      currentUser.set(await response.json())
    }
  } catch (error) {
    console.log(error)
  }
  loading.set(false)
}

export { loadCurrentUser }
