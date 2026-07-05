import { FormEvent, useCallback, useMemo, useState } from "react";
import { criarTransacao, listarPessoas, listarTransacoes } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";
import type { TipoTransacao } from "../types/api";
import { formatCurrency } from "../utils/formatters";

export function TransacoesPage() {
  const transacoesLoader = useCallback(() => listarTransacoes(), []);
  const pessoasLoader = useCallback(() => listarPessoas(), []);
  const {
    data: transacoesData,
    error: transacoesError,
    isLoading: isLoadingTransacoes,
    reload: reloadTransacoes
  } = useApiResource(transacoesLoader);
  const {
    data: pessoasData,
    error: pessoasError,
    isLoading: isLoadingPessoas,
    reload: reloadPessoas
  } = useApiResource(pessoasLoader);
  const [pessoaId, setPessoaId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>("Expense");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const transacoes = transacoesData ?? [];
  const pessoas = pessoasData ?? [];
  const selectedPessoa = useMemo(
    () => pessoas.find((pessoa) => pessoa.id === Number(pessoaId)),
    [pessoaId, pessoas]
  );
  const isSelectedPessoaMinor = Boolean(selectedPessoa && selectedPessoa.idade < 18);

  function handlePessoaChange(nextPessoaId: string) {
    const pessoa = pessoas.find((item) => item.id === Number(nextPessoaId));

    setPessoaId(nextPessoaId);

    if (pessoa && pessoa.idade < 18 && tipo === "Income") {
      setTipo("Expense");
    }
  }

  function parseValor(input: string) {
    const normalizedValue = input.trim().replace(",", ".");

    if (!normalizedValue) {
      return Number.NaN;
    }

    return Number(normalizedValue);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setFormError(null);

    const descricaoTratada = descricao.trim();
    const valorNumerico = parseValor(valor);
    const pessoaIdNumerico = Number(pessoaId);

    if (!pessoaIdNumerico) {
      setFormError("Selecione uma pessoa.");
      return;
    }

    if (!descricaoTratada) {
      setFormError("Informe a descricao da transacao.");
      return;
    }

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      setFormError("Informe um valor maior que zero.");
      return;
    }

    if (isSelectedPessoaMinor && tipo === "Income") {
      setFormError("Pessoas menores de idade nao podem receber receitas.");
      return;
    }

    setIsSubmitting(true);

    try {
      await criarTransacao({
        descricao: descricaoTratada,
        valor: valorNumerico,
        tipo,
        pessoaId: pessoaIdNumerico
      });
      setDescricao("");
      setValor("");
      setTipo("Expense");
      setFeedback("Transacao cadastrada com sucesso.");
      reloadTransacoes();
    } catch (exception) {
      setFormError(exception instanceof Error ? exception.message : "Nao foi possivel cadastrar a transacao.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReload() {
    reloadPessoas();
    reloadTransacoes();
  }

  return (
    <section>
      <PageHeader
        title="Transacoes"
        description="Cadastre receitas e despesas vinculadas a uma pessoa."
        onReload={handleReload}
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid transaction-form-grid">
          <label>
            <span>Pessoa</span>
            <select
              value={pessoaId}
              onChange={(event) => handlePessoaChange(event.target.value)}
              disabled={isSubmitting || isLoadingPessoas}
            >
              <option value="">Selecione</option>
              {pessoas.map((pessoa) => (
                <option key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome} ({pessoa.idade} anos)
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Descricao</span>
            <input
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Ex.: Mercado"
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>Valor</span>
            <input
              inputMode="decimal"
              value={valor}
              onChange={(event) => setValor(event.target.value)}
              placeholder="Ex.: 120,50"
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>Tipo</span>
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value as TipoTransacao)}
              disabled={isSubmitting}
            >
              <option value="Expense">Despesa</option>
              <option value="Income" disabled={isSelectedPessoaMinor}>
                Receita
              </option>
            </select>
          </label>
        </div>
        {isSelectedPessoaMinor && (
          <p className="helper-text">
            A pessoa selecionada e menor de idade. Receitas ficam desabilitadas nesta tela e
            tambem sao bloqueadas pelo back-end.
          </p>
        )}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting || isLoadingPessoas}>
            {isSubmitting ? "Salvando..." : "Cadastrar transacao"}
          </button>
        </div>
      </form>

      {feedback && <div className="message success">{feedback}</div>}
      {formError && <div className="message error">{formError}</div>}
      {pessoasError && <div className="message error">{pessoasError}</div>}

      <StatusBlock
        isLoading={isLoadingTransacoes}
        error={transacoesError}
        isEmpty={transacoes.length === 0}
      />
      {!isLoadingTransacoes && !transacoesError && transacoes.length > 0 && (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Descricao</th>
                <th>Tipo</th>
                <th>Pessoa</th>
                <th className="numeric">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id}>
                  <td>{transacao.descricao}</td>
                  <td>{transacao.tipo}</td>
                  <td>{transacao.pessoaNome}</td>
                  <td className="numeric">{formatCurrency(transacao.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
