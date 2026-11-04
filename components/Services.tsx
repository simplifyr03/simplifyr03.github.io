"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import Reveal, { WordReveal } from "./Reveal";
import TiltCard from "./TiltCard";

const CYCLE = 7000;

export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });

  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), CYCLE);
    return () => clearTimeout(t);
  }, [active, paused, inView]);

  const s = services[active];

  return (
    <section id="services" className="relative scroll-mt-20 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hairline-strong to-transparent" />
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">Services</span>
          </Reveal>
          <h2 className="display-lg mt-6">
            <WordReveal text="Our Services" />
          </h2>
        </div>

        {/* Tabbed showcase */}
        <Reveal delay={0.1}>
          <div
            ref={ref}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="panel mt-16 grid overflow-hidden lg:grid-cols-[380px_1fr]"
          >
            <div className="flex gap-2 overflow-x-auto border-b border-hairline p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
              {services.map((sv, i) => (
                <button
                  key={sv.slug}
                  onClick={() => setActive(i)}
                  className={`relative flex min-w-[220px] items-center gap-4 rounded-md p-4 text-left transition-colors lg:min-w-0 ${
                    i === active ? "text-ink" : "text-ink-subtle hover:text-ink-muted"
                  }`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 rounded-md border border-hairline-strong bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-md border border-hairline bg-canvas">
                    <img src={sv.icon} alt="acclogo" className="h-6 w-6 object-contain" />
                  </span>
                  <span className="relative flex-1">
                    <span className="block text-[17px] font-medium tracking-[-0.3px]">{sv.title}</span>
                    {i === active && (
                      <span className="mt-2 block h-[2px] w-full overflow-hidden rounded-full bg-surface-4">
                        <motion.span
                          key={`${sv.slug}-${paused}-${inView}`}
                          initial={{ width: "0%" }}
                          animate={{ width: paused || !inView ? "0%" : "100%" }}
                          transition={{ duration: paused || !inView ? 0 : CYCLE / 1000, ease: "linear" }}
                          className="block h-full bg-primary"
                        />
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[460px] overflow-hidden p-8 md:p-12">
              <div aria-hidden className="grid-bg mask-fade-b absolute inset-0 opacity-50" />
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid items-center gap-10 md:grid-cols-[1fr_280px]"
                >
                  <div>
                    <h3 className="text-[28px] font-semibold tracking-headline md:text-[36px] md:tracking-[-1px]">{s.title}</h3>
                    <p className="mt-5 text-base leading-relaxed text-ink-subtle">{s.description}</p>
                    <p className="mt-5 border-l-2 border-primary pl-4 text-lg font-medium text-ink">&ldquo;{s.tagline}&rdquo;</p>
                    <Link href={`/${s.slug}/`} className="btn-secondary group mt-8">
                      Know more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    src={s.illustration}
                    alt="acclogo"
                    className="mx-auto w-[240px] md:w-[280px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Link cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((sv, i) => (
            <Reveal key={sv.slug} delay={i * 0.08}>
              <TiltCard href={`/${sv.slug}/`}>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-md border border-hairline bg-canvas">
                    <img src={sv.icon} alt="acclogo" className="h-7 w-7 object-contain" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-tertiary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-hover" />
                </div>
                <h4 className="mt-10 text-[20px] font-medium tracking-[-0.4px]">{sv.title}</h4>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
