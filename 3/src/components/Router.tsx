import { useEffect, useState, type ReactNode } from "react";

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export function HashRouter({ routes }: { routes: Record<string, ReactNode> }) {
  const hash = useHashRoute();
  const path = hash.replace("#", "") || "/";
  const route = routes[path] ?? routes["/"];
  return <>{route}</>;
}
