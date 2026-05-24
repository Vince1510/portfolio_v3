import { useState, useEffect } from "react";

/**
 * Lazily imports a data module and returns its named export.
 *
 * @param importFn  - A function that returns a dynamic import (e.g. `() => import("../data/moviesData")`)
 * @param exportKey - The named export to pull out of the module (e.g. `"moviesData"`)
 *
 * @example
 * const { data: movies, loading } = useData(
 *   () => import("../../data/moviesData"),
 *   "moviesData"
 * );
 */
export function useData<T>(
  importFn: () => Promise<Record<string, T>>,
  exportKey: string
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    importFn().then((module) => {
      if (!cancelled) {
        setData(module[exportKey] ?? null);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
