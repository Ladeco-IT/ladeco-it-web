import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">IT-service op maat</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            IT-oplossingen die hun werk doen, zonder veel ophef.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
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

        <div className="relative h-[320px] w-full overflow-hidden rounded-md">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src="/logo.png"
              alt="Logo Ladeco IT"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src="/computer_maken.png"
              alt="Computerassemblage in progress"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="eyebrow">Assemblage</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            Sterke machines, zorgvuldig samengesteld.
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            We bouwen computers met onderdelen die passen bij jouw werk, hobby of dagelijks gebruik.
          </p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow">Software</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            Duidelijke tools voor echte situaties.
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Van slimme automatisering tot praktische oplossingen die echt helpen op het werk.
          </p>
        </div>

        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src="/software_maken.png"
              alt="Softwareontwikkeling op een laptop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src="/basis_foto.png"
              alt="IT-werkplek met netwerkapparatuur"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="eyebrow">Netwerk</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            Stabiele verbindingen, weinig gedoe.
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            We zorgen voor een netwerk dat betrouwbaar is, ook als alles tegelijk gebruikt wordt.
          </p>
        </div>
      </section>
    </main>
  );
}
