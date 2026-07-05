import { apiDelete, apiGet, apiPost } from "./httpClient";
import type { Pessoa, TipoTransacao, TotaisResponse, Transacao } from "../types/api";

interface CriarPessoaRequest {
  nome: string;
  idade: number;
}

interface CriarTransacaoRequest {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export function listarPessoas() {
  return apiGet<Pessoa[]>("/api/pessoas");
}

export function criarPessoa(request: CriarPessoaRequest) {
  return apiPost<CriarPessoaRequest, Pessoa>("/api/pessoas", request);
}

export function excluirPessoa(id: number) {
  return apiDelete(`/api/pessoas/${id}`);
}

export function listarTransacoes() {
  return apiGet<Transacao[]>("/api/transacoes");
}

export function criarTransacao(request: CriarTransacaoRequest) {
  return apiPost<CriarTransacaoRequest, Transacao>("/api/transacoes", request);
}

export function consultarTotais() {
  return apiGet<TotaisResponse>("/api/totais");
}
