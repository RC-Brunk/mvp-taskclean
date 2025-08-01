// frontend-web/src/components/MainLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function MainLayout() {
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token
    navigate('/login'); // Redireciona para a página de login
  };

  // Estilos para a demonstração, inspirados no PDF
  const styles = {
    layout: { 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      backgroundColor: '#f0f2f5' 
    },
    header: { 
      backgroundColor: '#001529', // Um azul escuro, comum em painéis admin
      color: 'white', 
      padding: '15px 30px', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    headerTitle: {
      fontSize: '24px',
    },
    nav: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: '#ccc',
      textDecoration: 'none',
      fontSize: '16px',
    },
    logoutButton: {
      backgroundColor: 'transparent',
      color: '#ff4d4f',
      border: '1px solid #ff4d4f',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    content: { 
      flex: 1, 
      padding: '20px', 
      overflowY: 'auto' // Adiciona scroll se o conteúdo for grande
    }
  };

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Atlantico - Painel do Gerente</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Dashboard</Link>
          <Link to="/units" style={styles.navLink}>Unidades</Link>
          <Link to="/tasks" style={styles.navLink}>Tarefas</Link>
          <button onClick={handleLogout} style={styles.logoutButton}>Sair</button>
        </nav>
      </header>
      <main style={styles.content}>
        {/* O <Outlet /> é o espaço onde o conteúdo de cada página será renderizado */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;