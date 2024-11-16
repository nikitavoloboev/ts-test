import { defineStore } from "fs-nano-store"

/**
 * Declare types for you storage
 */
type Store = {
  name: string
  role: "admin" | "user"
}

const { get, set, changes } = await defineStore<Store>(
  "/Users/nikiv/Desktop/store.json"
)

get("name") // undefined
console.log(get("name"))
set("name", "Alex")
get("name") // Alex
console.log(get("name"))
