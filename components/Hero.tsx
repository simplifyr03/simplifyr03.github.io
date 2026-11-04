"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/content";
import Typewriter from "./Typewriter";
import ProductPanel from "./ProductPanel";

const ease = [0.16, 1, 0.3, 1] as const;

const beams = [
  { left: "12%", delay: 0, dur: 7 },
  { left: "31%", delay: 2.4, dur: 9 },
  { left: "50%", delay: 1.2, dur: 6 },
  { left: "69%", delay: 3.6, dur: 8 },
  { left: "88%", delay: 0.8, dur: 10 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const titleWords = hero.title.split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      {/* Grid + beams backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg mask-radial absolute inset-0" />
        {beams.map((b, i) => (
          <span
            key={i}
            className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-primary-hover to-transparent"
            style={{ left: b.left, animation: `beam ${b.dur}s linear ${b.delay}s infinite` }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease }}
          className="absolute left-1/2 top-[-280px] h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.28),rgba(94,106,210,0.06)_45%,transparent_70%)] blur-2xl"
        />
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative mx-auto max-w-[1280px] px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex justify-center"
        >
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-hover opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            One Stop Solution
          </span>
        </motion.div>

        <h1 className="display-xl mx-auto mt-8 max-w-5xl">
          {titleWords.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className="text-gradient inline-block"
                initial={{ y: "110%", filter: "blur(10px)", opacity: 0 }}
                animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.09, ease }}
              >
                {w}
                {i < titleWords.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
          <br />
          <motion.span
            className="inline-block text-ink-muted"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.75, ease }}
          >
            {hero.tagline}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 min-h-[1.6em] text-2xl font-medium tracking-[-0.6px] text-ink md:text-[28px]"
        >
          <span className="text-ink-subtle">{hero.prefix} </span>
          <Typewriter words={hero.words} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease }}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-subtle"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/#contact" className="group relative">
            <span className="absolute -inset-px rounded-md bg-gradient-to-r from-primary-hover via-primary to-primary-hover opacity-70 blur-md transition-opacity group-hover:opacity-100" />
            <span className="btn-primary relative h-11 px-5">
              {hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link href="/#services" className="btn-secondary h-11 px-5">
            Our Services
          </Link>
        </motion.div>
      </motion.div>

      <ProductPanel />
    </section>
  );
}
