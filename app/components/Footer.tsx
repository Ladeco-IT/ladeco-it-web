export default function Footer() {
  return (
    <footer className="mt-5 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-5 text-[color:var(--muted)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">Ladeco IT</p>
          <p className="text-xs">BTW-nummer: 1038.797.150</p>
        </div>
        <div className="text-sm">
          <p>© {new Date().getFullYear()} Ladeco IT.</p>
          <p>Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
