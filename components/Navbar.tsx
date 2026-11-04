"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, socials } from "@/lib/content";
import { socialIcon } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled ? "border-b border-hairline bg-canvas/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center" aria-label="Simplifyr home">
            <img src="/images/logo-tight.svg" alt="logo" className="h-7 w-auto md:h-8" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-ink-subtle transition-colors hover:bg-surface-1 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 md:flex">
            {socials.map((s) => {
              const Icon = socialIcon[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-md text-ink-subtle transition-colors hover:bg-surface-1 hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
            <Link href="/#contact" className="btn-primary ml-2 h-9">
              Get Started
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-hairline bg-surface-1 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 mt-2 rounded-lg border border-hairline bg-surface-1/95 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-ink-muted hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-hairline px-1 pt-3">
              {socials.map((s) => {
                const Icon = socialIcon[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-md text-ink-subtle hover:bg-surface-2 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
