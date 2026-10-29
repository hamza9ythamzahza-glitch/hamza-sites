const works = [
  {
    name: "Memorial Café",
    place: "Béni Mellal",
    tag: "Café",
    line: "Brunch, crêpes et réservation. Un café présenté comme un lieu, pas comme une page de menu.",
    href: "https://golden-strudel-a7c6e4.netlify.app/",
    image: "/work/memorial.jpg",
  },
  {
    name: "PECADO",
    place: "Beni Mellal",
    tag: "Café & gaming",
    line: "Café, crêpes et lounge gaming. Ouvert 24h/24, avec la carte et le lieu sur la même page.",
    href: "https://keen-travesseiro-4c108c.netlify.app/",
    image: "/work/pecado.jpg",
  },
  {
    name: "THE DUNGEON",
    place: "Beni Mellal",
    tag: "Salle",
    line: "Club de powerbuilding. Photos de la salle, horaires d'ouverture et contact WhatsApp.",
    href: "https://the-dungeon-morocco.vercel.app/",
    image: "/work/dungeon.jpg",
  },
  {
    name: "Lola Sahara",
    place: "Cosmétique",
    tag: "YouCan",
    line: "Boutique de cosmétiques naturels. Produits, prix en dirhams, et achat sur YouCan.",
    href: "https://www.lolasaharacosmetique.shop/",
    image: "/work/lola.jpg",
  },
  {
    name: "Luxaura",
    place: "Boutique",
    tag: "Vitrine",
    line: "Vitrine en ligne. Le client choisit et commande sur WhatsApp.",
    href: "https://www.luxaura.space/",
    image: "/work/luxaura.jpg",
  },
];

export function Portfolio() {
  return (
    <div className="bg-bg text-fg">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-display text-2xl tracking-tight">
          Hamza
        </a>
        <a
          href="mailto:hamza9ythamzahza@gmail.com"
          className="inline-flex min-h-10 items-center rounded-full bg-fg px-4 text-sm font-semibold text-bg"
        >
          Me contacter
        </a>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5 pb-20">
        <section className="max-w-3xl pt-10 pb-16 md:pt-16">
          <p className="text-sm font-semibold tracking-widest text-primary">SITES WEB</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
            Des sites pour des commerces qui existent.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Cinq projets en ligne. Ouvre le lien, regarde le travail, puis écris si tu veux le même genre de site.
          </p>
        </section>

        <div className="space-y-16 md:space-y-24">
          {works.map((work, index) => (
            <article key={work.name} className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className={`block overflow-hidden rounded-2xl border border-border md:col-span-7 ${index % 2 ? "md:order-2" : ""}`}
              >
                {work.image ? (
                  <img src={work.image} alt="" className="aspect-[16/10] w-full object-cover object-top" />
                ) : (
                  <div className="flex aspect-[16/10] flex-col justify-end bg-fg p-8 text-bg">
                    <p className="text-sm tracking-widest text-bg/70">YOUCAN</p>
                    <p className="mt-3 font-display text-4xl md:text-5xl" dir="rtl">
                      جمال طبيعي يدوم
                    </p>
                  </div>
                )}
              </a>
              <div className={`md:col-span-5 ${index % 2 ? "md:order-1" : ""}`}>
                <p className="text-sm font-semibold text-primary">
                  {work.tag} · {work.place}
                </p>
                <h2 className="mt-2 font-display text-4xl md:text-5xl">{work.name}</h2>
                <p className="mt-3 text-muted">{work.line}</p>
                <a
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold underline decoration-primary underline-offset-4"
                >
                  Voir le site
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl">Hamza</p>
          <a href="mailto:hamza9ythamzahza@gmail.com" className="text-muted">
            hamza9ythamzahza@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
