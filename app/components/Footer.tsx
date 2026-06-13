export default function Footer() {
  return (
    <footer className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2">
        <div>
          <p className="text-sm font-semibold text-slate-950">Ladeco IT</p>
          <p className="text-xs text-slate-600">BTW-nummer: 1038.797.150</p>
        </div>
        <div className="text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Ladeco IT. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
