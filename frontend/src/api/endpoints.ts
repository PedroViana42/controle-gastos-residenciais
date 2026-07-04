import { apiGet } from "./httpClient";
import type { Pessoa, TotaisResponse, Transacao } from "../types/api";

export function listarPessoas() {
  return apiGet<Pessoa[]>("/api/pessoas");
}

export function listarTransacoes() {
  return apiGet<Transacao[]>("/api/transacoes");
}

export function consultarTotais() {
  return apiGet<TotaisResponse>("/api/totais");
}
