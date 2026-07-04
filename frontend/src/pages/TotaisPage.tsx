import { useCallback } from "react";
import { consultarTotais } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";
import { formatCurrency } from "../utils/formatters";

export function TotaisPage() {
  const loader = useCallback(() => consultarTotais(), []);
  const { data, error, isLoading, reload } = useApiResource(loader);
  const pessoas = data?.pessoas ?? [];

  return (
    <section>
      <PageHeader
        title="Totais"
        description="Receitas, despesas e saldo por pessoa."
        onReload={reload}
      />
      <StatusBlock isLoading={isLoading} error={error} isEmpty={pessoas.length === 0} />
      {!isLoading && !error && data && (
        <>
          <div className="summary-grid">
            <article>
              <span>Receitas</span>
              <strong>{formatCurrency(data.totaisGerais.totalReceitas)}</strong>
            </article>
            <article>
              <span>Despesas</span>
              <strong>{formatCurrency(data.totaisGerais.totalDespesas)}</strong>
            </article>
            <article>
              <span>Saldo</span>
              <strong>{formatCurrency(data.totaisGerais.saldo)}</strong>
            </article>
          </div>

          {pessoas.length > 0 && (
            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Pessoa</th>
                    <th className="numeric">Receitas</th>
                    <th className="numeric">Despesas</th>
                    <th className="numeric">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {pessoas.map((pessoa) => (
                    <tr key={pessoa.pessoaId}>
                      <td>{pessoa.pessoaNome}</td>
                      <td className="numeric">{formatCurrency(pessoa.totalReceitas)}</td>
                      <td className="numeric">{formatCurrency(pessoa.totalDespesas)}</td>
                      <td className="numeric">{formatCurrency(pessoa.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
