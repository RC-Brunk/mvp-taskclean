// frontend-web/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import axios from 'axios';



function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página
    setError(''); // Limpa erros anteriores

    if (!username || !password) {
      setError('Nome de usuário e senha são obrigatórios.');
      return;
    }

    try {
      // Faz a requisição para o nosso backend
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username: username,
        password: password,
      });

      // Se o login for bem-sucedido, a API retornará um token
      const { token } = response.data;

      // Guarda o token no armazenamento local do navegador
      localStorage.setItem('authToken', token);

      console.log('Login bem-sucedido! Token:', token);

      // Redireciona o usuário para a página principal (Dashboard)
      navigate('/');

    } catch (err) {
      // Se a API retornar um erro (ex: 401 Credenciais inválidas)
      console.error('Erro no login:', err);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="title">Login - Atlantico</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field" // <-- Mudou de style para className
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field" // <-- Mudou de style para className
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;