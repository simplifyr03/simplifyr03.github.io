"use client";

import { trustedBy } from "@/lib/content";
import Reveal from "./Reveal";

export default function TrustedBy() {
  const row = [...trustedBy.logos, ...trustedBy.logos, ...trustedBy.logos];
  return (
    <section className="relative border-y border-hairline bg-canvas py-14">
      <Reveal>
        <p className="text-center text-[13px] font-medium tracking-[0.4px] text-ink-subtle">{trustedBy.label}</p>
      </Reveal>
      <div className="mask-fade-x mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-20 hover:[animation-play-state:paused]">
          {[...row, ...row].map((l, i) => (
            <img
              key={i}
              src={l.src}
              alt="logo"
              style={{ width: l.w }}
              className="h-14 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
