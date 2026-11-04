"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, Send, CheckCircle2 } from "lucide-react";
import { contact, emailjs as ej } from "@/lib/content";
import Reveal, { WordReveal } from "./Reveal";

const empty = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus({ ok: false, msg: "Please fill all the fields" });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        ej.serviceId,
        ej.templateId,
        {
          from_name: form.name,
          to_name: "Simplifyr",
          from_email: form.email,
          from_phone: form.phone,
          to_email: ej.toEmail,
          message: form.message,
        },
        { publicKey: ej.publicKey },
      );
      setStatus({ ok: true, msg: "Thank you. I will get back to you as soon as possible." });
      setForm(empty);
    } catch {
      setStatus({ ok: false, msg: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(94,106,210,0.22),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">Contact Us</span>
          </Reveal>
          <h2 className="display-lg mt-6">
            <WordReveal text={contact.title} />
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <form onSubmit={onSubmit} className="panel space-y-4 p-6 md:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your Name">
                  <input className="input" value={form.name} onChange={set("name")} autoComplete="name" />
                </Field>
                <Field label="Your Email">
                  <input className="input" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                </Field>
              </div>
              <Field label="Your Phone Number">
                <input className="input" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
              </Field>
              <Field label="Your Message">
                <textarea className="input h-36 resize-none py-3" value={form.message} onChange={set("message")} />
              </Field>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-ink-subtle transition-colors hover:text-ink"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-hairline bg-canvas text-primary-hover">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="text-ink-tertiary">E-MAIL :</span> {contact.email}
                  </span>
                </a>
                <button type="submit" disabled={loading} className="btn-primary min-w-[120px] disabled:opacity-70">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send
                </button>
              </div>

              <AnimatePresence>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 text-sm ${status.ok ? "text-success" : "text-ink-muted"}`}
                  >
                    {status.ok && <CheckCircle2 className="h-4 w-4" />}
                    {status.msg}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.img
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/images/contact.svg"
              alt="contact"
              className="mx-auto w-full max-w-[520px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-muted">{label}</span>
      {children}
    </label>
  );
}
