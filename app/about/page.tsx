

export default function AboutPage() {
  return (
    <main className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Over ons</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-slate-100">Professioneel, lokaal en direct inzetbaar.</h1>
        </div>
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <p>
            Ladeco IT helpt particulieren en kleine bedrijven met slimme IT-oplossingen. Van computerbouw en softwareontwikkeling tot netwerkbeheer en snelle support, wij hebben alles in huis om jouw werk soepel te laten verlopen.
          </p>
          <p>
            We werken vanuit ons kantoor, maar komen ook graag bij je thuis om installaties te doen, problemen op te lossen of systemen te optimaliseren. Jouw IT, onze zorg.
          </p>
        </div>
      </div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">Wat we doen</p>
            <p className="mt-3 text-sm leading-7 dark:text-slate-300">
              Computers samenstellen, software bouwen en netwerken beheren. Alles met een persoonlijke aanpak.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">Hoe we werken</p>
            <p className="mt-3 text-sm leading-7 dark:text-slate-300">
              We luisteren naar je wensen en leveren maatwerk dat op de lange termijn werkt, zowel thuis als op kantoor.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
