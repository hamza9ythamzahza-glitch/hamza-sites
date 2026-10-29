import { useEffect, useState } from "react";
import { Clock, Instagram, MapPin, Menu, MessageCircle, Plus, X } from "lucide-react";

const WA =
  "https://wa.me/212705957902?text=" +
  encodeURIComponent("Hi, I want to join THE DUNGEON");
const MAP =
  "https://www.google.com/maps/search/?api=1&query=THE+DUNGEON+GYM+Avenue+Mohammed+VI+Beni+Mellal";
const IG = "https://www.instagram.com/the.dungeon.club/";

const services = [
  {
    title: "Powerbuilding",
    text: "Heavy lifts and muscle in the same session. The floor is built around iron.",
    image: "/photos/floor.jpg",
  },
  {
    title: "Musculation",
    text: "Machines and free weights for daily training, from the first session to advanced work.",
    image: "/photos/angle.jpg",
  },
  {
    title: "For Girls",
    text: "A dedicated space. Comfortable, serious, and separate.",
    image: "/photos/consistency.jpg",
  },
];

const shots = [
  { src: "/photos/exterior.jpg", label: "The front" },
  { src: "/photos/racks.jpg", label: "The floor" },
  { src: "/photos/floor.jpg", label: "Iron" },
  { src: "/photos/stairs.jpg", label: "Stairs" },
  { src: "/photos/reception.jpg", label: "Reception" },
  { src: "/photos/members.jpg", label: "The room" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const columns = ["Powerbuilding", "Musculation", "Cardio", "For Girls", "Open floor"];

const links = [
  ["#top", "Home"],
  ["#programs", "Programs"],
  ["#schedule", "Schedule"],
  ["#about", "About"],
  ["#contact", "Contact"],
];

function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Casablanca",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
      const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
      const mins = hour * 60 + minute;
      const sunday = weekday.startsWith("Sun");
      const start = sunday ? 9 * 60 : 8 * 60;
      const end = sunday ? 15 * 60 : 23 * 60 + 30;
      setOpen(mins >= start && mins < end);
    };
    read();
    const id = window.setInterval(read, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return open;
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("reveal-in");
        }
      },
      { threshold: 0.16 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}

