import { PageShell } from "../components/page-shell";

/**
 * To embed a real video, replace a placeholder entry with:
 * { id: "YOUTUBE_VIDEO_ID", title: "Video title" }
 * e.g. { id: "dQw4w9WgXcQ", title: "My Song" }
 *
 * To add more placeholders, duplicate an entry and leave id as "".
 */
const videos: { id: string; title: string }[] = [
  { id: "", title: "" },
  { id: "", title: "" },
  { id: "", title: "" },
];

function VideoCard({ id, index }: { id: string; index: number }) {
  if (id) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={`Video ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
      <span className="text-xs uppercase tracking-widest text-foreground/30">
        Coming soon
      </span>
    </div>
  );
}

export default function VideoPage() {
  return (
    <PageShell title="Video">
      <div className="mt-8 flex flex-col gap-8">
        <a
          href="https://www.youtube.com/@epowowow"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 self-start rounded-full border border-foreground/10 px-5 py-2.5 transition hover:border-foreground/30 hover:bg-foreground/5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#FF0000] transition-transform group-hover:scale-110"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="text-sm uppercase tracking-widest text-foreground/60 group-hover:text-foreground/90">
            YouTube — @epowowow
          </span>
        </a>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={i} id={video.id} index={i} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
