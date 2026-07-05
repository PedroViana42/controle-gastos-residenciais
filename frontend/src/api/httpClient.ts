const defaultApiBaseUrl = "http://localhost:5155";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? defaultApiBaseUrl;

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  await ensureSuccess(response, `Erro ${response.status} ao consultar ${path}.`);

  return response.json() as Promise<T>;
}

export async function apiPost<TRequest, TResponse>(
  path: string,
  body: TRequest
): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  await ensureSuccess(response, `Erro ${response.status} ao enviar dados para ${path}.`);

  return response.json() as Promise<TResponse>;
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "DELETE"
  });

  await ensureSuccess(response, `Erro ${response.status} ao excluir registro em ${path}.`);
}

async function ensureSuccess(response: Response, fallbackMessage: string): Promise<void> {
  if (response.ok) {
    return;
  }

  try {
    const body = (await response.json()) as { erro?: string; title?: string };
    throw new Error(body.erro ?? body.title ?? fallbackMessage);
  } catch (error) {
    if (error instanceof Error && error.message !== "Unexpected end of JSON input") {
      throw error;
    }

    throw new Error(fallbackMessage);
  }
}
