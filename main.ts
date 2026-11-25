import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

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
  // Plain text only: reject control characters the gate cannot display.
  for (const ch of entry) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("Entry holds a control character");
    }
  }
}

check(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
// Read-back verification: the file holds exactly the entry plus newline.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY + "\n") {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}
console.log(`Wrote ${[...ENTRY].length}-character entry to /output/entry.txt`);
