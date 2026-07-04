import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <strong>Controle de Gastos</strong>
          <span>Residencial</span>
        </div>
        <nav aria-label="Navegacao principal">
          <NavLink to="/pessoas">Pessoas</NavLink>
          <NavLink to="/transacoes">Transacoes</NavLink>
          <NavLink to="/totais">Totais</NavLink>
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
