export function asset(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${cleanPath}`;
}
