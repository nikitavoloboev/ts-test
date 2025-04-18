import { cac } from "cac"
import os from "os"
import fs from "fs/promises"
import path from "path"
import crypto from "crypto"

const cli = cac("cli-ts")

function generatePassword(length: number = 12): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
  const randomBytes = crypto.randomBytes(length)
  let password = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i]! % chars.length
    password += chars[randomIndex]
  }

  return password
}

cli
  .command("generate-pass", "Generate a random secure password")
  .option("--length <length>", "Length of the password", { default: 12 })
  .action((options) => {
    console.log(generatePassword(options.length))
  })
cli
  .command(
    "new [template] [project-name]",
    "Create a new project from a template",
  )
  .option("--silent", "Do not print any logs")
  .action(async (template, projectName, flags) => {
    if (!template || !projectName) {
      console.error("Error: Both template and project-name are required.")
      cli.outputHelp()
      process.exit(1)
    }

    const silent = flags.silent
    const sourcePath = path.join(os.homedir(), "new", template)
    const destPath = path.join(process.cwd(), projectName)
    try {
      await fs.access(sourcePath)
    } catch {
      console.error(`Error: Template "${template}" not found at ${sourcePath}`)
      process.exit(1)
    }
    try {
      await fs.access(destPath)
      console.error(
        `Error: Destination "${projectName}" already exists at ${destPath}`,
      )
      process.exit(1)
    } catch {}
    try {
      await fs.cp(sourcePath, destPath, { recursive: true })
      if (!silent) {
        console.log(
          `Created new project "${projectName}" from template "${template}"`,
        )
      }
    } catch (err: any) {
      console.error(`Error: Failed to create project: ${err.message}`)
      process.exit(1)
    }
  })

cli.help()
cli.parse()
