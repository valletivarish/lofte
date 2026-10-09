// Run: node --experimental-strip-types scripts/enquiry.test.ts
import assert from "node:assert/strict";
import { validateEnquiry } from "../src/lib/enquiry.ts";

const caps = ["copy", "video", "visual", "audio"];
const form = (o: Record<string, string | string[]>) => ({
  get: (k: string) => (Array.isArray(o[k]) ? o[k][0] : o[k]) ?? null,
  getAll: (k: string) => (Array.isArray(o[k]) ? o[k] : o[k] ? [o[k]] : []),
});
const good = { name: "Asha Rao", email: "asha@studio.in", company: "", capabilities: ["copy", "hacked"], message: "We need subtitles in Telugu for a launch film.", consent: "yes" };

const ok = validateEnquiry(form(good), caps);
assert.equal(ok.ok, true);
if (ok.ok) assert.deepEqual(ok.data.capabilities, ["copy"], "unknown capabilities are dropped");

const bad = validateEnquiry(form({ ...good, name: "", email: "asha@", message: "hi", consent: "" }), caps);
assert.equal(bad.ok, false);
if (!bad.ok) assert.deepEqual(Object.keys(bad.errors).sort(), ["consent", "email", "message", "name"]);

console.log("enquiry validation: all checks passed");
