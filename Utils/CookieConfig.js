export const COOKIE_OPTIONS = {
  httpOnly: process.env.HTTPONLY === "true",
  secure: process.env.SECURE === "true",
  sameSite: process.env.SAME_SITE || "Lax",
  maxAge: parseInt(process.env.MAX_AGE) || 7 * 24 * 60 * 60 * 1000,
};
