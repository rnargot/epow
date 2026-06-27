import { PageShell } from "../components/page-shell";

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <div className="mt-12">
        <a
          href="mailto:howdy@epow.lol"
          className="text-sm uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground"
        >
          howdy@epow.lol
        </a>
      </div>
    </PageShell>
  );
}
