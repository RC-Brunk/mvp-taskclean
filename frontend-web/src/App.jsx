import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import DashboardPage from './pages/DashboardPage';
import UnitsPage from './pages/UnitsPage'; // Importa a página de unidades

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/units" element={<UnitsPage />} /> {/* Usa o novo componente */}
          <Route path="/tasks" element={<h1>Página de Tarefas (a ser criada)</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;