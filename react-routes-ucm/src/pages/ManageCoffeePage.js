import React, { useEffect, useState } from 'react';
import { getCoffeeList } from '../services/api';
import './ManageCoffeePageStyle.css';

const ManageCoffeePage = () => {
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const data = await getCoffeeList();
        setCoffees(data);
      } catch (error) {
        setError('Error fetching coffee list');
      }
    };

    fetchCoffees();
  }, []);

  return (
    <div className="manage-coffee-container">
      <h1>Gestión de Cafés</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="coffee-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee, index) => (
            <tr key={index}>
              <td>{coffee.name}</td>
              <td>{coffee.description}</td>
              <td>${coffee.price}</td>
              <td>
                {/* Aquí puedes agregar botones de editar/eliminar, por ejemplo */}
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default ManageCoffeePage;
