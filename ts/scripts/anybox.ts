import { getCurrentSafariUrlAndTitle } from "@nikiv/ts-utils"

// TODO: instead of adding things as inbox / top-inbox, just add things like quick url, instant but automatically tag
// automatic tag should use mlx server and some nice model that can match based of title, description to most suitable tag (or no tag) (if it is really not sure) #now
async function main() {
  const args = Bun.argv
  let newLink
  const anyboxUrlSave = new URL("anybox://save")
  switch (args[2]) {
    case "safari-inbox":
      newLink = {
        ...(await getCurrentSafariUrlAndTitle()),
      }
      if (newLink.url === null) {
        throw new Error("No URL found")
      }
      anyboxUrlSave.searchParams.append("text", newLink.url)
      anyboxUrlSave.searchParams.append("tag", "inbox")
      await Bun.spawn(["open", "-g", anyboxUrlSave.toString()])
      return
    case "safari-inbox-top":
      newLink = {
        ...(await getCurrentSafariUrlAndTitle()),
      }
      if (newLink.url === null) {
        throw new Error("No URL found")
      }
      const anyboxUrl = new URL("anybox://save")
      anyboxUrl.searchParams.append("text", newLink.url)
      anyboxUrl.searchParams.append("tag", "inbox-top")
      await Bun.spawn(["open", "-g", anyboxUrl.toString()])
      return
  }
}

console.log(await main())
console.log("done")
