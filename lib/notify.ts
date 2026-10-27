import { randomBytes } from "node:crypto";

export type SubmissionKind = "order" | "wholesale" | "contact" | "newsletter";

/**
 * Forwards a submission to the business's own inbox/CRM/sheet.
 *
 * Set SUBMISSIONS_WEBHOOK_URL (e.g. a Zapier/Make/Google Apps Script/Slack
 * webhook) to record every order, wholesale inquiry and message server-side.
 * Without it, submissions are only handed to WhatsApp by the visitor, so the
 * UI tells them the WhatsApp step is required.
 */
export async function forwardSubmission(
  kind: SubmissionKind,
  reference: string,
  payload: unknown
): Promise<boolean> {
  const url = process.env.SUBMISSIONS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[${kind}] ${reference}`, JSON.stringify(payload));
    }
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.SUBMISSIONS_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.SUBMISSIONS_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        kind,
        reference,
        submittedAt: new Date().toISOString(),
        payload,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (error) {
    console.error(`[${kind}] webhook delivery failed`, error);
    return false;
  }
}

export function makeReference(prefix: string) {
  const d = new Date();
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${date}-${suffix}`;
}
