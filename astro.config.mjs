// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// URL pública del sitio (previews en redes y sitemap). Ajusta al dominio real en producción.
	site: 'https://musicmaniaco.com',
	devToolbar: {
		enabled: false,
	},
	server: {
		host: true,
	},
	vite: {
		server: {
			// Túneles (Pinggy, ngrok, etc.): subdominios *.free.pinggy.net
			allowedHosts: [
				'bifnv-2806-2f0-4680-fbbc-e467-2d18-bcc7-6585.free.pinggy.net',
				"apijp-2806-2f0-4680-fbbc-e467-2d18-bcc7-6585.run.pinggy-free.link",
				'.free.pinggy.net',
				'.pinggy.net',
			],
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900'],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
	],
});
