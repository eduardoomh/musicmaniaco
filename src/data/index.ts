import type { ImageMetadata } from 'astro';

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

/** Resuelve una imagen de `src/assets` (o deja pasar una URL remota). */
export function resolveAssetImage(path: string): ImageMetadata | string {
  if (isRemoteUrl(path)) return path;

  const relativeToAssets = path.replace(/^\/?src\/assets\//, '');
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

/** Lee un JSON concreto, por ejemplo `loadData<Song[]>('songs')`. */
export function loadData<T = unknown>(name: string): T {
  const data = files[fileKey(name)];
  if (data === undefined) {
    throw new Error(`No existe src/data/${name}.json`);
  }
  return data as T;
}
