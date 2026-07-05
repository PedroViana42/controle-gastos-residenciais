import { useCallback } from "react";
import { consultarTotais } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";
import { formatCurrency } from "../utils/formatters";

function getSaldoClass(saldo: number) {
  if (saldo > 0) {
    return "balance-positive";
  }

  if (saldo < 0) {
    return "balance-negative";
  }

  return "balance-zero";
}

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
      {!isLoading && !error && data && pessoas.length > 0 && (
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
              <strong className={getSaldoClass(data.totaisGerais.saldo)}>
                {formatCurrency(data.totaisGerais.saldo)}
              </strong>
            </article>
          </div>

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
                    <td className={`numeric balance-cell ${getSaldoClass(pessoa.saldo)}`}>
                      {formatCurrency(pessoa.saldo)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total geral</td>
                  <td className="numeric">{formatCurrency(data.totaisGerais.totalReceitas)}</td>
                  <td className="numeric">{formatCurrency(data.totaisGerais.totalDespesas)}</td>
                  <td className={`numeric balance-cell ${getSaldoClass(data.totaisGerais.saldo)}`}>
                    {formatCurrency(data.totaisGerais.saldo)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
