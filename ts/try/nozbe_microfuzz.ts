import createFuzzySearch from "@nozbe/microfuzz"

const list = ["Birds", "Analytics"]
const fuzzySearch = createFuzzySearch(list)

// Run this whenever search term changes
// Only matching items will be returned, sorted by how well they match `queryText`
const results = fuzzySearch("Bird")

console.log(results)
