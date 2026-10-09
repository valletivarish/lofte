// Pure validation for the enquiry form. Used by the server action; checked by scripts/enquiry.test.ts.

export type EnquiryField = "name" | "email" | "company" | "message" | "consent";

export type Enquiry = { name: string; email: string; company: string; capabilities: string[]; message: string };

const LIMITS = { name: 120, email: 200, company: 160, message: 2000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Source = { get(k: string): unknown; getAll(k: string): unknown[] };
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateEnquiry(
  form: Source,
  allowedCapabilities: string[],
): { ok: true; data: Enquiry } | { ok: false; errors: Partial<Record<EnquiryField, string>> } {
  const data: Enquiry = {
    name: text(form.get("name")),
    email: text(form.get("email")),
    company: text(form.get("company")),
    capabilities: form.getAll("capabilities").map(text).filter((c) => allowedCapabilities.includes(c)),
    message: text(form.get("message")),
  };
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (!data.name) errors.name = "Enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!data.email) errors.email = "Enter your email so we can reply.";
  else if (!EMAIL.test(data.email) || data.email.length > LIMITS.email) errors.email = "Enter an email address like name@company.com.";

  if (data.company.length > LIMITS.company) errors.company = `Keep the company name under ${LIMITS.company} characters.`;

  if (data.message.length < 10) errors.message = "Tell us a little about what you need: a sentence or two is plenty.";
  else if (data.message.length > LIMITS.message) errors.message = `Keep this under ${LIMITS.message} characters.`;

  if (form.get("consent") !== "yes") errors.consent = "Tick the box so we can hold these details to reply.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
