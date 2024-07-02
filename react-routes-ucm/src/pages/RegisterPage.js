import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import { registerAccount } from '../services/api'; // Asegúrate de que la ruta es correcta
import './RegisterPageStyle.css'; // Crear y aplicar estilos si es necesario

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const register = async () => {
    try {
      const data = await registerAccount(credentials);
      if (data) {
        console.log('Registration successful:', data);
        setSuccess('Registration successful!');
        navigate('/'); // Redirigir a Home después de un registro exitoso
      } else {
        setError('Registro fallido');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>REGISTRO</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <input
        type="text"
        placeholder="Nombre usuario"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default RegisterPage;
