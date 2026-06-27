import { MailingListSignup } from "../components/mailing-list-signup";
import { PageShell } from "../components/page-shell";

export default function UpdatesPage() {
  return (
    <PageShell title="Updates">
      <div className="mt-12 flex flex-col items-start gap-6">
        <p className="text-sm uppercase tracking-widest text-foreground/40">
          No updates yet — sign up to stay in the loop.
        </p>
        <MailingListSignup />
      </div>
    </PageShell>
  );
}
