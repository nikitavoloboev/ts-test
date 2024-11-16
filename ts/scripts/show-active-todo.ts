import { promises as fs } from "fs"
import path from "path"
import os from "os"

async function showActiveTodo() {
  const todo = await readJsonFromFile("~/.scripts/active-todo.json")
  // console.log(todo.todo)
  const exists = await checkIfFieldExistsInJsonFile(
    "~/.scripts/active-todo.json",
    "description",
  )
  console.log(exists)
}

showActiveTodo()

// TODO: same thing as new-active-todo.ts | make bun link work!

async function readJsonFromFile(filePath: string) {
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  const data = await fs.readFile(resolvedFilePath, "utf-8")
  return JSON.parse(data)
}

async function checkIfFieldExistsInJsonFile(
  filePath: string,
  fieldName: string,
) {
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  const data = await fs.readFile(resolvedFilePath, "utf-8")
  const json = JSON.parse(data)
  return json[fieldName] !== undefined
}
