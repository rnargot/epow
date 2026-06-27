import Image from "next/image";
import bgImage from "./fabric.jpg";
import logoImage from "./napkin.png";
import toothpickImage from "./toothpick.jpg";
import { MailingListSignup } from "./components/mailing-list-signup";
import { SiteNav } from "./components/site-nav";

export default function Home() {
  return (
    <div
      className="relative flex flex-1 min-h-screen w-full items-start justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="absolute top-8 left-8 z-10">
        <SiteNav overlay vertical />
      </div>
      <div className="absolute right-[-10%] bottom-[5%] z-10 w-[40%]" style={{ transform: "rotate(230deg)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nokia.jpg" alt="" className="w-full h-auto" />
      </div>
      <div className="relative z-10 flex w-[60%] flex-col items-center gap-6 pt-0 self-start mt-0">
        <div className="relative w-full">
          <Image src={logoImage} alt="" className="w-full h-auto" priority />
          <span
            className="absolute inset-0 flex items-start justify-center pt-[8%] text-[8vw] leading-none"
            style={{
              fontFamily: "var(--font-face-of-yesterday), cursive",
              color: "#C9A84C",
              textShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            EPOW
          </span>
        </div>
        <span
          className="text-[4vw] leading-none"
          style={{ fontFamily: "var(--font-spete), sans-serif", color: "#800020" }}
        >
          7.31.2026
        </span>
        <MailingListSignup
          overlay
          middle={<Image src={toothpickImage} alt="" className="w-1/2 h-auto" />}
        />
      </div>
    </div>
  );
}
