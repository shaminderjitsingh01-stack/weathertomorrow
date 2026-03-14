import { createHmac } from "crypto";

/**
 * Generate an HMAC-SHA256 token for a subscriber email.
 * Used to authenticate preferences page access without login.
 */
export function generateEmailToken(email: string): string {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error("CRON_SECRET not set");
  return createHmac("sha256", secret).update(email.toLowerCase().trim()).digest("hex");
}

/**
 * Verify that a token matches the expected HMAC for the given email.
 */
export function verifyEmailToken(email: string, token: string): boolean {
  try {
    const expected = generateEmailToken(email);
    // Constant-time comparison to prevent timing attacks
    if (expected.length !== token.length) return false;
    let result = 0;
    for (let i = 0; i < expected.length; i++) {
      result |= expected.charCodeAt(i) ^ token.charCodeAt(i);
    }
    return result === 0;
  } catch {
    return false;
  }
}

/**
 * Build the full preferences URL for a given email.
 */
export function getPreferencesUrl(email: string): string {
  const token = generateEmailToken(email);
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://weathertomorrow.app";
  return `${base}/preferences?email=${encodeURIComponent(email)}&token=${token}`;
}
