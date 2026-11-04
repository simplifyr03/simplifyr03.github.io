import Link from "next/link";
import { nav, services, socials } from "@/lib/content";
import { socialIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-canvas">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-8">
        <div>
          <img src="/images/logo-tight.svg" alt="logo" className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-ink-subtle">where complexity meets simplicity</p>
          <div className="mt-6 flex gap-1">
            {socials.map((s) => {
              const Icon = socialIcon[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-hairline text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterCol title="Company" links={nav.map((n) => ({ label: n.label, href: n.href }))} />
        <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/${s.slug}/` }))} />
        <FooterCol title="Contact" links={[{ label: "Contact Us", href: "/#contact" }]} />
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-6 text-xs text-ink-tertiary md:px-8">
          <span>© {new Date().getFullYear()} Simplifyr</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            One Stop Solution
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[13px] font-medium tracking-[0.4px] text-ink">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-ink-subtle transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
