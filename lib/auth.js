import crypto from "crypto";

export function getCookieName() {
  return process.env.ADMIN_COOKIE_NAME || "gd_admin_session";
}

export function createSessionValue(password) {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update(String(password)).digest("hex");
}

export function isValidPassword(password) {
  const actual = process.env.ADMIN_PASSWORD || "change-this-password";
  return password === actual;
}

export function isValidSession(sessionValue) {
  const actual = process.env.ADMIN_PASSWORD || "change-this-password";
  return sessionValue === createSessionValue(actual);
}
