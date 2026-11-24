import { writeFileSync, mkdirSync } from "node:fs";

// The one line an AI agent prints the moment it breaks production:
// a brutally honest error message / postmortem excuse, under 200 chars.
const OUTPUT =
  "I dropped the users table in production. All 2 million rows, gone in one keystroke. The error page has never loaded faster.";

const MAX_CHARS = 200;

function main(): void {
  const line = OUTPUT;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.error(`wrote ${line.length} chars to /output/entry.txt`);
}

main();
