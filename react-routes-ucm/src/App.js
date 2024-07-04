import React, { useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Page2 } from './pages/Page2';
import { Menu } from './components/Menu';
import { Cursos } from './pages/Cursos';
import { MiCurso } from './components/MiCurso';
import { AuthProvider } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoffeeListPage from './pages/CoffeeListPage';
import ManageClientsPage from './pages/ManageClientsPage';

function App() {
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario

  const handleLogout = () => {
    setUserRole(null); // Limpiar el rol del usuario al cerrar sesión
    localStorage.removeItem('token'); // Limpiar el token del almacenamiento local
  };

  return (
    <AuthProvider>
      <HashRouter>
        <Menu userRole={userRole} onLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffees" element={<CoffeeListPage />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/cursos" element={<Cursos />}>
            <Route path=":url" element={<MiCurso />} />
          </Route>
          <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/manage-clients" element={userRole === 'ADMIN' ? <ManageClientsPage /> : <Navigate to="/" />} />
          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
