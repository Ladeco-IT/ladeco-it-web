
export default function AboutPage() {
  return (
    <main className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">Over ons</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            IT die eerlijk, helder en klantgericht werkt.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Ladeco IT staat voor een goede prijs-kwaliteitverhouding, een service die je verder helpt en respect voor de klant in elke stap van het proces.
          </p>
        </div>

        <div className="bg-[color:var(--surface)] border border-[color:var(--border)] p-6 text-[color:var(--muted)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">Onze kernwaarden</p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Prijs-kwaliteit</p>
              <p className="mt-2 text-base leading-7">
                Eerlijke oplossingen die passen bij jouw budget en die lang meegaan.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Goede service</p>
              <p className="mt-2 text-base leading-7">
                Snelle terugkoppeling en een daadkrachtige aanpak, ook nadat de opdracht klaar is.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Respect</p>
              <p className="mt-2 text-base leading-7">
                We luisteren naar jouw wensen, houden rekening met jouw omgeving en communiceren open.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">Wat je van ons krijgt</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">Geen verrassing, geen onnodige franje.</h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            We geven je een helder advies, een praktische uitvoering en een prijs die past bij wat je echt nodig hebt.
          </p>
        </div>

        <div className="space-y-6 text-[color:var(--muted)]">
          <div className="flex items-start gap-4">
            <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)]"></span>
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Duidelijke offertes</p>
              <p className="mt-2 text-base leading-7">
                Alles staat overzichtelijk op papier, zodat je direct weet waar je aan toe bent.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)]"></span>
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Snelle service</p>
              <p className="mt-2 text-base leading-7">
                We reageren snel op vragen en lossen problemen op zonder lang te wachten.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)]"></span>
            <div>
              <p className="font-semibold text-[color:var(--foreground)]">Betrouwbaarheid</p>
              <p className="mt-2 text-base leading-7">
                Onze planning is realistisch en we houden ons aan de afspraken die we maken.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-t border-[color:var(--border)]/40 pt-4 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Eerlijk</p>
            <p className="mt-2 text-sm leading-6">Duidelijke prijzen en heldere afspraken.</p>
          </div>
          <div className="border-t border-[color:var(--border)]/40 pt-4 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Lokaal</p>
            <p className="mt-2 text-sm leading-6">We kennen de regio en werken dichtbij onze klanten.</p>
          </div>
          <div className="border-t border-[color:var(--border)]/40 pt-4 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Praktisch</p>
            <p className="mt-2 text-sm leading-6">Geen mooie woorden, maar direct toepasbare oplossingen.</p>
          </div>
          <div className="border-t border-[color:var(--border)]/40 pt-4 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Rust</p>
            <p className="mt-2 text-sm leading-6">Zodat jij vertrouwen hebt in je IT.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
