import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PessoasPage } from "./pages/PessoasPage";
import { TotaisPage } from "./pages/TotaisPage";
import { TransacoesPage } from "./pages/TransacoesPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/pessoas" replace />} />
        <Route path="/pessoas" element={<PessoasPage />} />
        <Route path="/transacoes" element={<TransacoesPage />} />
        <Route path="/totais" element={<TotaisPage />} />
      </Routes>
    </Layout>
  );
}
