"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { capabilities, site } from "@/content/lofte";

const field =
  "mt-2 block w-full rounded-2xl border-[1.5px] border-edge bg-white px-5 py-4 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[invalid=true]:border-error";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-2 text-sm font-semibold text-error">
      {msg}
    </p>
  ) : null;
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-16 items-center gap-5 rounded-full bg-ink pl-8 pr-2 text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send message"}
      <span className="grid size-12 place-items-center rounded-full bg-signal text-ink transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight weight="bold" className="size-5" aria-hidden="true" />
      </span>
    </button>
  );
}

export function EnquiryForm({ preselect }: { preselect: string[] }) {
  const [state, action] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const [started] = useState(() => Date.now());
  const status = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const val = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : undefined);
  const picked = Array.isArray(v.capabilities) ? v.capabilities : preselect;

  useEffect(() => {
    if (state.status !== "idle") status.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={status} tabIndex={-1} role="status" className="rounded-[2rem] border-[1.5px] border-ok bg-white p-10 outline-none">
        <h2 className="display text-[length:var(--text-display-m)]">Message sent.</h2>
        <p className="mt-4 text-lg text-muted">Thank you. The studio will reply to the email you gave, usually within working hours ({site.hours}).</p>
      </div>
    );
  }

  const summary: Record<string, string> = {
    invalid: `Check ${Object.keys(e).length === 1 ? "the highlighted field" : "the highlighted fields"}, then send again.`,
    unavailable: `Online messages are not connected yet, so nothing was sent. Your message is still here: email it to ${site.email} or call ${site.phone}.`,
    failed: `The message could not be sent. Nothing you typed was lost: try again in a minute, or email ${site.email}.`,
  };

  return (
    <form key={JSON.stringify(v)} action={action} noValidate className="grid gap-7">
      {state.status !== "idle" && (
        <div ref={status} tabIndex={-1} role="alert" className="rounded-2xl border-[1.5px] border-error bg-white px-5 py-4 font-semibold text-error outline-none">
          {summary[state.status]}
        </div>
      )}
      <input type="hidden" name="started" value={started} />
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="fax">Leave this empty</label>
        <input id="fax" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold">Your name</label>
          <input id="name" name="name" defaultValue={val("name")} autoComplete="name" required maxLength={120} aria-invalid={!!e.name} aria-describedby="name-error" className={field} />
          <FieldError id="name-error" msg={e.name} />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">Your email</label>
          <input id="email" name="email" type="email" defaultValue={val("email")} autoComplete="email" required maxLength={200} aria-invalid={!!e.email} aria-describedby="email-error" className={field} />
          <FieldError id="email-error" msg={e.email} />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="font-semibold">
          Company <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="company" name="company" defaultValue={val("company")} autoComplete="organization" maxLength={160} aria-invalid={!!e.company} aria-describedby="company-error" className={field} />
        <FieldError id="company-error" msg={e.company} />
      </div>

      <fieldset>
        <legend className="font-semibold">
          What do you need? <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <label key={c.slug} className="cursor-pointer">
              <input type="checkbox" name="capabilities" value={c.slug} defaultChecked={picked.includes(c.slug)} className="peer sr-only" />
              <span className="caps inline-flex h-12 items-center rounded-full border-[1.5px] border-edge px-5 text-[0.82rem] transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {c.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="font-semibold">Your message</label>
        <textarea id="message" name="message" rows={6} defaultValue={val("message")} required minLength={10} maxLength={2000} aria-invalid={!!e.message} aria-describedby="message-error" className={field} />
        <FieldError id="message-error" msg={e.message} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="consent" value="yes" required defaultChecked={v.consent === "yes"} aria-invalid={!!e.consent} aria-describedby="consent-error" className="mt-1 size-5 flex-none accent-ink" />
          <span>
            {site.name} may hold these details to reply to this message. See the{" "}
            <Link href="/privacy" className="font-semibold underline">
              privacy note
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent-error" msg={e.consent} />
      </div>
      <div>
        <Submit />
      </div>
    </form>
  );
}
