/*
 * Fills in missing "added" dates in data.js for photos that are new, that
 * is, whose files are not yet committed to git. Run it from the project
 * folder after an upload, before committing:
 *
 *   node sweep-dates.js
 *
 * Photos already committed are left alone; the map falls back to their
 * taken date. Photos with no taken date at all are reported, not changed.
 * Needs only Node and git, no packages.
 */
const fs = require("fs");
const { execSync } = require("child_process");

const DATA_FILE = "data.js";

/** Today's date as YYYY-MM-DD in local time. */
function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Photo paths under photos/ that git does not track yet, as a Set. */
function newPhotoFiles() {
  const out = execSync("git ls-files --others --exclude-standard photos", { encoding: "utf8" });
  return new Set(out.split("\n").filter(Boolean));
}

const source = fs.readFileSync(DATA_FILE, "utf8");
const fresh = newPhotoFiles();
const stamp = today();
let stamped = 0;
const undated = [];

// Work line by line so everything else in data.js stays byte-for-byte the
// same. A photo line looks like:  { src: "photos/x.jpg", date: "...", ... }
const lines = source.split("\n").map((line) => {
  const src = line.match(/src: "(photos\/[^"]+)"/);
  if (!src) return line;
  const dateMatch = line.match(/date: "([^"]*)"/);
  if (!dateMatch || !dateMatch[1]) undated.push(src[1]);
  if (!fresh.has(src[1]) || /added: "/.test(line) || !dateMatch) return line;
  stamped += 1;
  return line.replace(dateMatch[0], `${dateMatch[0]}, added: "${stamp}"`);
});

if (stamped) fs.writeFileSync(DATA_FILE, lines.join("\n"));
console.log(`${stamped} photo${stamped === 1 ? "" : "s"} stamped added: "${stamp}".`);
undated.forEach((src) => console.log(`WARNING: no date on ${src} — add one by hand in data.js.`));
