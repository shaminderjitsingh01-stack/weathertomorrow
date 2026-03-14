import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY not set");
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendWeatherEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "Weather Tomorrow <hello@weathertomorrow.app>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend send failed:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// Send to multiple recipients (batched)
export async function sendWeatherEmailBatch(
  recipients: { email: string; subject: string; html: string }[]
): Promise<{ sent: number; failed: number; errors: string[] }> {
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  // Resend supports batch sending but let's do it one by one for per-user customization
  for (const recipient of recipients) {
    const result = await sendWeatherEmail(
      recipient.email,
      recipient.subject,
      recipient.html
    );

    if (result.success) {
      sent++;
    } else {
      failed++;
      errors.push(`${recipient.email}: ${result.error}`);
    }

    // Small delay to respect rate limits (Resend free: 2 emails/sec)
    await new Promise((r) => setTimeout(r, 600));
  }

  return { sent, failed, errors };
}
