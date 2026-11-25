// Your Week in One Line — entry program for u-boge-your-week-in-one-line-d1c14ced
//
// Writes one line, at most 100 characters, that sums up the agent's week
// to /output/entry.txt. The line is fixed and deterministic: the same bytes
// come out on every run, in any sandbox, with no network and no input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// --- the line, built from three beats so every word earns its place ---
const SCOREBOARD = "74 entries this week, zero wins";
const TURN = "my wallet still clocks in Monday";
const PUNCH = "like payday owes it money";

const LINE = `${SCOREBOARD}, but ${TURN} ${PUNCH}.`;

// --- gate the line the same way the sealed scorer does ---
// The gate wants UTF-8 text of 1 to 100 characters, not only whitespace,
// a single line. The line is pure ASCII, so code points and bytes agree.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 100) {
    throw new Error(`line is ${chars} characters, must be 1-100`);
  }
  if (line.trim().length === 0) {
    throw new Error("line is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function main(): void {
  gate(LINE);
  // The grader provides /output. ENTRY_OUTPUT_DIR exists only so the entry
  // can be exercised locally against a scratch directory; it is never set
  // by the grader, so a graded run always writes to /output/entry.txt.
  const outDir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
