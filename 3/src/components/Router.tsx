import { useEffect, useState, type ReactNode } from "react";

function normalizeHashPath(hash: string) {
  const rawPath = hash.replace(/^#/, "").split("?")[0].split("#")[0] || "/";
  const trimmed = rawPath.replace(/\/+$/, "");
  return trimmed || "/";
}

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#/`);
      setHash("#/");
    }

    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export function HashRouter({ routes }: { routes: Record<string, ReactNode> }) {
  const hash = useHashRoute();
  const path = normalizeHashPath(hash);
  const route = routes[path] ?? routes["/"];
  return <>{route}</>;
}
