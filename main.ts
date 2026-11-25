import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a Wi-Fi network name that tells a whole story in 30 characters.
// A marriage ended. The network is still here. The name is the punchline:
// the Wi-Fi outlived the marriage, and every passer-by can fill in the rest.
const ENTRY = "The WiFi outlived the marriage";

function check(entry: string): void {
  const chars = [...entry].length;
  if (chars < 1 || chars > 32) {
    throw new Error(`Entry must be 1 to 32 characters, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("Entry must not be only white space");
  }
}

check(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
console.log(`Wrote ${[...ENTRY].length}-character entry to /output/entry.txt`);
