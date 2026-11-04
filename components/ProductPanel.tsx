"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/content";

export default function ProductPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % services.length), 3200);
    return () => clearInterval(t);
  }, []);
  const s = services[active];

  return (
    <div ref={ref} className="relative mx-auto mt-20 max-w-[1120px] px-5 pb-24 [perspective:1600px] md:mt-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}
          className="relative rounded-xl border border-hairline bg-surface-1/80 p-2 shadow-[0_40px_120px_-20px_rgba(94,106,210,0.35)] backdrop-blur"
        >
          <div aria-hidden className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-primary-hover to-transparent" />
          <div className="overflow-hidden rounded-lg border border-hairline bg-canvas">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-tertiary" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-tertiary" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-tertiary" />
              <span className="ml-4 rounded-sm border border-hairline bg-surface-1 px-3 py-0.5 font-mono text-[11px] text-ink-tertiary">
                simplifyr.in/{s.slug}
              </span>
            </div>

            <div className="grid min-h-[340px] grid-cols-1 sm:grid-cols-[220px_1fr] md:min-h-[420px]">
              {/* Sidebar */}
              <aside className="hidden border-r border-hairline bg-surface-1/60 p-3 sm:block">
                <div className="mb-3 flex items-center gap-2 px-2 py-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded-xs bg-primary text-[10px] font-semibold">S</span>
                  <span className="text-sm font-medium">Simplifyr</span>
                </div>
                <p className="px-2 pb-1 pt-2 text-[11px] font-medium tracking-[0.4px] text-ink-tertiary">Our Services</p>
                <ul className="space-y-0.5">
                  {services.map((sv, i) => (
                    <li key={sv.slug}>
                      <button
                        onClick={() => setActive(i)}
                        className={`relative flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-[13px] transition-colors ${
                          i === active ? "text-ink" : "text-ink-subtle hover:text-ink-muted"
                        }`}
                      >
                        {i === active && (
                          <motion.span
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-md border border-hairline-strong bg-surface-3"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        )}
                        <img src={sv.icon} alt="" className="relative h-4 w-4 object-contain" />
                        <span className="relative">{sv.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main */}
              <div className="relative overflow-hidden p-6 md:p-8">
                <div aria-hidden className="grid-bg mask-fade-b absolute inset-0 opacity-40" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.45 }}
                    className="relative grid h-full items-center gap-6 md:grid-cols-[1fr_260px]"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-ink-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 text-[28px] font-semibold tracking-headline">{s.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-subtle">&ldquo;{s.tagline}&rdquo;</p>
                      <div className="mt-6 h-1 w-full max-w-sm overflow-hidden rounded-full bg-surface-3">
                        <motion.div
                          key={s.slug}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.2, ease: "linear" }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                    <img src={s.illustration} alt={s.title} className="mx-auto hidden h-[240px] w-auto md:block" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
