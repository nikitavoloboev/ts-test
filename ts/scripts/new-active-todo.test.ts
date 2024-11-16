import { expect, test } from "bun:test"
import { parse2Do } from "./new-active-todo.js"

test("2Do test without description but no subtasks", async () => {
  const expectedOutput = {
    todo: "fix la prod",
    description: "",
  }
  const parsedTodo = parse2Do(`- fix la prod (Today)`)
  expect(parsedTodo).toEqual(expectedOutput)
})

test("2Do test with description but no subtasks", async () => {
  const expectedOutput = {
    todo: "fix la prod",
    description: "some description",
  }
  const parsedTodo = parse2Do(`- fix la prod (Today)\nsome description`)
  expect(parsedTodo).toEqual(expectedOutput)
})

test("2Do test with description and subtasks", async () => {
  const expectedOutput = {
    todo: "fix la prod",
    description: "some description",
  }
  const inputString = `- fix la prod (Today)
some description
------
 1. subtask here, work? (2024-02-07)`

  const parsedTodo = parse2Do(inputString)
  expect(parsedTodo).toEqual(expectedOutput)
})