export function DungeonSite() {
  const open = useOpenNow();
  const [menu, setMenu] = useState(false);
  useReveal();

  useEffect(() => {
    const bar = document.getElementById("scroll-bar");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenu(false);
  const status = open === null ? "…" : open ? "Open now" : "Closed now";

  return (
    <div className="bg-bg text-fg">
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary" id="scroll-bar" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-3xl leading-none tracking-wide text-fg">
            THE <span className="text-primary">DUNGEON</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="text-sm text-muted hover:text-fg">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs text-muted lg:flex">
              <span className={`h-2 w-2 rounded-full ${open ? "bg-primary" : "bg-border"}`} />
              {status}
            </span>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-10 items-center rounded-full bg-primary px-5 text-sm font-bold text-primary-fg transition-transform duration-150 ease-out active:scale-[0.96] md:inline-flex"
            >
              Join now
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-fg md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((value) => !value)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menu ? (
          <nav className="flex flex-col border-t border-border px-5 py-4 md:hidden">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={close} className="py-3 text-lg text-fg">
                {label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noreferrer" onClick={close} className="py-3 text-lg text-primary">
              Join now
            </a>
          </nav>
        ) : null}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-10 pt-28 pb-16 md:grid-cols-2 md:pt-32 md:pb-24">
          <div>
            <p className="rise rise-1 text-sm font-bold tracking-widest text-primary">POWERBUILDING CLUB</p>
            <h1 className="rise rise-2 mt-4 text-5xl font-extrabold leading-[0.95] md:text-7xl">
              THE
              <span className="mt-1 block text-primary">DUNGEON</span>
            </h1>
            <p className="rise rise-3 mt-5 max-w-md text-muted">
              A hardcore training floor in Beni Mellal. Strength, muscle, and a room built for women.
            </p>
            <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-fg transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                <MessageCircle size={18} />
                Get started
              </a>
              <a
                href="#programs"
                className="inline-flex min-h-11 items-center rounded-full border border-fg/30 px-6 font-bold text-fg"
              >
                Explore more
              </a>
            </div>
          </div>
          <div className="rise rise-3 overflow-hidden rounded-2xl">
            <img src="/photos/racks.jpg" alt="The Dungeon training floor" className="aspect-[4/5] w-full object-cover" />
          </div>
        </section>

        <section id="programs" className="py-16 md:py-24">
          <div className="reveal mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-3xl font-extrabold tracking-wide md:text-4xl">OUR PROGRAMS</h2>
            <p className="mt-3 text-muted">The floor, the machines, and a room for women.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="reveal group relative min-h-72 overflow-hidden rounded-2xl">
                <img src={service.image} alt="" className="photo-zoom absolute inset-0 h-full w-full object-cover transition duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/45 to-bg/10" />
                <div className="relative flex min-h-72 items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-wide">{service.title.toUpperCase()}</h3>
                    <p className="mt-1 max-w-sm text-sm text-muted">{service.text}</p>
                  </div>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ask about ${service.title} on WhatsApp`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-fg transition-transform duration-150 ease-out active:scale-[0.96]"
                  >
                    <Plus size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="grid items-center gap-10 py-8 md:grid-cols-2 md:py-16">
          <div className="reveal overflow-hidden rounded-2xl">
            <img src="/photos/stairs.jpg" alt="Stairs down to the training floor" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="reveal">
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
              GIVE SHAPE TO
              <span className="mt-1 block">YOUR TRAINING.</span>
            </h2>
            <p className="mt-5 text-muted">
              THE DUNGEON is a powerbuilding and fitness club on Avenue Mohammed VI. Heavy equipment, a hard room, and people who train to get stronger.
            </p>
            <p className="mt-4 text-muted">Doors: Monday–Saturday 08:00–23:30, Sunday 09:00–15:00.</p>
            <a
              href="#gallery"
              className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 font-bold text-primary-fg transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              See the floor
            </a>
          </div>
        </section>

        <section id="schedule" className="py-16 md:py-24">
          <div className="reveal mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-wide md:text-4xl">OUR SCHEDULE</h2>
            <p className="mt-3 text-muted">Class times are marked X until the club sends the real slots.</p>
          </div>
          <div className="reveal overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-2 text-center text-sm">
              <thead>
                <tr>
                  <th className="rounded-lg bg-primary px-3 py-4 font-extrabold text-primary-fg">Classes</th>
                  {columns.map((column) => (
                    <th key={column} className="rounded-lg bg-surface px-3 py-4 font-semibold text-fg">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <th scope="row" className="rounded-lg bg-surface px-3 py-4 font-extrabold text-primary">
                      {day}
                    </th>
                    {columns.map((column) => (
                      <td key={column} className="rounded-lg border border-border px-3 py-4 font-bold text-muted">
                        X
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="gallery" className="py-8">
          <div className="reveal mb-6">
            <h2 className="text-3xl font-extrabold tracking-wide">THE FLOOR</h2>
          </div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {shots.map((shot) => (
              <figure key={shot.label} className="reveal relative h-72 w-64 shrink-0 snap-center overflow-hidden rounded-2xl md:h-80 md:w-80">
                <img src={shot.src} alt={shot.label} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-bg/75 px-4 py-3 text-sm font-bold">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="reveal">
            <p className="text-sm font-bold tracking-widest text-primary">CONTACT</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
              WhatsApp only.
              <span className="mt-2 block text-muted">No forms.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">Membership and class times — message the team directly.</p>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-7 text-lg font-bold text-primary-fg transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <MessageCircle size={20} />
              +212 705-957902
            </a>
          </div>
          <div className="reveal space-y-5 rounded-2xl border border-border bg-surface p-6">
            <div className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-primary" size={18} />
              <div>
                <p className="font-bold">Address</p>
                <p className="text-muted">Avenue Mohammed VI, Beni Mellal 23000</p>
                <a href={MAP} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-primary">
                  Open the map
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-primary" size={18} />
              <div>
                <p className="font-bold">Doors</p>
                <p className="text-muted">Mon–Sat 08:00–23:30 · Sun 09:00–15:00</p>
                <p className="text-muted">{status}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Instagram className="mt-1 shrink-0 text-primary" size={18} />
              <div>
                <p className="font-bold">Instagram</p>
                <a href={IG} target="_blank" rel="noreferrer" className="text-muted">
                  @the.dungeon.club
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <p className="font-display text-3xl leading-none">
            THE <span className="text-primary">DUNGEON</span>
          </p>
          <p className="text-sm text-muted">Powerbuilding & Fitness · Beni Mellal · © 2026</p>
        </div>
      </footer>
    </div>
  );
}
