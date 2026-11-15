import { cpSync, copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { Script } from "node:vm";

const src = "public";
const out = "dist-static";
const htmlPath = `${src}/site.html`;

if (!existsSync(htmlPath)) throw new Error("Missing public/site.html");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

copyFileSync(htmlPath, `${out}/index.html`);
copyFileSync(htmlPath, `${out}/site.html`);

for (const file of ["site.css", "site.js", "site-effects.css", "site-effects.js", "favicon.ico", "robots.txt"]) {
  if (existsSync(`${src}/${file}`)) copyFileSync(`${src}/${file}`, `${out}/${file}`);
}
if (existsSync(`${src}/assets`)) cpSync(`${src}/assets`, `${out}/assets`, { recursive: true });

const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
if (hash(htmlPath) !== hash(`${out}/index.html`)) throw new Error("index.html differs from site.html");

const html = readFileSync(htmlPath, "utf8");
const forbidden = [
  "Ana Helena",
  "Instituto Performance",
  "5571999632523",
  "43.424",
  "CRM-BA",
  "Ewerton Visco",
  "dra-ana-",
  "recepcao-",
];
const leaked = forbidden.filter((term) => html.toLowerCase().includes(term.toLowerCase()));
if (leaked.length) throw new Error("Previous-client data detected: " + leaked.join(", "));

for (const file of ["site.js", "site-effects.js"]) {
  const path = `${src}/${file}`;
  if (existsSync(path)) new Script(readFileSync(path, "utf8"), { filename: path });
}

const comparisonSources = [...html.matchAll(/data-(?:before|after)-src="([^"]*)"/g)];
if (comparisonSources.some((match) => match[1].trim() !== "")) {
  throw new Error("Before/after comparison sources must remain empty in the reusable template");
}

const refs = [...html.matchAll(/(?:src|href|data-before-src|data-after-src)="([^"#:]+)"/g)]
  .map((match) => match[1])
  .filter((value) => !value.startsWith("data:"));
const missing = refs.filter((path) => !existsSync(`${out}/${path}`));
if (missing.length) throw new Error("Missing local files: " + missing.join(", "));

console.log(
  `Static site ready in ${out}/ — ${refs.length} local references, ${comparisonSources.length} empty comparison sources, JavaScript syntax and client-data checks passed.`
);
