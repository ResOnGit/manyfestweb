/** Prefix a file in `public/` with Vite's base (`/manyfestweb/` in prod). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const trimmed = path.replace(/^\//, "");
  return `${base}${trimmed}`;
}
