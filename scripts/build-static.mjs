import { cpSync, copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";

const src = "public";
const out = "dist-static";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

copyFileSync(`${src}/site.html`, `${out}/index.html`);
copyFileSync(`${src}/site.html`, `${out}/site.html`);
for (const file of ["site.css", "site.js", "site-effects.css", "site-effects.js", "favicon.ico", "robots.txt"]) {
  if (existsSync(`${src}/${file}`)) copyFileSync(`${src}/${file}`, `${out}/${file}`);
}
if (existsSync(`${src}/assets`)) cpSync(`${src}/assets`, `${out}/assets`, { recursive: true });

const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
if (hash(`${src}/site.html`) !== hash(`${out}/index.html`)) throw new Error("index.html differs from site.html");

const html = readFileSync(`${src}/site.html`, "utf8");
const refs = [...html.matchAll(/(?:src|href|data-before-src|data-after-src)="([^"#:]+)"/g)].map((match) => match[1]).filter((value) => !value.startsWith("data:"));
const missing = refs.filter((path) => !existsSync(`${out}/${path}`));
if (missing.length) throw new Error("Missing local files: " + missing.join(", "));
console.log(`Static site ready in ${out}/ (${refs.length} local references OK)`);
