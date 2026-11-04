"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { about } from "@/lib/content";
import Reveal, { WordReveal } from "./Reveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:px-8 lg:grid-cols-[380px_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <h2 className="display-lg mt-6">
            <WordReveal text={about.title} />
          </h2>
        </div>

        <div ref={ref} className="relative pl-8 md:pl-12">
          <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-hairline" />
          <motion.div
            aria-hidden
            style={{ scaleY: line }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-primary-hover via-primary to-primary/0"
          />
          <div className="space-y-10">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-primary bg-canvas md:-left-12"
                  />
                  <p className={`leading-relaxed ${i === 0 ? "text-xl text-ink md:text-[22px]" : "text-lg text-ink-subtle"}`}>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
