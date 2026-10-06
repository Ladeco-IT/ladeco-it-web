export type Lang = "nl" | "en";

export function resolveLang(value: string | string[] | null | undefined): Lang {
  const normalized = Array.isArray(value) ? value[0] : value;

  return normalized === "en" ? "en" : "nl";
}

export function oppositeLang(lang: Lang): Lang {
  return lang === "nl" ? "en" : "nl";
}

export function langLabel(lang: Lang) {
  return lang === "nl" ? "Nederlands" : "English";
}

export function buildLocalizedHref(
  pathname: string,
  currentSearchParams: string,
  lang: Lang,
) {
  const params = new URLSearchParams(currentSearchParams);

  if (lang === "nl") {
    params.delete("lang");
  } else {
    params.set("lang", lang);
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
