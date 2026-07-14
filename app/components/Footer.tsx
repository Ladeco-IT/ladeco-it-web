import { type Lang } from "../lib/i18n";

type FooterProps = {
  lang: Lang;
};

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="mt-10 border-t border-[color:var(--border)]/60 pt-8 text-sm text-[color:var(--muted)]">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">Ladeco IT</p>
          <p className="font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Praktische IT, eerlijk en dichtbij." : "Practical IT, honest and close by."}</p>
        </div>
        <div className="space-y-1 text-right">
          <p>{lang === "nl" ? "BTW-nummer" : "VAT number"}: 1038.797.150</p>
          <p>© {new Date().getFullYear()} Ladeco IT. {lang === "nl" ? "Alle rechten voorbehouden." : "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}
