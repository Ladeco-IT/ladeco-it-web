import Image from "next/image";

export default function Home() {
  return (
    <main className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            IT-service op maat
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Modern, persoonlijk en betrouwbaar.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Bij Ladeco IT bouwen we krachtige systemen, ontwikkelen we heldere software en zorgen we dat jouw netwerk stevig staat. Zowel op kantoor als bij je thuis, we komen graag bij je langs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Service</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Assemblage</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">We stellen jouw computer samen met hoogwaardige onderdelen voor professioneel gebruik.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Oplossing</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Software & netwerk</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Software op maat en netwerkoptimalisatie, thuis of op kantoor, met snelle ondersteuning.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Vraag een offerte aan
            </a>
            <a href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400">
              Meer over ons
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-2xl shadow-slate-900/20">
          <div className="rounded-3xl bg-slate-950/90 p-7 shadow-lg shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Waarom kiezen voor ons</p>
            <ul className="mt-8 space-y-6 text-sm leading-7 text-slate-100">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-200 text-slate-950">✓</span>
                <span>Persoonlijke service bij jou thuis of op kantoor.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-200 text-slate-950">✓</span>
                <span>Duurzame computers en toekomstgerichte software.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-200 text-slate-950">✓</span>
                <span>Een helder prijsvoorstel zonder verrassingen.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
