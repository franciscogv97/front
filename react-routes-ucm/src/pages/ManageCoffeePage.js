import React, { useEffect, useState } from 'react';
import { getCoffeeList, deleteCoffee, updateCoffee } from '../services/api';
import './ManageCoffeePageStyle.css';

const ManageCoffeePage = () => {
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);
  const [editCoffee, setEditCoffee] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting coffee with ID: ${id}`);
      await deleteCoffee(id);
      setCoffees(coffees.filter(coffee => coffee.id !== id));
    } catch (error) {
      setError('Error deleting coffee');
    }
  };

  const handleEdit = (coffee) => {
    console.log('Editing coffee:', coffee);
    setEditCoffee(coffee);
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating coffee:', editCoffee);
      const updatedCoffee = await updateCoffee(editCoffee);
      setCoffees(coffees.map(coffee => (coffee.id === updatedCoffee.id ? updatedCoffee : coffee)));
      setEditCoffee(null);
    } catch (error) {
      setError('Error updating coffee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCoffee({ ...editCoffee, [name]: value });
  };

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
                <button className="edit-button" onClick={() => handleEdit(coffee)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(coffee.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editCoffee && (
        <div className="edit-form">
          <h2>Editar Café</h2>
          <input
            type="text"
            name="name"
            value={editCoffee.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="text"
            name="description"
            value={editCoffee.description}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <input
            type="number"
            name="price"
            value={editCoffee.price}
            onChange={handleChange}
            placeholder="Precio"
          />
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setEditCoffee(null)}>Cancelar</button>
        </div>
      )}
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default ManageCoffeePage;
