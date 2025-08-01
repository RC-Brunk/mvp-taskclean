import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  // 1. Verifica se existe um token de autenticação no localStorage
  const token = localStorage.getItem('authToken');

  // 2. Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se houver um token, renderiza a página filha (o componente da rota)
  // O <Outlet /> é um placeholder para o componente que a rota protegida irá renderizar
  return <Outlet />;
}

export default ProtectedRoute;