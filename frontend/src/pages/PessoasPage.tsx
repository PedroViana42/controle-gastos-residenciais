import { FormEvent, useCallback, useState } from "react";
import { criarPessoa, excluirPessoa, listarPessoas } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";

export function PessoasPage() {
  const loader = useCallback(() => listarPessoas(), []);
  const { data, error, isLoading, reload } = useApiResource(loader);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const pessoas = data ?? [];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setFormError(null);

    const nomeTratado = nome.trim();
    const idadeNumerica = Number(idade);

    if (!nomeTratado) {
      setFormError("Informe o nome da pessoa.");
      return;
    }

    if (!Number.isInteger(idadeNumerica) || idadeNumerica < 0) {
      setFormError("Informe uma idade maior ou igual a zero.");
      return;
    }

    setIsSubmitting(true);

    try {
      await criarPessoa({
        nome: nomeTratado,
        idade: idadeNumerica
      });
      setNome("");
      setIdade("");
      setFeedback("Pessoa cadastrada com sucesso.");
      reload();
    } catch (exception) {
      setFormError(exception instanceof Error ? exception.message : "Nao foi possivel cadastrar a pessoa.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number, pessoaNome: string) {
    const confirmed = window.confirm(
      `Excluir ${pessoaNome}? As transacoes relacionadas tambem serao apagadas.`
    );

    if (!confirmed) {
      return;
    }

    setFeedback(null);
    setFormError(null);
    setDeletingId(id);

    try {
      await excluirPessoa(id);
      setFeedback("Pessoa excluida com sucesso.");
      reload();
    } catch (exception) {
      setFormError(exception instanceof Error ? exception.message : "Nao foi possivel excluir a pessoa.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <PageHeader
        title="Pessoas"
        description="Cadastre e acompanhe as pessoas da residencia."
        onReload={reload}
      />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Nome</span>
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Ana"
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>Idade</span>
            <input
              type="number"
              min="0"
              step="1"
              value={idade}
              onChange={(event) => setIdade(event.target.value)}
              placeholder="Ex.: 32"
              disabled={isSubmitting}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Cadastrar pessoa"}
          </button>
        </div>
      </form>

      {feedback && <div className="message success">{feedback}</div>}
      {formError && <div className="message error">{formError}</div>}

      <StatusBlock isLoading={isLoading} error={error} isEmpty={pessoas.length === 0} />
      {!isLoading && !error && pessoas.length > 0 && (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th className="actions-column">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.idade}</td>
                  <td className="actions-column">
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(pessoa.id, pessoa.nome)}
                      disabled={deletingId === pessoa.id}
                    >
                      {deletingId === pessoa.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
