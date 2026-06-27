import { MailingListSignup } from "../components/mailing-list-signup";
import { PageShell } from "../components/page-shell";

export default function EventsPage() {
  return (
    <PageShell title="Events">
      <div className="mt-12 flex flex-col items-start gap-6">
        <p className="text-sm uppercase tracking-widest text-foreground/40">
          No upcoming events — sign up to be the first to know.
        </p>
        <MailingListSignup />
      </div>
    </PageShell>
  );
}
