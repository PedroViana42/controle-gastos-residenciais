import { useCallback, useEffect, useState } from "react";

interface ApiResourceState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  reload: () => void;
}

export function useApiResource<T>(loader: () => Promise<T>): ApiResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(0);

  const reload = useCallback(() => {
    setVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await loader();

        if (isActive) {
          setData(result);
        }
      } catch (exception) {
        if (isActive) {
          setError(exception instanceof Error ? exception.message : "Erro inesperado.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, [loader, version]);

  return { data, error, isLoading, reload };
}
