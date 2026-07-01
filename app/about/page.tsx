
export default function AboutPage() {
  return (
    <main className="space-y-5">
      <section className="panel p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">Over ons</p>
            <h1 className="headline mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Lokaal, persoonlijk en altijd met de praktijk in gedachten.
            </h1>
          </div>
          <div className="space-y-4 text-[color:var(--muted)]">
            <p>
              Ladeco IT helpt particulieren en kleine bedrijven met praktische IT-oplossingen. We denken niet in standaard packages, maar in wat jij echt nodig hebt om soepel te kunnen werken.
            </p>
            <p>
              We werken vanuit ons kantoor, maar komen ook graag bij je thuis of op kantoor om installaties uit te voeren, problemen op te lossen of systemen te verbeteren. Geen ingewikkelde taal, gewoon helder advies en vakmanschap.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-6 sm:p-7">
          <p className="eyebrow">Wat we doen</p>
          <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
            We bouwen computers, ontwikkelen software en verzorgen netwerkondersteuning. Alles met een persoonlijke aanpak, zodat jouw systeem niet alleen werkt, maar ook prettig blijft gebruiken.
          </p>
        </div>
        <div className="panel-soft p-6 sm:p-7">
          <p className="eyebrow-accent">Hoe we werken</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <li>• We luisteren eerst, voordat we adviseren.</li>
            <li>• We leveren maatwerk dat past bij jouw situatie.</li>
            <li>• We houden het praktisch, duidelijk en duurzaam.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
