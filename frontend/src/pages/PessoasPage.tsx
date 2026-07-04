import { useCallback } from "react";
import { listarPessoas } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";

export function PessoasPage() {
  const loader = useCallback(() => listarPessoas(), []);
  const { data, error, isLoading, reload } = useApiResource(loader);
  const pessoas = data ?? [];

  return (
    <section>
      <PageHeader
        title="Pessoas"
        description="Consulta inicial das pessoas cadastradas."
        onReload={reload}
      />
      <StatusBlock isLoading={isLoading} error={error} isEmpty={pessoas.length === 0} />
      {!isLoading && !error && pessoas.length > 0 && (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.idade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
