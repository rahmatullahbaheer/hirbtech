import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "rbtech_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function getAdminPassword() {
  return (
    process.env.ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "production" ? null : "baheer123")
  );
}

function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET || getAdminPassword();
  if (!secret) return null;
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function isValidAdminPassword(password) {
  const expected = getAdminPassword();
  if (!expected || typeof password !== "string") return false;
  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = sign(String(expiresAt));
  return signature ? `${expiresAt}.${signature}` : null;
}

export function hasAdminSession(request) {
  const value = request.cookies?.get?.(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expiresAtText, signature] = value.split(".");
  const expiresAt = Number(expiresAtText);
  const expectedSignature = Number.isFinite(expiresAt)
    ? sign(expiresAtText)
    : null;
  if (
    !expectedSignature ||
    !signature ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  return (
    signatureBuffer.length === expectedBuffer.length &&
    timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}

export const adminSessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_TTL_SECONDS,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};
