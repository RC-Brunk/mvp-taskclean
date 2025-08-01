// frontend-web/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Futuramente, moveremos a chamada da API para um arquivo de serviço
import axios from 'axios';

function LoginPage() {
  // Hooks para guardar o estado dos inputs e para navegação
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função que é chamada quando o formulário é enviado
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

  // ... (a variável 'styles' continua a mesma de antes)
  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
    formContainer: { padding: '40px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '350px' },
    title: { marginBottom: '24px', color: '#333' },
    input: { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' },
    button: { width: '100%', padding: '12px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' },
    error: { color: 'red', marginBottom: '16px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Login - Atlantico</h1>
        {/* Adicionamos o manipulador de envio ao formulário */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username'
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password'
            style={styles.input}
          />
          {/* Mostra a mensagem de erro, se houver */}
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;