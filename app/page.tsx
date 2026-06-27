import bgImage from "./duality.jpg";
import { MailingListSignup } from "./components/mailing-list-signup";
import { SiteNav } from "./components/site-nav";

export default function Home() {
  return (
    <div
      className="relative flex flex-1 min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <SiteNav overlay />
        <MailingListSignup />
      </div>
    </div>
  );
}
