import { useCallback } from "react";
import { listarTransacoes } from "../api/endpoints";
import { PageHeader } from "../components/PageHeader";
import { StatusBlock } from "../components/StatusBlock";
import { useApiResource } from "../hooks/useApiResource";
import { formatCurrency } from "../utils/formatters";

export function TransacoesPage() {
  const loader = useCallback(() => listarTransacoes(), []);
  const { data, error, isLoading, reload } = useApiResource(loader);
  const transacoes = data ?? [];

  return (
    <section>
      <PageHeader
        title="Transacoes"
        description="Consulta inicial das receitas e despesas cadastradas."
        onReload={reload}
      />
      <StatusBlock isLoading={isLoading} error={error} isEmpty={transacoes.length === 0} />
      {!isLoading && !error && transacoes.length > 0 && (
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
