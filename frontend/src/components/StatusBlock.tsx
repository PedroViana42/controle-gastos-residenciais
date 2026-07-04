interface StatusBlockProps {
  isLoading: boolean;
  error: string | null;
  isEmpty?: boolean;
}

export function StatusBlock({ isLoading, error, isEmpty }: StatusBlockProps) {
  if (isLoading) {
    return <div className="status-block">Carregando dados...</div>;
  }

  if (error) {
    return <div className="status-block error">{error}</div>;
  }

  if (isEmpty) {
    return <div className="status-block">Nenhum registro encontrado.</div>;
  }

  return null;
}
