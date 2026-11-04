"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function TiltCard({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const border = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(130,143,255,0.55), transparent 70%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    rx.set((0.5 - py) * 8);
    ry.set((px - 0.5) * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry }} className="[perspective:800px]">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative block rounded-lg p-px"
      >
        <span aria-hidden className="absolute inset-0 rounded-lg bg-hairline" />
        <motion.span
          aria-hidden
          style={{ background: border }}
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="relative block rounded-[11px] bg-surface-1 p-6 transition-colors duration-300 group-hover:bg-surface-2">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
