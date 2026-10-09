"use client";

import { useEffect, useState } from "react";

/** Live Hyderabad time and open/closed from the studio's published hours (Mon to Fri, 10 am to 6 pm IST). */
export function StudioClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  // Rendered on the client only, so server HTML never disagrees with the visitor's clock.
  if (!now) return <p className="h-6" aria-hidden="true" />;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now).map((p) => [p.type, p.value]),
  );
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const open = !["Sat", "Sun"].includes(parts.weekday) && minutes >= 600 && minutes < 1080;
  const time = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(now);

  return (
    <p className="flex items-center gap-2.5 text-white/85">
      <span aria-hidden="true" className={`size-2 rounded-full ${open ? "bg-[#3ddc84] shadow-[0_0_0_4px_rgb(61_220_132/0.18)]" : "bg-white/40"}`} />
      {open ? "Open now" : "Closed now"}, {time} in Hyderabad
    </p>
  );
}
