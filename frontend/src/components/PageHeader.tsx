interface PageHeaderProps {
  title: string;
  description: string;
  onReload?: () => void;
}

export function PageHeader({ title, description, onReload }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {onReload && (
        <button type="button" onClick={onReload}>
          Atualizar
        </button>
      )}
    </div>
  );
}
