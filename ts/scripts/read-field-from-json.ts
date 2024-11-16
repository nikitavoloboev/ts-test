import { promises as fs } from "fs"
import path from "path"
import os from "os"

const args = Bun.argv
const filePath = args[2]
const fieldName = args[3]

async function readFieldFromJson() {
  const todo = await readJsonFromFile(filePath)
  console.log(todo[fieldName])
}

readFieldFromJson()

// TODO: same thing as new-active-todo.ts | make bun link work!

export async function readJsonFromFile(filePath: string) {
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  const data = await fs.readFile(resolvedFilePath, 'utf-8')
  return JSON.parse(data)
}
