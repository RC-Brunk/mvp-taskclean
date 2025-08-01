// frontend-web/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import DashboardPage from './pages/DashboardPage'; // 1. Importe a nova página

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} /> {/* 2. Use o novo componente */}
          <Route path="/units" element={<h1>Página para Gerenciar Unidades</h1>} />
          <Route path="/tasks" element={<h1>Página para Gerenciar Tarefas</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;