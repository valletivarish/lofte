"use server";

import { headers } from "next/headers";
import { validateEnquiry, type EnquiryField } from "@/lib/enquiry";
import { capabilities } from "@/content/lofte";

export type EnquiryState = {
  status: "idle" | "invalid" | "sent" | "unavailable" | "failed";
  errors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back so React's post-action form reset never loses what the visitor typed. */
  values?: Record<string, string | string[]>;
};

const echo = (form: FormData) => ({
  name: String(form.get("name") ?? ""),
  email: String(form.get("email") ?? ""),
  company: String(form.get("company") ?? ""),
  message: String(form.get("message") ?? ""),
  capabilities: form.getAll("capabilities").map(String),
  consent: String(form.get("consent") ?? ""),
});

// ponytail: in-memory limiter is per server instance; move to a shared store (e.g. Vercel KV) if abuse appears.
const recent = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > 5;
}

export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Field errors first, so a person who hits send early is told what to fill in, not that sending failed.
  const result = validateEnquiry(form, capabilities.map((c) => c.slug));
  if (!result.ok) return { status: "invalid", errors: result.errors, values: echo(form) };

  // Honeypot and minimum fill time. Neither reports success: a bot gets the same failure a person would.
  const started = Number(form.get("started"));
  if (form.get("fax") || !Number.isFinite(started) || Date.now() - started < 2500) return { status: "failed", values: echo(form) };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return { status: "failed", values: echo(form) };

  // Launch dependency: RESEND_API_KEY and a verified CONTACT_FROM. CONTACT_TO is kalyanr@loftestudios.com.
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return { status: "unavailable", values: echo(form) };

  const d = result.data;
  const body = [`Name: ${d.name}`, `Email: ${d.email}`, `Company: ${d.company || "not given"}`, `Needs: ${d.capabilities.join(", ") || "not given"}`, "", d.message].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: CONTACT_FROM, to: CONTACT_TO, reply_to: d.email, subject: `Website enquiry from ${d.name}`, text: body }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { status: "sent" } : { status: "failed", values: echo(form) };
  } catch {
    return { status: "failed", values: echo(form) };
  }
}
