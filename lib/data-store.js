import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export function readJson(file) {
  const fullPath = path.join(dataDir, file);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export function writeJson(file, value) {
  const fullPath = path.join(dataDir, file);
  fs.writeFileSync(fullPath, JSON.stringify(value, null, 2), "utf-8");
}

export function getProducts() {
  return readJson("products.json");
}

export function saveProducts(data) {
  writeJson("products.json", data);
}

export function getSiteContent() {
  return readJson("site-content.json");
}

export function saveSiteContent(data) {
  writeJson("site-content.json", data);
}
