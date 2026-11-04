"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { pride } from "@/lib/content";
import Reveal from "./Reveal";

export default function Pride() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const sealRotate = useTransform(scrollYProgress, [0, 1], [-40, 20]);
  const words = pride.lead.split(" ");

  return (
    <section className="relative mx-auto max-w-[1280px] px-5 py-28 md:px-8 md:py-36">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-[30px] font-semibold leading-[1.2] tracking-[-0.8px] md:text-[44px] md:tracking-[-1.2px]">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-subtle">{pride.body}</p>
          </Reveal>
        </div>

        <div className="relative mx-auto grid h-[280px] w-[280px] place-items-center">
          <div aria-hidden className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-hairline-strong" />
          <div aria-hidden className="absolute inset-6 rounded-full border border-hairline" />
          <div aria-hidden className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(94,106,210,0.25),transparent_70%)] blur-xl" />
          <motion.img style={{ rotate: sealRotate }} src="/images/seal.svg" alt="Seal image" className="relative w-[220px]" />
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
