import { NavLink } from "react-router-dom";
import { logoutAccount } from "../../services/api"; // Asegúrate de que la ruta sea correcta
import './styleindex.css';

function Menu({ userRole, onLogout }) {
  const userRoutes = [
    { to: "/", text: "Inicio" },
    { to: "/coffees", text: "Coffees" },
    { to: "/page2", text: "Acerca de" }
  ];

  const adminRoutes = [
    { to: "/manage-coffees", text: "Gestión de Cafés" },
    { to: "/manage-clients", text: "Clientes" }
  ];

  const guestRoutes = [
    { to: "/login", text: "Iniciar sesión" },
    { to: "/register", text: "Registro" }
  ];

  const handleLogout = async () => {
    const success = await logoutAccount();
    if (success) {
      onLogout(); // Llama a la función onLogout pasada como prop
    } else {
      console.error('Failed to logout');
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">COFFE</h2>
      <ul className="navbar-list">
        {userRoutes.map((item, index) => (
          <li key={index} className="navbar-item">
            <NavLink 
              className="navbar-link"
              to={item.to}>
              {item.text}
            </NavLink>
          </li>
        ))}
        {userRole === 'ADMIN' && adminRoutes.map((item, index) => (
          <li key={index} className="navbar-item">
            <NavLink 
              className="navbar-link"
              to={item.to}>
              {item.text}
            </NavLink>
          </li>
        ))}
        {userRole === null && guestRoutes.map((item, index) => (
          <li key={index} className="navbar-item">
            <NavLink 
              className="navbar-link"
              to={item.to}>
              {item.text}
            </NavLink>
          </li>
        ))}
        {(userRole === 'CLIENT' || userRole === 'ADMIN') && (
          <li className="navbar-item">
            <button className="navbar-link logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Menu };
