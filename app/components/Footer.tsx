export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[color:var(--border)]/60 pt-8 text-sm text-[color:var(--muted)]">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">Ladeco IT</p>
          <p className="font-semibold text-[color:var(--foreground)]">Praktische IT, eerlijk en dichtbij.</p>
        </div>
        <div className="space-y-1 text-right">
          <p>BTW-nummer: 1038.797.150</p>
          <p>© {new Date().getFullYear()} Ladeco IT. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
