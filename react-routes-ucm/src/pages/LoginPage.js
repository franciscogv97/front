import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAccount } from '../services/api';
import './LoginPageStyle.css';

const LoginPage = ({ setUserRole }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const decodedToken = await loginAccount(credentials);
      if (decodedToken) {
        console.log('Login successful:', decodedToken);
        const userRole = decodedToken.roles[0]; 
        setUserRole(userRole);
        localStorage.setItem('token', decodedToken.token); 
        navigate('/'); 
      } else {
        setError('Credenciales erróneas');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1>INICIO SESIÓN</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <div className="button-container">
        <button onClick={login}>ENTRAR</button>
        <button onClick={goToRegister}>REGISTRARSE</button>
      </div>
    </div>
  );
};

export default LoginPage;
