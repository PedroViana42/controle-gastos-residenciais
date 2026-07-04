const defaultApiBaseUrl = "http://localhost:5155";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? defaultApiBaseUrl;

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao consultar ${path}.`);
  }

  return response.json() as Promise<T>;
}
