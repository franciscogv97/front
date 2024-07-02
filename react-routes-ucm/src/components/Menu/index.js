import { NavLink } from "react-router-dom";
import './styleindex.css';

function Menu({ userRole, onLogout }) {
  const userRoutes = [
    { to: "/", text: "Inicio" },
    { to: "/coffees", text: "Coffes" },
    { to: "/page2", text: "Acerca de" }
  ];

  const adminRoutes = [
    { to: "/admin-dashboard", text: "Admin Dashboard" },
    { to: "/admin-settings", text: "Admin Settings" }
  ];

  const guestRoutes = [
    { to: "/login", text: "Iniciar sesión" },
    { to: "/register", text: "Registro" }
  ];

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
        {userRole === 'admin' && adminRoutes.map((item, index) => (
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
        {(userRole === 'user' || userRole === 'admin') && (
          <li className="navbar-item">
            <button className="navbar-link logout-button" onClick={onLogout}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Menu }
