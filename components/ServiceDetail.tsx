"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import Reveal, { WordReveal } from "./Reveal";
import TiltCard from "./TiltCard";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServiceDetail({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug)!;
  const others = services.filter((x) => x.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="grid-bg mask-radial absolute inset-0" />
          <div className="absolute left-1/2 top-[-260px] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.25),transparent_65%)] blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
          <Reveal>
            <Link href="/#services" className="inline-flex items-center gap-2 text-sm text-ink-subtle transition-colors hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> Our Services
            </Link>
          </Reveal>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease }}
                className="grid h-14 w-14 place-items-center rounded-lg border border-hairline bg-surface-1"
              >
                <img src={s.icon} alt="acclogo" className="h-8 w-8 object-contain" />
              </motion.span>
              <h1 className="display-xl mt-8">
                <WordReveal text={s.title} delay={0.1} />
              </h1>
              <Reveal delay={0.4}>
                <p className="mt-8 text-lg leading-relaxed text-ink-subtle">{s.description}</p>
              </Reveal>
              <Reveal delay={0.55}>
                <p className="mt-6 border-l-2 border-primary pl-4 text-xl font-medium text-ink">&ldquo;{s.tagline}&rdquo;</p>
              </Reveal>
              <Reveal delay={0.7}>
                <Link href="/#contact" className="btn-primary group mt-10 h-11 px-5">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="panel p-8 [perspective:1200px]"
            >
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={s.illustration}
                alt={s.title}
                className="mx-auto w-full max-w-[420px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline py-20">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <Reveal>
            <h2 className="text-[28px] font-semibold tracking-headline">Our Services</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <TiltCard href={`/${o.slug}/`}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-md border border-hairline bg-canvas">
                      <img src={o.icon} alt="acclogo" className="h-7 w-7 object-contain" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink-tertiary transition-all group-hover:text-primary-hover" />
                  </div>
                  <h3 className="mt-10 text-[20px] font-medium tracking-[-0.4px]">{o.title}</h3>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
