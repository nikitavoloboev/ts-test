import { create, search, insert } from "@orama/orama"
import { createQueries, createStore } from "tinybase/with-schemas"

const tableSchema = {
  globalLinks: {
    title: { type: "string" },
    url: { type: "string" },
    id: { type: "string" },
  },
} as const

const store = createStore().setTablesSchema(tableSchema)

store.addRow("globalLinks", {
  id: "1",
  title: "Learn Anything",
  url: "https://learn-anything.xyz",
})

store.addRow("globalLinks", {
  id: "2",
  title: "TinyBase",
  url: "https://tinybase.org",
})

const queries = createQueries(store)
queries.setQueryDefinition("allGlobalLinks", "globalLinks", ({ select }) => {
  select("id")
  select("title")
  select("url")
})

const db = await create({
  schema: {
    id: "string",
    title: "string",
    url: "string",
  },
})

const promises: Promise<string>[] = []
store.forEachRow("globalLinks", (rowId, _) => {
  const row = store.getRow("globalLinks", rowId)
  promises.push(
    insert(db, {
      id: row.id,
      url: row.url,
      title: row.title,
    })
  )
})

await Promise.all(promises)

const searchResult = await search(db, {
  term: "TinyBase",
  properties: ["title"],
  threshold: 0.5,
})

console.log(
  searchResult.hits.map((hit) => hit.document),
  "results"
)
