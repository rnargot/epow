import Link from "next/link";

const navItems = [
  { href: "/music", label: "Music" },
  { href: "/video", label: "Video" },
  { href: "/events", label: "Events" },
  { href: "/merch", label: "Merch" },
  { href: "/updates", label: "Updates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav({
  overlay = false,
  vertical = false,
}: {
  overlay?: boolean;
  vertical?: boolean;
}) {
  const linkClass = overlay
    ? "px-2 py-1 text-white/90 transition-colors hover:text-white"
    : "px-2 py-1 text-foreground/70 transition-colors hover:text-foreground";

  const navClass = vertical
    ? "flex flex-col items-start gap-y-2 text-sm uppercase tracking-widest"
    : "flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm uppercase tracking-widest";

  return (
    <nav className={navClass}>
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
