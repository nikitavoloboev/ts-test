// -- https://effect.website/docs
import { Effect } from "effect"
import * as NodeFS from "node:fs"
// import

// -- https://effect.website/docs/guides/essentials/creating-effects

const successProgram = Effect.succeed(42)
const errorProgram = Effect.fail("my error")

// can produce effect that either fails with Error or succeeds with number
const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const syncSideEffectThatWillNeverThrow = Effect.sync(() => {
  console.log("Hello, World!") // side effect
  return 42 // return value
})

const syncSideEffectThatMayFail = Effect.try({
  try: () => JSON.parse(""), // JSON.parse may throw for bad input
  catch: (unknown) => new Error(`something went wrong ${unknown}`), // remap the error (optional)
})

const promiseWontReject = Effect.promise<string>(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Async operation completed successfully!")
      }, 2000)
    }),
)

const promiseMightReject = Effect.tryPromise(() =>
  fetch("https://jsonplaceholder.typicode.com/todos/1"),
)

// https://effect.website/docs/guides/essentials/creating-effects#from-a-callback
const wrappingCallback = Effect.async<Buffer, Error>((resume) => {
  NodeFS.readFile("todos.txt", (error, data) => {
    if (error) {
      resume(Effect.fail(error))
    } else {
      resume(Effect.succeed(data))
    }
  })
})
