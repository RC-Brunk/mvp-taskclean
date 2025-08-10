// c:\taksclean-portfolio\frontend-web\src\components\MainLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './MainLayout.css'; // Importa o arquivo CSS

function MainLayout() {
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <h1 className="header-title">Atlantico - Painel do Gerente</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/units" className="nav-link">Unidades</Link>
          <Link to="/tasks" className="nav-link">Tarefas</Link>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </nav>
      </header>
      <main className="main-content">
        {/* O <Outlet /> é o espaço onde o conteúdo de cada página será renderizado */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
