/** Texto plano para meta description (Open Graph / Twitter). */
export function truncateMetaDescription(text: string, maxLength = 200): string {
	const normalized = text.replace(/\s+/g, ' ').trim();
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

/** Convierte una ruta de asset o pathname en URL absoluta. */
export function absoluteUrl(path: string, base: URL | string): string {
	return new URL(path, base).href;
}

export function siteOrigin(site: URL | string | undefined, fallback: URL): URL | string {
	return site ?? fallback;
}
