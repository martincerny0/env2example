#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { generateEnvExample } from "../src/generate.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(args) {
  const allowedFlags = ["--clean", "--help"];
  const flags = new Set(args.filter((arg) => arg.startsWith("--")));
  const unknownFlags = [...flags].filter(
    (flag) => !allowedFlags.includes(flag)
  );

  return {
    isHelp: flags.has("--help") || unknownFlags.length > 0,
    isClean: flags.has("--clean"),
    unknownFlags,
  };
}

function showHelp(unknownFlags = []) {
  console.log(`
${chalk.cyanBright("🔧 envex")} - Generate .env.example from your .env file

${chalk.bold("Usage:")}
  envex           → Generate with typed placeholders (<string>, <number>, <boolean>)
  envex --clean   → Generate with empty values (KEY="")
  envex --help    → Show this help message

${chalk.bold("Example:")}
  envex --clean
  `);

  if (unknownFlags.length > 0) {
    console.log(
      `${chalk.redBright("Unknown flags:")} ${unknownFlags.join(", ")}`
    );
  }
}

function main() {
  const args = process.argv.slice(2);
  const { isHelp, isClean, unknownFlags } = parseArgs(args);

  if (isHelp) {
    showHelp(unknownFlags);
    process.exit(0);
  }

  const inputPath = path.resolve(process.cwd(), ".env");
  const outputPath = path.resolve(process.cwd(), ".env.example");

  if (!fs.existsSync(inputPath)) {
    console.error(chalk.red(`❌ .env file not found at: ${inputPath}`));
    process.exit(1);
  }

  generateEnvExample(inputPath, outputPath, { clean: isClean });
  console.log(chalk.green(`✅ .env.example generated successfully!`));
}

main();
