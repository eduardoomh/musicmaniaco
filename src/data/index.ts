import type { ImageMetadata } from 'astro';
import type { Collection } from '../types/collection';
import type { Profile } from '../types/profile';

const files = import.meta.glob('./*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

const assetImages = import.meta.glob(
  '../assets/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,svg}',
  { eager: true, import: 'default' },
) as Record<string, ImageMetadata>;

function fileKey(name: string) {
  return `./${name.replace(/\.json$/, '')}.json`;
}

function isRemoteUrl(path: string) {
  return /^https?:\/\//.test(path);
}

function assetPathFromReference(path: string) {
  return path.replace(/^\/?src\/assets\//, '').replace(/^\/+/, '');
}

/** Resuelve una imagen de `src/assets` (o deja pasar una URL remota). */
export function resolveAssetImage(path: string): ImageMetadata | string {
  if (isRemoteUrl(path)) return path;

  const relativeToAssets = assetPathFromReference(path);
  const key = `../assets/${relativeToAssets}`;
  const image = assetImages[key];

  if (!image) {
    throw new Error(`No se encontró src/assets/${relativeToAssets}`);
  }

  return image;
}

/** Todos los JSON de `src/data`, indexados por nombre de archivo (sin `.json`). */
export const dataFiles = Object.fromEntries(
  Object.entries(files).map(([path, data]) => [
    path.replace('./', '').replace(/\.json$/, ''),
    data,
  ]),
) as Record<string, unknown>;

export function buildGradientCss(gradient: {
	angle: number;
	stops: { color: string; at: number }[];
}) {
	const stops = gradient.stops.map((stop) => `${stop.color} ${stop.at}%`).join(', ');
	return `linear-gradient(${gradient.angle}deg, ${stops})`;
}

/** Slug de URL derivado del nombre de archivo en `collection.image`. */
export function collectionSlugFromImage(collection: Collection): string {
	const basename = collection.image.replace(/^.*\//, '').replace(/\.[^.]+$/, '');

	return basename
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[''`´]/g, '')
		.toLowerCase()
		.replace(/\s+/g, '-');
}

/** Perfil por `username`. */
export function findProfileByUsername(username: string): Profile | undefined {
	const profiles = loadData<Profile[]>('profiles');
	return profiles.find((profile) => profile.username === username);
}

/** Colecciones de un usuario, en el orden del JSON. */
export function findCollectionsByUsername(username: string): Collection[] {
	const collections = loadData<Collection[]>('collections');
	return collections.filter((collection) => collection.user.username === username);
}

/** Busca una colección por ruta `/{username}/{slug}`. */
export function findCollectionByPath(username: string, slug: string): Collection | undefined {
	const collections = loadData<Collection[]>('collections');

	return collections.find((collection) => {
		if (collection.user.username !== username) return false;
		return collectionSlugFromImage(collection) === slug;
	});
}

/** Lee un JSON concreto, por ejemplo `loadData<Song[]>('songs')`. */
export function loadData<T = unknown>(name: string): T {
  const data = files[fileKey(name)];
  if (data === undefined) {
    throw new Error(`No existe src/data/${name}.json`);
  }
  return data as T;
}
