
export default function Home() {
  return (
    <main className="space-y-5">
      <section className="panel overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-6">
            <p className="eyebrow">IT-service op maat</p>
            <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
              IT-oplossingen die hun werk doen, zonder veel ophef.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Bij Ladeco IT bouwen we computers, software en netwerken met aandacht voor detail. We helpen particulieren en kleine bedrijven rustig, praktisch en zonder onnodige fratsen verder.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="story-link justify-center sm:justify-start">
                Vraag een offerte aan
                <span aria-hidden="true">↗</span>
              </a>
              <a href="/about" className="story-link justify-center sm:justify-start">
                Meer over ons
              </a>
            </div>
          </div>

          <div className="panel-soft p-6 sm:p-7">
            <p className="eyebrow-accent">Wat we graag doen</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[0.8rem] text-white">•</span>
                <span>Persoonlijke service bij jou thuis of op kantoor.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[0.8rem] text-white">•</span>
                <span>Duurzame systemen, helder advies en praktische ondersteuning.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[0.8rem] text-white">•</span>
                <span>Een prijsvoorstel dat je begrijpt en waar je op kunt vertrouwen.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="panel p-6">
          <p className="stat-pill">Assemblage</p>
          <h2 className="mt-4 text-xl font-semibold text-[color:var(--foreground)]">Sterke machines, zorgvuldig samengesteld.</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            We bouwen computers met onderdelen die passen bij jouw werk, hobby of dagelijks gebruik.
          </p>
        </article>
        <article className="panel p-6">
          <p className="stat-pill">Software</p>
          <h2 className="mt-4 text-xl font-semibold text-[color:var(--foreground)]">Duidelijke tools voor echte situaties.</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Van slimme automatisering tot praktische oplossingen die echt helpen op het werk.
          </p>
        </article>
        <article className="panel p-6">
          <p className="stat-pill">Netwerk</p>
          <h2 className="mt-4 text-xl font-semibold text-[color:var(--foreground)]">Stabiele verbindingen, weinig gedoe.</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            We zorgen voor een netwerk dat betrouwbaar is, ook als alles tegelijk gebruikt wordt.
          </p>
        </article>
      </section>
    </main>
  );
}
